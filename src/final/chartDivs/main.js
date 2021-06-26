import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../AuthContainer";
import useState from "react-usestateref";

import { draw } from '../utils/draw';

export const Main = () => {
    const { data } = useContext(AuthContext);
    const { tf } = useContext(AuthContext);
    const { mainDivWidth, setMainDivWidth } = useContext(AuthContext); 
    const { mainDivHeight } = useContext(AuthContext);
    const { x } = useContext(AuthContext);
    const { dateOffset } = useContext(AuthContext);
    const { priceOffset } = useContext(AuthContext);
    const mainCanvas = useRef(null);
    const { mainCtx, setMainCtx } = useContext(AuthContext);
    const { mainReady, setMainReady } = useContext(AuthContext);


    //dateOffset, PriceOffset probably dont need to be a context and can be thrown inside of draw...I think
    useEffect(() => {
        setMainReady(false)
        if (data.length !== 0) {
            const context2d = mainCanvas.current.getContext('2d');
            setMainCtx(context2d)
            setMainDivWidth((data.length * x)+priceOffset);
            setMainReady(true)
        }
    }, [data]);

    useEffect(() => {
        if (mainCtx != null && mainReady == true) {
            draw (data, mainDivHeight, mainDivWidth, tf, dateOffset, priceOffset, mainCtx, x)
        }
    }, [mainReady]);

    
    return (
        <div className="chartAreaWrapper">
            <h1>sdklfj</h1>
            <h1>{mainDivWidth}</h1>
            <h1>{mainDivHeight}</h1> 
            <canvas id="main" ref={mainCanvas} width={mainDivWidth} height={mainDivHeight} ></canvas>
        </div>
    )
}


