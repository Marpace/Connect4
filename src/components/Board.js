import Slot from "./Slot";
import {useContext, useEffect, useState} from "react";
import { SocketContext } from "../context/SocketContext";
import { checkWin } from "../gameplay/checkWin";
import { determineColumn } from "../gameplay/determineColumn";

const Board = function(props) {

  const socket = useContext(SocketContext);

  const [top, setTop] = useState("-15%")
  const [pcGameResult, setPcGameResult] = useState({gameOver: false, winningSlots: []})

  //Sets the correct height for token drop animation
  useEffect(() => {
    switch (props.droppedToken.row) {
      case 0:
        setTop("1%")
        break;
      case 1:
        setTop("18%")
        break;
      case 2:
        setTop("36%")
        break;
      case 3:
        setTop("53%")
        break;
      case 4:
        setTop("70%")
        break;
      case 5:
        setTop("87%")
        break;
      default:
        break;
    }
  }, [props.droppedToken]) 


  useEffect(() => {
    if(props.currentPlayer === "pc" && !props.gameOver)  {
      setTimeout(() => {
        pcTokenDrop();
      }, 1000);
    }
  }, [props.currentPlayer])

  function tokenDrop(e) { 
    if (props.gameOver || props.playerNumber !== props.currentPlayer) return;
    const column = Number(e.target.id);
    let row = props.board[column].findIndex((slot, index) => {
      return slot.state !== "empty" || index === props.board[column].length - 1;
    });

    //if all slots on that column are filled, return. 
    if(row === 0) return; 

    // target the next empty slot, or the last slot if entire column is empty
    if (row !== (props.board[column].length - 1) || props.board[column][row].state !== "empty") row -= 1; 
    
    if(props.pcGame) {
      updatePcGame(column, row)
      return;
    } else {
      socket.emit("tokenDrop", {column: column, row: row})
    }
  }

  function pcTokenDrop() { 
    const column = determineColumn(props.board)
    let row = props.board[column].findIndex((slot, index) => {
      return slot.state !== "empty" || index === props.board[column].length - 1;
    });
    //if all slots on that column are filled, return. 
    if(row === 0) return; 
    // target the next empty slot, or the last slot if entire column is empty
    if (row !== (props.board[column].length - 1) || props.board[column][row].state !== "empty") row -= 1; 
    return updatePcGame(column, row);
  }

  function updatePcGame(column, row) {
    props.setDroppedToken({column: column, row: row})
    setTimeout(() => {
      const result = checkWin(props.board, column, row, props.currentPlayer);
      props.setBoard(prev => { 
        const copy = prev; 
        copy[column][row].state = props.currentPlayer;
        result.winningSlots.forEach(slot => {
          copy[slot.column][slot.row].winningSlot = true; 
        })
        return copy;
      })
      setPcGameResult(result);
      if(result.gameOver) {
        props.setGameOver(true)
      } else {
        props.setCurrentPlayer(prev => prev === 1 ? "pc" : 1)
      }
      props.setDroppedToken({column: null, row: null})
    }, 370);
  }

  return (
    <div className="board">
      {props.board.map((column, columnIndex) => (
        <div
          key={columnIndex}
          className={`column`}
        >
          <div style={{
            opacity: props.droppedToken.column === columnIndex ? "1" : "0",
            top: props.droppedToken.column === columnIndex ? top : "-15%",
            backgroundColor: props.currentPlayer === 1 ? "#981f37" : "#e28413" 
            }} className="falling-token"></div>
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
      <img className="board-img" src="./assets/board.svg"></img>
      <div className="clickable-columns">
        {props.board.map((column, index) => (
          <div key={index} onClick={tokenDrop} id={index} className="clickable-columns__col"></div>
        ))}
      </div>
    </div>
  )
}

export default Board;