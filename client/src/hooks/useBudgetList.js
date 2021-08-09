import { useState, useEffect } from "react";
import axios from "axios";

export default function useBudgetList(initial) {
  const [budgetListState, setBudgetListState] = useState({
    budgetListData: []
  });

  const userId = parseInt(sessionStorage.token);

  useEffect(() => {
    axios.get(`http://localhost:3002/api/budgets/list/${userId}`).then(res => {
      const budget = res.data;
      setBudgetListState(prev => ({...prev, budgetListData: budget}))
    });
  }, []);

  return { budgetListState }
};