import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "./AuthContainer";
import useState from "react-usestateref";
import './app.css'


export const Test = () => {
    console.log("help")
    const x = 123;
    return (
            <div className="chartTest">
                <div className="canOneDiv">idk
                </div>
                <div className="canTwoDiv">what
                </div>
                <div className="canThreeDiv">is wrong
                </div>
            </div>
    )
}
// <canvas id="main"  width={mainDivWidth} height={mainDivHeight} ></canvas>
                    // <canvas id="canOne"></canvas>
                    // <canvas id="canTwo"></canvas>
                    // <canvas id="canThree"></canvas>
