import { useState, useEffect } from "react";
import axios from "axios";

export default function useActiveData(initial) {
  const[state, setState] = useState({
    categories: [],
    expenses: [],
    totalSpendCategories: []
  });

  const userId = sessionStorage.token;

  useEffect(() => {
    Promise.all([
      axios.get(`http://localhost:3002/api/budgets/all/categories/${userId}`),
      axios.get(`http://localhost:3002/api/budgets/all/expenses/${userId}`),
      axios.get(`http://localhost:3002/api/budgets/all/totalbycategory/${userId}`)
    ]).then((all) => {
      const categories = all[0].data;
      const expenses = all[1].data;
      const totalSpendCategories = all[2].data;
      setState(prev => ({...prev, categories, expenses, totalSpendCategories }))
    })
  }, [])

  return { state }
}