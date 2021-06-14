import React from "react";
import { AuthContainer } from "./ts/AuthContainer";
import "bootstrap/dist/css/bootstrap.min.css";
import { Chart } from "./ts/Chart";
import { Dropdown } from "./ts/dropdown";
import { GetData } from "./ts/GetData";

const App: React.FC = () => {
  return (
    <div className="chart-main">
      <AuthContainer>
        <Dropdown />
        <Chart />
        <GetData />
      </AuthContainer>
    </div>
  );
};
export default App;

//onEffects
//onLoad-----------done
//onClick----------done

//data change -> to re-window(0-40) re-scale re-draw
//click move -> to re-window(var from click) re-scale re-draw
