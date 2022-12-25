import React, { useEffect, useState } from "react";
import Board from "./Board";
import { Window, MessageList, MessageInput } from "stream-chat-react";
import "./Chat.css";
import { UserFromToken } from "stream-chat";
function Game({ channel, setChannel }) {
  const [playersJoined, setPlayersJoined] = useState(
    channel.state.watcher_count === 2
  );
  const [rivalUsername, setRivalUsername] = useState("")

  useEffect(() => {
    const members = channel.state.members

    for (const member in members) {
      if (channel.state.membership.user.email != members[member].user.email) {
        setRivalUsername(members[member].user.name)
      }



    }
  }, [])
  const [result, setResult] = useState({ winner: "none", state: "none" });

  channel.on("user.watching.start", (event) => {
    setPlayersJoined(event.watcher_count === 2);
  });

  if (!playersJoined) {
    return <div className="font--center"> Waiting for other player to join...</div>;
  }


  return (
    <div className="gameContainer">
      <h2 className="fs--25 font--bold">Game with {rivalUsername}</h2>


      <Board result={result} setChannel={setChannel} setResult={setResult} />
      
    </div>
  );
}

export default Game;
