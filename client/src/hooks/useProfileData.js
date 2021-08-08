import { useEffect, useState } from "react";
import axios from "axios";

export default function useProfileState() {
  const [profileState, setProfileState] = useState({
    goals: [],
    expectedSpends: [],
    actualSpends: [],
    user: []
  });

  const [userState, setUserState] = useState([]);
  const userId = sessionStorage.token;

  useEffect(() => {
    Promise.all([
      axios.get(`http://localhost:3002/api/goals/all/${userId}`),
      axios.get(`http://localhost:3002/api/budgets/all/expectedbudget/${userId}`),
      axios.get(`http://localhost:3002/api/budgets/all/actualbudget/${userId}`),
      axios.get(`http://localhost:3002/api/users/${userId}`)
    ]).then((all) => {
      const goals = all[0].data;
      const expectedSpends = all[1].data;
      const actualSpends = all[2].data;
      const user = all[3].data;
      setProfileState(prev => ({...prev, goals, expectedSpends, actualSpends, user}))
      setUserState(user)
    }).catch(error => {
      console.log("ERROR: ", error.message)
    })
  }, []);

  const addGoal = (goal) => {
    return axios.post('http://localhost:3002/api/goals/', goal)
      .then(() => {
        return axios.get(`http://localhost:3002/api/goals/all/${userId}`)
          .then((response) => {
            const goals = response.data;
            setProfileState(prev => ({...prev, goals}))
          })
      })
  }
  
  return { profileState, userState, addGoal };
}
