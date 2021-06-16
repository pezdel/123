import { findHighLow } from './scale'

export const magnify = async (
  data,
  start,
  windowSize,
  fullDiff,
  fullHigh,
  fullLow
) => {
  let plot = [[]];
  const getPlot = async () => {
    for (let i = start; i < start + windowSize; i++) {
      plot.push(data[i]);
    }
    return plot;
  };
  const [high, low, diff] = await findHighLow(await getPlot());

  let spaceTop = fullDiff / 100,
    spaceBot = 4;
  const windowHigh =
    (100 - (fullDiff - (fullHigh - high)) / spaceTop) * spaceBot;
  const windowLow = 
    (100 - (fullDiff - (fullLow - low)) / spaceTop) * spaceBot;

  const can = document.getElementById("main"),
    ctx = can.getContext("2d"),
    zoom = document.getElementById("zoom"),
    zoomCtx = zoom.getContext("2d");
  
  console.log(windowLow);
  zoomCtx.fillRect(0, 0, zoom.width, zoom.height);
  //zoomCtx.drawImage(can, start here, 400, here, 0,0,400, 200)
  zoomCtx.drawImage(can, start, 0, 400, 400-windowHigh, 0, 0, 400, 200);

  //still left
  //something to figure out can height
 
  //boundries.
};

// export const magnify = (start) => {
//   const can = document.getElementById("main"),
//     ctx = can.getContext("2d"),
//     zoom = document.getElementById("zoom"),
//     zoomCtx = zoom.getContext("2d");

//   zoomCtx.fillRect(0, 0, zoom.width, zoom.height);
//   //zoomCtx.drawImage(can, start here, 400, here, 0,0,400, 200)
//   zoomCtx.drawImage(can, start, 0, 400, 500, 0, 0, 400, 200);
//   //zoom.style.top = 0 + 10 + "px"
//   //zoom.style.left = 0 + 10 + "px"
//   //zoom.style.display = "block";
// };

export const draw = async (data, length) => {
  const can = document.getElementById("main"),
    ctx = can.getContext("2d"),
    zoom = document.getElementById("zoom"),
    zoomCtx = zoom.getContext("2d");

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

    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.moveTo(x, el.open);
    ctx.lineTo(x, el.close);
    ctx.stroke();
    x += 4;
  });
};
