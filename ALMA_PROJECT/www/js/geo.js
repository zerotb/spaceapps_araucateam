
var nav = null;
var watchID;
var geoloc;
var marcadorUsuario = null;
var antenas = [];
var checkList = [];

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


//////////////////////////////////////////////////////////////////////////
// CÁLCULO DE DISTANCIAS
//////////////////////////////////////////////////////////////////////////

// Necesitamos construir un objeto de este tipo:
// var map = {a:{b:2,x:40,c:40},b:{c:40, x:2},x:{c:6}};

// Para eso, inicializamos un Objeto que contrendrá todas las distancias
// var antenasDistancias = {};

// function calcularDistanciasEntreAntenas(){

//   // Calculamos la distancia de cada antena hacia la otra
//   $.each(listadoAntenas, function(i1, item1){

//     // Para cada antena, necestiamos crear un objeto {b:2,x:40,c:40}
//     // Inicializamos un objeto
//     var distancia = {};

//     $.each(listadoAntenas, function(i2, item2){

//       // Si la antena es distinta a la que estamos recorriendo
//       if(item1["Antenna"] != i2["Antenna"])
//       {
//         // Distancia a la antena item1 a item2
//         distancia[item2["Antenna"]] = 
//           getDistanceFromLatLonInKm(item1.Latitude, item1.Longitude, 
//                                     item2.Latitude, item2.Longitude);
//       }

//     });

//     // Agregamos las distancias a todas las antenas
//     // Para crear un Objeto del tipo: a:{b:2,x:40,c:40}, donde a,b,x,c son los nombres de las antenas
//     antenasDistancias[item1["Antenna"]] = distancia;

//   });

// }


// Inicializamos el punto de origen (Technical Building)
var base = new Object();
    base["Antenna"] = "base";
    base["Latitude"] = -23.02336414219032;
    base["Longitude"] = -67.75367796421051;
    base["Height"] = 5074.88584582601;

// TODO: MODIFICAR A LISTADO DE ÁLVARO
checkList.push(base);

// Coordenadas de recorrido
var recorridoCoordenadas = [];

var listadoRecorrido = new Array();
listadoRecorrido.push(base);

// Cálculo de la menor distancia entre un punto de origen dado y el resto de los
// elemento de un arreglo (los que se van eliminando a medida que son recorridos)
function MenorDistancia(punto, arreglo){

  // Obtenemos la distancia mínima desde el punto a los items del arreglo
  var min = _.min(arreglo, function(item) {

    if(item["Antenna"] != punto["Antenna"]){

      return getDistanceFromLatLonInMts(punto.Latitude, punto.Longitude, 
                              item.Latitude, item.Longitude);
    }

  });

  // Eliminamos el punto del listado de antenas
  var index = arreglo.indexOf(punto);
  if (index > -1) {
    arreglo.splice(index, 1);
  }

  // Llamamos recursivamente a la función
  if(arreglo.length > 0){
    listadoRecorrido.push(min);
    MenorDistancia(min, arreglo);
    placeAntenna(min); // WENA iCARLY! xD
  }
  else
  {
    console.log("pasó");

    // Agregamos los items
    $.each(listadoRecorrido, function(i, item){

      // Agregamos las coordenadas del punto para luego dibujar la línea de la trayectoria
      recorridoCoordenadas.push(new google.maps.LatLng(item.Latitude, item.Longitude));

    });

    // Finalmente dibujamos el recorrido
    var recorridoPlan = new google.maps.Polyline({
      path: recorridoCoordenadas,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });

    // Asignamos el mapa
    recorridoPlan.setMap(map);
  }

}

function getDistanceFromLatLonInMts(lat1,lon1,lat2,lon2) {
  
  var R = 6371 * 1000; // Radio de la tierra en metros
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);

  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km

  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}


///////////////////////////////////////////////////////////////////////////////


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

  usrLat = antena.Latitude;
  usrLong = antena.Longitude;


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


function cargarAntenas(){

  /*
      var json;
      $.ajax({
          type: "GET",
          url: "antenas.json",
          dataType: "json",
          success: function(data) {

              console.log(data);
              $.each(data,function (i, item) {
                //console.log("->"+item.id);
                var antena = {"lat":item.lat,"long":item.lng};
                placeAntenna(antena);

              });
          }
      });
  */

  console.log(listadoAntenas);
  $.each(listadoAntenas,function (i, item) {
    //console.log("->"+item.id);
    var antena = {"lat":item.Latitude,"long":item.Longitude};
    placeAntenna(antena);

  });

}

