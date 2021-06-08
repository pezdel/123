import React, { useEffect, useContext } from "react";
import { AuthContext } from "./AuthContainer";
import { getData } from './fixData'


export const Content: React.FC = () => {
  const { data, setData } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      const rawResponse = await fetch("/onLoad");
      const content = await rawResponse.json();
      setData(await content);
    };
    fetchData();
  }, []);

  //useEffect when data changes and mouse move

  useEffect(()=>{
    console.log("changed")
    getData(data)
  },[data])





  const handleSubmit = () => {
    console.log(data)
  }

 

  return (
    <div className="chart-main">
      {<button onClick={handleSubmit}>data</button>}  
    </div>
  );
};

