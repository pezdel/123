import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../AuthContainer";
import useState from "react-usestateref";

import { findHighLow } from "../utils/utils";
import { scale } from '../utils/utils';
import { draw } from '../utils/draw';

export const Main = () => {
    const { mainDivWidth, mainDivWidthRef } = useContext(AuthContext);
    const { mainDivHeight } = useContext(AuthContext);

    const { data } = useContext(AuthContext);
    const { setMainDiff, mainDiffRef } = useContext(AuthContext);
    const { setMainHigh, mainHighRef } = useContext(AuthContext);
    const { setMainLow, mainLowRef } = useContext(AuthContext);

    const { tfRef } = useContext(AuthContext);
    const { dateOffset } = useContext(AuthContext);
    const { priceOffset } = useContext(AuthContext)

    //in two weeks I hope to have chart 100% done...
    //dashboard done--snipit, snipitmodal
    //maybe wait page updated?
    //return page layout but missing correct links
       useEffect(async () => {
        if (data.length !== 0) {
            const [high, low, diff] = await findHighLow(data)
            setMainHigh(high)
            setMainLow(low)
            setMainDiff(diff)

            const scaled = await scale(data, mainHighRef.current, mainDiffRef.current, mainDivHeight-dateOffset)     

            // draw(await scaled, 
            //     mainHighRef.current,
            //     mainLowRef.current,
            //     mainDiffRef.current,
            //     10,
            //     mainDivHeight,
            //     mainDivWidthRef.current,
            //     tfRef.current,
            //     dateOffset,
            //     priceOffset,
            //     mainCtx,
            // )
        }
    }, [data]);

    const mainCanvas = useRef(null);
    // const [ mainCtx, setMainCtx ] = useState(null);
    const { mainCtx, setMainCtx } = useContext(AuthContext)

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
