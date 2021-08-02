import { useState, useEffect } from "react";
import axios from "axios";

export default function useUserData(initial) {
  const [userState, setUserState] = useState({
    values: [],
  });

  useEffect(() => {
    //This needs to be modularized with sessionToken.token in the get request
    axios.get('http://localhost:3002/api/users/').then(res => {
      const users = res.data;
      const temp = [];
      users.map(ele => {
        if(ele.id === 1) {
          temp.push([ele.name, ele.income])
        }
        return ele;
      })
      setUserState(prev => ({...prev, values: temp}))
    });
  }, []);

  return { userState }
}