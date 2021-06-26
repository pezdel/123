import React, { useContext, useRef, useEffect } from "react";
import { AuthContext } from "../AuthContainer";
import useState from "react-usestateref";

import { magHighLow } from '../utils/utils'
 


export const Magnify = () => {
    const { mainReady } = useContext(AuthContext);
    const { magHigh } = useContext(AuthContext);
    const { magLow } = useContext(AuthContext);
    const { mainCtx } = useContext(AuthContext);
    const { magnifyStart, setMagnifyStart, magnifyStartRef } = useContext(AuthContext)
    const windowSize = 150
    const { x } = useContext(AuthContext)
    const zoomHeight = 500;
    const zoomWidth =500;


    const zoomCanvas = useRef(null);
    useEffect(() => {
        if (mainReady == true){
            const zoomCtx = zoomCanvas.current.getContext('2d');
            const can = document.getElementById('main')
            console.log(can)
            zoomCtx.fillRect(0, 0, zoomWidth, zoomHeight);
            zoomCtx.drawImage(can, magnifyStartRef.current, magHigh, windowSize*x, (magLow-magHigh), 0, 0, zoomWidth, zoomHeight);
        }
    }, [mainReady])

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
            ref={zoomCanvas}
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

