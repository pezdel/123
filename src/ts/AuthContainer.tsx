
import React, { useState } from "react";
interface MyObj {
      date: string;
      open: number;
      high: number;
      low: number;
      close: number;
  }

export const AuthContainer: React.FC = props => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [data, setData] = useState<string>("false");
  const [FD, setFD] = useState<MyObj[]>([{
      "date": "01/15/2001",
      "open": 1.2222,
      "high": 1.3333,
      "low": 1.44444,
      "close": 1.5555}]);
      
      // 
  const getFD = () => {
        setFD([{
            "date": "adam",
            "open": 1.9999,
            "high": 1.9999,
            "low": 1.99999,
            "close": 1.9999},
            {
            "date": "adam",
            "open": 1.9999,
            "high": 1.9999,
            "low": 1.99999,
            "close": 1.9999}]
            );
  }
  const checkData = () => {
      setData("true");
    };

  const checkAuth = () => {
    setLoggedIn(true);
  };
  const value: AuthContextShape = {
      loggedIn,
      checkAuth,
      data,
      checkData,
      FD,
      getFD
  }

  return (
    <AuthContext.Provider value={value}>
      {props.children}
    </AuthContext.Provider>
  );
};

export type AuthContextShape = {
  loggedIn: boolean;
  checkAuth: () => void;
  data: string;
  checkData: ()=> void;
  FD: MyObj[];
  getFD: () => void;
};

export const AuthContext = React.createContext({} as AuthContextShape);