import React from 'react'
import "../App.css";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";
import { useState } from "react";
import JoinGame from "../components/JoinGame";
import Title from '../components/Title';

const Home = () => {
    const api_key = "ybjc4u29rz4j";
    const cookies = new Cookies();
    const token = cookies.get("token");
    const client = StreamChat.getInstance(api_key);
    const [isAuth, setIsAuth] = useState(false);

    const [isLogin, setIsLogin] = useState(false);
    const [isRegister, setIsRegister] = useState(false);
    const [newGame, setNewGame] = useState(false);

    const logOut = () => {
        setNewGame(false)
        cookies.remove("token");
        cookies.remove("userId");
        cookies.remove("firstName");
        cookies.remove("email");
        cookies.remove("password");
        cookies.remove("channelName");
        cookies.remove("username");
        client.disconnectUser();
        setIsAuth(false);
    };

    if (token) {
        client
            .connectUser(
                {
                    id: cookies.get("userId"),
                    name: cookies.get("username"),
                    yourName: cookies.get("yourName"),
                    email: cookies.get("email"),
                    password: cookies.get("password"),
                },
                token
            )
            .then((user) => {
                setIsAuth(true);
            });
    }
    return (
        <>
            {isAuth ? (

                <>
                    {
                        !newGame ?
                        <section className='container--fluid font--center homepage center'>
                            <h2 className="fs--70 font--normal font--family-bilbo">Your Games</h2>
                            <button onClick={() => setNewGame(true)} className="btn btn--yellow mt--20">Start a new game</button>
                        </section>
                        :
                        <section className="container--fluid">
                            <button className='back' onClick={() => setNewGame(false)}>
                                <img className="piece" src={require(`../assets/images/back.jpg`)} alt="back" />
                            </button>
                            <Chat client={client}>
                                <JoinGame />
                            </Chat>
                        </section>
                    }
                </>
            ) : (
                <>
                    {
                        !isLogin && !isRegister ?
                        <section className="container--fluid font--center homepage">
                            <div className='mt--100'>
                                <span className='fs--30 font--normal font--family-bilbo'>async</span>
                                <h1 className='fs--80 font--normal font--family-bilbo'>tic tac <br /> toe</h1>
                            </div>
                            <div className='homepage--buttons mb--20'>
                                <button onClick={() => setIsLogin(true)} className="btn btn--yellow mt--100">Login</button>
                                <button onClick={() => setIsRegister(true)} className="btn btn--blue mt--20">Register</button>
                            </div>
                        </section>
                        : null
                    }
                    {
                        isLogin &&
                        <section className='container--fluid'>
                            <button className='back' onClick={() => setIsLogin(false)}>
                                <img className="piece" src={require(`../assets/images/back.jpg`)} alt="back" />
                            </button>
                            <Title title="Login" heading="Please enter your details" />
                            <Login setIsAuth={setIsAuth} />
                        </section>
                    }
                    {
                        isRegister &&
                        <section className='container--fluid'>
                            <button className='back' onClick={() => setIsRegister(false)}>
                                <img className="piece" src={require(`../assets/images/back.jpg`)} alt="back" />
                            </button>
                            <Title title="Create account" heading="Let’s get to know you better!" />
                            <SignUp setIsAuth={setIsAuth} />
                        </section>
                    }
                </>
            )}
        </>

    )
}

export default Home