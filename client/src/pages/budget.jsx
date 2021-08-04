import React, { useEffect, useState } from "react";
import BudgetCategory from "../components/budgetCategory";
import BudgetExpense from "../components/budgetExpense";

import useBudget from "../hooks/useBudgetData";

import { Grid, Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import "../styles/budget.scss";

export default function Budget() {
  const { budgetState } = useBudget();
  const [flip, setFlip] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const getExpensesByCategory = (data, cat_id) => {
    const container = [];
    data.forEach((x) => {
      if (x.category_id === cat_id) {
        container.push({
          name: x.expense_name,
          spendingLimit: x.spending_limit,
          amountPaid: x.amount_paid,
          payee: x.payee,
          cost: x.cost,
        });
      }
    });
    return container;
  };

  /* takes in array of objects (data)
  creates container that is a array of objects
  loops through (data)
  adds category object if object with same name doesnt already exsist 


  */
  const categoryFilter = (data) => {
    let returnObject = {};

    data.forEach((each) => {
      if (Object.keys(returnObject).includes(each.category_name)) {
        returnObject[each.category_name] = [
          ...returnObject[each.category_name],
          each,
        ];
      } else {
        returnObject[each.category_name] = [each];
      }
    });
    console.log(returnObject);
    return returnObject;
    // const container = []

    // console.log('this is data',data)

    // data.forEach(exp => {
    //   console.log('this is exp', exp)

    //     if(!Object.keys(container).includes(container)) {

    //       container.push({
    //         categoryId: exp.category_id,
    //         categoryName: exp.category_name,
    //         spendingLimit: exp.spending_limit,
    //         amountPaid: exp.amount_paid
    //       })

    //     }

    // })
    // console.log('container',container)
    // return container
  };

  const percentCalculator = (val1, val2) => {
    const number1 = Number(val1.replace(/[^0-9.-]+/g, ""));
    const number2 = Number(val2.replace(/[^0-9.-]+/g, ""));

    return (number1 / number2) * 100;
  };
  const test = "test";
  // console.log(percentCalculator('$350.00', "$1,000.00"))
  console.log("*******", budgetState);
  console.log("%%%%%", categoryFilter(budgetState));

  const categoryFilterKeys = Object.keys(categoryFilter(budgetState));
  const categories = categoryFilterKeys.map((category) => {
    return (
      <div key={category} onClick={() => setSelectedCategory(category)}>
        {category}
      </div>
    );
  });

  //const categories = categoryFilter(budgetState).map((oneExpenseData, index) => {
  // return (
  //   <div key={index} id="category-container">
  //     <div className="category" style={{background:'lightgrey'}}>
  //       <BudgetCategory name={oneExpenseData.categoryName} currentValue={percentCalculator(oneExpenseData.amountPaid, oneExpenseData.spendingLimit)} maxValue={oneExpenseData.spendingLimit} setFlip={setFlip} flip={flip}/>
  //     </div>
  //     <div className="expenses-container">

  //       {flip ? <div className="expenses">
  //         <h2>Current Expenses</h2>
  //         {getExpensesByCategory(budgetState, oneExpenseData.categoryId).map(x => <BudgetExpense name={x.name} cost={x.cost} />)}
  //       </div> : <div></div>}

  //       <Fab color="primary" aria-label="add">
  //           <AddIcon />
  //         </Fab>
  //     </div>
  //   </div>
  // )
  // })
  console.log("this is here", categoryFilter(budgetState)[selectedCategory]);
  return (
    <Grid>
      <div className="budget-container" style={{ background: "orange" }}>
        <div className="budget-name">
          <h2>New Budget</h2>
        </div>
        <div id="category-container">
          {categories}
          <ul>
            {selectedCategory &&
              categoryFilter(budgetState)[selectedCategory].map((expense) => {
                return <li key={expense.expense_name}>{expense.expense_name}</li>;
              })}
          </ul>
          </div>
      </div>
    </Grid>
  );
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

// const categoryFilter = (data) => {
//   const container = []

//   console.log('this is data',data)

//   console.log(Object.keys(container))

//   data.forEach(exp => {
//     if(!Object.keys(container).includes(exp.categories_name)) {
//       container.push({
//         categoryId: exp.category_id,
//         categoryName: exp.category_name,
//         spendingLimit: exp.spending_limit,
//         amountPaid: exp.amount_paid
//       })
//     }
//   })
//   console.log('container',container)
//   return container
// }
