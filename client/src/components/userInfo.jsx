import React from 'react';
import { Divider } from '@material-ui/core';
import '../styles/userInfo.scss';

export default function UserInfo(props) {
  const {income, expectedExpenses, balance} = props;

  return (
    <div className="user-info">
      <div>
        <h2>Total Funds Remaining For the Month: {balance}</h2>
      </div>
      <Divider />
      <div>
        <h3>Monthly Income:</h3>
        <p>{income}</p>
        <h3>Total Monthly Expenses:</h3>
        <p>{expectedExpenses}</p>
      </div>
    </div>
  )
}