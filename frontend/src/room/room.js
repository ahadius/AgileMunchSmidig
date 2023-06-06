import React, { useState } from 'react';
import socketIOClient from "socket.io-client";
import './App.css';

const ENDPOINT = "http://localhost:3001";

function Room() {
  const [response, setResponse] = useState("");
  const [clicked, setClicked] = useState(false);
  const [gameMode, setGameMode] = useState("");
  const [roomKey, setRoomKey] = useState("");
  const [joinKey, setJoinKey] = useState("");

  const handleClick = (mode = true) => {
    setClicked(mode);
    if(typeof mode === "string") {
      setGameMode(mode);
    }
  }

  const handleMultiplayerClick = () => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("newRoom", data => {
      setRoomKey(data);
    });
    socket.emit("createRoom");
    handleClick();
  }

  const handleJoinRoom = () => {
    const socket = socketIOClient(ENDPOINT);
    socket.emit('joinRoom', joinKey);
    handleClick();
  }

  return (
    <div style={{ textAlign: "center", marginTop: "30%" }}>
      <h1>Welcome to the game</h1>
      {clicked ? (
        <>
          <h2>Your room key: {roomKey}</h2>
          <button onClick={() => setClicked(false)}>Go back</button>
        </>
      ) : (
        <>
          <button onClick={handleMultiplayerClick}>Start Multiplayer Game</button>
          <input value={joinKey} onChange={e => setJoinKey(e.target.value)} placeholder="Enter room key" />
          <button onClick={handleJoinRoom}>Join Multiplayer Game</button>
        </>
      )}
    </div>
  );
}

export default Room;
