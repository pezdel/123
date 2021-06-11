import React, { useState, useContext } from "react";
import { AuthContext } from "./AuthContainer";
import { scale } from "./scale";
import { Draw } from "./draw";

export const GetData = () =>  {
  let testSpot = 0;
  const { data, setData } = useContext(AuthContext);
  const [ windowSize ] = useContext(AuthContext);
  const [ min ] = useContext(AuthContext);
  const [ max ] = useContext(AuthContext);
  const [ {start, setStart, startRef }] = useContext(AuthContext);
  const [ {jump, setJump, jumpRef} ] = useContext(AuthContext);



  const setWindow = async () => {
    const testSpot = startRef.current - jumpRef.current;
    const plot = [{}];
    let i;
    setStart(await checkBoundary(testSpot));
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
  const startDraw = async()=>{
    const plot = setWindow();
    const x = scale(await plot);
    Draw(await x);
  }
  startDraw()
  return (
  <div>
    
  </div>
    );
}
