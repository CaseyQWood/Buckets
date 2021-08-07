import { useState} from "react";
import axios from "axios";

export default function useUserData(initial) {
  const [userState, setUserState] = useState();

  const userId = parseInt(sessionStorage.token)


    axios.get(`http://localhost:3002/api/users/${userId}`)
    .then(res => {
      const user = res.data;
      setUserState(user);
    });

  return { userState }
}