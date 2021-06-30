import React, { useContext, useRef, useEffect } from "react";
import { AuthContext } from "../AuthContainer";
import useState from "react-usestateref";

import { x, windowSize, mainDivHeight, dateOffset, backgroundColor } from '../utils/const';
import { magnifyCanvas } from '../utils/canvas'; 
import { windowHighLowPx } from '../utils/utils';
 

export const Magnify = () => {
    const { data } =useContext(AuthContext);
    const { magReady } = useContext(AuthContext);
    const { magnifyStart, setMagnifyStart, magnifyStartRef } = useContext(AuthContext)
    const { setMagnifyHigh, magnifyHighRef } = useContext(AuthContext);
    const { setMagnifyLow, magnifyLowRef } = useContext(AuthContext);
    const { mainHigh } = useContext(AuthContext);
    const { mainDiff } = useContext(AuthContext);
    const [ zoomHeight, setZoomHeight, zoomHeightRef ] = useState(500);
    const [ zoomWidth, setZoomWidth, zoomWidthRef ] = useState(500);


    const drawZoom = (can, zoomCtx) => {
        zoomCtx.fillStyle = backgroundColor 
        zoomCtx.clearRect(0, 0, zoomWidthRef.current, zoomHeightRef.current);
        zoomCtx.fillRect(0, 0, zoomWidthRef.current, zoomHeightRef.current);
        zoomCtx.drawImage(can, 
            magnifyStartRef.current*x, 
            (magnifyHighRef.current-dateOffset/5), 
            windowSize*x, 
            (magnifyLowRef.current-magnifyHighRef.current), 
            0, 0, zoomWidthRef.current, zoomHeightRef.current);
    }

    const updateMagnify = async () => {
        const [magHigh, magLow] = await windowHighLowPx(data, magnifyStartRef.current, windowSize, mainHigh, mainDiff, mainDivHeight-dateOffset )
        setMagnifyHigh(magHigh)
        setMagnifyLow(magLow)
    }

    useEffect(async () => {
        if (magReady== true){
            console.log(data)
            updateMagnify()
            const [can, magnifyAxis, magnifyCtx] = magnifyCanvas()

            setZoomWidth(magnifyAxis.parentNode.clientWidth)
            setZoomHeight(magnifyAxis.parentNode.clientHeight)
            drawZoom(await can, await magnifyCtx)
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
        <div className="magnifyWrapper">
            <canvas
            id="magnify"
            width={zoomWidth}
            height={zoomHeight}
            onMouseDown={startDrawing}
            onMouseUp={finishDrawing}
            onMouseMove={isDraw}
        ></canvas>
    </div>
    )};


//when you adjust chartsize, it should semi adjust window size?
//
