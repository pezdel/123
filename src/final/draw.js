const getCanvas = ()=>{
const can = document.getElementById("main"),
  ctx = can.getContext("2d"),
  zoom = document.getElementById('zoom'),
  zoomCtx = zoom.getContext('2d');
}
export const tests = (oldX)=>{
  const can = document.getElementById("main"),
  ctx = can.getContext("2d"),
  zoom = document.getElementById('zoom'),
  zoomCtx = zoom.getContext('2d');

  zoomCtx.fillRect(0,0, zoom.width, zoom.height)
  zoomCtx.drawImage(can, oldX, 0, 400, 400, 0, 0, 400, 200)
    
}

export const magnify = () =>{
  const can = document.getElementById("main"),
  ctx = can.getContext("2d"),
  zoom = document.getElementById('zoom'),
  zoomCtx = zoom.getContext('2d');

  zoomCtx.fillRect(0,0, zoom.width, zoom.height)
  zoomCtx.drawImage(can, 60, 0, 460, 400, 0, 0, 400, 200)
  //zoom.style.top = 0 + 10 + "px"
  //zoom.style.left = 0 + 10 + "px"
  //zoom.style.display = "block";  
} 

export const draw = async(data, length) =>{
  const can = document.getElementById("main"),
  ctx = can.getContext("2d"),
  zoom = document.getElementById('zoom'),
  zoomCtx = zoom.getContext('2d');
  
  ctx.clearRect(0, 0, length, 500);
	let x = 10;

  data.forEach((el) => {
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
  
}
