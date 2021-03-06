var map;
var marcador = null;

$(document).ready(function() {
	
	getPadInfo();
	

	// Config del mapa
	var mapOptions = {
		// AOS Technical Building Geographic LAT LONG
		center: new google.maps.LatLng(-23.02336414219032, -67.75367796421051),
		zoom: 15,
		mapTypeId: google.maps.MapTypeId.HYBRID
	};

	// Instanciamos el mapa
	map = new google.maps.Map(document.getElementById("box_mapa"), mapOptions);

	// Ubicamos al usuario
	BuscarUbicacion();
	
	
	var latlng = new google.maps.LatLng(-23.02336414219032, -67.75367796421051);
    
	// Marcador
	var marcadorHome = 
	  new google.maps.Marker({
	    position: latlng,
	    map: map,
	    icon: "https://cdn1.iconfinder.com/data/icons/super-mono-reflection/blue/home_blue.png"
	  });


	/*
		stop
		start
		configure
		initialize
		operational

		--> si fallá, va a stop- y el ciclo pued iniciar nuevamente.
		128 megas de cada archivo
	*/

	
});

