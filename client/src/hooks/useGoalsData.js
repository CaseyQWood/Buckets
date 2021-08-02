import { useState, useEffect } from "react";
import axios from "axios";

export default function useGoalData(initial) {
  const [goalState, setGoalState] = useState({
    values: [],
  });

  useEffect(() => {
    axios.get('http://localhost:3002/api/goals').then(res => {
      const goals = res.data;
      const temp = [];
      goals.map(ele => {
        if(ele.user_id === 1) {
          temp.push([ele.name, ele.amount_to_goal])
        }
        return ele;
      })
      setGoalState(prev => ({...prev, values: temp}))
    });
  }, []);

  return { goalState }
}