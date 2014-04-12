var nav = null;
var watchID;
var geoloc;
var marcadorUsuario = null;
var antenas = [];

function BuscarUbicacion() {

  if (nav == null) {
      nav = window.navigator;
  }
  if (nav != null) {
      geoloc = nav.geolocation;
      if (geoloc != null) {
          var options = {
            enableHighAccuracy: true,
            //timeout: 15000,
            maximumAge: 0
          };
          watchID = geoloc.watchPosition(showLocation, errorCallback, options);

      }
      else {
        console.log("Navigator no encontrado");  
      }
  }
  else {
      console.log("Navigator no encontrado");

  }
}


function showLocation(position) {

  usrLat = position.coords.latitude;
  usrLong = position.coords.longitude;

  console.log(position);

  var latlng = new google.maps.LatLng(usrLat, usrLong);

  if(marcadorUsuario == null){
    
    // Marcador
    marcadorUsuario = 
      new google.maps.Marker({
      position: latlng,
      map: map,
      icon: "https://wiki.openmrs.org/images/icons/profilepics/Avatar-14.png"
      });

    map.setCenter(latlng);
    //map.setZoom(16);

  }
  else
  {
    marcadorUsuario.setPosition(latlng);
  }

}

function placeAntenna(antena) {

  usrLat = antena.lat;
  usrLong = antena.long;


  var latlng = new google.maps.LatLng(usrLat, usrLong);

  //if(marcador == null){
    
    // Marcador
    var marcador = 
      new google.maps.Marker({
      position: latlng,
      map: map,
      icon: "http://png-3.findicons.com/files/icons/2218/comfi_telecom/32/antenna.png"
      });

    map.setCenter(latlng);

    antenas.push(marcador);
    //map.setZoom(16);
/*
  }
  else
  {
    marcador.setPosition(latlng);
  }
*/
}


// Trap a GPS error, log it to console and display on site
function errorCallback(error) {
    
    var errores = { 
          1: 'Permission denied',
          2: 'Position unavailable',
          3: 'Request timeout'
      };

    console.log("Navigator error:" + errores[error]);
    
} //gotErr

function clearWatch(watchID) {
    window.navigator.geolocation.clearWatch(watchID);
}