import { RadialBar, RadialBarChart, Tooltip } from 'recharts';

import React from 'react';

const data = [
    { name: "Completed", value: 55, fill: "#2ecc71" },
  { name: "In-Progress", value: 32, fill: "#f1c40f" },
  { name: "Behind", value: 13, fill: "#e74c3c" }, 
  
  
];

const TaskPerformanceChart: React.FC = () => {
  return (
    <RadialBarChart
      width={250}
      height={200}
      innerRadius="40%"
      outerRadius="90%"
      barSize={10}
      data={data}
      startAngle={90} // Start from the top
      endAngle={-270} // End at the top (full circle)
    >
      <RadialBar background dataKey="value" />
      <Tooltip />
    </RadialBarChart>
  );
}

export default TaskPerformanceChart;