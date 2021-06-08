import React, { useContext } from "react";
import { AuthContext } from "./AuthContainer";

export const Content: React.FC = () => {
  const { loggedIn, checkAuth } = useContext(AuthContext);
  const { data, setData } = useContext(AuthContext);
  const { FD, getFD } = useContext(AuthContext);


  const handleSubmit = async () => {
    const rawResponse = await fetch('/onLoad');
    const content = await rawResponse.json();
    setData(await content)
    
  }
  const handleSubmits = () => {
      console.log(data)
}
  return (
    <div>
      {<button onClick={handleSubmit}>adsadasdasdasd</button>}
      {<button onClick={handleSubmits}>adsadasdasdasd</button>}
    </div>
  );
};