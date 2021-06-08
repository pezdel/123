import React, { useContext } from "react";
import { AuthContext } from "./AuthContainer";
import { Chart } from './chart'
import { Dropdown } from './dropdown'

export const Content: React.FC = () => {
  const { data, setData } = useContext(AuthContext);


  const handleSubmit = async () => {
    const rawResponse = await fetch('/onLoad');
    const content = await rawResponse.json();
    setData(await content)
    
  }
  const handleSubmits = () => {
      console.log(data)
}
  return (
    <div className="chart-main">
      <Dropdown />
      {<button onClick={handleSubmit}>adsadasdasdasd</button>}
      {<button onClick={handleSubmits}>adsadasdasdasd</button>}
      <Chart />
    </div>
  );
};