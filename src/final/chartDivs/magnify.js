import React, { useContext, useEffect } from "react";
import { AuthContext } from "../AuthContainer";
import useState from "react-usestateref";

import { findHighLow, getPlot } from '../utils/utils'

export const Magnify = () => {
    const { magnifyStart, setMagnifyStart } = useContext(AuthContext)
    const { spaceX } = useContext(AuthContext)

    const { mainDiff } = useContext(AuthContext);
    const { mainHigh } = useContext(AuthContext);
    const { mainCtx } = useContext(AuthContext)

    const actualStart = Math.ceil(magnifyStart/spaceX)
    const { mainReady } = useContext(AuthContext);

    useEffect( async ()=>{
    const [magHigh, magLow ] = await findHighLow(await getPlot(data));
    magHighLow(mainDiff, mainHigh, await magLow, await magHigh)

    }, [mainReady])


    useEffect(() => {
        const zoom = document.getElementById("zoom"),
            zoomCtx = zoom.getContext("2d");
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



