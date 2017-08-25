function Map()
{
}
// Funkcija za prikaz mape
Map.displayMap = function(userPosition, carPosition)
{
   var userLatLng = null;
   var carLatLng = null;
// prikupljanje i provera trenutnih pozicija klijenta i automobila
   if (userPosition != null)
      userLatLng = new google.maps.LatLng(userPosition.coords.latitude, userPosition.coords.longitude);
   if (carPosition != null)
      carLatLng = new google.maps.LatLng(carPosition.position.latitude, carPosition.position.longitude);
// Inicijalizacija opcija mape
   var options = {
      zoom: 10,
      disableDefaultUI: false,
      streetViewControl: true,
      center: userLatLng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
   }
   // Kreiranje mape
   var map = new google.maps.Map(document.getElementById('map'), options);
   //Kreiranje korisnickog markera trenutne lokacije
   var marker = new google.maps.Marker({
      position: userLatLng,
      map: map,
      title: 'Tvoja pozicija'
	  
   });
   if (carLatLng == null)
      marker.setIcon('images/car-marker.png');
   else
      marker.setIcon('images/user-marker.png');
   // Iscrtavanje preciznosti kruga oko markera
   var circle = new google.maps.Circle({
      center: userLatLng,
      radius: userPosition.coords.accuracy,
      map: map,
      fillColor: '#70E7FF',
      fillOpacity: 0.2,
      strokeColor: '#0000FF',
      strokeOpacity: 1.0
   });
   map.fitBounds(circle.getBounds());
   // Iscrtavanje markera za automobil
   if (carLatLng != null)
   {
      marker = new google.maps.Marker({
         position: carLatLng,
         map: map,
         icon: 'images/car-marker.png',
         title: 'Car position'
      });
      circle = new google.maps.Circle({
         center: carLatLng,
         radius: carPosition.position.accuracy,
         map: map,
         fillColor: '#70E7FF',
         fillOpacity: 0.2,
         strokeColor: '#0000FF',
         strokeOpacity: 1.0
      });
      options = {
         suppressMarkers: true,
         map: map,
         preserveViewport: true
      }
      this.setRoute(new google.maps.DirectionsRenderer(options), userLatLng, carLatLng);
   }
	// Nakon inicijalizacije mape, gasi se ajax loader
   $.mobile.loading('hide');
}
// Funkcija za iscrtavanje puta izmedju automobila i korisnika
Map.setRoute = function(directionsDisplay, userLatLng, carLatLng)
{
   var directionsService = new google.maps.DirectionsService();
   var request = {
      origin: userLatLng,
      destination: carLatLng,
      travelMode: google.maps.DirectionsTravelMode.WALKING,
      unitSystem: google.maps.UnitSystem.METRIC
   };

   directionsService.route(
      request,
      function(response, status)
      {
         if (status == google.maps.DirectionsStatus.OK)
            directionsDisplay.setDirections(response);
         else
         {
            navigator.notification.alert(
				'Nemoguce je postaviti put do vaseg automobila. U svakom slucaju mozete ga naci sami:)',
               function(){},
               'Upozorenje'
            );
         }
      }
   );
}
// Funkcija koja vraca zadatu poziciju
Map.requestLocation = function(position)
{
   new google.maps.Geocoder().geocode(
      {
         'location': new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
      },
      function(results, status)
      {
         if (status == google.maps.GeocoderStatus.OK)
         {
            var positions = new Position();
            positions.updatePosition(0, positions.getPositions()[0].coords, results[0].formatted_address);
         }
      }
   );
}