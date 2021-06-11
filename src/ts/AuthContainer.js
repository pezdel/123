import React, { useEffect, useState } from "react";
import { GetData } from "./GetData";

export const AuthContainer = (props) => {
  const [data, setData] = useState([]);
  const [jump, setJump] = useState(0);
  const [max, setMax] = useState(0);
  const [min, setMin] = useState(0);
  const [start, setStart] = useState(0);
  const [windowSize, setWindowSize] = useState(150);

  useEffect(() => {
    if (data.length !== 0) {
      setJump(0);
      setStart(data.result.length - windowSize);
      setMax(data.result.length - windowSize);
      setMin(windowSize);
      GetData();
    } else {
      //ToDo...something if data doesnt get loaded (onLoad mainly)
    }
  }, [data]);

  useEffect(() => {
    if (data.length !== 0) {
      GetData();
    }
  }, [jump]);

  const value = {
    data,
    setData,
    jump,
    setJump,
    max,
    min,
    start,
    setStart,
    windowSize,
  };
  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

export const AuthContext = React.createContext();

// for typescript https://github.com/nas5w/use-context-react-typescript/tree/master/src
