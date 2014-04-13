function cargaLista(){
$.mobile.loading( "show" );
var salida = 
'<ul id="listaA" data-role="listview" data-filter="true" data-filter-placeholder="Buscar..." data-inset="true" class="box1">';
for(i=0; i<listadoAntenas.length; i++){

if(listadoAntenas[i].Antenna != "base")
{
salida +=
'<input type="checkbox" name="checkbox'+i+'" id="checkbox'+i+'" num="'+ i +'">'+
'<a  class="ui-btn ui-shadow ui-corner-all ui-icon-gear ui-btn-icon-right" style="float: right; width: 20%;" onclick="detalleAntena('+i+');">Hardware</a>'+
'<label for="checkbox'+i+'" data-inset="false" >'+ listadoAntenas[i].Antenna +'</label>';
}
}

salida += '</ul>';
$('#listaAntena').html(salida);
$.mobile.navigate( "#page2" );
$.mobile.loading( "hide" );

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

function detalleAntena(x){

var salida = 
'<ul data-role="listview">';

var estados = new Array();
estados["hwStart()."] = "Comenzado";
estados["hwStop()."] = "Detenido";
estados["hwInitialize()."] = "Inicializado";
estados["hwOperational()."] = "Operacional";
estados["hwConfigure()."] = "Configurado";
estados["Controller"] = "Estado de Controlador Seteado";

$.each(listadoAntenas[x].HW, function(i,item){
	console.log(item.name);
	salida += 
		'<li>'+
		item.name+" : "+estados[item.status]+
		'</li>';

})

salida += '</ul>';

$('#detalleAntena').html(salida);

$.mobile.navigate( "#dialogo" );
$('#dialogo').trigger('create');
}