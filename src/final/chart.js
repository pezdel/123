import React, {useContext, useEffect} from 'react'
import { AuthContext } from './AuthContainer'
import useState from 'react-usestateref';

import { draw, magnify} from './draw'
import { findHighLow, scale } from './scale'

export const Chart = () => {
  const [divWidth, setDivWidth] = useState(500)
  const [startCord, setStartCord, startCordRef] = useState(0)
  const { data } = useContext(AuthContext);
  const [ fullHigh, setFullHigh, fullHighRef] = useState(0)
  const [ fullLow, setFullLow, fullLowRef] = useState(0)
  const [ fullDiff, setFullDiff, fullDiffRef] = useState(0)
  const windowSize = 100;
  const x = 4;

  const renderMainChart = async() => {
    setDivWidth(data.length * x)
    setStartCord((data.length - windowSize)*4)
    const [high, low, diff] = await findHighLow(data);
    setFullHigh(high)
    setFullLow(low)
    setFullDiff(diff)
    const scaledData = await scale(data, fullHighRef.current, fullDiffRef.current);
    draw(await scaledData, divWidth);
    console.log(startCordRef.current)
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
    setStartCord(startCordRef.current - jumpRef.current);
    if(startCordRef.current > 0 && startCordRef.current < divWidth - windowSize){
      console.log("hey")
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
        <canvas id="main" width={divWidth} height={600}></canvas>
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
