import React, { useEffect, useContext } from "react";
import useState from 'react-usestateref'
import { AuthContext } from "./AuthContainer";

export const Content = () => {
  const windowSize = 150;
  const { data, setData } = useContext(AuthContext);
  const [jump, setJump] = useState(0);
  const [max, setMax] = useState(0);
  const [min, setMin] = useState(0);
  const [start, setStart, startRef] = useState(0)
  let testSpot = 0;

  

  useEffect(() => {
  }, []);//when mousemove

  useEffect(() => {
    const fetchData = async () => {
      const rawResponse = await fetch("/onLoad");
      const content = await rawResponse.json();
      setData(await content);
    };
    fetchData();
  }, []);
  useEffect(() => {
    if (data.length !== 0) {
      setStart(data.result.length - windowSize)
      setMax(startRef.current + (windowSize/2))
      setMin(windowSize)
      getData();
    } else {
      //ToDo...something if data doesnt get loaded (onLoad mainly)
    }
  }, [data]); //ToDo add mousemove thing here and another effect



const checkBoundary = async(testSpot) =>{
  if (testSpot>min && testSpot <max){
    console.log("New spot = testspot (start-jump) .." +testSpot)
    return testSpot
  }
  else{return startRef.current}
}

const getData = async () => {
  const testSpot = startRef.current - jump
  setStart(await checkBoundary(testSpot))
  console.log("actualSpot = " + startRef.current)
  setWindow()
}

const setWindow = async() => {
  const plot = [{}]
  let i
  for (i = startRef.current; i<(startRef.current + windowSize); i++){
    plot.push(data.result[i])
  }
}




const hi = () => {
  setJump(50)
  getData()
}



  return( 
  <div className="chart-main">
{<button onClick={hi}>this one</button>}  

  </div>
  )
};
