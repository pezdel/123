import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from "./AuthContainer";
import Select from 'react-select';
import './app.css'
//test
const currency = [
  { value: 'EURUSD', label: 'EURUSD' },
  { value: 'AUDUSD', label: 'AUDUSD' },
  { value: 'GBPUSD', label: 'GBPUSD' },
];
const timeframe = [
  { value: 'h1', label: 'h1' },
  { value: '1d', label: '1d' },
  { value: '1w', label: '1w' },
];

export function Dropdown() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [tfOption, setTFOption] = useState(null);
  const { data, setData } = useContext(AuthContext);
  const { setTF } = useContext(AuthContext)
      const handleSubmits = async () => {
        if(selectedOption != null && tfOption != null){
          const rawResponse = await fetch('/onClick');
          const content = await rawResponse.json();
          setData(await content.result)
          setTF("1d")
        }
      }

      useEffect(() => {
        const fetchData = async () => {
          const rawResponse = await fetch("/onLoad");
          const content = await rawResponse.json();
          setData(await content.result);
          setTF("1h")
        };
        fetchData();
      }, []);

  return (
    <div className="dropdown-currency">
      <Select
        className="box"
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={currency}
      />
      <Select
        className="box"
        defaultValue={tfOption}
        onChange={setTFOption}
        options={timeframe}
      />
      {<button onClick={handleSubmits}>this one</button>}  
    </div>
  );
}
