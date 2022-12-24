import React, { useEffect, useState } from "react";
import Board from "./Board";
import { Window, MessageList, MessageInput } from "stream-chat-react";
import "./Chat.css";
import { UserFromToken } from "stream-chat";
function Game({channel, setChannel }) {
  const [playersJoined, setPlayersJoined] = useState(
    channel.state.watcher_count === 2
  );
  const [rivalUsername,setRivalUsername] = useState("")
  
  useEffect(() => {
console.log(channel)
const members = channel.state.members

for (const member in members) {
  // console.log(members[member.user[0].name])
  if(channel.state.membership.user.email != members[member].user.email)
  {
    console.log(members[member])
    setRivalUsername(members[member].user.name)
  }
  

  
}


  }, [])
  const [result, setResult] = useState({ winner: "none", state: "none" });

  channel.on("user.watching.start", (event) => {
    setPlayersJoined(event.watcher_count === 2);
  });
  if (!playersJoined) {
    return <div> Waiting for other player to join...</div>;
  }


  return (

    <div className="gameContainer">
      Game with player {rivalUsername}

      <Board result={result} setResult={setResult} />
      {/* <Window>
        <MessageList
          disableDateSeparator
          closeReactionSelectorOnClick
          hideDeletedMessages
          messageActions={["react"]}
        />
        <MessageInput noFiles />
      </Window> */}
      <button
        onClick={async () => {
          await channel.stopWatching();
          setChannel(null);
        }}
      >
        {" "}
        Leave Game
      </button>
      {result.state === "won" && <div> {result.winner} Won The Game</div>}
      {result.state === "tie" && <div> Game Tieds</div>}
    </div>
  );
}

export default Game;
