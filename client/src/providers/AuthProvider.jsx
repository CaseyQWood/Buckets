import { createContext, useState } from "react";

export default function AuthProvider(props) {
  // set initial sate for user and authentication
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState({email: "", password: "", name: ""});

  // verify login process for user
  const login = (email, password) => {
    const firstName = sessionStorage.firstName;
    const lastName = sessionStorage.lastName;
    const userName = `${firstName}, ${lastName}`;
    console.log("login email!!!!", email);
    console.log("login pass", password);
    setUser({email, password, name: userName});
    setAuth(true);
    console.log("user from authProv", user);
    console.log("auth from authProv", auth);
  }

  const logout = (email, password) => {
    setUser({ email: "", name: "" });
    setAuth(false);
  }

  // authContext shares items tochildren
  const userData = {auth, user, login, logout};

  return (
    <authContext.Provider value={userData}>
      {props.children}
    </authContext.Provider>
  )
}

export const authContext = createContext();