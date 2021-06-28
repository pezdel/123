import React, { useContext, useEffect } from "react";
import { AuthContext } from "../AuthContainer";
import useState from "react-usestateref";

import { priceHeight, priceWidth, priceOffset, x } from '../utils/const';
import { priceCanvas } from '../utils/canvas';

export const Price = () => {
    const { magReady } = useContext(AuthContext);
    const { mainDivWidth } = useContext(AuthContext);
    const { magnifyHighRef } = useContext(AuthContext);
    const { magnifyLowRef } = useContext(AuthContext);

    const drawZoom = (can, priceCtx) => {
        priceCtx.fillRect(0, 0, priceWidth, priceHeight);
        priceCtx.drawImage(can, mainDivWidth-priceOffset, magnifyHighRef.current, priceWidth, (magnifyLowRef.current-magnifyHighRef.current), 0, 0, priceWidth, priceHeight);
    }

    useEffect(async () => {
        if (magReady== true){
            const [can, priceCtx] = priceCanvas()
            drawZoom(await can, await priceCtx)
        }
    }, [magReady, magnifyHighRef.current])



    return (
        <div className="priceWrapper">
            <canvas id="price" width={priceWidth} height={priceHeight}></canvas>
        </div>
    )
}
