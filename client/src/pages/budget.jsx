import React, { useEffect } from 'react'
import { useState} from "react";
import BudgetCategory from '../components/budgetCategory';
import BudgetExpense from '../components/budgetExpense';

import useBudget from '../hooks/useBudgetData';

import {Grid, Fab} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import '../styles/budget.scss'

const newObj = [{
  "category_name": "Eating Out2",
  "budget_name": "August-Budget",
  "expense_name": "Dinner at Henris Restaurant",
  "category_id": 3,
  "budget_id": 1,
  "spending_limit": "$600.00",
  "cost": "$75.00",
  "payee": "Henris",
  "amount_paid": "$75.00",
  "expense_cat_id": 3
},
{
  "category_name": "Eating Out",
  "budget_name": "August-Budget",
  "expense_name": "Dinner with Mum",
  "category_id": 3,
  "budget_id": 1,
  "spending_limit": "$600.00",
  "cost": "$50.00",
  "payee": "Moxies",
  "amount_paid": "$50.00",
  "expense_cat_id": 3
},
{
  "category_name": "Investments",
  "budget_name": "August-Budget",
  "expense_name": "Doge to the Moon",
  "category_id": 4,
  "budget_id": 1,
  "spending_limit": "$1,000.00",
  "cost": "$350.00",
  "payee": "Binance",
  "amount_paid": "$350.00",
  "expense_cat_id": 4
}]

export default function Budget() {
  const { budgetState } = useBudget();
  const [flip, setFlip] = useState(false)

  const getExpensesByCategory = (data, cat_id) => {
    const container = []
    data.forEach(x => {
      if(x.category_id === cat_id) {
        container.push({
          name: x.expense_name,
          spendingLimit: x.spending_limit,
          amountPaid: x.amount_paid,
          payee: x.payee,
          cost: x.cost
        })
      }
    })
    return container
  }

  const categoryFilter = (data) => {
    const container = []

    data.forEach(exp => {
      if(!Object.keys(container).includes(exp.categories_name)) {
        container.push({
          categoryId: exp.category_id,
          categoryName: exp.category_name,
          spendingLimit: exp.spending_limit,
          amountPaid: exp.amount_paid
        })
      }
    })
    return container
  }

  const percentCalculator = (val1, val2) => {
    const number1 = Number(val1.replace(/[^0-9.-]+/g,"")); 
    const number2 = Number(val2.replace(/[^0-9.-]+/g,""));   

    return number1/number2 * 100
  }
 const test= 'test'
  // console.log(percentCalculator('$350.00', "$1,000.00"))
 
  

  const categories = categoryFilter(budgetState).map((oneExpenseData, index) => {
    return (
      <div key={index} id="category-container">
        <div className="category" style={{background:'lightgrey'}}>
          <BudgetCategory name={oneExpenseData.categoryName} currentValue={percentCalculator(oneExpenseData.amountPaid, oneExpenseData.spendingLimit)} maxValue={oneExpenseData.spendingLimit} setFlip={setFlip} flip={flip}/>
        </div>
        <div className="expenses-container">

          {flip ? <div className="expenses">
            <h2>Current Expenses</h2>
            {getExpensesByCategory(newObj, oneExpenseData.categoryId).map(x => <BudgetExpense name={x.name} cost={x.cost} />)} 
          </div> : <div></div>}

          <Fab color="primary" aria-label="add">
              <AddIcon />
            </Fab>
        </div>
      </div>
    )
  })

  return (
    <Grid>
      <div className="budget-container" style={{background:'orange'}} >
        <div className="budget-name">
          <h2>New Budget</h2>
        </div>
        <div id="category-container">
          {categories}
        </div>
      </div>
    </Grid>
  )
}

// Budget requires one large container div to hold the dynamic form
// The form will need to contain category componenents which will need category data for the active budget
// The categories will need expenses matching the current budget based on category_id
// State will need to contain Current budget, current categories, and current expenses.
// A user should be able to add a new category
// A user should be able to add a new expense to a category
// A user should be able to edit/delete categories and expenses

  // logic goes here
  //<div id="category-container">
  //   <div className="category" style={{background:'lightgrey'}}>
  //     <BudgetCategory name={'Living Expenses'} currentValue={75} maxValue={'$1200.00'}/>
  //   </div>
  //   <div className="expenses-container">
  //     <div className="expenses">
  //       <h2>Current Expenses</h2>
  //       <BudgetExpense name={'Starbucks'} cost={'$100.00'} />
  //       <Fab color="primary" aria-label="add">
  //         <AddIcon />
  //       </Fab>
  //     </div>
  //   </div>
  // </div>
