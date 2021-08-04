import React from 'react';

import useActiveData from '../hooks/useActiveData';

import BudgetCategory from '../components/budgetCategory';
import BudgetExpense from '../components/budgetExpense';

//Create a React page that renders categories, and expenses by category
export default function Budget1() {
  //Collect Categories, and expenses using a PromiseAll hook
  const {state} = useActiveData();
  console.log("Categories", state.categories, "Expenses", state.expenses, "totalSpend", state.totalSpendCategories)
  
  const percentCalculator = (num, den) => {
    console.log('VALUES: ', num, den)
    const number1 = Number(num.replace(/[^0-9.-]+/g, ""));
    const number2 = Number(den.replace(/[^0-9.-]+/g, ""));

    return (number1 / number2) * 100;
  };
  
  const checkSpend = (spendArray, category) => {
    for (const spend of spendArray) {
      if (spend.id === category.category_id) {
        return percentCalculator(spend.sum, category.spend_limit);
      }
    }
  }

  const getExpensesByCategory = (expenseArray, categoryId) => {
    console.log("EXPENSEARRAY:", expenseArray);
    for (const expense of expenseArray) {
      //console.log("EXPENSE OUTSIDE:", expense.category_id, "CATEGORYID:", categoryId);
      if (expense.category_id === categoryId) {
        console.log("EXPENSE:", expense);
        return <BudgetExpense key={expense} payee={expense.payee} name={expense.expense_name} amount_paid={expense.amount_paid} cost={expense.cost}/>
      }
    }
  }

  //const generateCategories = (categoriesArray, )
  //iterate through categories that belong to the current budget generating a category component for each
  const newBudget = state.categories.map(category => {
    return(
      <div className="category-container">
        <BudgetCategory spend_limit={category.spend_limit} name={category.name} currentValue={checkSpend(state.totalSpendCategories, category)}/>
        <div className="expense-container">
          {getExpensesByCategory(state.expenses, category.category_id)}
        </div>
      </div>
    )
  })
  
  return (
    <div>
      {newBudget}
    </div>
    
  )
}



//Within the categories render loop through the expenses array whenever categories.id