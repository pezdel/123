import React, { useContext, useRef, useEffect } from "react";
import { AuthContext } from "../AuthContainer";
import useState from "react-usestateref";

import { x, windowSize, zoomHeight, zoomWidth } from '../utils/const';
 

export const Magnify = () => {
    const { magnifyStart, magnifyStartRef } = useContext(AuthContext)
    const { magnifyHigh } = useContext(AuthContext);
    const { magnifyLow } = useContext(AuthContext);


    const test = () => {
        const zoom = document.getElementById('zoom')
        const zoomCtx = zoom.getContext('2d');
        const can = document.getElementById('main')
        return  [can, zoomCtx]
    }

    useEffect(() => {
        if (magnifyStart !== null){
            const [can, zoomCtx] = test()
            zoomCtx.fillRect(0, 0, zoomWidth, zoomHeight);
            zoomCtx.drawImage(can, magnifyStartRef.current*x, magnifyHigh, windowSize*x, (magnifyLow-magnifyHigh), 0, 0, zoomWidth, zoomHeight);
        }
    }, [magnifyStart])

    // useEffect(() => {
    //     if (mainReady == true){
    //     }
    // }, [jump])



    return(
        <div className="zoomWrapper">
            <canvas
            id="zoom"
            width={zoomWidth}
            height={zoomHeight}
        ></canvas>
    </div>
    )};

// onMouseDown={startDrawing}
// onMouseUp={finishDrawing}
// onMouseMove={isDraw}


// const actualStart = Math.ceil(magnifyStart/spaceX)
// zoomCtx.drawImage(mainCtx, magnifyStartRef.current, windowHigh, windowSize*x, (windowLow-windowHigh), 0, 0, zoomWidth, zoomHeight);
// zoomCtx.drawImage(can, magnifyStartRef.current, magHigh, windowSize*x, (magLow-magHigh), 0, 0, zoomWidth, zoomHeight);
            // zoomCtx.drawImage(can, start, 300, zoom.width, 200, 0,0, zoom.width, zoom.height);

