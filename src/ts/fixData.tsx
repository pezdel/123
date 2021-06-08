import React, { useContext } from "react";
import { AuthContext } from "./AuthContainer";



export const setWindow= (df: []) => {
      console.log(df.length)
}
export const scaleWindow = () => {
      console.log("scaled")
}


export const getData = (df: []) => {
      setWindow(df)
      scaleWindow()
}



