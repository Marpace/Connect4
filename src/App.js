import "./sass/main.css";
import {useState, useEffect} from "react";
import Board from "./components/Board";
import Emoticons from "./components/Emoticons";
import GameCode from "./components/GameCode";
import GameMessage from "./components/GameMessage";
import PlayerTab from "./components/PlayerTab";
import WelcomeModal from "./components/WelcomeModal";
import {SocketContext, socket} from "./context/SocketContext"
import GameInstructions from "./components/GameInstructions";

function App() {

  //Nested for loop to create board
  const columns = [];
  for (let i = 0; i < 7; i++) {
    const slots = [];
    for (let n = 0; n < 6; n++) {
      slots.push({state: "empty", winningSlot: false});
    }  
    columns.push(slots);
  }


  const [board, setBoard] = useState(columns);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [gameOver, setGameOver] = useState(true);
  const [draw, setDraw] = useState(false);
  const [disconnected, setDisconnected] = useState(false);
  const [wins, setWins] = useState({playerOne: 0, playerTwo: 0});
  const [names, setNames] = useState({playerOne: "", playerTwo: ""});
  const [message, setMessage] = useState(`${names.playerOne}'s turn`);
  const [displayedEmoticons, setDisplayedEmoticons] = useState({playerOne: "", playerTwo: ""})
  const [gameEntered, setGameEntered] = useState(false);
  const [gameCode, setGameCode] = useState(null); 
  const [playerNumber, setPlayerNumber] = useState(1);
  const [gamesPlayed, setGamesPlayed] = useState(0);
  const [counter, setCounter] = useState(null)
  const [droppedToken, setDroppedToken] = useState({column: null, row: null})

  useEffect(() => {
    socket.on("createGameResponse", handleCreateGameResponse);
    socket.on("joinGameResponse", handleJoinGameResponse);
    socket.on("playerNumber", handlePlayerNumber);
    socket.on("tokenDropResponse", handleTokenDropResponse);
    socket.on("resetGameResponse", handleResetGameResponse);
    socket.on("timesUp", handleTimesUp);
    socket.on("countDown", handleCountDown);
    socket.on("playerDisconnected", handlePlayerDisconnected);
  }, [])  

  useEffect(() => {
    if (gameOver && !draw && !disconnected) {
      setMessage(`${currentPlayer === 1 ? names.playerOne : names.playerTwo} wins!`);
    } else if (gameOver && draw) {
      setMessage("Draw!")
    } else if (gameOver && disconnected) {
      setMessage("The other player has left the game")
    }
  }, [gameOver]); 
  
  useEffect(() => {
    if(!gameOver) {
      if (currentPlayer === 1) {
        setMessage(`${names.playerOne}'s turn`);
      } else { 
        setMessage(`${names.playerTwo}'s turn`)
      }
    }
  }, [currentPlayer, gameOver]); 

  function handleCreateGameResponse(data) {
    console.log(data)
    setNames({playerOne: data.room.players[0].username, playerTwo: ""})
    setMessage("Waiting for player")
    setGameCode(data.gameCode)
    setGameEntered(true);
    setGameOver(data.room.gameOver)
  }

  function handleJoinGameResponse(room) {
    setNames({playerOne: room.players[0].username, playerTwo: room.players[1].username})
    setMessage(`${room.players[0].username}'s turn`)
    setGameEntered(true);
    setGameOver(room.gameOver)
    setDisconnected(false);
  }

  function handlePlayerNumber(number) {
    setPlayerNumber(number)
  }

  function handleTokenDropResponse(data) {
    console.log(data)
    setDroppedToken({column: data.token.column, row: data.token.row})
    setTimeout(() => {
      setBoard(data.room.board);
      setGameOver(data.room.gameOver);
      setDraw(data.room.draw)
      if(!data.room.gameOver) {
        setCurrentPlayer(data.room.currentPlayer)
      } else {
        setGamesPlayed(prev => prev + 1)
        setWins({playerOne: data.room.players[0].wins, playerTwo: data.room.players[1].wins})
      }
      setDroppedToken({column: null, row: null})
    }, 370);
  }

  function resetGame() {
    socket.emit("resetGame")
  }

  function handleResetGameResponse(room) {
    setBoard(room.board);
    setGameOver(room.gameOver);
    setCurrentPlayer(room.currentPlayer);
  }

  function handleCountDown(seconds) {
    setCounter(seconds);
  }
  
  function handleTimesUp(player) {
    setCurrentPlayer(player)
  }

  function handlePlayerDisconnected(data) {
    setGameOver(data.room.gameOver)
    setNames({playerOne: data.room.players[0].username, playerTwo: ""})
    setWins({playerOne: 0, playerTwo: 0})
    setPlayerNumber(data.room.players[0].playerNumber)
    setDisconnected(true);
    setBoard(data.room.board)
    setGameCode(data.gameCode)
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
            board={board}
            currentPlayer={currentPlayer} 
            playerNumber={playerNumber}
            gameOver={gameOver}
            droppedToken={droppedToken}
          />
          <div className="game-info">
            <GameMessage gameOver={gameOver} message={message} counter={counter}/>
            <GameCode gameCode={gameCode} playerNumber={playerNumber}/>
            <button onClick={resetGame} className={`${gameOver && gamesPlayed > 0 && !disconnected? "" : "hidden"} ${playerNumber === 2 ? "hidden" : ""} play-again-btn`}>Play Again</button>
            <Emoticons 
              setDisplayedEmoticons={setDisplayedEmoticons}
            />
            <GameInstructions />
          </div>
          <WelcomeModal 
            gameEntered={gameEntered}
          />
      </main>
    </SocketContext.Provider>
  );
}

export default App;
