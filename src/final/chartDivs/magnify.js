import React, { useContext, useRef, useEffect } from "react";
import { AuthContext } from "../AuthContainer";
import useState from "react-usestateref";

import { x, windowSize, zoomHeight, zoomWidth, mainDivHeight } from '../utils/const';
import { zoomCanvas } from '../utils/canvas'; 
import { windowHighLowPx } from '../utils/utils';
 

export const Magnify = () => {
    const { data } =useContext(AuthContext);
    const { magReady } = useContext(AuthContext);
    const { magnifyStart, setMagnifyStart, magnifyStartRef } = useContext(AuthContext)
    const { setMagnifyHigh, magnifyHighRef } = useContext(AuthContext);
    const { setMagnifyLow, magnifyLowRef } = useContext(AuthContext);
    const { mainHigh } = useContext(AuthContext);
    const { mainDiff } = useContext(AuthContext);
    // const { mainDivWidth } = useContext(AuthContext);


    const drawZoom = (can, zoomCtx) => {
        zoomCtx.fillRect(0, 0, zoomWidth, zoomHeight);
        zoomCtx.drawImage(can, magnifyStartRef.current*x, magnifyHighRef.current, windowSize*x, (magnifyLowRef.current-magnifyHighRef.current), 0, 0, zoomWidth, zoomHeight);
    }

    const updateMagnify = async () => {
        const [magHigh, magLow] = await windowHighLowPx(data, magnifyStartRef.current, windowSize, mainHigh, mainDiff, mainDivHeight )
        setMagnifyHigh(magHigh)
        setMagnifyLow(magLow)
    }

    useEffect(async () => {
        if (magReady== true){
            updateMagnify()
            const [can, zoomCtx] = zoomCanvas()
            drawZoom(await can, await zoomCtx)
        }
    }, [magReady, magnifyStartRef.current])





    const [jump, setJump, jumpRef] = useState(0);
    const [isDrawing, setIsDrawing] = useState(false);
    const [startX, setStartX, startXRef] = useState(0);

    const startDrawing = ({ nativeEvent }) => {
        const { offsetX, offsetY } = nativeEvent;
        setStartX(offsetX);
        setIsDrawing(true);
    };
    const isDraw = ({ nativeEvent }) => {
        if (!isDrawing) {return; }
        const { offsetX, offsetY } = nativeEvent;
        setJump(Math.ceil(offsetX - startXRef.current));
        if ( magnifyStartRef.current - jumpRef.current > 0 && magnifyStartRef.current - jumpRef.current < data.length - windowSize ) 
        {
            setMagnifyStart(magnifyStartRef.current - jumpRef.current);
            setStartX(offsetX);
        }
    };
    const finishDrawing = () => {
        setIsDrawing(false);
    }; 

    return(
        <div className="zoomWrapper">
            <canvas
            id="zoom"
            width={zoomWidth}
            height={zoomHeight}
            onMouseDown={startDrawing}
            onMouseUp={finishDrawing}
            onMouseMove={isDraw}
        ></canvas>
    </div>
    )};

