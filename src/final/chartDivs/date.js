import React, { useContext, useEffect } from "react";
import { AuthContext } from "../AuthContainer";
import useState from "react-usestateref";

import { dateHeight, dateWidth, dateOffset, mainDivHeight, x, windowSize } from '../utils/const';
import { dateCanvas } from '../utils/canvas';

export const Date = () =>{
    const { magReady } = useContext(AuthContext);
    const { magnifyStartRef } = useContext(AuthContext);
    const { magnifyHighRef } = useContext(AuthContext);
    const { magnifyLowRef } = useContext(AuthContext);

    const drawZoom = (can, dateCtx) => {
        dateCtx.fillRect(0, 0, dateWidth, dateHeight);
        dateCtx.drawImage(can, magnifyStartRef.current*x, 470, windowSize*x, dateHeight, 0, 0, dateWidth, dateHeight);
        // zoomCtx.drawImage(can, magnifyStartRef.current*x, magnifyHighRef.current, windowSize*x, (magnifyLowRef.current-magnifyHighRef.current), 0, 0, zoomWidth, zoomHeight);
    }

    useEffect(async () => {
        if (magReady== true){
            const [can, dateCtx] = dateCanvas()
            drawZoom(await can, await dateCtx)
        }
    }, [magReady, magnifyHighRef.current])



    return (
        <div className="dateWrapper">
            <h1> aklsdjf</h1>
            <canvas id="date" width={dateWidth} height={dateHeight}></canvas>
        </div>
    )
}    
    // const can = document.getElementById("main"),
    //     ctx = can.getContext("2d"),
    //     zoom = document.getElementById("date"),
    //     zoomCtx = zoom.getContext("2d");
    // zoomCtx.fillRect(0, 0, zoom.width, zoom.height);
    // zoomCtx.drawImage(can, start, 300, zoom.width, 200, 0,0, zoom.width, zoom.height);
    // // zoomCtx.drawImage(can, start, windowHigh, windowSize*x, (windowLow-windowHigh), 0, 0, zoomWidth, zoomHeight);

    // return (
    //     <div>

    //         <canvas id="date" width={zoomWidth} height={200}></canvas>
    //     </div>
    // )
// }
// start, dateOffset
