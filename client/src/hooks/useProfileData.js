import { useEffect, useState } from "react";
import axios from "axios";

export default function useProfileState() {
  console.log("RENDERING PROFILE STATE COMPONENT")
  const [profileState, setProfileState] = useState({
    goals: [],
    expectedSpends: [],
    actualSpends: [],
    user: []
  });

  const [userState, setUserState] = useState([]);
  console.log("profile state line 12: ", profileState)
  const userId = sessionStorage.token;
  console.log("IN PROFILE DATA", userId)

  useEffect(() => {
    console.log("IN USE EFFECT")
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
  
  console.log("PROFILE STATE IN DATA: ", profileState);
  return { profileState, userState };
}
