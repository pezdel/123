import React, { useContext } from "react";
import { AuthContext } from "../AuthContainer";
import useState from "react-usestateref";




export const Price = () => {
    const can = document.getElementById("main"),
        ctx = can.getContext("2d"),
        zoom = document.getElementById("price"),
        zoomCtx = zoom.getContext("2d");
    zoomCtx.fillStyle = 'red'
    zoomCtx.fillRect(0, 0, zoom.width, zoom.height);
    // zoomCtx.drawImage(can, start, windowHigh, windowSize*x, (windowLow-windowHigh), 0, 0, zoomWidth, zoomHeight);

    return (
        <div>
            <canvas id="price" width={200} height={zoomHeight}></canvas>
        </div>
    )
}
// high, low, priceOffset
