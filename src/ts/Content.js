import React, { useEffect, useContext } from "react";
import useState from "react-usestateref";
import { AuthContext } from "./AuthContainer";
import { scale } from "./scale";
import { Draw } from "./draw";

export const Content = () => {
  const windowSize = 150;
  const { data, setData } = useContext(AuthContext);
  const [jump, setJump] = useState(0);
  const [max, setMax] = useState(0);
  const [min, setMin] = useState(0);
  const [start, setStart, startRef] = useState(0);
  let testSpot = 0;

  useEffect(()=>{

  },[])
  useEffect(() => {
    if (data.length !== 0) {
      setStart(data.result.length - windowSize);
      setMax(startRef.current + windowSize / 2);
      setMin(windowSize);
      getData();
    } else {
      //ToDo...something if data doesnt get loaded (onLoad mainly)
    }
  }, [data]);  

  const getData = async () => {
    const plot = setWindow();
    const x = scale(await plot);
    Draw(await x);
  };

  const checkBoundary = async (testSpot) => {
    if (testSpot > min && testSpot < max) {
      return testSpot;
    } else {
      return startRef.current;
    }
  };

  const setWindow = async () => {
    const testSpot = startRef.current - jump;
    const plot = [{}];
    let i;
    setStart(await checkBoundary(testSpot));
    for (i = startRef.current; i < startRef.current + windowSize; i++) {
      plot.push(data.result[i]);
    }
    return plot;
  };

  const hi = () => {
    setJump(50);
    getData();
  };
  const startDrawing = () => {
    console.log("working")
  }
  return (
    <div className="chart-main">
      {<button onClick={hi}>this one</button>}
      <canvas id="can" width={700} height={500}
      onMouseDown={startDrawing}>
      
      </canvas>
    </div>
  );
};
