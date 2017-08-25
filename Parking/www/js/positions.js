// funkcija za cuvanje pozicija uz pomoc localstorage
function Position(position, address, datetime)
{
   var _db = window.localStorage;
   var MAX_POSITIONS = 50;

   this.position = position;
   this.address = address;
   this.datetime = datetime;
   // Provera maksimalnog broja pozicija koje mogu biti sacuvane
   this.getMaxPositions = function()
   {
      return MAX_POSITIONS;
   }
	// Mehanizam cuvanja pozicija i provere baze
   this.savePosition = function(position, address)
   {
      if (!_db)
      {
         console.log('Baza podataka je prazna. Nije moguce cuvanje pozicije.');
         navigator.notification.alert(
            'Nije moguce cuvanje pozicije',
            function(){},
            'Greska'
         );
      }

      var positions = this.getPositions();
      if (positions == null)
         positions = [];

      positions.unshift(new Position(position, address, new Date()));
      if (positions.length > this.MAX_POSITIONS)
         positions = positions.slice(0, this.MAX_POSITIONS);
	// cuvanje pozicija
      _db.setItem('positions', JSON.stringify(positions));

      return positions;
   }
	// Azuriranje pozicija
   this.updatePosition = function(index, position, address)
   {
      if (!_db)
      {
         console.log('Baza podataka je prazna. Nije moguce cuvanje pozicije.');
         navigator.notification.alert(
            'Nije moguce cuvanje pozicije.',
            function(){},
            'Greska'
         );
      }

      var positions = this.getPositions();
      if (positions != null && positions[index] != undefined)
      {
         positions[index].coords = position;
         positions[index].address = address;
      }

      _db.setItem('positions', JSON.stringify(positions));

      return positions;
   }
	// Brisanje pozicija
   this.deletePosition = function(index)
   {
      if (!_db)
      {
         console.log('Baza podataka je prazna. Nije moguce cuvanje pozicije.');
         navigator.notification.alert(
            'Nije moguce cuvanje pozicije.',
            function(){},
            'Greska'
         );
      }

      var positions = this.getPositions();
      if (positions != null && positions[index] != undefined)
         positions.splice(index, 1);

      _db.setItem('positions', JSON.stringify(positions));

      return positions;
   }
   // Preuzimanje pozicija
   this.getPositions = function()
   {
      if (!_db)
      {
         console.log('Baza podataka je prazna. Nije moguce cuvanje pozicije.');
         navigator.notification.alert(
            'Nije moguce cuvanje pozicije.',
            function(){},
            'Greska'
         );
      }

      var positions = JSON.parse(_db.getItem('positions'));
      if (positions == null)
         positions = [];

      return positions;
   }

}
// Funkcija koja definise Koordinate kao i njene parametre geografske duzine, sirine i preciznosti.
function Coords(latitude, longitude, accuracy)
{
   this.latitude = latitude;
   this.longitude = longitude;
   this.accuracy = accuracy;
}