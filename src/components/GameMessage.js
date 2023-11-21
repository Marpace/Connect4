function GameMessage(props) {
  return (
    <div className="message-box">
      <h1 className="message-box__text">{props.message}</h1>
    </div>
  )
}

export default GameMessage;