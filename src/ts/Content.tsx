import React, { useContext } from "react";
import { AuthContext } from "./AuthContainer";

export const Content: React.FC = () => {
  const { loggedIn, checkAuth } = useContext(AuthContext);
  const { data, setData } = useContext(AuthContext);
  const { FD, getFD } = useContext(AuthContext);


  const handleSubmit = () => {
        setData("AUDUSD")
  }
  const handleSubmits = () => {
      setData("GBPUSD")
}
  return (
    <div>
          <h1>{data}</h1>
      {<button onClick={handleSubmit}>adsadasdasdasd</button>}
      {<button onClick={handleSubmits}>adsadasdasdasd</button>}
    </div>
  );
};