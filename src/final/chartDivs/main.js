import React, { useContext } from "react";
import { AuthContext } from "../AuthContainer";
import useState from "react-usestateref";

import { scale } from '../utils/utils';
import { draw } from '../utils/draw';

export const Main = () =>{
    const { mainDivWidth } = useContext(AuthContext);
    const { mainDivHeight } = useContext(AuthContext);

    const { data } = useContext(AuthContext);
    const { mainDiffRef } = useContext(AuthContext);
    const { mainHighRef } = useContext(AuthContext);
    const { mainLowRef } = useContext(AuthContext);

    const { tf } = useContext(AuthContext);
    const { dateOffset } = useContext(AuthContext);
    const { priceOffset } = useContext(AuthContext)

   

    const fillMainChart = async() => {
        const scaled = scale(data, mainHighRef.current, mainDiffRef.current, mainDivHeight)
        draw(await scaled, 
            mainHighRef.current,
            mainLowRef.current,
            mainDiffRef.current,
            10,
            mainDivHeight,
            mainDivWidth,
            tf,
            dateOffset,
            priceOffset
        )
    } 
    fillMainChart()
    return (
        <div className="chartAreaWrapper">
            <h1>sdklfj</h1>
            <h1>{mainDivWidth}</h1>
            <h1>{mainDivHeight}</h1> 
            <canvas id="main" width={mainDivWidth} height={mainDivHeight}></canvas>
        </div>
    )
}
