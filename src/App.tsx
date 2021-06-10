import React from "react";
import { AuthContainer } from "./ts/AuthContainer";
import "bootstrap/dist/css/bootstrap.min.css";
import { Content } from "./ts/Content";
import { Dropdown } from "./ts/dropdown";

const App: React.FC = () => {
  
  return (
    <div className="chart-main">
      <AuthContainer>
        <Dropdown />
        <Content />
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