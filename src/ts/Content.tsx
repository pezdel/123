import React, { useContext } from "react";
import { AuthContext } from "./AuthContainer";

export const Content: React.FC = () => {
  const { loggedIn, checkAuth } = useContext(AuthContext);
  const { data, checkData } = useContext(AuthContext);
  const { FD, getFD } = useContext(AuthContext);
  console.log(FD)

  return (
    <div>
      {loggedIn ? "Welcome back!" : <button onClick={checkAuth}>Log In</button>}
      {<button onClick={checkData}>{data}</button>}
      {<button onClick={getFD}>adsadasdasdasd</button>}
    </div>
  );
};