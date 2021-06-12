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
    const plot = [{}];
    let i;
    setStart(await checkBoundary(testSpot));
    console.log(
      "testSpot = " +
        testSpot +
        "startRef = " +
        startRef.current +
        "JumpRef = " +
        jumpRef.current
    );
    for (i = startRef.current; i < startRef.current + windowSize; i++) {
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

  const startDraw = async () => {
    const plot = setWindow();
    const x = scale(await plot);

    const can = document.getElementById("can"),
      ctx = can.getContext("2d");
    const ctxTemp_height = can.height;
    ctx.clearRect(0, 0, 700, 500);
    draw(await x, ctx);
    drawAxis(await x, tfRef.current, ctx);
  };

  return <div></div>;
}
