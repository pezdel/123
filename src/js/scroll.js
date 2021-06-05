var canvas = document.getElementById("can");
var ctx = canvas.getContext("2d");
var canvasTemp = document.getElementById("cantemp");
var ctxTemp = canvasTemp.getContext("2d");
var canvasOffset = $("#can").offset();
var offsetX = canvasOffset.left;
var offsetY = canvasOffset.top;
var startX;
var startY;
var isDown = false;
var dragStart = 0;
var dragEnd =0;

$("#cantemp").css({
    left: -500,
    top: 0
});


function rescale(actualDistance){
  var plot = [],
      high =0,
      low=0,
      scale=0;
    dragStart = orginalStart - actualDistance,
    dragEnd = orginalEnd - actualDistance
  //  console.log("fullplot: " +fullplot.length)
  // console.log("dragStart: "+dragStart+" dragEnd: "+dragEnd)
  // console.log("actualDistance: "+actualDistance)
  while (dragStart < dragEnd){ 
    if(fullplot[dragStart] == null){
      break
    }
    else{
      plot.push(fullplot[dragStart])
      dragStart +=1
    }
  }
  plot.forEach(el => {
    high = el.high > high ? el.high : high;
    low = !low || el.low < low ? el.low : low;
});
scale = high - low;
//console.log("scale: "+scale+" High: "+high+" low: "+low)
var spaceTop = scale / 100,  
    spaceBot = 2;
plot = plot.map(el => {
    return {
    low: (100 - (scale - (high - el.low)) / spaceTop) * spaceBot, 
    high: (100 - (scale - (high - el.high)) / spaceTop) * spaceBot,
    open: (100 - (scale - (high - el.open)) / spaceTop) * spaceBot,
    close: (100 - (scale - (high - el.close)) / spaceTop) * spaceBot,
    date: el.date
    };
  });
  
  return plot  
}











function handleMouseDown(e) {
    e.preventDefault();
    mouseX = parseInt(e.clientX - offsetX);
    mouseY = parseInt(e.clientY - offsetY);
    startX = mouseX;
    startY = mouseY;
    $("#cantemp").css({
        left: 0,
        top: 0
    });
    isDown = true;
}

function handleMouseUp(e) {
    e.preventDefault();
    if (!isDown) {
        return;
    }
    isDown = false;

    mouseX = parseInt(e.clientX - offsetX);
    mouseY = parseInt(e.clientY - offsetY);
    $("#cantemp").css({
        left: -500,
        top: 0
    });
    
    var actualDistance = Math.ceil((mouseX-startX)/3.95)
    ctxTemp.clearRect(0, 0, canvasTemp.width, canvasTemp.height);
    scale = rescale(actualDistance);
    draw(scale)
    orginalStart = orginalStart - actualDistance
    orginalEnd = orginalEnd - actualDistance
}

function handleMouseMove(e) {
    e.preventDefault();
    if (!isDown) {
        return;
    }
    mouseX = parseInt(e.clientX - offsetX);
    mouseY = parseInt(e.clientY - offsetY);
    var actualDistance = Math.ceil((mouseX-startX)/3.95)
    ctxTemp.clearRect(0, 0, canvasTemp.width, canvasTemp.height);
    scale = rescale(actualDistance);
    draw(scale)
}

$("#can").mousedown(function (e) {
    handleMouseDown(e);
});
$("#can").mousemove(function (e) {
    handleMouseMove(e);
});
$("#can").mouseup(function (e) {
    handleMouseUp(e);
});
$("#can").mouseout(function (e) {
    handleMouseUp(e);
});