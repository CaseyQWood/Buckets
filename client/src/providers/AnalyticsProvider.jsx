import axios from "axios";
import { createContext, useState } from "react";

export default function AnalyticsProvider(props) {
  // shared state object
  const currentDate = Date.now();
  // const [dateFrom, setDateFrom] = useState(currentDate);
  // const [dateTo, setDateTo] = useState(currentDate);

  const userId = sessionStorage.token;
  // const [budget, setBudget] = useState();
  // const [goals, setGoals] = useState();

  const [state, setState] = useState({
    dateFrom: currentDate,
    dateTo: currentDate,
    budget: [],
    goals: [],
  })

  // change date format to yyyy-mm-dd
  function formatDate(date) {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

  // set date from
  const from = function(dateFrom) {
    setState({...dateFrom, dateFrom: formatDate(dateFrom)});
    // console.log("dateFrom---", formatDate(dateFrom));
  };

  // set date to
  const to = function(dateTo) {
    setState({...dateTo, dateTo: formatDate(dateTo)});
    // console.log("dateTo---", formatDate(dateTo));
  };

  // send request to api to retrive data from database
  const searchDate = (from, to) => {
    // retrive data from database
    Promise.all([
      axios.post(`http://localhost:3002/api/analytics/budget/${userId}`, {from , to}),
      axios.post(`http://localhost:3002/api/analytics/goals/${userId}`, {from , to})
    ]).then((all) => {
      const analyticsBudget = all[0].data;
      const analyticsGoals = all[1].data;

      // console.log("analyticsBudget--------", analyticsBudget);
      // console.log("analyticsGoals--------", analyticsGoals);

      setState({...state, budget: analyticsBudget, goals: analyticsGoals});
    })
}

  const providerData = { from, to, searchDate, budget: state.budget, goals: state.goals}
  return (
    <analyiticsContext.Provider value={providerData}>
      {props.children}
    </analyiticsContext.Provider>
  )
}

export const analyiticsContext = createContext();