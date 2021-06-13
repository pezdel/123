import { drawAxis } from './drawAxis'


export function draw(plot) {
  const can = document.getElementById("can"),
    ctx = can.getContext("2d");
  const ctxTemp_height = can.height,
    ctxTemp_width = can.width;
  ctx.clearRect(0, 0, 700, 500);
  let x = 10;
  // ctx.beginPath()
  // ctx.moveTo(0,0)
  // ctx.lineTo(300,150)
  // ctx.stroke()
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
