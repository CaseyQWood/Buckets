import { useState, useEffect } from "react";
import axios from "axios";

export default function useActiveData(initial) {
  const[state, setState] = useState({
    categories: [],
    expenses: [],
    totalSpendCategories: [],
    budget_id: null
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
      const budget_id = all[2].data[0].budget_id;
      setState(prev => ({...prev, categories, expenses, totalSpendCategories, budget_id }))
    })
  }, [])

  const deleteExpense = (id) => {
    return axios.delete(`http://localhost:3002/api/expenses/${id}`)
      .then(() => {
        Promise.all([
          axios.get(`http://localhost:3002/api/budgets/all/expenses/${userId}`),
          axios.get(`http://localhost:3002/api/budgets/all/categories/${userId}`),
          axios.get(`http://localhost:3002/api/budgets/all/totalbycategory/${userId}`)
        ]).then((all) => {
          const expenses = all[0].data;
          const categories = all[1].data;
          const totalSpendCategories = all[2].data;
          setState(prev => ({...prev, expenses, categories, totalSpendCategories}))
        })
      });
  }

  const deleteCategory = (id) => {
    return axios.delete(`http://localhost:3002/api/categories/${id}`)
      .then(() => {
          Promise.all([
            axios.get(`http://localhost:3002/api/budgets/all/expenses/${userId}`),
            axios.get(`http://localhost:3002/api/budgets/all/categories/${userId}`),
            axios.get(`http://localhost:3002/api/budgets/all/totalbycategory/${userId}`)
          ]).then((all) => {
            const expenses = all[0].data;
            const categories = all[1].data;
            const totalSpendCategories = all[2].data;
            setState(prev => ({...prev, expenses, categories, totalSpendCategories}))
          })
      });
  };

  const createNewCategory = (category) => {
    return axios.post('http://localhost:3002/api/categories/', category)
      .then(() => {
        Promise.all([
          axios.get(`http://localhost:3002/api/budgets/all/categories/${userId}`),
          axios.get(`http://localhost:3002/api/budgets/all/totalbycategory/${userId}`)
        ]).then((all) => {
          const categories = all[0].data;
          const totalSpendCategories = all[1].data;
          setState(prev => ({...prev, categories, totalSpendCategories}))
        })
      })
  };

  const createNewExpense = (expense) => {
    return axios.post('http://localhost:3002/api/expenses/', expense)
    .then(() => {
      Promise.all([
        axios.get(`http://localhost:3002/api/budgets/all/expenses/${userId}`),
        axios.get(`http://localhost:3002/api/budgets/all/categories/${userId}`),
        axios.get(`http://localhost:3002/api/budgets/all/totalbycategory/${userId}`)
      ]).then((all) => {
        const expenses = all[0].data;
        const categories = all[1].data;
        const totalSpendCategories = all[2].data;
        setState(prev => ({...prev, expenses, categories, totalSpendCategories}))
      })
    })
  }

  return { state, deleteExpense, deleteCategory, createNewCategory, createNewExpense }
}