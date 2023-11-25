import {useState, useEffect} from "react";
import Board from "./components/Board";
import Emoticons from "./components/Emoticons";
import GameCode from "./components/GameCode";
import GameMessage from "./components/GameMessage";
import PlayerTab from "./components/PlayerTab";
import WelcomeModal from "./components/WelcomeModal";
import {SocketContext, socket} from "./context/SocketContext"

function App() {

  const [currentPlayer, setCurrentPlayer] = useState("pl-1");
  const [gameOver, setGameOver] = useState(false);
  const [wins, setWins] = useState({playerOne: 0, playerTwo: 0});
  const [names, setNames] = useState({playerOne: "", playerTwo: ""});
  const [message, setMessage] = useState(`${names.playerOne}'s turn`);
  const [displayedEmoticons, setDisplayedEmoticons] = useState({playerOne: "", playerTwo: ""})
  const [gameEntered, setGameEntered] = useState(false);
  const [gameCode, setGameCode] = useState(null); 
  const [isCurrentPlayer, setIsCurrentPlayer] = useState(false)

  useEffect(() => {
    socket.on("createGameResponse", handleCreateGameResponse);
    socket.on("joinGameResponse", handleJoinGameResponse);
    socket.on("currentPlayer", () => setIsCurrentPlayer(true));
    socket.on("notCurrentPlayer", () => setIsCurrentPlayer(false));
  }, []) 

  useEffect(() => {
    if (gameOver) {
      setMessage(`${currentPlayer === "pl-1" ? names.playerOne : names.playerTwo} wins!`);
    }
  }, [gameOver]); 

  function handleCreateGameResponse(data) {
    setNames({playerOne: data.players[0].username, playerTwo: ""})
    setMessage("Waiting for player")
    setGameCode(data.gameCode)
    setGameEntered(true);
    setIsCurrentPlayer(true);
  }

  function handleJoinGameResponse(players) {
    setNames({playerOne: players[0].username, playerTwo: players[1].username})
    setMessage(`${players[0].username}'s turn`)
    setGameEntered(true);
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
            gameOver={gameOver}
            setGameOver={setGameOver}
            isCurrentPlayer={isCurrentPlayer}
            setIsCurrentPlayer={setIsCurrentPlayer}
          />
          <GameMessage message={message} />
          <GameCode gameCode={gameCode} />
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
