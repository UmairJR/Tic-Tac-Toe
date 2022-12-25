import React, { useState } from "react";
import { useChatContext, Channel } from "stream-chat-react";
import Game from "./Game";
import CustomInput from "./CustomInput";
import Title from "./Title";
function JoinGame() {
  // const [rivalUsername, setRivalUsername] = useState("");
  const [rivalEmail, setRivalEmail] = useState("");
  const { client } = useChatContext();
  const [channel, setChannel] = useState(null);

  const [showError, setShowError] = useState(false);
  const emailRegex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/

  // const rivalUsername = response.users[0].name
  const createChannel = async (e) => {
    e.preventDefault();

    if(rivalEmail == '' || !emailRegex.test(rivalEmail)) {
      setShowError(true)
      return false;
    } else {
      setShowError(false)
      const response = await client.queryUsers({ email: { $eq: rivalEmail } });

      if (response.users.length === 0) {
        alert("User not found");
        return;
      }

      const newChannel = await client.channel("messaging", {
        members: [client.userID, response.users[0].id],

      });

      await newChannel.watch();
      setChannel(newChannel);
    }
  };
  return (
    <>
      {channel ? (
        <Channel channel={channel} Input={CustomInput}>
          {/* <Game rivalUsername={rivalUsername} channel={channel} setChannel={setChannel} /> */}
          <Game channel={channel} setChannel={setChannel} />
        </Channel>
      ) : (
        <>
          <Title title="Start a new game" heading="Whom do you want to play with?" />
          <form className="form--login mt--20" onSubmit={createChannel}>
            <span>
              <label className="mb--10">Create Game</label>
              <input
                type="email"
                placeholder="Type their email here"
                onChange={(event) => {
                  setRivalEmail(event.target.value);
                }}
              />
            </span>
            <span>
              {showError && <span className="message--error message">Enter correct details.</span>}
              <button type="submit" className="btn btn--yellow mt--20"> Start game </button>
            </span>
          </form>
        </>
      )}
    </>
  );
}

export default JoinGame;
