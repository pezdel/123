import React, { useContext, useEffect } from "react";
import { AuthContext } from "./AuthContainer";
import useState from "react-usestateref";

import { Main } from './chartDivs/main';
// import { Magnify } from './chartDivs/magnify';
// import { Price } from './chartDivs/price';
// import { Date } from './chartDivs/date';

export const Chart = () => {
   

    // const [jump, setJump, jumpRef] = useState(0);
    // const [isDrawing, setIsDrawing] = useState(false);
    // const [startX, setStartX, startXRef] = useState(0);

    // const startDrawing = ({ nativeEvent }) => {
    //     const { offsetX, offsetY } = nativeEvent;
    //     setStartX(offsetX);
    //     setIsDrawing(true);
    // };
    // const isDraw = ({ nativeEvent }) => {
    //     if (!isDrawing) {
    //         return;
    //     }
    //     const { offsetX, offsetY } = nativeEvent;
    //     setJump(Math.ceil(offsetX - startXRef.current));

    //     if (
    //         startCordRef.current - jumpRef.current > 0 &&
    //         startCordRef.current - jumpRef.current < divWidth - windowSize * 4
    //     ) {
    //         setStartCord(startCordRef.current - jumpRef.current);
    //         magnify(
    //             data,
    //             startCordRef.current,
    //             windowSize,
    //             fullDiff,
    //             fullHighRef.current,
    //             x,
    //             zoomHeight,
    //             zoomWidth
    //         );
    //         setStartX(offsetX);
    //     }
    // };
    // const finishDrawing = () => {
    //     setIsDrawing(false);
    // };

    return (
        <div className="chartWrapper">
            <Main />
        </div>
    );
};

//            <Price />
//            <Date />
            // <Magnify />



