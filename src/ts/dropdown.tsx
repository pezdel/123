import React, { useState, useContext } from 'react';
import { AuthContext } from "./AuthContainer";
import Select from 'react-select';
import './app.css'

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
//just want dropdown its own component thatn you can plug and it works on the main compoenent
//main component needs to work w/o dropdown
//so on submit it should get data and call a function to set it
export function Dropdown() {
  const [selectedOption, setSelectedOption] = useState<any>(null);
  const [tfOption, setTFOption] = useState<any>(null);
  const { setData } = useContext(AuthContext);
      const handleSubmits = async () => {
        if(selectedOption != null && tfOption != null){
          const rawResponse = await fetch('/onClick');
          const content = await rawResponse.json();
          setData(await content)
        }
      }

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
