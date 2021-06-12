import React, { useEffect } from "react";
import useState from "react-usestateref";

export const AuthContainer = (props) => {
  const [tf, setTF, tfRef] = useState("")
  const [data, setData] = useState([]);
  const [jump, setJump, jumpRef ] = useState(0);
  const [max, setMax] = useState(0);
  const [min, setMin] = useState(0);
  const [start, setStart, startRef ] = useState(0);
  const [windowSize, setWindowSize] = useState(15);

  

  

  const value = {
    data,
    setData,
    jump,
    setJump,
    jumpRef,
    max,
    setMax,
    setMin,
    min,
    start,
    setStart,
    startRef,
    windowSize,
    tf, 
    setTF,
    tfRef
  };
  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

export const AuthContext = React.createContext();

// for typescript https://github.com/nas5w/use-context-react-typescript/tree/master/src
