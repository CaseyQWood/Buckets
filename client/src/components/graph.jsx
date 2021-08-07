import React from 'react';
import { Bar } from 'react-chartjs-2';

//This data will need to be replaced with previous budget data.

export default function BudgetActualExpected(props) {
  const data = {
    labels: props.names,
    datasets: [
      {
        label: 'Expected Budget',
        data: props.expected,
        backgroundColor: 'rgb(255, 99, 132)',
      },
      {
        label: 'Actual Budget',
        data: props.actual,
        backgroundColor: 'rgb(54, 162, 235)',
      },
    ],
  };
  
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  
  return (
    <>
      <div className='header'>
        <h1 className='title'>Expected VS. Actual</h1>
        <div className='links'>
        </div>
      </div>
      <Bar data={data} options={options} />
    </>
  )
};
