import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../AuthContainer";
import useState from "react-usestateref";

import { draw } from '../utils/draw';
import { scale, findHighLow } from '../utils/utils';

export const Main = () => {
    const { data } = useContext(AuthContext);
    const { tf } = useContext(AuthContext);
    const { mainDivWidth, setMainDivWidth } = useContext(AuthContext); 
    const { mainDivHeight } = useContext(AuthContext);

    const { startX } = useContext(AuthContext);
    const { setMagnify } = useContext(AuthContext);
    const { mainDiff, setMainDiff } = useContext(AuthContext);
    const { mainHigh, setMainHigh } = useContext(AuthContext);
    const { mainLow, setMainLow } = useContext(AuthContext);
    const { dateOffset } = useContext(AuthContext);
    const { priceOffset } = useContext(AuthContext);

    const windowSize = 150;
    const { mainReady, setMainReady } = useContext(AuthContext);

    const mainCanvas = useRef(null);
    const { mainCtx, setMainCtx } = useContext(AuthContext);


    const setStuff = async() => {
        const [high, low, diff] = await findHighLow(data)
        setMainHigh(high)
        setMainLow(low)
        setMainDiff(diff)

        setMainDivWidth((data.length * startX)+priceOffset);
        setMagnify((data.length - windowSize) * startX);
        setMainReady(true) 
    }

    useEffect(async () => {
        setMainReady(false)
        if (data.length !== 0) {
            setStuff()
        }
    }, [data]);



    useEffect(async () => {
        if (mainCtx != null && mainReady == true) {
            const scaled = await scale(data, mainHigh, mainDiff, mainDivHeight-dateOffset)     
            draw(await scaled, 
                mainHigh,
                mainLow,
                mainDiff,
                10,
                mainDivHeight,
                mainDivWidth,
                tf,
                dateOffset,
                priceOffset,
                mainCtx,
            )
        }
    }, [mainCtx, mainReady]);


    useEffect(() => {
        const context2d = mainCanvas.current.getContext('2d');
        setMainCtx(context2d)
    }, [])

    return (
        <div className="chartAreaWrapper">
            <h1>sdklfj</h1>
            <h1>{mainDivWidth}</h1>
            <h1>{mainDivHeight}</h1> 
            <canvas id="main" ref={mainCanvas} width={mainDivWidth} height={mainDivHeight} ></canvas>
        </div>
    )
}
