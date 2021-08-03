import { useState, useEffect } from "react";
import axios from "axios";

export default function useBudget(initial) {
  const [budgetData, setBudgetData] = useState({
    budgetData: []
  });

  const userId = parseInt(sessionStorage.token);
  console.log('this is ID', userId)

  useEffect(() => {
    return new Promise ((resolve, reject) => {
      axios.get(`http://localhost:3002/api/budgets/all/${userId}`)
      .then(res => {
        const budget = res.data;
        console.log('inner test', budget)
        setBudgetData(prev => ({...prev, budgetData: budget}))
      })
      .catch((err) => {console.error(err)});
      }, [])
    });

  return { budgetData }
}