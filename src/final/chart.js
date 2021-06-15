import React, {useContext, useEffect} from 'react'
import { AuthContext } from './AuthContainer'
import useState from 'react-usestateref';

import { draw, magnify } from './draw'
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
      magnify()

      //zoom();
    }
  }, [data]);
  return (
    <div className="chartWrapper">
      <div className="chartAreaWrapper">
        <canvas id="main" width={divWidth} height={500}></canvas>
      </div>
      <div className="zoomWrapper">
        <canvas id="zoom" width={"400"} height={"200"}></canvas>
      </div>
    </div>
  );
};
