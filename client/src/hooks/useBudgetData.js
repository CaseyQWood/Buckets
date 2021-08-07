import { useState, useEffect } from "react";
import axios from "axios";

export default function useBudget(initial) {
  const [budgetState, setBudgetState] = useState({
    budgetData: []
  });

  const userId = parseInt(sessionStorage.token);

  useEffect(() => {
    axios.get(`http://localhost:3002/api/budgets/all/${userId}`).then(res => {
      const budget = res.data;
      setBudgetState(prev => ({...prev, budgetData: budget}))
    });
  }, []);

  return { budgetState }
};