var map;
var marcador = null;

$(document).ready(function() {

	// Config del mapa
	var mapOptions = {
		center: new google.maps.LatLng(-38.739398, -72.598686), // lat, long Temuco
		zoom: 6,
		mapTypeId: google.maps.MapTypeId.HYBRID
	};

	// Instanciamos el mapa
	map = new google.maps.Map(document.getElementById("box_mapa"), mapOptions);

	// Ubicamos al usuario
	BuscarUbicacion();

});