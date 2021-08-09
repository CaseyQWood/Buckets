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
      console.log('this is ALL', all)
      const categories = all[0].data;
      const expenses = all[1].data;
      const totalSpendCategories = all[2].data;
      const budget_id = all[2].data[0] ? all[2].data[0].budget_id : 0;
      setState(prev => ({...prev, categories, expenses, totalSpendCategories, budget_id }))
    })
  }, [])

  const updateCurrentBudget = () => {
      Promise.all([
        axios.get(`http://localhost:3002/api/budgets/all/categories/${userId}`),
        axios.get(`http://localhost:3002/api/budgets/all/expenses/${userId}`),
        axios.get(`http://localhost:3002/api/budgets/all/totalbycategory/${userId}`)
      ]).then((all) => {
        
        const categories = all[0].data;
        const expenses = all[1].data;
        const totalSpendCategories = all[2].data;
        const budget_id = all[2].data[0] ? all[2].data[0].budget_id : 0;
        setState(prev => ({...prev, categories, expenses, totalSpendCategories, budget_id }))
      })
  
  }

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

  const editCategory = (category) => {
    return axios.put(`http://localhost:3002/api/categories/${category.category_id}`, category)
    .then(() => {
        console.log("IN EDIT CATEGORY", category)
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

  const editExpense = (expense) => {
    return axios.put(`http://localhost:3002/api/expenses/${expense.category_id}`, expense)
    .then(() => {
        console.log("IN EDIT CATEGORY", expense)
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

  

  return { state, updateCurrentBudget, deleteExpense, deleteCategory, createNewCategory, createNewExpense, editCategory, editExpense }
}