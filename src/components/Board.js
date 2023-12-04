import Slot from "./Slot";
import {useContext} from "react";
import { SocketContext } from "../context/SocketContext";

const Board = function(props) {

  const socket = useContext(SocketContext);

  function tokenDrop(e) {
    if (props.gameOver || props.playerNumber !== props.currentPlayer) return;
    const column = Number(e.target.id.split(" ")[1]);
    let row = props.board[column].findIndex((slot, index) => {
      return slot.state !== "empty" || index === props.board[column].length - 1;
    });

    //if all slots on that column are filled, return.
    if(row === 0) return;

    // target the next empty slot, or the last slot if entire column is empty
    if (row !== (props.board[column].length - 1) || props.board[column][row].state !== "empty") row -= 1;
    
    socket.emit("tokenDrop", {column: column, row: row})
  }

  return (
    <div className="board">
        {props.board.map((column, columnIndex) => (
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