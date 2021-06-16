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
  //if start > 0 and 
  const actualStart = Math.ceil(start/4)
  const getPlot = async () => {
    for (let i = actualStart; i < actualStart + windowSize; i++) {
      plot.push(data[i]);
    }
    return plot;
  };
  const [high, low, diff] = await findHighLow(await getPlot());

  let spaceTop = fullDiff / 100,
    spaceBot = 4;
  // const windowLow = Math.ceil(((low-fullLow)/fullDiff)*500)
  // const windowHigh = Math.ceil(((high - fullLow)/fullDiff)*500)
  const windowLow = Math.ceil((100 - (fullDiff - (fullHigh - low)) / spaceTop) * spaceBot)
  const windowHigh = Math.ceil((100 - (fullDiff - (fullHigh - high)) / spaceTop) * spaceBot)
  const can = document.getElementById("main"),
    ctx = can.getContext("2d"),
    zoom = document.getElementById("zoom"),
    zoomCtx = zoom.getContext("2d");
  
    
    console.log("WindowHigh " +windowHigh)
    console.log("WindowLow " +windowLow)
  zoomCtx.fillRect(0, 0, zoom.width, zoom.height);
  //zoomCtx.drawImage(can, start here, 400, here, 0,0,400, 200)
  const topGap = null
  const botGap = null
  zoomCtx.drawImage(can, start, windowHigh, 400, (windowLow-windowHigh), 0, 0, 300, 200);

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
