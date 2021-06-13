import React, { useContext, useEffect } from "react";
import useState from "react-usestateref";
import { AuthContext } from "./AuthContainer";


export const Chart = () => {
  const [startX, setStartX, startXRef] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);
  const { jump, setJump, jumpRef } = useContext(AuthContext);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    setStartX(offsetX);
    setIsDrawing(true);
  };
  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    setJump(Math.ceil((offsetX - startXRef.current) / 25));
  };
  const finishDrawing = () => {
    setIsDrawing(false);
  };

  return (
    <div className="chart-main">
      <canvas id= "can-date"
      width={700}
      hight={500}
      ></canvas>
      <canvas
        id="can"
        width={700}
        height={500}
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
      ></canvas>
      
    </div>
  );
};
