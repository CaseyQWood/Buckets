import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Button } from '@material-ui/core'


//This data will need to be replaced with previous budget data.

const data = {
  labels: ['1', '2', '3', '4', '5', '6'],
  datasets: [
    {
      label: '# of Red Votes',
      data: [1, 2, 3, 4, 5, 6],
      backgroundColor: 'rgb(255, 99, 132)',
    },
    {
      label: '# of Blue Votes',
      data: [6, 5, 4, 3, 2, 1],
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

export default function BudgetActualExpected(props) {
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
