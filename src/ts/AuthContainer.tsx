import React, { useState } from "react";
import { OnLoad, onClick } from './getData'

interface MyObj {
      date: string;
      open: number;
      high: number;
      low: number;
      close: number;
  }
export interface ISubmitResult {
      success: boolean;
      message: string;
    }
  export const handleSubmit = async () => {
    const rawResponse = await fetch('/onLoad');
    const content = await rawResponse.json();
    return content
  }

    export const AuthContainer: React.FC = props => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [data, setData] = useState<any>();
  const [FD, setFD] = useState<MyObj[]>([{
      "date": "01/15/2001",
      "open": 1.2222,
      "high": 1.3333,
      "low": 1.44444,
      "close": 1.5555}]);


      
      
  

  const getFD = () => {
        console.log("hi")
  }
  const checkData = () => {
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
      getFD,
      setData
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
  data: any;
  checkData: ()=> void;
  FD: MyObj[];
  getFD: () => void;
  setData: any;
};

export const AuthContext = React.createContext({} as AuthContextShape);


// setFD([{
//       "date": "adam",
//       "open": 1.9999,
//       "high": 1.9999,
//       "low": 1.99999,
//       "close": 1.9999},
//       {
//       "date": "adam",
//       "open": 1.9999,
//       "high": 1.9999,
//       "low": 1.99999,
//       "close": 1.9999}]
//       );