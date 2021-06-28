import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../AuthContainer";
import useState from "react-usestateref";

import { draw } from '../utils/draw';
import { mainCanvas } from '../utils/canvas';
import { mainDivHeight } from '../utils/const';

export const Main = () => {
    const { data } = useContext(AuthContext);
    const { tf } = useContext(AuthContext);
    const { mainDivWidth } = useContext(AuthContext);
    const { mainReady } = useContext(AuthContext);
    const { mainHigh } = useContext(AuthContext);
    const { mainLow } = useContext(AuthContext);
    const { mainDiff } = useContext(AuthContext);
    const { setMagReady } = useContext(AuthContext);

    useEffect(async() => {
        setMagReady(false)
        if (mainReady == true) {
            const mainCtx = mainCanvas()
            draw (data, mainDivWidth, tf, mainCtx, mainHigh, mainLow, mainDiff)
            setMagReady(true)
        }
    }, [mainReady]);


    return (
        <div className="chartAreaWrapper">
            <h1>{mainDivWidth}</h1>
            <h1>{mainDivHeight}</h1> 
            <canvas id="main"  width={mainDivWidth} height={mainDivHeight} ></canvas>
        </div>
    )
}

// setMainReady(true)
// setMainReady(false)

