var fullplot = [],
    orginalStart=0,
    orginalEnd=0
    tf =0;

//onLoad
$(document).ready(function(){
    $.getJSON($SCRIPT_ROOT + '/onLoad', 
    {},
    function(data, status){
        tf = "1h"
        fullplot = data.result
        windowSize = 170
        orginalStart = fullplot.length - windowSize
        orginalEnd = orginalStart + windowSize
        start = fullplot.length - windowSize 
        data = scaleAPI(fullplot, start, windowSize)
        draw(data)
    });
  });
  
//onClick
  $(document).ready(function(){
    $("input#sub").click(function(){
      var x = $("#currency option:selected").text()
      var y = $("#tf option:selected").text()
      $.getJSON($SCRIPT_ROOT + '/onClick', 
      {currency: x,
      tf: y},
      function(data, status){
        tf = y
        console.log(data.result)
        fullplot = data.result
        windowSize = 170
        start = fullplot.length - windowSize
        data = scaleAPI(fullplot, start, windowSize)
        draw(data)
      });
    });
  });