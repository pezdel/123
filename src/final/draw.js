import { findHighLow } from './scale'



const dateAxis = (start) =>{
    const can = document.getElementById("main"),
        ctx = can.getContext("2d"),
        zoom = document.getElementById("date"),
        zoomCtx = zoom.getContext("2d");
    zoomCtx.fillRect(0, 0, zoom.width, zoom.height);
    zoomCtx.drawImage(can, start, 300, zoom.width, 200, 0,0, zoom.width, zoom.height);
    // zoomCtx.drawImage(can, start, windowHigh, windowSize*x, (windowLow-windowHigh), 0, 0, zoomWidth, zoomHeight);

}
const priceAxis = (high, low) => {
    const can = document.getElementById("main"),
        ctx = can.getContext("2d"),
        zoom = document.getElementById("price"),
        zoomCtx = zoom.getContext("2d");
    zoomCtx.fillStyle = 'red'
    zoomCtx.fillRect(0, 0, zoom.width, zoom.height);
    // zoomCtx.drawImage(can, start, windowHigh, windowSize*x, (windowLow-windowHigh), 0, 0, zoomWidth, zoomHeight);

}

export const magnify = async (
    data,
    start,
    windowSize,
    fullDiff,
    fullHigh, 
    x,
    zoomHeight,
    zoomWidth
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
    const windowLow = Math.ceil((100 - (fullDiff - (fullHigh - low)) / spaceTop) * spaceBot)
    const windowHigh = Math.ceil((100 - (fullDiff - (fullHigh - high)) / spaceTop) * spaceBot)
    const can = document.getElementById("main"),
        ctx = can.getContext("2d"),
        zoom = document.getElementById("zoom"),
        zoomCtx = zoom.getContext("2d");
    zoomCtx.fillRect(0, 0, zoom.width, zoom.height);
    zoomCtx.drawImage(can, start, windowHigh, windowSize*x, (windowLow-windowHigh), 0, 0, zoomWidth, zoomHeight);
    dateAxis(start)
    priceAxis(high, low)
};

export const draw = async (data, length, height) => {
    const can = document.getElementById("main"),
        ctx = can.getContext("2d"),
        zoom = document.getElementById("zoom"),
        zoomCtx = zoom.getContext("2d");


    ctx.clearRect(0, 0, length, height);
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
