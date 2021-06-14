export const draw = (data, length) =>{
 const can = document.getElementById("main"),
    ctx = can.getContext("2d");
    
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
 
   
  
  console.log("klsjdf")
}
// export function drawNOPE(plot) {
 
//   let x = 10;
//   // ctx.beginPath()
//   // ctx.moveTo(0,0)
//   // ctx.lineTo(300,150)
//   // ctx.stroke()
 
//   return (
//     <div>
//     </div>
//   );
// }

