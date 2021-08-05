import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "../styles/LoginForm.scss";

export default function LoginForm(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();
  function verifyLogin(email, password) {
    const url = "http://localhost:3002/api/users";

    axios.get(url).then((res) => {
      res.data.forEach((user) => {
        if (user.email === email && user.password === password) {
          sessionStorage.setItem("token", user.id);
          sessionStorage.setItem("firstName", user.first_name);
          sessionStorage.setItem("lastName", user.last_name);
        }
      });
    });
  }

  return (
    <div className="user-login">
      <div className="login">
        <h3>Login</h3>
        <form>
          <input
            className="input-field"
            placeholder="Email"
            type="text"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </form>
        <form>
          <input
            className="input-field"
            placeholder="Password"
            type="text"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </form>
        <div>
          <button className="submit-button" onClick={(res) => verifyLogin(email, password)}>Log in</button>
        </div>
        <div>
          <button className="submit-button">Register</button>
        </div>
      </div>
    </div>
  );
}
