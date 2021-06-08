import React, { useState } from 'react';
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

export function Dropdown() {
  const [selectedOption, setSelectedOption] = useState<any>(null);
  const [tfOption, setTFOption] = useState<any>(null);

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
    </div>
  );
}
