import React, { useContext, useEffect } from "react";
import { AuthContext } from "./AuthContainer";
import { Chart } from './chart'
import { Dropdown } from './dropdown'

export const Content: React.FC = () => {
  const { data, setData } = useContext(AuthContext);

  useEffect(() =>{ 
    const fetchData = async () =>{
      const rawResponse = await fetch('/onLoad');
      const content = await rawResponse.json();
      setData(await content)
    }
    fetchData()
  },[]) 

  const handleSubmits = () =>{
    console.log(data)
  }

  return (
    <div className="chart-main">
      <Dropdown />
      {<button onClick={handleSubmits}>adsadasdasdasd</button>}
    </div>
  );
};
{/* 

//
const handleSubmit = async () => {
  const rawResponse = await fetch('/onLoad');
  const content = await rawResponse.json();
  setData(await content)
  
}
const handleSubmits = () => {
    console.log(data)



}

{<button onClick={handleSubmit}>adsadasdasdasd</button>}
      
    </div> */}