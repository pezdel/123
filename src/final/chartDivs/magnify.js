import React, { useContext, useEffect } from "react";
import { AuthContext } from "../AuthContainer";
import useState from "react-usestateref";

import { findHighLow, getPlot } from '../utils/utils'

export const Magnify = () => {
    // const { setMagnify, magnifyRef } = useContext(AuthContext)
    // const { spaceX } = useContext(AuthContext)

    // const actualStart = Math.ceil(magnifyRef.current/spaceX)
    // const [high, low, diff] = await findHighLow(await getPlot());

    // let spaceTop = fullDiff / 100,
    //     spaceBot = 4;
    // const windowLow = Math.ceil((100 - (fullDiff - (fullHigh - low)) / spaceTop) * spaceBot)
    // const windowHigh = Math.ceil((100 - (fullDiff - (fullHigh - high)) / spaceTop) * spaceBot)

    const { mainCtx, setMainCtx } = useContext(AuthContext)


   useEffect(() => {
        const zoom = document.getElementById("zoom"),
           zoomCtx = zoom.getContext("2d");
       console.log(mainCtx)

   }, [mainCtx]);


    // zoomCtx.fillRect(0, 0, zoom.width, zoom.height);
    // zoomCtx.drawImage(can, start, windowHigh, windowSize*x, (windowLow-windowHigh), 0, 0, zoomWidth, zoomHeight);
    return(
        <div className="zoomWrapper">
            <canvas
            id="zoom"
        ></canvas>
    </div>
    )};

// width={zoomWidth}
// height={zoomHeight}

// onMouseDown={startDrawing}
// onMouseUp={finishDrawing}
// onMouseMove={isDraw}



//so when the data loads and div is set...this fires and it should load the first position
//then when they move the mouse the window needs to update
//
//what is needed from main?...just the canvas id?
//
//what needs to be exported from zoom if anything?...4 params that are used to set window location? 2 for price magnify and 2 for date magnify


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
