import React, { useContext, useEffect } from "react";
import { AuthContext } from "../AuthContainer";
import useState from "react-usestateref";

import { magHighLow } from '../utils/utils'
 


export const Magnify = () => {
    const { data } = useContext(AuthContext);
    const { magnifyStart, setMagnifyStart, magnifyStartRef } = useContext(AuthContext)
    const { mainReady } = useContext(AuthContext);
    const { magHigh } = useContext(AuthContext);
    const { magLow } = useContext(AuthContext);
    const { mainCtx } = useContext(AuthContext);

    const { x } = useContext(AuthContext)
    const windowSize = 150;

    useEffect( async ()=>{
        setMagnifyStart(data.length-windowSize)
        [magHigh, magLow] = magHighLow(data, magnifyStartRef.current, windowSize)
        setMagHigh(magHigh)
        setMagLow(magLow)
    }, [mainReady])


    const zoom = document.getElementById("zoom"),
        zoomCtx = zoom.getContext("2d");
    // const actualStart = Math.ceil(magnifyStart/spaceX)

     zoomCtx.fillRect(0, 0, zoom.width, zoom.height);
     // zoomCtx.drawImage(mainCtx, magnifyStartRef.current, windowHigh, windowSize*x, (windowLow-windowHigh), 0, 0, zoomWidth, zoomHeight);
     zoomCtx.drawImage(mainCtx, magnifyStartRef.current, magHigh, windowSize*x, (magLow-magHigh), 0, 0, zoomWidth, zoomHeight);
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



