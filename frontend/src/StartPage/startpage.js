import React, { useState } from 'react';
import './startpage.css';

function startpage() {
  const [clicked, setClicked] = useState(false);
  const [startVisible, setStartVisible] = useState(false);
  const [gameMode, setGameMode] = useState("");
  
  const handleClick = (mode = true) => {
    setClicked(mode);
    if(typeof mode === "string") {
      setGameMode(mode);
      setStartVisible(true); // Show the Start button when a game mode is selected
    } else {
      setStartVisible(false); // Hide the Start button when Singleplayer or Multiplayer is clicked
    }
  }
  
  
  return (
    <div className="Main">
      <div className={clicked ? "container clicked" : "container"}>
        <h3 className="button1-title">SINGLEPLAYER</h3>
        <button className="button1" onClick={handleClick}></button>
        <h3 className="button2-title">MULTIPLAYER</h3>
        <button className="button2"></button>

        {clicked && (
          <>
            <button className="new-button1" onClick={() => handleClick("This is game mode 1")}
            >Transparent Mode
            </button>
            <button className="new-button2" onClick={() => handleClick("This is game mode 2")}>Normal Mode </button>
            <button className="new-button3" onClick={() => handleClick("This is game mode 3")}>Competitive Mode</button>
          </>
        )}
        {startVisible && (
  <button className="start-button">Start</button>
)}
       
      </div>
      
      {gameMode && <h2 className="selectedGameMode">Selected Game Mode: {gameMode}</h2>}
      
    </div>
    
  );
}

export default startpage;
