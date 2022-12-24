import React, { useState } from "react";
import Axios from "axios";
import Cookies from "universal-cookie";
import '../App.css'

function Login({ setIsAuth }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);

  const cookies = new Cookies();
  const login = (e) => {
    e.preventDefault();
    if(username == '' && password == '') {
      setShowError(true)
      return false
    } else {
      Axios.post("http://localhost:3001/login", {
        username,
        password,
      }).then((res) => {
        const { firstName, email, username, token, userId } = res.data;
        cookies.set("token", token);
        cookies.set("userId", userId);
        cookies.set("username", username);
        cookies.set("firstName", firstName);
        cookies.set("email", email);
        setIsAuth(true);
        setShowError(false)
      });
    }
  };
  return (
    <form className="form--login mt--40" onSubmit={login}>
      <div>
        <label className="mb--10"> Username</label>
        <input
          placeholder="Type your username here"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
          />
        <label className="mt--15 mb--10"> Password </label>
        <input
          placeholder="Type your password here"
          type="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
      </div>
      <div>
        {showError && <span className="message--error message">Enter correct details.</span>}
        <button type="submit" className="btn btn--yellow mt--20">Login</button>
      </div>
    </form>
  );
}

export default Login;
