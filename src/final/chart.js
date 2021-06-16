import React, {useContext, useEffect} from 'react'
import { AuthContext } from './AuthContainer'
import useState from 'react-usestateref';

import { draw, magnify, tests } from './draw'
import { findHighLow, scale } from './scale'

export const Chart = () => {
  const [divWidth, setDivWidth] = useState(500)
  const [startCord, setStartCord, startCordRef] = useState(0)
  const { data } = useContext(AuthContext);
  const windowSize = 100;
  const x = 4;

  const renderMainChart = async() => {
    setDivWidth(data.length * x)
    setStartCord((data.length - windowSize)*4)
    const [high, low, diff] = await findHighLow(data);
    const scaledData = await scale(data, high, diff);
    draw(await scaledData, divWidth);
    magnify(startCordRef.current);
  };

  useEffect(async () => {
    if (data.length !== 0) {
      renderMainChart()
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
    setStartX(offsetX);
    setStartCord(startCordRef.current - jumpRef.current);
    tests(startCordRef.current);
    //need to set window high/low
    //figure out how to get json of data being shown
    //
    
  };
  const finishDrawing = () => {
    setIsDrawing(false);
  };

  return (
    <div className="chartWrapper">
      <div className="chartAreaWrapper">
        <canvas id="main" width={divWidth} height={500}></canvas>
      </div>
      <div className="zoomWrapper">
        <canvas
          id="zoom"
          width={"400"}
          height={"200"}
          onMouseDown={startDrawing}
          onMouseUp={finishDrawing}
          onMouseMove={isDraw}
        ></canvas>
      </div>
    </div>
  );
};
