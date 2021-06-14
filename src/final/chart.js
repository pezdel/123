import React, {useContext, useEffect} from 'react'
import { AuthContext } from './AuthContainer'
import useState from "react-usestateref";

export const Chart = () => {
  const { data } = useContext(AuthContext);
  const [divWidth, setDivWidth] = useState(500);

  useEffect(() => {
    if (data.length !== 0) {
      console.log(divWidth);
      getWidth(data.length)
      
    }
  }, [data]);
  
  const getWidth = (length) => {
   setDivWidth(length)
   console.log("hekj")
  };

    return (
    <div>
	<canvas id="main" width={divWidth} height={300}></canvas>
	<h1>{divWidth}</h1>
    </div>
  );
};
