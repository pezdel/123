import React from "react";
import { AuthContainer } from "./final/AuthContainer";
import "bootstrap/dist/css/bootstrap.min.css";
import { Dropdown } from "./final/dropdown";
import { Chart } from "./final/chart";
import { Snipit } from './final/snipit';
//import { Test } from './final/test';

const App: React.FC = () => {
  return (
      <div className="chartmain">
      <AuthContainer>
          <Dropdown />
          <Chart />
          <Snipit />
      </AuthContainer>
      </div>
  );
};
export default App;

// <Test />
