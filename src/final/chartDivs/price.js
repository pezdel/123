import React, { useContext, useEffect } from "react";
import { AuthContext } from "../AuthContainer";
import useState from "react-usestateref";

import { priceOffset, dateOffset, backgroundColor } from '../utils/const';
import { priceCanvas } from '../utils/canvas';

export const Price = () => {
    const { magReady } = useContext(AuthContext);
    const { magnifyStartRef } = useContext(AuthContext)
    const { mainDivWidth } = useContext(AuthContext);
    const { magnifyHighRef } = useContext(AuthContext);
    const { magnifyLowRef } = useContext(AuthContext);
    const [ priceWidth, setPriceWidth, priceWidthRef ] = useState(100);
    const [ priceHeight, setPriceHeight, priceHeightRef ] = useState(100);

    const drawZoom = (can, priceCtx) => {
        priceCtx.fillStyle = backgroundColor 
        priceCtx.clearRect(0, 0, priceWidthRef.current, priceHeightRef.current);
        priceCtx.fillRect(0, 0, priceWidthRef.current, priceHeightRef.current);
        priceCtx.drawImage(can, 
            mainDivWidth-priceOffset, 
            (magnifyHighRef.current-dateOffset/5), 
            priceWidthRef.current, 
            (magnifyLowRef.current-magnifyHighRef.current), 
            0, 0, priceWidthRef.current, priceHeightRef.current);
    }

    useEffect(async () => {
        if (magReady== true){
            const [can, priceAxis, priceCtx] = priceCanvas()
            setPriceWidth(priceAxis.parentNode.clientWidth)
            setPriceHeight(priceAxis.parentNode.clientHeight)
            drawZoom(await can, await priceCtx)
        }
    }, [magReady, magnifyStartRef.current])



    return (
        <div className="priceWrapper">
            <canvas id="price" width={priceWidthRef.current} height={priceHeightRef.current}></canvas>
        </div>
    )
}
