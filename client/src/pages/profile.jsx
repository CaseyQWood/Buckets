import React from 'react'
import BudgetActualExpected from '../components/graph'
import ProgressBar from '../components/progressBar'
import CategoriesProgressBar from '../components/categoriesProgressBar'

export default function Profile() {

  // logic goes here
  //const 
  

  return (
    <div class="graph">
      <BudgetActualExpected />
      <div class="category-bars">
        <CategoriesProgressBar currentValue={80} />
      </div>
    </div>
  )
}