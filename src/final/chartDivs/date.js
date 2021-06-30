import React, { useContext, useEffect } from "react";
import { AuthContext } from "../AuthContainer";
import useState from "react-usestateref";

import { dateHeight, dateWidth, dateOffset, mainDivHeight, x, windowSize, backgroundColor } from '../utils/const';
import { dateCanvas } from '../utils/canvas';

export const Date = () =>{
    const { magReady } = useContext(AuthContext);
    const { magnifyStart, magnifyStartRef } = useContext(AuthContext);
    const { magnifyHighRef } = useContext(AuthContext);
    const { magnifyLowRef } = useContext(AuthContext);
    const [ dateWidth, setDateWidth, dateWidthRef ] = useState(100);
    const [ dateHeight, setDateHeight, dateHeightRef ] = useState(100);

    const drawZoom = (can, dateCtx) => {
        dateCtx.fillStyle = backgroundColor 
        dateCtx.clearRect(0, 0, dateWidthRef.current, dateHeightRef.current);
        dateCtx.fillRect(0, 0, dateWidthRef.current, dateHeightRef.current);
        dateCtx.drawImage(can, magnifyStartRef.current*x, mainDivHeight-50, windowSize*x, dateHeightRef.current, 0, 0, dateWidthRef.current, dateHeightRef.current);
        // zoomCtx.drawImage(can, magnifyStartRef.current*x, magnifyHighRef.current, windowSize*x, (magnifyLowRef.current-magnifyHighRef.current), 0, 0, zoomWidth, zoomHeight);
    }

    useEffect(async () => {
        if (magReady== true){
            const [can, dateAxis, dateCtx] = dateCanvas()
            setDateWidth(dateAxis.parentNode.clientWidth)
            setDateHeight(dateAxis.parentNode.clientHeight)
            drawZoom(await can, await dateCtx)
        
        }
    }, [magReady, magnifyStartRef.current])



    return (
        <div className="dateWrapper">
            <canvas id="date" width={dateWidthRef.current} height={dateHeightRef.current}></canvas>
        </div>
    )
}    

