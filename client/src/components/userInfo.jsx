import React from 'react';
import { Divider } from '@material-ui/core';
import '../styles/userInfo.scss';

export default function UserInfo(props) {
  const {income, expectedExpenses, balance} = props;

  const name = sessionStorage.firstName;
  return (
    <div className="user-info">
      <div>
        <h1 style={{fontSize: '36px'}}>{"Welcome " + name + '!'}</h1>
      </div>
      <Divider />
      <br></br>
      <div>
      <h4>Funds Remaining:</h4>
        <p>{balance}</p>
      <br></br>
        <h4>Monthly Income:</h4>
        <p>{income}</p>
      <br></br>
        <h4>Total Monthly Expenses:</h4>
        <p>{expectedExpenses}</p>
      <br></br>
      </div>
    </div>
  )
}