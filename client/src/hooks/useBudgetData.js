import { useState, useEffect } from "react";
import axios from "axios";

export default function useBudget(initial) {
  const [budgetState, setBudgetState] = useState({
    budgetData: []
  });

  const userId = parseInt(sessionStorage.token);
  console.log('this is ID', userId)

  //const useBudgetData = (userId) => {
  //  useEffect(() => {
  //    return axios.get(`http://localhost:3002/api/budgets/all/${userId}`)
  //      .then(res => {
  //      const newBudgetData = res.data;
  //      setBudgetData(prev => ({...prev, budgetData: newBudgetData}))
  //    })
  //  }, [budgetData])
  //}
//
  //return { budgetData, useBudgetData, setBudgetData }
  const getBudgetData = (userId) => {
    return axios.get(`http://localhost:3002/api/budgets/all/1`).then(res => {
      const budget = res.data;
      console.log('inside',budget)
      setBudgetState(prev => ({...prev, budgetData: budget}))
    });
  }



  return { getBudgetData }
};