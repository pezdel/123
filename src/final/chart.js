import React, { useContext, useEffect } from "react";
import { AuthContext } from "./AuthContainer";
import useState from "react-usestateref";

import { x, windowSize, priceOffset, chartWidth, chartHeight } from './utils/const';
import { findHighLow } from './utils/utils';

import { Main } from './chartDivs/main';
import { Magnify } from './chartDivs/magnify';
import { Price } from './chartDivs/price';
import { Date } from './chartDivs/date';

export const Chart = () => {
    const { data } = useContext(AuthContext);
    const { setMainDivWidth } = useContext(AuthContext);

    const { setMagnifyStart, magnifyStartRef } = useContext(AuthContext)
    const { setMainReady } = useContext(AuthContext);

    const { setMainHigh } = useContext(AuthContext);
    const { setMainLow } = useContext(AuthContext);
    const { setMainDiff } = useContext(AuthContext);

    useEffect(async() => {
        setMainReady(false)
        if (data.length !== 0) {
            const [mainHigh, mainLow, mainDiff] = findHighLow(data)
            setMagnifyStart(data.length-windowSize)
            setMainDivWidth((data.length * x)+priceOffset);
            setMainHigh(mainHigh)
            setMainLow(mainLow)
            setMainDiff(mainDiff)
            setMainReady(true)  
        }
    }, [data]);

    return (
        <div className="randomWrapper">
            <Main />
            <div className="chartWrapper">
                <Magnify />
                <Price />
                <Date />
            </div>
        </div>
    );
};


