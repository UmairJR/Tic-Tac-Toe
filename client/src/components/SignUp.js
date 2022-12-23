import React, { useState } from "react";
import Axios from "axios";
import Cookies from "universal-cookie";
import { StreamChat } from "stream-chat";


function SignUp({ setIsAuth }) {
  const cookies = new Cookies();
  const [user, setUser] = useState(null);
  const serverClient = StreamChat.getInstance("ybjc4u29rz4j","6r5hf3x2dwxbkdxgg3rujxwt4m3gysb6kz2pvs8z8fk8pnf8ybee7jrtw9wkqqjg");
  
  
  
  const signUp = async (e) => {
    const response = await serverClient.queryUsers({ name: { $autocomplete: 'vishnu' } });
    console.log(response)
    e.preventDefault()
    Axios.get("http://localhost:3001/signup").then((res) => {
      const { token, userId, yourName, email, username, password } = res.data;
      console.log(res.data);
      setIsAuth(true);
    });
    // Axios.post("http://localhost:3001/signup", user).then((res) => {
    //   const { token, userId, yourName, email, username, password } =
    //   res.data;
    //   console.log(token,"userid",userId);
    //   cookies.set("token", token);
    //   cookies.set("userId", userId);
    //   cookies.set("username", username);
    //   cookies.set("yourName", yourName);
    //   cookies.set("email", email);
    //   cookies.set("password", password);
    //   setIsAuth(true);
    // });
    
    
  };
  return (
    <form onSubmit={signUp} className="signUp">
      <label> Sign Up</label>
      {/* firstname */}
      <input
        placeholder="Your Name"
        type="text"
        // required
        onChange={(event) => {
          setUser({ ...user, yourName: event.target.value });
        }}
      />
      
      <input
        placeholder="Username"
        // required
        onChange={(event) => {
          setUser({ ...user, username: event.target.value });
        }}
      />
      <input
        placeholder="Email"
        type="email"
        // required
        onChange={(event) => {
          setUser({ ...user, email: event.target.value });
        }}
      />
      <input
        placeholder="Password"
        type="password"
        // required
        onChange={(event) => {
          setUser({ ...user, password: event.target.value });
        }}
      /> 
      <button type="submit"> Sign Up</button>
    </form>
  );
}

export default SignUp;
