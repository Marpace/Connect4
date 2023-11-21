import Slot from "./Slot";
import {useState} from "react";

const Board = function(props) {

  //Nested for loop to create board
  const rows = [];
  for (let i = 0; i < 6; i++) {
    const slots = [];
    for (let n = 0; n < 7; n++) {
      slots.push({state: "empty", winningSlot: false});
    }
    rows.push(slots);
  }

  const [board, setBoard] = useState(rows);

  function tokenDrop(e) {
    if (!e.target.className.includes("0") || props.gameOver) return;
    const column = e.target.id;
    let row = board.findIndex((rows, index) => {
      return (rows[column].state !== "empty" || index === board.length - 1)
    })

    //if all slots on that column are filled, return.
    if(row === 0) return;

    // fill the next empty slot, or the last slot if entire column is empty
    if (row !== (board.length - 1) || board[row][column].state !== "empty") row -= 1;
    
    const winResult = updateBoard(row, column)

    props.setGameOver(winResult.gameOver)
 
    if(!winResult.gameOver) {
      props.setCurrentPlayer(prev => prev === "pl-1" ? "pl-2" : "pl-1");
    } else {
      setBoard( prev => {
        const boardCopy = [...prev];
        winResult.winningSlots.forEach(slot => {
          boardCopy[slot.row][slot.column].winningSlot = true;
        })
        return boardCopy;
      })
    }
  }

  function updateBoard(row, column) {
    setBoard(prev => {
        const boardCopy = [...prev];
        boardCopy[row][column].state = props.currentPlayer;
        return boardCopy;
    });
    return checkWin(row, column);
  };

  function checkWin(row, column) {
    try {
      if (board[row + 1][column].state === props.currentPlayer) {
          if (board[row + 2][column].state === props.currentPlayer) {
              if (board[row + 3][column].state === props.currentPlayer) {
                  return {
                    gameOver: true, 
                    winningSlots: [
                      {row: row, column: column},
                      {row: row + 1, column: column},
                      {row: row + 2, column: column},
                      {row: row + 3, column: column},
                    ]
                  };
              }
          }
      }
    } catch (e) { console.log(e) }
    try {
      if (board[row + 1][column + 1].state === props.currentPlayer) {
          if (board[row + 2][column + 2].state === props.currentPlayer) {
              if (board[row + 3][column + 3].state === props.currentPlayer) {
                return {
                  gameOver: true, 
                  winningSlots: [
                    {row: row, column: column},
                    {row: row + 1, column: column + 1},
                    {row: row + 2, column: column + 2},
                    {row: row + 3, column: column + 3},
                  ]
                };
              }
          }
      }
    } catch (e) { console.log(e) }
    try {
      if (board[row + 1][column - 1].state === props.currentPlayer) {
          if (board[row + 2][column - 2].state === props.currentPlayer) {
              if (board[row + 3][column - 3].state === props.currentPlayer) {
                return {
                  gameOver: true, 
                  winningSlots: [
                    {row: row, column: column},
                    {row: row + 1, column: column - 1},
                    {row: row + 2, column: column - 2},
                    {row: row + 3, column: column - 3},
                  ]
                };
              }
          }
      }
    } catch (e) { console.log(e) }
    try {
      if (board[row][column + 1].state === props.currentPlayer) {
          if (board[row][column + 2].state === props.currentPlayer) {
              if (board[row][column + 3].state === props.currentPlayer) {
                return {
                  gameOver: true, 
                  winningSlots: [
                    {row: row, column: column},
                    {row: row, column: column + 1},
                    {row: row, column: column + 2},
                    {row: row, column: column + 3},
                  ]
                };
              }
          }
      }
    } catch (e) { console.log(e) }
    try {
      if (board[row][column - 1].state === props.currentPlayer) {
          if (board[row][column - 2].state === props.currentPlayer) {
              if (board[row][column - 3].state === props.currentPlayer) {
                return {
                  gameOver: true, 
                  winningSlots: [
                    {row: row, column: column},
                    {row: row, column: column - 1},
                    {row: row, column: column - 2},
                    {row: row, column: column - 3},
                  ]
                };
              }
          }
      }
    } catch (e) { console.log(e) }
    try {
      if (board[row - 1][column + 1].state === props.currentPlayer) {
          if (board[row - 2][column + 2].state === props.currentPlayer) {
              if (board[row - 3][column + 3].state === props.currentPlayer) {
                return {
                  gameOver: true, 
                  winningSlots: [
                    {row: row, column: column},
                    {row: row - 1, column: column + 1},
                    {row: row - 2, column: column + 2},
                    {row: row - 3, column: column + 3},
                  ]
                };
              }
          }
      }
    } catch (e) { console.log(e) }
    try {
      if (board[row - 1][column - 1].state === props.currentPlayer) {
          if (board[row - 2][column - 2].state === props.currentPlayer) {
              if (board[row - 3][column - 3].state === props.currentPlayer) {
                return {
                  gameOver: true, 
                  winningSlots: [
                    {row: row, column: column},
                    {row: row - 1, column: column - 1},
                    {row: row - 2, column: column - 2},
                    {row: row - 3, column: column - 3},
                  ]
                };
              }
          }
      }
    } catch (e) { console.log(e) }

    return {
      gameOver: false,
      winningSlots: []
    }
  }


  return (
    <div className="board">
        {board.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className={`row ${rowIndex === 0 ? "top-row" : ""}`}
          >
            {row.map((slot, slotIndex) => (
              <Slot 
                key={slotIndex}
                slot={slot}
                rowIndex={rowIndex}
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