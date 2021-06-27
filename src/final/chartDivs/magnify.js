import React, { useContext, useRef, useEffect } from "react";
import { AuthContext } from "../AuthContainer";
import useState from "react-usestateref";

import { magHighLow } from '../utils/utils'
 


export const Magnify = () => {
    const { magnifyStart, setMagnifyStart, magnifyStartRef } = useContext(AuthContext)
    const { magnifyHigh, setMagnifyHigh } = useContext(AuthContext);
    const { magnifyLow, setMagnifyLow } = useContext(AuthContext);
 
    const windowSize = 150
    const { x } = useContext(AuthContext)
    const zoomHeight = 300;
    const zoomWidth = 300;


    // const zoomCanvas = useRef(null);
    useEffect(() => {
        if (magnifyStart !== null){
            const zoom = document.getElementById('zoom')
            const zoomCtx = zoom.getContext('2d');
            const can = document.getElementById('main')
            zoomCtx.fillRect(0, 0, zoomWidth, zoomHeight);
            zoomCtx.drawImage(can, magnifyStartRef.current*x, magnifyHigh, windowSize*x, (magnifyLow-magnifyHigh), 0, 0, zoomWidth, zoomHeight);
            // zoomCtx.drawImage(can, magnifyStartRef.current, magHigh, windowSize*x, (magLow-magHigh), 0, 0, zoomWidth, zoomHeight);
    // zoomCtx.drawImage(can, start, 300, zoom.width, 200, 0,0, zoom.width, zoom.height);
        }
    }, [magnifyStart])

    // useEffect(() => {
    //     if (mainReady == true){
    //         const zoom = document.getElementById('zoom')
    //         const zoomCtx = zoomCanvas.current.getContext('2d');
    //         const can = document.getElementById('main')
    //         zoomCtx.fillRect(0, 0, zoomWidth, zoomHeight);
    //         zoomCtx.drawImage(can, magnifyStartRef.current, magHigh, windowSize*x, (magLow-magHigh), 0, 0, zoomWidth, zoomHeight);
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

