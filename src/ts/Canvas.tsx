import React, { useEffect } from "react";
import { useCanvas } from "./CanvasContext";

export function Canvas() {
  interface IUser{
    canvasRef: any;
    prepareCanvas: any;
    startDrawing: any;
    finishDrawing: any;
    draw: any;
  }
  const {
    canvasRef,
    prepareCanvas,
    startDrawing,
    finishDrawing,
    draw,
  } = useCanvas();
  const { state } = useState('')
  useEffect(() => {
    prepareCanvas();
  }, []);

  return (
    <canvas
      onMouseDown={startDrawing}
      onMouseUp={finishDrawing}
      onMouseMove={draw}
      ref={canvasRef}
    />
  );
}