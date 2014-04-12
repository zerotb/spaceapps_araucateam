//objetos
var padInfo;
var operational;

//archivo CSV transformado a objeto
function processData(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
    var headers = allTextLines[0].split(',');
    var lines = [];

    for (var i=1; i<allTextLines.length; i++) {
        var data = allTextLines[i].split(',');
        if (data.length == headers.length) {

            var tarr = [];
            for (var j=0; j<headers.length; j++) {
                tarr.push(headers[j]+":"+data[j]);
                
            }
            lines.push(tarr);
        }
    }
    

    padInfo = lines;
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
            console.log(data);
        }
    });
}