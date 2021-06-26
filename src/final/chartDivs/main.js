import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../AuthContainer";
import useState from "react-usestateref";

import { draw } from '../utils/draw';
import { windowHighLowPx, findHighLow } from '../utils/utils';

export const Main = () => {
    const { data } = useContext(AuthContext);
    const { tf } = useContext(AuthContext);
    const { mainDivWidth, setMainDivWidth } = useContext(AuthContext); 
    const { mainDivHeight } = useContext(AuthContext);
    const { x } = useContext(AuthContext);
    const mainCanvas = useRef(null);
    const { mainCtx, setMainCtx } = useContext(AuthContext);
    const { mainReady, setMainReady } = useContext(AuthContext);
    const { dateOffset } = useContext(AuthContext);
    const { priceOffset } = useContext(AuthContext);
    const { magnifyStart, setMagnifyStart, magnifyStartRef } = useContext(AuthContext)
    const { magnifyHigh, setMagnifyHigh } = useContext(AuthContext);
    const { magnifyLow, setMagnifyLow } = useContext(AuthContext);
    const windowSize = 150;

    //dateOffset, PriceOffset probably dont need to be a context and can be thrown inside of draw...I think
    useEffect(async() => {
        setMainReady(false)
        if (data.length !== 0) {
            const context2d = mainCanvas.current.getContext('2d');
            setMainCtx(context2d)
            setMainDivWidth((data.length * x)+priceOffset);
            setMainReady(true)
        }
    }, [data]);

    let mainHigh, 
        mainLow,
        mainDiff
    useEffect(async() => {
        if (mainCtx !== null && mainReady == true) {
            [mainHigh, mainLow, mainDiff] = await findHighLow(data)
            draw (data, mainDivHeight, mainDivWidth, tf, dateOffset, priceOffset, mainCtx, x, mainHigh, mainLow, mainDiff)

            setMagnifyStart(data.length-windowSize)
            updateMagnify()
        }
    }, [mainReady]);

    const updateMagnify = async () => {
        const [magnifyHigh, magnifyLow] = await windowHighLowPx(data, magnifyStartRef.current, windowSize, mainHigh, mainDiff)
        setMagnifyHigh(magnifyHigh)
        setMagnifyLow(magnifyLow)
    }



    return (
        <div className="chartAreaWrapper">
            <h1>sdklfj</h1>
            <h1>{mainDivWidth}</h1>
            <h1>{mainDivHeight}</h1> 
            <canvas id="main" ref={mainCanvas} width={mainDivWidth} height={mainDivHeight} ></canvas>
        </div>
    )
}


