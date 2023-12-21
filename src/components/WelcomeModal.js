import { useState, useContext, useEffect } from "react";
import {SocketContext} from "../context/SocketContext";

function WelcomeModal(props) {

  const [username, setUsername] = useState("");
  const [gameCode, setGameCode] = useState("");

  const [showMessage, setShowMessage] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");

  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on("validateCodeResponse", handleValidateCodeResponse);
  }, [socket])


  function handleCreateGame() {
    if(username === "") {
      setShowMessage(true);
      setValidationMessage("Enter a username")
      return; 
    }
    socket.emit("createGame", username)
  }

  function handleJoinGame() {
    if(username === "") {
      setShowMessage(true);
      setValidationMessage("Enter a username")
      return; 
    }
    socket.emit("validateCode", {username: username, roomCode: gameCode})
  }

  function handleValidateCodeResponse(data) {
    console.log(username, gameCode)
    if(data.isValid) {
      socket.emit("joinGame", {username: data.username, roomCode: data.gameCode})
    } else {
      setShowMessage(true);
      setValidationMessage(data.message); 
    }
  }

  function pcGame() {
    if(username === "") {
      setShowMessage(true);
      setValidationMessage("Enter a username")
      return; 
    }
    props.setNames({playerOne: username, playerTwo: "PC"})
    props.startPcGame()
  }

  return (  
    <div className={`welcome-modal ${props.gameEntered ? "hidden" : ""}`}>
      <div className="welcome-modal__body">
        <h1 className="modal-title">Connect 4</h1> 
        <p className="username-msg" style={{opacity: showMessage ? "" : "0"}}>{validationMessage}</p>
        <div className="modal-field">
          <label style={{color: validationMessage === "Enter a username" ? "red" : ""}} className="modal-field__label">username</label>
          <input onChange={(e) => setUsername(e.target.value)} className="modal-field__input" maxLength={15}></input>
        </div>
        <div className="modal-field">
          <label style={{color: validationMessage === "Enter a game code" ? "red" : ""}} className="modal-field__label">game code</label>
          <input onChange={(e) => setGameCode(e.target.value)} className="modal-field__input"></input>
        </div>
        <button onClick={handleCreateGame} className="modal-btn">Create Game</button>
        <button onClick={handleJoinGame} className="modal-btn">Join Game</button>
        <button onClick={pcGame} className="modal-btn">Play against PC</button> 
      </div>
    </div>
  )
}

export default WelcomeModal;