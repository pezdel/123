import React, { useState, useEffect } from "react";
import { OnLoad, onClick } from './getData'

interface MyObj {
      date: string;
      open: number;
      high: number;
      low: number;
      close: number;
  }
 
export const AuthContainer: React.FC = props => {
  const [data, setData] = useState<any>([]);

 
  

  
  const value: AuthContextShape = {
      data,
      setData
  }

  return (
    <AuthContext.Provider value={value}>
      {props.children}
    </AuthContext.Provider>
  );
};

export type AuthContextShape = {
  data: any;
  setData: any;
};

export const AuthContext = React.createContext({} as AuthContextShape);

