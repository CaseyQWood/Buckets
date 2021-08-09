import React, { useState } from "react";
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
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
            type="password"
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

        <div className="other-sign-in">
          <h5>Sign in with</h5>
          <InstagramIcon/>
          <FacebookIcon />
          <TwitterIcon />
        </div>
      </div>
    </div>
  );
}
