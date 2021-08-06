import React, { useState } from "react";
import "../styles/LoginForm.scss";

export default function LoginForm(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
          <button className="submit-button" onClick={() => props.verifyLogin(email, password)}>
            Log in
          </button>
        </div>
        <div>
          <button className="submit-button">Register</button>
        </div>
      </div>
    </div>
  );
}
