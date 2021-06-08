import React, { useContext } from "react";
import { AuthContext } from "./AuthContainer";

//scroll should updated ref of FD

export function Chart() {
      const { data, setData } = useContext(AuthContext);
      const handleSubmits = () => {
            console.log(data)
      }
      return (
            <div className="Chart">
            </div>
      )
}
