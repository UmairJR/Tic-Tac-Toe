import React, { useState } from "react";
import { useChatContext, Channel } from "stream-chat-react";
import Game from "./Game";
import CustomInput from "./CustomInput";
function JoinGame() {
  // const [rivalUsername, setRivalUsername] = useState("");
  const [rivalEmail, setRivalEmail] = useState("");
  const { client } = useChatContext();
  const [channel, setChannel] = useState(null);
  // const rivalUsername = response.users[0].name
  const createChannel = async () => {
    // const response = await client.queryUsers({ name: { $eq: rivalUsername } });
    const response = await client.queryUsers({ email: { $eq: rivalEmail } });

    if (response.users.length === 0) {
      alert("User not found");
      return;
    }

    
    const newChannel = await client.channel("messaging", {
      members: [client.userID, response.users[0].id],
      
    });
  
    // console.log(response.users[0].name);
    await newChannel.watch();
    setChannel(newChannel);
    // console.log("Channel:",newChannel);
  };
  return (
    <>
      {channel ? (
        <Channel channel={channel} Input={CustomInput}>
          {/* <Game rivalUsername={rivalUsername} channel={channel} setChannel={setChannel} /> */}
          <Game rivalEmail={rivalEmail} channel={channel} setChannel={setChannel} />
        </Channel>
      ) : (
        <div className="joinGame">
          <h4>Create Game</h4>
          {/* <input
            placeholder="Username of rival..."
            onChange={(event) => {
              setRivalUsername(event.target.value);
            }}
          /> */}
          <input
            placeholder="Email of rival..."
            onChange={(event) => {
              setRivalEmail(event.target.value);
            }}
          />
          <button onClick={createChannel}> Join/Start Game</button>
        </div>
      )}
    </>
  );
}

export default JoinGame;
