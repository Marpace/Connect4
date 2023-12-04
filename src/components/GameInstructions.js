function GameInstructions() {

  const [shown, setShown] = useState(false)

   return (
    <div className="game-instructions">
      <button className="game-instructions__btn">I</button>
      <div className={`game-instructions__text ${shown ? "instructions-shown" : ""}`}>
        <p>Players take turns to click or tap a column to drop a token. The first player who can connect four of their tokens in any direction, wins!</p>
      </div>
    </div>
   )
}

export default GameInstructions;