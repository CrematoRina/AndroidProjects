// Ovaj deo koda vrsi proveru zahteva konekcije, da li klijent ima konekciju ka internetu
// Ukoliko konekcija nije uspostavljena, klijentu se ispisuje greska u vidu alerta
function checkRequirements()
{
   if (navigator.network.connection.type == Connection.NONE)
   {
      navigator.notification.alert(
         'Da bi koristio ovu aplikaciju potrebna je internet konekcija',
         function(){},
         'Upozorenje'
      );
      return false;
   }

   return true;
}

function updateIcons()
{
   if ($(window).width() > 480)
   {
      $('a[data-icon], button[data-icon]').each(
         function()
         {
            $(this).removeAttr('data-iconpos');
         }
      );
   }
   else
   {
      $('a[data-icon], button[data-icon]').each(
         function()
         {
            $(this).attr('data-iconpos', 'notext');
         }
      );
   }
}

function urlParam(name)
{
   var results = new RegExp('[\\?&amp;]' + name + '=([^&amp;#]*)').exec(window.location.href);
   if (results != null && typeof results[1] !== 'undefined')
      return results[1];
   else
      return null;
}
// Ovom funkcijom se vrsi inicijalizacija aplikacije
// Ukoliko korisnik pokrene neke od ponudjenih akcija izvrsavaju se sledeci delovi koda
function initApplication()
{
   $('#parkiraj-se, #pronadji-kola, #park').click(function() {
	  // Ukoliko nisu ispunjeni uslovi, dugmetu se sklanja klasa koja ga cini aktivnim
      if (checkRequirements() === false)
      {
         $(this).removeClass('ui-btn-active');
         return false;
      }
   });
   $(document).on('pagebeforecreate orientationchange', updateIcons);
   // Prikaz ajax loding gift slike na klasi map-page1
  $('#map-page1').live(
	  'pageshow',
	  function(){
	    $.mobile.loading('show');
	  }
   );
   // Inicijalizacija mape na klasi map-page, provera trenutne lokacije, kao i GPS konekcije
   $('#map-page').live(
      'pageshow',
      function()
      {
         var requestType = urlParam('requestType');
         var positionIndex = urlParam('index');
         var geolocationOptions = {
            timeout: 15 * 1000,
            maximumAge: 10 * 1000,
            enableHighAccuracy: true
         };
         var position = new Position();

         $.mobile.loading('show');
		 // Ukoliko je zahtev akcije SET izvrisice se akcija odredjivanje trenutne lokacije 
         if (requestType == 'set')
         {
            navigator.geolocation.getCurrentPosition(
               function(location)
               {
                  position.savePosition(
                     new Coords(
                        location.coords.latitude,
                        location.coords.longitude,
                        location.coords.accuracy
                     )
                  );
                  Map.requestLocation(location);
                  Map.displayMap(location, null);
                  navigator.notification.alert(
                     'Tvoja pozicija je sacuvana.',
                     function(){},
                     'Informacija'
                  );
               },
               function(error)
               {
                  navigator.notification.alert(
                     'Nemoguce je prikazati vasu poziciju. Da li je vas GPS ukljucen?',
                     function(){
                        alert("Nemoguce je prikazati vasu poziciju: " + error.message);
                     },
                     'Greska'
                  );
                  $.mobile.changePage('index.html');
               },
               geolocationOptions
            );
         }
		 // ukoliko je zahtev GET vrsi se kreiranje rute izmedju trenutne lokacije i prethodno sacuvane lokacije
         else
         {
            if (position.getPositions().length == 0)
            {
               navigator.notification.alert(
                  'Niste postavili poziciju',
                  function(){},
                  'Greska'
               );
               $.mobile.changePage('index.html');
               return false;
            }
            else
            {
               navigator.geolocation.watchPosition(
                  function(location)
                  {
                     if (positionIndex == undefined)
                        Map.displayMap(location, position.getPositions()[0]);
                     else
                        Map.displayMap(location, position.getPositions()[positionIndex]);
                  },
                  function(error)
                  {
                     console.log("Nemoguce je prikazati vasu poziciju: " + error.message);
                  },
                  geolocationOptions
               );
            }
         }
      }
   );
   // Kreiranje istorije zapamcenih lokacija
   $('#positions-page').live(
      'pageinit',
      function()
      {
         createPositionsHistoryList('positions-list', (new Position()).getPositions());
      }
   );
}
// funkcija za kreiranje istorije koja belezi sacuvane lokacije
function createPositionsHistoryList(idElement, positions)
{
   if (positions == null || positions.length == 0)
      return;

   $('#' + idElement).empty();
   var $listElement, $linkElement, dateTime;
   for(var i = 0; i < positions.length; i++)
   {
      $listElement = $('<li>');
      $linkElement = $('<a>');
      $linkElement
      .attr('href', '#')
      .click(
         function()
         {
            if (checkRequirements() === false)
               return false;

            $.mobile.changePage(
               'map.html',
               {
                  data: {
                     requestType: 'get',
                     index: $(this).closest('li').index()
                  }
               }
            );
         }
      );

      if (positions[i].address == '' || positions[i].address == null)
         $linkElement.text('Adresa nije pronadjena');
      else
         $linkElement.text(positions[i].address);

      dateTime = new Date(positions[i].datetime);
      $linkElement.text(
         $linkElement.text() + ' @ ' +
         dateTime.toLocaleDateString() + ' ' +
         dateTime.toLocaleTimeString()
      );
      $listElement.append($linkElement);

      $linkElement = $('<a>');
      $linkElement.attr('href', '#')
      .text('Delete')
      .click(
         function()
         {
            var position = new Position();
            var oldLenght = position.getPositions().length;
            var $parentUl = $(this).closest('ul');

            position.deletePosition($(this).closest('li').index());
            if (oldLenght == position.getPositions().length + 1)
            {
               $(this).closest('li').remove();
               $parentUl.listview('refresh');
            }
            else
            {
               navigator.notification.alert(
                  'Pozicija nije obrisana. Nesto je poslo po zlu, pokusajte ponovo.',
                  function(){},
                  'Greska'
               );
            }

         }
      );
      $listElement.append($linkElement);
      $('#' + idElement).append($listElement);
   }
   $('#' + idElement).listview('refresh');
}