import React, {useState} from 'react';

import useActiveData from '../hooks/useActiveData';

import BudgetCategory from '../components/budgetCategory';
import BudgetExpense from '../components/budgetExpense';
import NewCategory from '../components/NewCategory';
import NewExpense from '../components/NewExpense';

//Create a React page that renders categories, and expenses by category
export default function Budget1() {
  //Collect Categories, and expenses using a PromiseAll hook
  const {state, deleteExpense, deleteCategory, createNewCategory, createNewExpense } = useActiveData();
  const[activeCategory, setActiveCategory] = useState(null);
  console.log("ACTIVE CATEGORY: ", activeCategory)

  const percentCalculator = (num, den) => {
    const number1 = num ? Number(num.replace(/[^0-9.-]+/g, "")) : 0.0;
    const number2 = den ? Number(den.replace(/[^0-9.-]+/g, "")) : 0.0;
    console.log("N1: ", number1, "N2: ", number2)

    return ((number1 / number2) * 100).toFixed(2);
  };
  
  const checkSpend = (spendArray, category) => {
    for (const spend of spendArray) {
      if (spend.id === category.category_id) {
        return percentCalculator(spend.sum, category.spend_limit);
      }
    }
  }
  //Find a way to store all expenses and push those
  const getExpensesByCategory = (expenseArray, categoryId) => {
    const expensesArray = [];
    for (const expense of expenseArray) {
      //console.log("EXPENSE OUTSIDE:", expense.category_id, "CATEGORYID:", categoryId);
      if (expense.category_id === categoryId && expense.category_id === activeCategory) {
        expensesArray.push(<BudgetExpense key={expense.expense_id} payee={expense.payee} name={expense.expense_name} amount_paid={expense.amount_paid} cost={expense.cost} onDelete={() => deleteExpense(expense.expense_id)}/>);
      }
    }
    //Push a new category Component here
    if (categoryId === activeCategory) {
      expensesArray.push(<NewExpense category_id={categoryId} onSave={createNewExpense}/>)
    };
    
    return expensesArray;
  }

  //iterate through categories that belong to the current budget generating a category component for each
  const newBudget = state.categories.map(category => {
    return(
      <div className="category-container" onClick={() => {
        if (activeCategory !== 0) {
          setActiveCategory(0);
        } else {
        setActiveCategory(category.category_id);
        }
      }
        }>
        <BudgetCategory onDelete={() => {deleteCategory(category.category_id)}} spend_limit={category.spend_limit} name={category.category_name} currentValue={checkSpend(state.totalSpendCategories, category)}/>
        <div className="expense-container" >
          {getExpensesByCategory(state.expenses, category.category_id)}
        </div>
      </div>
    )
  })
  
  return (
    <div className="budget-container">
      {newBudget}
      <NewCategory budget_id={state.budget_id} onSave={createNewCategory}/>
      <button>SHARE</button>
    </div>
    
  )
}



//Within the categories render loop through the expenses array whenever categories.id