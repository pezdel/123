import React from "react";

//so for this one...With plot I need to plug it into the div
//which will hold the chart.

export function Draw(plot) {
  var can = document.getElementById("can"),
    ctx = can.getContext("2d")
  
  ctx.clearRect(0, 0, 700, 500);
  // ctx.beginPath()
  // ctx.moveTo(0,0)
  // ctx.lineTo(300,150)
  // ctx.stroke()
  var x = 10,
    ctxTemp_width = can.width,
    ctxTemp_height = can.height;
  plot.forEach((el) => {
    if (el.open > el.close) {
      ctx.strokeStyle = "green";
    } else {
      ctx.strokeStyle = "red";
    }
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.moveTo(x, el.high);
    ctx.lineTo(x, el.low);
    ctx.stroke();


    ctx.beginPath()
    ctx.lineWidth =3
    ctx.moveTo(x, el.open)
    ctx.lineTo(x, el.close)
    ctx.stroke()
    x+=4


  });

  return (
    <div>
    </div>
  );
}
