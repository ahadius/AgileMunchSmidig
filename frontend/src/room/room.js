import React, { useState } from 'react';
import socketIOClient from 'socket.io-client';
import DrawingBoard from '../BoardAssets/board'; // Update this path to the correct one

const ENDPOINT = 'http://localhost:3001';

let socket; // Declare socket outside of function

function Room() {
  const [clicked, setClicked] = useState(false);
  const [roomKey, setRoomKey] = useState('');
  const [joinKey, setJoinKey] = useState('');

  const handleMultiplayerClick = () => {
    socket = socketIOClient(ENDPOINT);
    socket.on('newRoom', data => {
      setRoomKey(data);
    });
    socket.emit('createRoom');
    setClicked(true);
  };

  const handleJoinRoom = () => {
    socket = socketIOClient(ENDPOINT);
    socket.emit('joinRoom', joinKey);
    setClicked(true);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '30%' }}>
      <h1>Welcome to the game</h1>
      {clicked ? (
        <>
          <h2>Your room key: {roomKey}</h2>
          <DrawingBoard username="your-username-here" />
          <button onClick={() => setClicked(false)}>
            Go back
          </button>
        </>
      ) : (
        <>
          <button onClick={handleMultiplayerClick}>
            Start Multiplayer Game
          </button>
          <input
            value={joinKey}
            onChange={e => setJoinKey(e.target.value)}
            placeholder="Enter room key"
          />
          <button onClick={handleJoinRoom}>
            Join Multiplayer Game
          </button>
        </>
      )}
    </div>
  );
}

export default Room;
export { socket }; // Export socket
