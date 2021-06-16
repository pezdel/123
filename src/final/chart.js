import React, {useContext, useEffect} from 'react'
import { AuthContext } from './AuthContainer'
import useState from 'react-usestateref';

import { draw, magnify} from './draw'
import { findHighLow, scale } from './scale'

export const Chart = () => {
  const [divWidth, setDivWidth, divWidthRef] = useState(500)
  const [divHeight, setDivHeight] = useState(500)
  const [startCord, setStartCord, startCordRef] = useState(0)
  const { data } = useContext(AuthContext);
  const [ fullHigh, setFullHigh, fullHighRef] = useState(0)
  const [ fullLow, setFullLow, fullLowRef] = useState(0)
  const [ fullDiff, setFullDiff, fullDiffRef] = useState(0)
  const windowSize = 100;
  const x = 4;

  const renderMainChart = async() => {
    setDivWidth(data.length * x)
    setDivHeight(divWidthRef.current/4)
    setStartCord((data.length - windowSize)*4)
    const [high, low, diff] = await findHighLow(data);
    setFullHigh(high)
    setFullLow(low)
    setFullDiff(diff)
    const scaledData = await scale(data, fullHighRef.current, fullDiffRef.current);
    draw(await scaledData, divWidth);
    magnify(data, startCordRef.current, windowSize, diff, fullHighRef.current, fullLowRef.current)
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
    setJump((Math.ceil(offsetX - startXRef.current)));
    
    if(startCordRef.current-jumpRef.current > 0 && 
        startCordRef.current-jumpRef.current < divWidth-windowSize*4){
          
      setStartCord(startCordRef.current - jumpRef.current);
      magnify(data, startCordRef.current, windowSize, fullDiff, fullHighRef.current, fullLowRef.current)
      setStartX(offsetX);
    }
  };
  const finishDrawing = () => {
    setIsDrawing(false);
  };

  return (
    <div className="chartWrapper">
      <div className="chartAreaWrapper">
        <h1>{divHeight}</h1>
        <canvas id="main" width={divWidth} height={divHeight}></canvas>
      </div>
      <div className="zoomWrapper">
        <canvas
          id="zoom"
          width={"300"}
          height={"200"}
          onMouseDown={startDrawing}
          onMouseUp={finishDrawing}
          onMouseMove={isDraw}
        ></canvas>
      </div>
    </div>
  );
};
