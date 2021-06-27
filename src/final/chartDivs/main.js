import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../AuthContainer";
import useState from "react-usestateref";

import { draw } from '../utils/draw';
import { windowHighLowPx, findHighLow } from '../utils/utils';
import { x, dateOffset, priceOffset, windowSize, mainDivHeight } from '../utils/const';

export const Main = () => {
    const { data } = useContext(AuthContext);
    const { tf } = useContext(AuthContext);
    const { mainDivWidth, setMainDivWidth } = useContext(AuthContext); 
    const { mainReady, setMainReady } = useContext(AuthContext);
    const { setMagnifyStart, magnifyStartRef } = useContext(AuthContext)
    const { setMagnifyHigh } = useContext(AuthContext);
    const { setMagnifyLow } = useContext(AuthContext);
    let mainHigh, 
        mainLow,
        mainDiff

    const updateMagnify = async () => {
        const [magHigh, magLow] = await windowHighLowPx(data, magnifyStartRef.current, windowSize, mainHigh, mainDiff, mainDivHeight )
        setMagnifyHigh(magHigh)
        setMagnifyLow(magLow)
    }


    //dateOffset, PriceOffset probably dont need to be a context and can be thrown inside of draw...I think
    useEffect(async() => {
        setMainReady(false)
        if (data.length !== 0) {
            setMainDivWidth((data.length * x)+priceOffset);
            setMagnifyStart(data.length-windowSize)
            setMainReady(true)
        }
    }, [data]);

    useEffect(async() => {
        if (mainReady == true) {
            const can = document.getElementById('main');
            const mainCtx = can.getContext('2d');
            [mainHigh, mainLow, mainDiff] = await findHighLow(data)
            draw (data, mainDivHeight, mainDivWidth, tf, dateOffset, priceOffset, mainCtx, x, mainHigh, mainLow, mainDiff)
            updateMagnify()
        }
    }, [mainReady]);



    return (
        <div className="chartAreaWrapper">
            <h1>sdklfj</h1>
            <h1>{mainDivWidth}</h1>
            <h1>{mainDivHeight}</h1> 
            <canvas id="main"  width={mainDivWidth} height={mainDivHeight} ></canvas>
        </div>
    )
}


