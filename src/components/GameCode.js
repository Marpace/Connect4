function GameCode(props) {
  return (
    <div className="game-code">
      <p className="game-code__text">{`Game code: ${props.gameCode}`}</p>
    </div>
  )
}

export default GameCode;