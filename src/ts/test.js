import React, { useContext, useEffect } from "react";
import useState from "react-usestateref";
import { AuthContext } from "./AuthContainer";

export const testChart = (plot) =>{
  var main = document.getElementById("main");
var zoom = document.getElementById("zoom");
var ctx = main.getContext("2d")
var zoomCtx = zoom.getContext("2d");
run(plot)
// var img = new Image();
// img.src = "http://astrobioloblog.files.wordpress.com/2011/10/duck-1.jpg"
// img.onload = run;

function run(plot){
//with scaled plot, we need to draw it ...it has negitaves tho..
    //ctx.drawImage(0,0,0);
    console.log(plot)
    ctx.clearRect(0,0,500, 500)
    let x=10;
    let test = 1;
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

      ctx.beginPath();
      ctx.lineWidth = 3;
      ctx.moveTo(x, el.open);
      ctx.lineTo(x, el.close);
      ctx.stroke();
      x += 4;
      test +=1  
    });
    console.log(test)
}

main.addEventListener("mousemove", function(e){
    //console.log(e);
    zoomCtx.fillStyle = "white";
    //zoomCtx.clearRect(0,0, zoom.width, zoom.height);
    //zoomCtx.fillStyle = "transparent";
    zoomCtx.fillRect(0,0, zoom.width, zoom.height);
    zoomCtx.drawImage(main, e.x, e.y, 200, 100, 0,0, 400, 200);
    console.log(zoom.style);
    zoom.style.top = e.pageY + 10 + "px"
    zoom.style.left = e.pageX + 10 + "px"
    zoom.style.display = "block";
});

main.addEventListener("mouseout", function(){
    zoom.style.display = "none";
});
 
 
  return(
<div>

</div>)
}