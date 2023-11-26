import {useState, useEffect} from "react";
import Board from "./components/Board";
import Emoticons from "./components/Emoticons";
import GameCode from "./components/GameCode";
import GameMessage from "./components/GameMessage";
import PlayerTab from "./components/PlayerTab";
import WelcomeModal from "./components/WelcomeModal";
import {SocketContext, socket} from "./context/SocketContext"

function App() {

  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [gameOver, setGameOver] = useState(true);
  const [wins, setWins] = useState({playerOne: 0, playerTwo: 0});
  const [names, setNames] = useState({playerOne: "", playerTwo: ""});
  const [message, setMessage] = useState(`${names.playerOne}'s turn`);
  const [displayedEmoticons, setDisplayedEmoticons] = useState({playerOne: "", playerTwo: ""})
  const [gameEntered, setGameEntered] = useState(false);
  const [gameCode, setGameCode] = useState(null); 
  const [playerNumber, setPlayerNumber] = useState(1);
  const [gamesPlayed, setGamesPlayed] = useState(0);

  useEffect(() => {
    socket.on("createGameResponse", handleCreateGameResponse);
    socket.on("joinGameResponse", handleJoinGameResponse);
    socket.on("playerNumber", handlePlayerNumber);
  }, [])  

  useEffect(() => {
    if (gameOver) {
      setMessage(`${currentPlayer === 1 ? names.playerOne : names.playerTwo} wins!`);
    }
  }, [gameOver]); 
  
  useEffect(() => {
    if (currentPlayer === 1) {
      setMessage(`${names.playerOne}'s turn`);
    } else {
      setMessage(`${names.playerTwo}'s turn`)
    }
  }, [currentPlayer]); 

  function handleCreateGameResponse(data) {
    console.log(data)
    setNames({playerOne: data.gameState.players[0].username, playerTwo: ""})
    setMessage("Waiting for player")
    setGameCode(data.gameCode)
    setGameEntered(true);
    setGameOver(data.gameState.gameOver)
  }

  function handleJoinGameResponse(room) {
    setNames({playerOne: room.players[0].username, playerTwo: room.players[1].username})
    setMessage(`${room.players[0].username}'s turn`)
    setGameEntered(true);
    setGameOver(room.gameOver)
  }

  function handlePlayerNumber(number) {
    setPlayerNumber(number)
  }

  function resetGame() {
    socket.emit("resetGame")
  }


  return (
    <SocketContext.Provider value={socket}>
      <main className="main"> 
        <div className="player-tabs">
          <PlayerTab 
            player={1}
            name={names.playerOne}
            wins={wins.playerOne}
            displayedEmoticon={displayedEmoticons.playerOne}
          />
          <PlayerTab 
            player={2}
            name={names.playerTwo}
            wins={wins.playerTwo}
            displayedEmoticon={displayedEmoticons.playerTwo}
          />
        </div>
          <Board
            currentPlayer={currentPlayer} 
            setCurrentPlayer={setCurrentPlayer}
            playerNumber={playerNumber}
            setPlayerNumber={setPlayerNumber}
            gameOver={gameOver}
            setGameOver={setGameOver}
            setGamesPlayed={setGamesPlayed}
            setWins={setWins}
          />
          <GameMessage message={message} />
          <GameCode gameCode={gameCode} playerNumber={playerNumber}/>
          <button onClick={resetGame} className={`${gameOver && gamesPlayed > 0 ? "" : "hidden"} ${playerNumber === 2 ? "hidden" : ""} play-again-btn`}>Play Again</button>
          <Emoticons 
            setDisplayedEmoticons={setDisplayedEmoticons}
          />
          <WelcomeModal 
            gameEntered={gameEntered}
          />
      </main>
    </SocketContext.Provider>
  );
}

export default App;
