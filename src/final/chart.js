import React, {useContext, useEffect} from 'react'
import { AuthContext } from './AuthContainer'
import useState from 'react-usestateref';

import { draw, magnify, tests } from './draw'
import { findHighLow, scale } from './scale'

export const Chart = () => {
  const { data } = useContext(AuthContext);
  const [divWidth, setDivWidth] = useState(500);

  useEffect(async () => {
    if (data.length !== 0) {
      setDivWidth(data.length * 4);
      const [high, low, diff] = await findHighLow(data);
      const scaledData = await scale(data, high, diff);
      draw(await scaledData, divWidth);
      magnify();
    }
  }, [data]);

  const [jump, setJump, jumpRef] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startX, setStartX, startXRef] = useState(0);
  const [oldX, setOldX, oldXRef] = useState(0)

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
    setJump(0)   
    setJump(Math.ceil((offsetX - startXRef.current) / 12));

//     setOldX(oldXRef.current-jumpRef.current)
//     setOldY(oldYRef.current-jumpRef.current)
    if(jumpRef !== 0){
    setOldX(oldXRef.current- jumpRef.current)
    tests(oldXRef.current)
    }
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
