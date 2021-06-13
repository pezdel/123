import React, { useContext, useEffect } from "react";
import useState from "react-usestateref";
import { AuthContext } from "./AuthContainer";
import { scale } from "./scale";
import { draw } from "./draw";
import { drawAxis } from './drawAxis'
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
    if (data.length !== 0) {
      startDraw();
    }
  }, [jump]);

  useEffect(() => {
    if (data.length !== 0) {
      setJump(0);
      setStart(data.result.length - windowSize);
      setMax(data.result.length - windowSize);
      setMin(windowSize);
      startDraw();
    } else {
      //ToDo...something if data doesnt get loaded (onLoad mainly)
    }
  }, [data]);


  //lets just with full json, set markers for dates/price
  //then window/scale the same
  //then draw same
  //add if marker = true to put on template? or seprate loop for those two. idk
  

  //for loops
  //--setwindow
  //--scale (move high/low)
  //--2 if's compareDate, check boundrie
  //--draw main
  //--draw price/date

  //maybe move scale inside of main draw?
  const setWindow = async () => {
    const testSpot = startRef.current - jumpRef.current;
    const plot = [];
    let high =0,
        low;
   
    setStart(await checkBoundary(testSpot));
    for (let i = startRef.current; i < startRef.current + windowSize; i++) {
      plot.push(data.result[i])
      high = data.result[i].high > high ? data.result[i].high : high;
      low = !low || data.result[i].low < low ? data.result[i].low : low;
    }
    const scaled = high - low
    return [plot, high, scaled]
  };

  const checkBoundary = async (testSpot) => {
    if (testSpot > min && testSpot < max) {
      return testSpot;
    } else {
      return startRef.current;
    }
  };

  const test = async(plot) =>{
    return plot[0].date
  }

  const startDraw = async () => {
    let [plot, high, scaled] = await setWindow();
    const x = await scale(plot, scaled, high);
    let compareDate = await test(plot)

    //so maybe with full plot/df
    //set markers for price/dates axis
    //and they are drawn with the scaled/windowed plot..either inside or outside idk

    draw(await x);
    drawAxis(await x, tfRef.current, await compareDate);
    // drawPrice(await x)
  };

  return <div></div>;
}
