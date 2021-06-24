import React, { useContext } from "react";
import { AuthContext } from "../AuthContainer";
import useState from "react-usestateref";



export const Date = () =>{
    
    const can = document.getElementById("main"),
        ctx = can.getContext("2d"),
        zoom = document.getElementById("date"),
        zoomCtx = zoom.getContext("2d");
    zoomCtx.fillRect(0, 0, zoom.width, zoom.height);
    zoomCtx.drawImage(can, start, 300, zoom.width, 200, 0,0, zoom.width, zoom.height);
    // zoomCtx.drawImage(can, start, windowHigh, windowSize*x, (windowLow-windowHigh), 0, 0, zoomWidth, zoomHeight);

    return (
        <div>

            <canvas id="date" width={zoomWidth} height={200}></canvas>
        </div>
    )
}
// start, dateOffset
