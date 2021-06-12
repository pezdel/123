import React, { useContext, useEffect } from "react";
import useState from "react-usestateref";
import { AuthContext } from "./AuthContainer";
import { scale } from "./scale";
import { draw } from "./draw";
import { drawAxis } from './drawAxis'

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

  const setWindow = async () => {
    const testSpot = startRef.current - jumpRef.current;
    const plot = [];
    let i;
    setStart(await checkBoundary(testSpot));
    for (i = startRef.current; i < startRef.current + windowSize; i++) {
      //plot.push(Object.values(data.result[i]))
      plot.push(data.result[i])
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

  const test = async(plot, compareDate) =>{
      if(compareDate == 0){
        return plot[0].date
      }
  }

  const startDraw = async () => {
    let compareDate = 0;
    const plot = setWindow();
    const x = scale(await plot);
    compareDate = test(await plot, compareDate)

    const can = document.getElementById("can"),
       ctx = can.getContext("2d");
    const ctxTemp_height = can.height,
          ctxTemp_width = can.width;
    ctx.clearRect(0, 0, 700, 500);

    draw(await x, ctx);
    drawAxis(await x, tfRef.current, ctx, await compareDate, ctxTemp_height, ctxTemp_width);
  };

  return <div></div>;
}
