import React from 'react'
import BudgetActualExpected from '../components/graph'
import ProgressBar from '../components/progressBar'

export default function Profile() {

  // logic goes here
  //const 
  

  return (
    <div class="graph">
      <BudgetActualExpected />
      <div class="progress-container">
        <ProgressBar currentValue={80}/> <br></br>
        <ProgressBar currentValue={35}/> <br></br>
        <ProgressBar currentValue={70}/> <br></br>
      </div>
    </div>
  )
}