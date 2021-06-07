import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { CanvasProvider } from "./ts/CanvasContext";

ReactDOM.render(
  <React.StrictMode>
    <CanvasProvider>
    <App />
    </CanvasProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
