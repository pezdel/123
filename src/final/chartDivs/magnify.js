import React, { useContext } from "react";
import { AuthContext } from "../AuthContainer";
import useState from "react-usestateref";

import { findHighLow } from '../utils/scale'

const getPlot = async () => {
    let plot = [[]];
    for (let i = actualStart; i < actualStart + windowSize; i++) {
        plot.push(data[i]);
    }
    return plot;
};


export const Magnify = async() => {
    const { setMagnify, magnifyRef } = useContext(AuthContext)
    const { spaceX } = useContext(AuthContext)

    const actualStart = Math.ceil(magnifyRef.current/spaceX)
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
    return(
        <div className="zoomWrapper">
            <canvas
            id="zoom"
            width={zoomWidth}
            height={zoomHeight}
            onMouseDown={startDrawing}
            onMouseUp={finishDrawing}
            onMouseMove={isDraw}
        ></canvas>
    </div>
    )};

// data,
// start,
// windowsize,
// fulldiff,
// fullhigh, 
// x,
// zoomHeight,
// zoomWidth,
// dateOffset,
// priceOffset
