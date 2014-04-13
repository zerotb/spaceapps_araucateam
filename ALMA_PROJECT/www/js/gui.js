

function cargaLista(){
	$.mobile.loading( "show" );
	var salida = 
		'<ul id="listaA" data-role="listview" data-filter="true" data-filter-placeholder="Buscar..." data-inset="true">';
		for(i=0; i<listadoAntenas.length; i++){

			if(listadoAntenas[i].Antenna != "base")
			{
				salida +=
					'<input type="checkbox" name="checkbox'+i+'" id="checkbox'+i+'" num="'+ i +'">'+
					'<label for="checkbox'+i+'" data-inset="false" >'+ listadoAntenas[i].Antenna +'</label>';
			}
		}

	salida += '</ul>';
	$('#listaAntena').html(salida);
	$.mobile.navigate( "#page2" );
	$.mobile.loading( "hide" );
	$("#page2").page();

	$('#page2').trigger('create');

}



function obtenerPuntos(){
	var x=0;
	for(i=0; i<listadoAntenas.length; i++){
		//console.log( $('#checkbox'+i).attr('data-cacheval') );

		if( $('#checkbox'+i).attr('data-cacheval') == "false" ){
			var n = parseInt($('#checkbox'+i).attr('num'))
			checkList.push(listadoAntenas[n]);
			x++;	
		}
		
	}

	if(checkList.length >= 2){
		MenorDistancia(base, checkList, true);
		$.mobile.navigate( "#home" );
	}
	else{
		alert("Debe al menos exitir una antena seleccionada");
	}
	
}