import React, { useContext, useEffect } from "react";
import { AuthContext } from "./AuthContainer";
import useState from "react-usestateref";

import { draw, magnify } from "./draw";
import { findHighLow, scale } from "./scale";
import { drawAxis } from "./drawAxis";

export const Chart = () => {
    const { data } = useContext(AuthContext);
    const { tf, setTF } = useContext(AuthContext);
    const [divWidth, setDivWidth, divWidthRef] = useState(500);
    const [divHeight, setDivHeight] = useState(500);
    const [startCord, setStartCord, startCordRef] = useState(0);
    const [fullHigh, setFullHigh, fullHighRef] = useState(0);
    const [fullLow, setFullLow, fullLowRef] = useState(0);
    const [fullDiff, setFullDiff, fullDiffRef] = useState(0);

    const zoomHeight = 700;
    const zoomWidth = 1200;
    const windowSize = Math.ceil(zoomWidth / 3);
    const x = 4;


    const setStuff = (high, low, diff) => {
        setDivWidth(data.length * x);
        setStartCord((data.length - windowSize) * 4);
        setFullHigh(high);
        setFullLow(low);
        setFullDiff(diff);
    };

    const renderMainChart = async () => {
        const [high, low, diff] = await findHighLow(data);
        setStuff(high, low, diff);
        const scaledData = await scale(
            data,
            fullHighRef.current,
            fullDiffRef.current,
            divHeight
        );
        draw(await scaledData, divWidth, divHeight);
        drawAxis(data, tf, fullHighRef.current, fullLowRef.current)
        magnify(
            data,
            0,
            windowSize,
            diff,
            fullHighRef.current,
            x,
            zoomHeight,
            zoomWidth
        );
    };

    useEffect(async () => {
        if (data.length !== 0) {
            renderMainChart();
        }
    }, [data]);

    const [jump, setJump, jumpRef] = useState(0);
    const [isDrawing, setIsDrawing] = useState(false);
    const [startX, setStartX, startXRef] = useState(0);

    const startDrawing = ({ nativeEvent }) => {
        const { offsetX, offsetY } = nativeEvent;
        setStartX(offsetX);
        setIsDrawing(true);
    };
    const isDraw = ({ nativeEvent }) => {
        if (!isDrawing) {
            return;
        }
        const { offsetX, offsetY } = nativeEvent;
        setJump(Math.ceil(offsetX - startXRef.current));

        if (
            startCordRef.current - jumpRef.current > 0 &&
            startCordRef.current - jumpRef.current < divWidth - windowSize * 4
        ) {
            setStartCord(startCordRef.current - jumpRef.current);
            magnify(
                data,
                startCordRef.current,
                windowSize,
                fullDiff,
                fullHighRef.current,
                x,
                zoomHeight,
                zoomWidth
            );
            setStartX(offsetX);
        }
    };
    const finishDrawing = () => {
        setIsDrawing(false);
    };

    return (
        <div className="chartWrapper">
        <div className="chartAreaWrapper">
        <h1 className="test">asdf</h1>
            <canvas id="main" width={divWidth} height={divHeight}></canvas>
        </div>
        <div className="zoomWrapper">
        <canvas
            id="zoom"
            width={zoomWidth}
            height={zoomHeight}
            onMouseDown={startDrawing}
            onMouseUp={finishDrawing}
            onMouseMove={isDraw}
        ></canvas>
            <canvas id="date" width={zoomWidth} height={200}></canvas>
            <canvas id="price" width={200} height={zoomHeight}></canvas>
        </div>
        </div>
        
    );
};

//once you have the markers from loop,
//where do you put the draw function?



