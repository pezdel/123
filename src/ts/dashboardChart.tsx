import React from "react";
import { Dropdown } from './dropdown'
import { Chart } from './chartComponets/chart'

export default function DashboardChart() {
  return (
      <div className="chart-main">
      <Dropdown />
      <Chart />
      </div>
      
      
  );
}
