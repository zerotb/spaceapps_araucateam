//objetos
var padInfo;
var operational;
var xml;

var listadoAntenas = [];

// Inicializamos el punto de origen (Technical Building)
var base = new Object();
    base["Antenna"] = "base";
    base["Latitude"] = -23.02336414219032;
    base["Longitude"] = -67.75367796421051;
    base["Height"] = 5074.88584582601;



// Procesamos el texto plano, convirtiéndolo a objeto
function processData(allText) {
   
   var allTextLines = allText.split(/\r\n|\n/);
   var headers = allTextLines[0].split(',');

   for (var i=1; i<allTextLines.length; i++) {
       var data = allTextLines[i].split(',');
       if (data.length == headers.length) {

           var antena = new Object();

           for (var j=0; j<headers.length; j++) {

               if(data[0] != ""){
                   antena[headers[j]]=+""+data[j];
               } 

           }

           if(data[0] != ""){
               listadoAntenas.push(antena);
           }

       }
   }
   

}


var itemsDebug;
function getOperational(){

   $.ajax({
       type: "GET",
       url: "data/operational.xml",
       dataType: "xml",
       success: function(xml) {
         
           // Obtenemos los items "Debug" del XML 
           xmlDebug = $(xml).find("Debug");

           // Filtramos aquellos que el id corresponda al de una antena
           itemsDebug = $(xmlDebug).filter(function(){

               // Si el string que identifica la antena está en el atributo "SourceObject"
               if($(this).attr('SourceObject').indexOf("CM05") >= 0)
                 return this;
           });

           //console.log(itemsDebug);

           $.each(itemsDebug, function(i, item){
             //console.log(item.);
           });

       },
       error: function (xhr, ajaxOptions, thrownError) {
           console.log(xhr.status);
           console.log(thrownError);
       }
   });
   return true;
}


//ajax para obtener archvio CSV
function getPadInfo(){
   $.ajax({
       type: "POST",
       url: "data/PadInfo.csv",
       dataType: "text",
       success: function(data) {
           
           processData(data);
       }
   });
}

function getOperational(){
   $.ajax({
       type: "GET",
       url: "data/operational.xml",
       dataType: "xml",
       success: function(data) {
           xml = data.find("Log");
       }
   });
}