import { useState, useEffect } from "react";
import axios from "axios";

export default function useActiveData(initial) {
  const[state, setState] = useState({
    categories: [],
    expenses: [],
    totalSpendCategories: []
  });

  useEffect(() => {
    Promise.all([
      axios.get(''),
      axios.get(''),
      axios.get(''),
    ]),then((all) => {
      const categories = all[0].data;
      const expenses = all[1].data;
      const totalSpendForCategories = all[2];
      setState(prev => ({...prev, categories, expenses, totalSpendCategories }))
    })
  }, [])

  return { state }
}