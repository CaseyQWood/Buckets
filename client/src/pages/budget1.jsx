import React, {useState, useRef, Suspense} from 'react';
import useActiveData from '../hooks/useActiveData';
import ShareBudget from '../components/ShareBudgetsModal'
import BudgetCategory from '../components/budgetCategory';
import BudgetExpense from '../components/budgetExpense';
import NewCategory from '../components/NewCategory';
import NewExpense from '../components/NewExpense';
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber';
import SotChest from '../3dobjects/SotChest';

import "../styles/budget.scss";
import { OrbitControls } from '@react-three/drei';

//Create a React page that renders categories, and expenses by category
export default function Budget1() {
  //Collect Categories, and expenses using a PromiseAll hook
  const [open, setOpen] = useState(true);
  const {state, deleteExpense, deleteCategory, createNewCategory, createNewExpense, editCategory, editExpense } = useActiveData();
  const[activeCategory, setActiveCategory] = useState(null);

  const percentCalculator = (num, den) => {
    const number1 = num ? Number(num.replace(/[^0-9.-]+/g, "")) : 0.0;
    const number2 = den ? Number(den.replace(/[^0-9.-]+/g, "")) : 0.0;

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
      if (expense.category_id === categoryId && expense.category_id === activeCategory) {
        expensesArray.push(
          <BudgetExpense 
            key={expense.expense_id} 
            payee={expense.payee} 
            name={expense.expense_name} 
            amount_paid={expense.amount_paid} cost={expense.cost} 
            onDelete={() => deleteExpense(expense.expense_id)}
            onEdit={editExpense}
            categoryId={expense.category_id}
          />);
      }
    }
    //Push a new category Component here
    if (categoryId === activeCategory) {
      expensesArray.push(<NewExpense category_id={categoryId} onSave={createNewExpense}/>)
    };
    
    return expensesArray;
  }

  const handleClose = () => {
    setOpen(false);
  }

  //iterate through categories that belong to the current budget generating a category component for each
  const newBudget = state.categories.map(category => {
    console.log("WHAT IS THIS VALUE ", category.category_id);
    return(
      <div className="category-container" onClick={() => {
        if (activeCategory !== 0) {
          setActiveCategory(0);
        } else {
        setActiveCategory(category.category_id);
        }
      }
        }>
        <BudgetCategory 
        getExpensesByCategory={getExpensesByCategory} 
        expenses={state.expenses} 
        category_id={category.category_id} 
        onDelete={() => {deleteCategory(category.category_id)}} 
        spend_limit={category.spend_limit} name={category.category_name} 
        currentValue={checkSpend(state.totalSpendCategories, category)}
        onEdit={editCategory}
        />
      </div>
    )
  })

  function Plane(props) {

    const material = new THREE.ShadowMaterial();
    material.opacity = 0.2;
    return (
      <mesh material={material} rotation={[-Math.PI / 2, 0, 0]} {...props} castShadow receiveShadow>
        <planeBufferGeometry  args={[15,15]}/>         
      </mesh >
    )
  } 
  
  return (
    <div className='emperor'>
      <div className='r3f-chest'>
        <Canvas shadows camera={{angle: 0.5, position: [0.5, 0.1, 3.5] }}>
          <ambientLight intensity={0.9}/>
          <pointLight castShadow position={[-5, 10, 10]} intensity={0.5}  angle={1}/>
            <Suspense fallback={null}>
              {/* <OrbitControls/> */}
              <Plane position={[0, -1, 0]}/>
              <SotChest rotation={[0,-1.75,0]} position={[0,-1,0]} scale={0.02}/>
            </Suspense>
        </Canvas>
      </div>
      <div className="budget-container">
        <h3 className='header'>Incoming Templates: {<ShareBudget budgetId={state.budget_id}/>}</h3>
        <div className='category__container'>
          {newBudget}
          <NewCategory budget_id={state.budget_id} onSave={createNewCategory} onClose={handleClose}/>
        </div>
      </div>
    </div>
    
    
  )
}



//Within the categories render loop through the expenses array whenever categories.id