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



const getData = async () => {
  const testSpot = startRef.current - jump
  setStart(await checkBoundary(testSpot))
  const plot = setWindow()
  const x = scaleWindow(await plot)
  console.log(await x)
}

const checkBoundary = async(testSpot) =>{
  if (testSpot>min && testSpot <max){
    return testSpot
  }
  else{return startRef.current}
}

const setWindow = async() => {
  const plot = [{}]
  let i
  for (i = startRef.current; i<(startRef.current + windowSize); i++){
    plot.push(data.result[i])
  }
  return plot;
}

const scaleWindow = async(plot) => {
  let high =0;
  let low
  
  plot.forEach(el =>{
    high = el.high > high ? el.high : high;
    low = !low || el.low < low ? el.low : low;
  })
  let scale = high-low;
  var spaceTop = scale / 100,  //update cavans h/w and clear rect h/w (draw())
          spaceBot = 5;
      plot = plot.map(el => {
          return {
          low: (el.low - low)/scale,
          high: (el.high - low)/scale,
          open: (el.open - low)/scale,
          close: (el.close - low)/scale,
          date: el.date
          // low: (100 - (scale - (high - el.low)) / spaceTop) * spaceBot, 
          // high: (100 - (scale - (high - el.high)) / spaceTop) * spaceBot,
          // open: (100 - (scale - (high - el.open)) / spaceTop) * spaceBot,
          // close: (100 - (scale - (high - el.close)) / spaceTop) * spaceBot,
          // date: el.date
          };
      });
      console.log(plot)
  return plot;
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
