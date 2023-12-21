export const checkWin = (board, column, row, player) => {
  try {
    if (board[column + 1][row].state === player) {
        if (board[column + 2][row].state === player) {
            if (board[column + 3][row].state === player) {
                return {
                  gameOver: true, 
                  winningSlots: [
                    {column: column, row: row},
                    {column: column + 1, row: row},
                    {column: column + 2, row: row},
                    {column: column + 3, row: row},
                  ]
                };
            }
        }
    }
  } catch (e) { console.log(e) }
  try {
    if (board[column + 1][row + 1].state === player) {
        if (board[column + 2][row + 2].state === player) {
            if (board[column + 3][row + 3].state === player) {
              return {
                gameOver: true, 
                winningSlots: [
                  {column: column, row: row},
                  {column: column + 1, row: row + 1},
                  {column: column + 2, row: row + 2},
                  {column: column + 3, row: row + 3},
                ]
              };
            }
        }
    }
  } catch (e) { console.log(e) }
  try {
    if (board[column + 1][row - 1].state === player) {
        if (board[column + 2][row - 2].state === player) {
            if (board[column + 3][row - 3].state === player) {
              return {
                gameOver: true, 
                winningSlots: [
                  {column: column, row: row},
                  {column: column + 1, row: row - 1},
                  {column: column + 2, row: row - 2},
                  {column: column + 3, row: row - 3},
                ]
              };
            }
        }
    }
  } catch (e) { console.log(e) }
  try {
    if (board[column][row + 1].state === player) {
        if (board[column][row + 2].state === player) {
            if (board[column][row + 3].state === player) {
              return {
                gameOver: true, 
                winningSlots: [
                  {column: column, row: row},
                  {column: column, row: row + 1},
                  {column: column, row: row + 2},
                  {column: column, row: row + 3},
                ]
              };
            }
        }
    }
  } catch (e) { console.log(e) }
  try {
    if (board[column - 1][row].state === player) {
        if (board[column - 2][row].state === player) {
            if (board[column - 3][row].state === player) {
              return {
                gameOver: true, 
                winningSlots: [
                  {column: column, row: row},
                  {column: column - 1, row: row },
                  {column: column - 2, row: row },
                  {column: column - 3, row: row },
                ]
              };
            }
        }
    }
  } catch (e) { console.log(e) }
  try {
    if (board[column - 1][row + 1].state === player) {
        if (board[column - 2][row + 2].state === player) {
            if (board[column - 3][row + 3].state === player) {
              return {
                gameOver: true, 
                winningSlots: [
                  {column: column, row: row},
                  {column: column - 1, row: row + 1},
                  {column: column - 2, row: row + 2},
                  {column: column - 3, row: row + 3},
                ]
              };
            }
        }
    }
  } catch (e) { console.log(e) }
  try {
    if (board[column - 1][row - 1].state === player) {
        if (board[column - 2][row - 2].state === player) {
            if (board[column - 3][row - 3].state === player) {
              return {
                gameOver: true, 
                winningSlots: [
                  {column: column, row: row},
                  {column: column - 1, row: row - 1},
                  {column: column - 2, row: row - 2},
                  {column: column - 3, row: row - 3},
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