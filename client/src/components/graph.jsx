import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Divider } from '@material-ui/core';

//This data will need to be replaced with previous budget data.

export default function BudgetActualExpected(props) {
  const data = {
    labels: props.names,
    datasets: [
      {
        label: 'Expected Budget',
        data: props.expected,
        backgroundColor: '#F8574F',
      },
      {
        label: 'Actual Budget',
        data: props.actual,
        backgroundColor: '#78D1F7',
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
        <h3 className='title' style={{fontFamily: 'Roboto, sans-serif', fontSize: '36px'}}>Your Previous Budgets</h3>
        <div className='links'>
        </div>
      </div>
      <Bar data={data} options={options} />
    </>
  )
};
