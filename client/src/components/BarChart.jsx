import React from 'react';
import { Bar } from 'react-chartjs-2';


const options = {
  indexAxis: 'y',
  elements: {
    bar: {
      borderWidth: 4,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'right',
    },
    title: {
      display: true,
      text: 'Expenses vs Spending Limit',
      fontSize: 40
    },
  },
};

export default function BarChart(props) {
  return (
    <div>
    <Bar 
      data={props.barData} 
      options={props.options}
      height={200}
      width={200}
      options={options}
    />
    </div>
  )
}