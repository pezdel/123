import React, { useState, useContext } from "react";
import useState from "react-usestateref";
import { AuthContext } from "./AuthContainer";

export const Content = () => {
  const [startX, setStartX, startXRef] = useStateRef(0);
  const [isDrawing, setIsDrawing] = useState(false);
  const [ setJump ] = useContext(AuthContext);

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
