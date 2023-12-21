function GameCode(props) {
  return (
    <div className={`game-code ${props.playerNumber === 2 || props.pcGame ? "hidden" : ""}`}>
      <p className="game-code__text">{`Game code: ${props.gameCode}`}</p>
    </div>
  )
}

export default GameCode;