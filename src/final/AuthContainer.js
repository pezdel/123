import React from "react";
import useState from "react-usestateref";

export const AuthContainer = (props) => {
  const [data, setData] = useState([]);
  const [tf, setTF] = useState('1h');

  const value = {
    data,
    setData,
    tf,
    setTF
 };
  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};
export const AuthContext = React.createContext();

// for typescript https://github.com/nas5w/use-context-react-typescript/tree/master/src
