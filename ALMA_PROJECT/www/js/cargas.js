//objetos
var padInfo;
var operational;
var xml;

var listadoAntenas = [];


// Procesamos el texto plano, convirtiéndolo a objeto
function processData(allText) {
    
    var allTextLines = allText.split(/\r\n|\n/);
    var headers = allTextLines[0].split(',');

    for (var i=1; i<allTextLines.length; i++) {
        var data = allTextLines[i].split(',');
        if (data.length == headers.length) {

            var antena = new Object();

            for (var j=0; j<headers.length; j++) {
            	
            	antena[headers[j]]=+data[j];
                

            }
            
            listadoAntenas.push(antena);
        }
    }
    

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