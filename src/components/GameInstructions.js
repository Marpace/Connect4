import {useState} from "react";

function GameInstructions() { 
  const [shown, setShown] = useState(false)

   return (
    <div className="game-instructions">
      <button onClick={() => setShown(true)} className="game-instructions__btn">I</button>
      <div className={`game-instructions__text ${shown ? "instructions-shown" : ""}`}>
        <span onClick={() => setShown(false)} className="close-btn"></span>
        <p className="instructions">Players take turns to click or tap a column to drop a token. The first player who can connect four of their tokens in any direction, wins!</p>
      </div>
    </div>
   )
}

export default GameInstructions;