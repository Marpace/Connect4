import Slot from "./Slot";
import {useState, useContext, useEffect} from "react";
import { SocketContext } from "../context/SocketContext";

const Board = function(props) {

  const socket = useContext(SocketContext);

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

  useEffect(() => {
    socket.on("tokenDropResponse", handleTokenDropResponse)
    socket.on("resetGameResponse", handleResetGameResponse);
  }, [])

  function tokenDrop(e) {
    if (props.gameOver || props.playerNumber !== props.currentPlayer) return;
    const column = Number(e.target.id.split(" ")[1]);
    let row = board[column].findIndex((slot, index) => {
      return slot.state !== "empty" || index === board[column].length - 1;
    });

    //if all slots on that column are filled, return.
    if(row === 0) return;

    // target the next empty slot, or the last slot if entire column is empty
    if (row !== (board[column].length - 1) || board[column][row].state !== "empty") row -= 1;
    
    socket.emit("tokenDrop", {column: column, row: row})
  }

  function handleTokenDropResponse(room) {
    setBoard(room.board);
    props.setGameOver(room.gameOver);
    if(!room.gameOver) {
      props.setCurrentPlayer(room.currentPlayer)
    } else {
      
      props.setGamesPlayed(prev => prev + 1)
      props.setWins({playerOne: room.players[0].wins, playerTwo: room.players[1].wins})
    }
  }

  function handleResetGameResponse(room) {
    setBoard(room.board);
    props.setGameOver(room.gameOver);
    props.setCurrentPlayer(room.currentPlayer);
  }


  return (
    <div className="board">
        {board.map((column, columnIndex) => (
          <div
            key={columnIndex}
            className={`column`}
          >
            {column.map((slot, slotIndex) => (
              <Slot 
                key={slotIndex}
                slot={slot}
                columnIndex={columnIndex}
                slotIndex={slotIndex}
                tokenDrop={tokenDrop}
              />
            ))}
          </div>
        ))}
      </div>
  )
}

export default Board;