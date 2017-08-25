// Inicijalizacija mape
function initMap() {
  var options = {
      zoom: 15,
      disableDefaultUI: false,
      streetViewControl: true,
      center: {lat: 43.325554, lng: 21.899399},
      mapTypeId: google.maps.MapTypeId.ROADMAP
} 
  // Kreiranje pomocnih promenljivih za destinaciju i pocetnu poziciju
  var or;
  var de;
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
  var map = new google.maps.Map(document.getElementById('map'), options);
  directionsDisplay.setMap(map);
  //Kreiranje kontrole dugmeta za odabir prikaza parkinga
  var centerControlDiv = document.createElement('div');
  var centerControl = new CenterControl(centerControlDiv, map);
  centerControlDiv.index = 1;
  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(centerControlDiv);
  var geolocationOptions = {
            timeout: 15 * 1000,
            maximumAge: 10 * 1000, 
            enableHighAccuracy: true
  };
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
	function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
	or = pos;
	var curpos = new google.maps.Marker({
	map: map,
    position: pos,
	icon:'images/car-marker.png',
    title:"c"}
	);
      map.setCenter(pos);
    },function(error){
      navigator.notification.alert(
        'Nemoguce je prikazati vasu poziciju. Da li je vas GPS ukljucen?',
        function(){
          alert("Nemoguce je prikazati vasu poziciju: " + error.message);
        },
        'Greska'
      );
      $.mobile.changePage('index.html');
     },geolocationOptions
	);
  } else {
    handleLocationError(false, infoWindow, map.getCenter());
  }
	// Staticko kreiranje parking pozicija (hard-code)
	// Prvih 5 mesta koja se placaju
	var myLatlng1 = new google.maps.LatLng(43.322524, 21.895551);
    var marker1 = new google.maps.Marker({
	map: map,
    position: myLatlng1,
    title:"P1"});
	var myLatlng2 = new google.maps.LatLng(43.325139, 21.900776);
    var marker2 = new google.maps.Marker({
	map: map,
    position: myLatlng2,
    title:"P1"});
	var myLatlng3 = new google.maps.LatLng(43.319553, 21.899546);
    var marker3 = new google.maps.Marker({
	map: map,
    position: myLatlng3,
    title:"P1"});
	var myLatlng4 = new google.maps.LatLng(43.321997, 21.896870);
    var marker4 = new google.maps.Marker({
	map: map,
    position: myLatlng4,
    title:"P1"});
	var myLatlng5 = new google.maps.LatLng(43.323029, 21.907491);
    var marker5 = new google.maps.Marker({
	map: map,
    position: myLatlng5,
    title:"P1"});
	// Drugih 5 parking mesta koja su besplatna
	var myLatlng6 = new google.maps.LatLng(43.324600, 21.899242);
    var marker6 = new google.maps.Marker({
	map: map,
    position: myLatlng6,
	icon:'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
    title:"P2"}
	);
	var myLatlng7 = new google.maps.LatLng(43.317194, 21.889149);
    var marker7 = new google.maps.Marker({
	map: map,
    position: myLatlng7,
	icon:'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
    title:"P2"}
	);
	var myLatlng8 = new google.maps.LatLng(43.330716, 21.892577);
    var marker8 = new google.maps.Marker({
	map: map,
    position: myLatlng8,
	icon:'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
    title:"P2"}
	);
	var myLatlng9 = new google.maps.LatLng(43.321471, 21.915422);
    var marker9 = new google.maps.Marker({
	map: map,
    position: myLatlng9,
	icon:'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
    title:"P2"}
	);
	var myLatlng10 = new google.maps.LatLng(43.312047, 21.888577);
    var marker10 = new google.maps.Marker({
	map: map,
    position: myLatlng10,
	icon:'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
    title:"P2"}
	);
//Kreiranje on click dogadjaja za iscrtavanje rute ka parking mestu
  google.maps.event.addListener(marker1, "click", function() {
	  de = myLatlng1;
	  calculateAndDisplayRoute(directionsService, directionsDisplay, or, de); 
  });
    google.maps.event.addListener(marker2, "click", function() {
	  de = myLatlng2;
	  calculateAndDisplayRoute(directionsService, directionsDisplay, or, de); 
  });
    google.maps.event.addListener(marker3, "click", function() {
	  de = myLatlng3;
	  calculateAndDisplayRoute(directionsService, directionsDisplay, or, de); 
  });
    google.maps.event.addListener(marker4, "click", function() {
	  de = myLatlng4;
	  calculateAndDisplayRoute(directionsService, directionsDisplay, or, de); 
  });
    google.maps.event.addListener(marker5, "click", function() {
	  de = myLatlng5;
	  calculateAndDisplayRoute(directionsService, directionsDisplay, or, de); 
  });
    google.maps.event.addListener(marker6, "click", function() {
	  de = myLatlng6;
	  calculateAndDisplayRoute(directionsService, directionsDisplay, or, de); 
  });
    google.maps.event.addListener(marker7, "click", function() {
	  de = myLatlng7;
	  calculateAndDisplayRoute(directionsService, directionsDisplay, or, de); 
  });
    google.maps.event.addListener(marker8, "click", function() {
	  de = myLatlng8;
	  calculateAndDisplayRoute(directionsService, directionsDisplay, or, de); 
  });
    google.maps.event.addListener(marker9, "click", function() {
	  de = myLatlng9;
	  calculateAndDisplayRoute(directionsService, directionsDisplay, or, de); 
  });
    google.maps.event.addListener(marker10, "click", function() {
	  de = myLatlng10;
	  calculateAndDisplayRoute(directionsService, directionsDisplay, or, de); 
  });
  $.mobile.loading('hide');
  //Funkcija za kreiranje kontrole Button
  function CenterControl(controlDiv, map) {
  var controlUI = document.createElement('div');
  controlUI.style.backgroundColor = '#fff';
  controlUI.style.border = '1px solid #fff';
  controlUI.style.borderRadius = '3px';
  controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
  controlUI.style.cursor = 'pointer';
  controlUI.style.width = '110px';
  controlUI.style.minWidth = '110px';
  controlUI.style.textAlign = 'center';
  controlUI.style.marginTop = '10px';
  controlUI.style.marginRight = '10px';
  controlDiv.appendChild(controlUI);
  var controlText = document.createElement('div');
  controlText.style.color = 'rgb(25,25,25)';
  controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
  controlText.style.fontSize = '12px';
  controlText.style.lineHeight = '23px';
  controlText.style.padding = '5px';
  controlText.innerHTML = 'Prikazi Slobodna';
  controlUI.appendChild(controlText);
  var triger = true;
  //funkcija za dogadja on click dugmeta
  controlUI.addEventListener('click', function() {
  if(triger==true){
    controlText.innerHTML = 'Prikazi Sva';
	marker1.setOpacity(0.0);
	marker2.setOpacity(0.0);
	marker3.setOpacity(0.0);
	marker4.setOpacity(0.0);
	marker5.setOpacity(0.0);
	triger = false;
	}
	else{
	controlText.innerHTML = 'Prikazi Slobodna';
	marker1.setOpacity(1.0);
	marker2.setOpacity(1.0);
	marker3.setOpacity(1.0);
	marker4.setOpacity(1.0);
	marker5.setOpacity(1.0);
	triger = true;
	}
  });
 }
}
// Funkcija za kreiranje i prikaz rute izmedju odredista i pozicije korisnika
function calculateAndDisplayRoute(directionsService, directionsDisplay, pocetna, krajnja) {
  directionsService.route({
    origin: pocetna,
    destination: krajnja,
    travelMode: google.maps.TravelMode.DRIVING
  }, function(response, status) {
    if (status === google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
    } else {
      window.alert('Zahtev za crtanje puta nije uspeo zbog ' + status);
    }
  });
}

