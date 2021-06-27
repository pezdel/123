import React from "react";
import useState from "react-usestateref";

export const AuthContainer = (props) => {
    const [data, setData] = useState([]);
    const [tf, setTF ] = useState('1h');

    const [mainHigh, setMainHigh ] = useState(0);
    const [mainLow, setMainLow ] = useState(0);
    const [mainDiff, setMainDiff ] = useState(0);

    const [ mainDivWidth, setMainDivWidth ] = useState(500);
    const [ magnifyStart, setMagnifyStart, magnifyStartRef ] = useState(0)
    
    const [ mainReady, setMainReady ] = useState(false)
    const [ magnifyHigh, setMagnifyHigh ] = useState(0);
    const [ magnifyLow, setMagnifyLow ] = useState(0);


    const value = {
        data,
        setData,
        tf,
        setTF,
        mainHigh,
        setMainHigh,
        mainLow,
        setMainLow,
        mainDivWidth,
        setMainDivWidth,
        mainDiff,
        setMainDiff,
        mainReady,
        setMainReady,
        magnifyStart,
        setMagnifyStart,
        magnifyStartRef,
        magnifyHigh,
        setMagnifyHigh,
        magnifyLow,
        setMagnifyLow,
    };









    return (
        <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
    );
};
export const AuthContext = React.createContext();

// for typescript https://github.com/nas5w/use-context-react-typescript/tree/master/src
