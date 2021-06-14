import React, {useContext, useEffect} from 'react'
import { AuthContext } from './AuthContainer'
import useState from 'react-usestateref';

import { draw } from './draw'
import { scale } from './scale'
import { findHighLow } from './findHighLow'

export const Chart = () => {
  const { data } = useContext(AuthContext);
  const [divWidth, setDivWidth] = useState(500);

  useEffect(() => {
    if (data.length !== 0) {
      setDivWidth(data.length * 4);
      getData();
    }
  }, [data]);
  
  const getData = async() => {
    const [high, low, diff] = await findHighLow(data);
    const scaledData = await scale(data, high, diff);
    //draw(await scaledData)
  };

  return (
    <div>
      <canvas id="main" width={divWidth} height={300}></canvas>
      <h1>{divWidth}</h1>
    </div>
  );
};
