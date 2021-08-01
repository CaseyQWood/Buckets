import React from 'react'
import BudgetActualExpected from '../components/graph'
import ProgressBar from '../components/progressBar'
import CategoriesProgressBar from '../components/categoriesProgressBar'
import OnlineChat from '../components/onlineChat'

export default function Profile() {

  // logic goes here
  //const 
  

  return (
    <div class="graph">
      <BudgetActualExpected />
      <div class="category-bars">
        <ProgressBar currentValue={80} name={"Living Expenses"} spendLimit={'$1200.00'}/>
      </div>

      <OnlineChat />
    </div>
  )
}