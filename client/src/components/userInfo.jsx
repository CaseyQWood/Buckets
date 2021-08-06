import React from 'react';
import '../styles/userInfo.scss';

export default function UserInfo(props) {
  const {income} = props;

  return (
    <div className="user-info">
      <h2>Monthly Income:</h2>
      <h2>{income}</h2>
      <h2>Total Monthly Expenses:</h2>
      <h2>totalExpenses</h2>
      <h2>Total Funds Remaining For the Month:</h2>
      <h2>fundsRemaining</h2>
    </div>
  )
}