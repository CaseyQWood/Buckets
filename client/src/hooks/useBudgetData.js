import { useState, useEffect } from "react";
import axios from "axios";

export default function useBudget(initial) {
  const [budgetState, setBudgetState] = useState([]);
  const userId = parseInt(sessionStorage.token);

    useEffect(() => {
      axios.get(`http://localhost:3002/api/budgets/all/${userId}`)
      .then(res => {
      const budget = res.data;
      setBudgetState(prev => (budget))
    });
    }, [])

  return { budgetState }
};