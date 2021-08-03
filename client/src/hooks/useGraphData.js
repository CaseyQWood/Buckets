import { useState, useEffect } from "react";
import axios from "axios";
import budgetsRoutes from "../../../server/src/routes/budgets";

//export default function useCategoryData(initial) {
//  const [categoryState, setCategoryState] = useState({
//    nameValues: [],
//    spendingLimits: [],
//    actualSpends: []
//  });
//
//  const userId = sessionStorage.token;
//  //Grab name values
//  useEffect(() => {
//    Promise.all([
//      axios.get('http://localhost:3002/api/budgets'),
//      axios.get('http://localhost:3002/api/categories'),
//      axios.get('http://localhost:3002/api/expenses'),
//    ]).then((all) => {
//      const nameValues = all[0].data.map((ele) => {
//        if (ele.user_id = UserId) {
//          return [ele.name, ele.id]
//        }
//        return 0;
//      })
//      const expectedSpend = 
//    })
//  }, []);
//
//  return { categoryState }
//}