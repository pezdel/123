import React from "react";
import useState from "react-usestateref";

export const AuthContainer = (props) => {
    const [data, setData] = useState([]);
    const [tf, setTF, tfRef] = useState('1h');

    const [mainHigh, setMainHigh, mainHighRef ] = useState(0);
    const [mainLow, setMainLow, mainLowRef ] = useState(0);
    const [mainDiff, setMainDiff, mainDiffRef ] = useState(0);

    const [ mainDivWidth, setMainDivWidth, mainDivWidthRef] = useState(500);
    const [ mainDivHeight, setMainDivHeight ] = useState(500);
    const [ startX ] = useState(4) //for space between x's needed for div width too
    const [ magnify, setMagnify, magnifyRef ]= useState(0)
    
    const [ dateOffset ] = useState(15);
    const [ priceOffset ] = useState(100);
    const [ mainCtx, setMainCtx ] = useState(null)
    const [ mainReady, setMainReady ] = useState(false)

    const value = {
        data,
        setData,
        tf,
        setTF,
        tfRef,
        mainHigh,
        setMainHigh,
        mainHighRef,
        mainLow,
        setMainLow,
        mainLowRef,
        mainDivWidth,
        setMainDivWidth,
        mainDivWidthRef,
        mainDivHeight,
        setMainDivHeight,
        startX,
        magnifyRef,
        setMagnify,
        mainDiff,
        setMainDiff,
        mainDiffRef,
        dateOffset,
        priceOffset,
        mainCtx,
        setMainCtx,
        mainReady,
        setMainReady,
    };









    return (
        <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
    );
};
export const AuthContext = React.createContext();

// for typescript https://github.com/nas5w/use-context-react-typescript/tree/master/src
