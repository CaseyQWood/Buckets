import { useState, useEffect } from "react";
import axios from "axios";

export default function useUserData(initial) {
  const [userState, setUserState] = useState();

  const userId = parseInt(sessionStorage.token)
  console.log("********", userId);
  console.log("!!!!!!!!", userState);

    console.log("UserId: ", userId)
    axios.get(`http://localhost:3002/api/users/${userId}`)
    .then(res => {
      const user = res.data;
      setUserState(user);
      console.log("USER", userState)
    });

  return { userState }
}