import React, { useContext, useEffect } from "react";
import useState from "react-usestateref";
import { AuthContext } from "./AuthContainer";
import { scale } from "./scale";
import { draw } from "./draw";
import { drawAxis } from "./drawAxis";
import { testChart } from './test'
//import { drawPrice } from './drawPrice'

export function GetData() {
  let testSpot = 0;
  const { data, setData } = useContext(AuthContext);
  const { tfRef } = useContext(AuthContext);
  const { windowSize } = useContext(AuthContext);
  const { min, setMin } = useContext(AuthContext);
  const { max, setMax } = useContext(AuthContext);
  const { start, setStart, startRef } = useContext(AuthContext);
  const { jump, setJump, jumpRef } = useContext(AuthContext);

  useEffect(() => {
    if (data.length !== 0 && jumpRef.current > 1) {
      startDraw();
    }
  }, [jump]);

  useEffect(() => {
    if (data.length !== 0) {
      setJump(0);
      setStart(data.result.length - windowSize);
      setMax(data.result.length - windowSize);
      setMin(windowSize);
      drawPriceAxis();
      startDraw();
    } else {
      //ToDo...something if data doesnt get loaded (onLoad mainly)
    }
  }, [data]);

  const findHighLow = async (data) => {
    let high = 0,
      low;
    data.forEach((el) => {
      high = el.high > high ? el.high : high;
      low = !low || el.low < low ? el.low : low;
    });
    const diff = high-low
    return [high, low, diff];
  };

  const drawPriceAxis = async () => {
    const df = await findHighLow(data.result);
  };
  const setWindow = async () => {
    const testSpot = startRef.current - jumpRef.current;
    const plot = [];
    setStart(await checkBoundary(testSpot));
    for (let i = startRef.current; i < startRef.current + windowSize; i++) {
      plot.push(data.result[i]);
    }
    return plot;
  };

  const checkBoundary = async (testSpot) => {
    if (testSpot > min && testSpot < max) {
      return testSpot;
    } else {
      return startRef.current;
    }
  };

  const test = async (plot) => {
    return plot[0].date;
  };

  const startDraw = async () => {
    //with full JSON scale it so it can drawn into canvas
    const [high, low, diff] =await findHighLow(data.result)
    const scaled = await scale(data.result, diff, high)
    testChart(scaled)
   
   

   
   //var t0 = performance.now()
    //let plot = await setWindow();
    //let [high, low, diff] = findHighLow(await plot)
    //const x = await scale(plot, diff, high);
    //let compareDate = await test(plot);
    //draw(await x);
    //drawAxis(await x, tfRef.current, await compareDate);
    // drawPrice(await x)
    //var t1 = performance.now()
    //console.log("it took - "+(t1-t0)+" milliseconds")
  };

  return (
    <div className="chartWrapper">
      <div className="chartAreaWrapper">
        <canvas id="main" width={"2000"} height={"500"}></canvas>
      </div>
      <canvas id="zoom" width={"400"} height={"200"}></canvas>
    </div>
  );
}

//for loops
//--setwindow
//--scale (move high/low)
//--2 if's compareDate, check boundrie
//--draw main
//--draw price/date
