function GameMessage(props) {
  return (
    <div className={`message-box ${props.pcGame && !props.gameOver ? "hidden" : ""}`}>
      <h1 className="message-box__text">{props.message}</h1>
      <span className={`message-box__counter ${props.gameOver ? "hidden" : ""}`}>{props.counter}</span>
    </div>
  )
}

export default GameMessage;