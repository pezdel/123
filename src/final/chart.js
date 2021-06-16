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
    magnify(data, (startCordRef.current)/4, windowSize, diff, fullHighRef.current, fullLowRef.current)
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
    setJump((Math.ceil(offsetX - startXRef.current))*2);
    setStartCord(startCordRef.current - jumpRef.current);
    magnify(data, (Math.ceil(startCordRef.current/4)), windowSize, fullDiffRef.current, fullHighRef.current, fullLowRef.current)
    setStartX(offsetX);
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
