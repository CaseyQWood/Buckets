import React, {useState, useRef, Suspense, createContext} from 'react';
import useActiveData from '../hooks/useActiveData';
import ShareBudget from '../components/ShareBudgetsModal'
import BudgetCategory from '../components/budgetCategory';
import BudgetExpense from '../components/budgetExpense';
import NewCategory from '../components/NewCategory';
import NewExpense from '../components/NewExpense';
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber';
import SotChest from '../3dobjects/SotChest';
import SplitButton from '../components/SelectBudget';
import useBudgetList from '../hooks/useBudgetList';
import { Physics } from '@react-three/cannon';
import ShadowPlane from '../3dobjects/ShadowPlane';
import Wall from '../3dobjects/PhysicsWalls'
import Bucket from '../3dobjects/PolyBucket';
import Coins from '../3dobjects/Coins';
import { OrbitControls } from '@react-three/drei';
import { Debug, usePlane } from '@react-three/cannon';

import "../styles/budget.scss";
import NavBar from "../components/NavBar.jsx";
import useVisiblity from "../hooks/useVisiblity";
import ChatButton from "../components/ChatButton";
import NewChat from "../components/NewChat";

const filterActiveBudget = (listOfBudgets, id) => {
  console.log(listOfBudgets)
  let container = ''
  listOfBudgets.forEach(x => x.id === id ? container = x.name : console.log('false') )
  return container
}

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

//Create a React page that renders categories, and expenses by category
export default function Budget1() {
  //Collect Categories, and expenses using a PromiseAll hook
  const { budgetListState } = useBudgetList();
  const [open, setOpen] = useState(true);
  const {state,updateCurrentBudget,  deleteExpense, deleteCategory, createNewCategory, createNewExpense, editCategory, editExpense , setState} = useActiveData();
  const[activeCategory, setActiveCategory] = useState(0);
  const [ChatComponent, toggleVisibility] = useVisiblity(<NewChat />, false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const budgetNames = (listOfBudgets) => {
    let container = []
    listOfBudgets.forEach(budget => {
      budget.active ? container.unshift(budget.name) : container.push(budget.name)
    })
    return container
  }

  const isActiveBudget = (element) => element === filterActiveBudget(budgetListState.budgetListData, state.budget_id);
  const defaultIndex = budgetNames(budgetListState.budgetListData).findIndex(isActiveBudget)

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
            amount_paid={expense.amount_paid}
            cost={expense.cost} 
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
  //This is never used 
  const handleClose = () => {
    setOpen(false);
  }
  const expand = (category_id) => {
    if (activeCategory !== 0) {
      setActiveCategory(0);
    } else {
      setActiveCategory(category_id);
    }
  }

  

  //iterate through categories that belong to the current budget generating a category component for each
  const newBudget = state.categories.map(category => {
    console.log("WHAT IS THIS VALUE ", activeCategory);

    function Plane() {
      const [ref] = usePlane(() => ({ mass: 0, rotation: [-Math.PI / 2, 0, 0], position: [0, -2, 0] }))
      return (
        <mesh ref={ref} />
      )
    }


    return(
      // <div className="category-container" onClick={() => {
      //   if (activeCategory !== 0) {
      //     setActiveCategory(0);
      //   } else {
      //   setActiveCategory(category.category_id);
      //   }
      // }
      //   }>
        <BudgetCategory 
          activeCategory={activeCategory}
          getExpensesByCategory={getExpensesByCategory} 
          expenses={state.expenses} 
          category_id={category.category_id} 
          onDelete={() => {deleteCategory(category.category_id)}} 
          spend_limit={category.spend_limit} name={category.category_name} 
          currentValue={checkSpend(state.totalSpendCategories, category)}
          onEdit={editCategory}
          expand={expand}
          
        />
      // </div>
    )
  })

  function Plane() {
    const [ref] = usePlane(() => ({ mass: 0, rotation: [-Math.PI / 2, 0, 0], position: [0, -2, 0] }))
    return (
      <mesh ref={ref} />
    )
  }

  
  return (
    <>
    <NavBar />
    <div className='emperor'>
      <div className='r3f-chest'>
        {/* <Canvas shadows camera={{angle: 0.5, position: [0.5, 0.1, 3.5] }}>
          <ambientLight intensity={0.9}/>
          <pointLight castShadow position={[-5, 10, 10]} intensity={0.5}  angle={1}/>
            <Suspense fallback={null}>
              <OrbitControls/>
              <Plane position={[0, -1, 0]}/>
              <SotChest rotation={[0,-1.75,0]} position={[0,-1,0]} scale={0.02}/>
            </Suspense>
        </Canvas> */}

        <Canvas shadows camera={{ position: [0, 0.5, 6], far: 500, fov: 60 }}>
          {/* <OrbitControls/> */}
          <pointLight castShadow position={[-5, 10, 10]} intensity={1.5} />
          <Physics>
            {/* <Debug> */}
            <Suspense>
              <Wall />
              <Plane position={[0, 45, 0]} />
              <Coins numOfCoins={10} />
              <Bucket scale={7} position={[0, -1.8, 0]} rotation={[0, Math.random() * 5, 0]} />
              <ShadowPlane position={[0, -3, 0]} />
            </Suspense>
            {/* </Debug> */}
          </Physics>
        </Canvas>

      </div>
      <div className="budget-container">
        <h3 className='header'>Current Categories: </h3>
        <div className="budget-buttons">
            <SplitButton
              state={state}
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
              currentBudgetId={state.budget_id}
              defaultId={defaultIndex}
              budgetList={budgetListState.budgetListData}
              updateCurrentBudget={updateCurrentBudget}
            />
            <div className="share-button">
              <ShareBudget budgetId={state.budget_id} className="share-budget-button"/>
            </div>
          </div>
        <div className='category__container'>
          {newBudget}
        </div>
        <NewCategory budget_id={state.budget_id} onSave={createNewCategory}/>
      </div>
    </div>
    <ChatButton onClick={toggleVisibility} />
        {ChatComponent}
    </>
    
  )
}



//Within the categories render loop through the expenses array whenever categories.id