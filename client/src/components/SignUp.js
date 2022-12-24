import React, { useState } from "react";
import Axios from "axios";
import Cookies from "universal-cookie";
import { StreamChat } from "stream-chat";


function SignUp({ setIsAuth }) {
  const cookies = new Cookies();
  const [user, setUser] = useState({});
  const [showError, setShowError] = useState(false);
  const serverClient = StreamChat.getInstance("ybjc4u29rz4j","6r5hf3x2dwxbkdxgg3rujxwt4m3gysb6kz2pvs8z8fk8pnf8ybee7jrtw9wkqqjg");



  const signUp = async (e) => {
    e.preventDefault();
    console.log(Object.keys(user).length)

    // const response = await serverClient.queryUsers({ name: { $autocomplete: 'vishnu' } });
    // console.log(response)
    // e.preventDefault()

    if(Object.keys(user).length) {
      setShowError(true)
      return false;
    } else {
      Axios.post("http://localhost:3001/signup", user).then((res) => {
        const { token, userId, yourName, email, username, password } =
        res.data;
        console.log(token,"userid",userId);
        cookies.set("token", token);
        cookies.set("userId", userId);
        cookies.set("username", username);
        cookies.set("yourName", yourName);
        cookies.set("email", email);
        cookies.set("password", email);
        setIsAuth(true);
      }).catch((e) => {
        console.log("This is the error", e)
      });
    }


  };
  return (
    <form className="mt--40" onSubmit={signUp}>
      <div>
        <div className="mb--15">
          <label className="mb--10">Your name</label>
          <input
            placeholder="Your Name"
            type="text"
            onChange={(event) => {
              setUser({ ...user, yourName: event.target.value });
            }}
          />
        </div>

        <div className="mb--15">
          <label className="mb--10">Username</label>
          <input
            placeholder="Username"
            onChange={(event) => {
              setUser({ ...user, username: event.target.value });
            }}
          />
        </div>

        <div className="mb--15">
          <label className="mb--10">Email</label>
          <input
            placeholder="Email"
            type="email"
            onChange={(event) => {
              setUser({ ...user, email: event.target.value });
            }}
          />
        </div>

        <div className="mb--15">
          <label className="mb--10">Password</label>
          <input
            placeholder="Password"
            type="password"
            onChange={(event) => {
              setUser({ ...user, password: event.target.value });
            }}
          />
        </div>
      </div>
      {showError && <span className="message--error message">Enter correct details.</span>}
      <button className="btn btn--yellow mt--20" type="submit"> Register </button>
    </form>
  );
}

export default SignUp;
