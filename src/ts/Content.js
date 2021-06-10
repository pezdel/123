import React, { useEffect, useContext, useRef } from "react";
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
  const [ startX, setStartX, startXRef ] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false)
  let testSpot = 0;

  useEffect(()=>{
    if (data.length !== 0) {
      getData();
    }
    
  },[jump])
  useEffect(() => {
    if (data.length !== 0) {
      setJump(0)
      setStart(data.result.length - windowSize);
      setMax(data.result.length - windowSize);
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

  
  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY  } = nativeEvent;
    console.log(offsetX)
    setStartX(offsetX)

    setIsDrawing(true);
  };
  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    setJump(Math.ceil((offsetX - startXRef.current)/20))
    //console.log(Math.ceil((offsetX - startXRef.current)/4))
  };
  const finishDrawing = () => {
    setIsDrawing(false);
  };


  return (
    <div className="chart-main">
      <canvas id="can" width={700} height={500}
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}>
      
      </canvas>
    </div>
  );
};
