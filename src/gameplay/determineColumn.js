export const determineColumn = (board) => {
  const block = blockPlayer(board);
  let randomColumn = Math.floor(Math.random() * 7);
  if(!block) {
    for(let c=0; c<board.length; c++) {
      for(let s=0; s<board[c].length; s++) {
        if(board[c][s].state === "pc") {
          try {
            if(board[c][s-1].state === "empty") return c;
            if(board[c + 1][s].state === "empty") return c +1;
          } catch(e) {console.log(e)}
        };
      }
    }
  } else return block;
  return randomColumn;
}

function blockPlayer(board) {
  for(let c=0; c<board.length; c++){
    for(let s=0; s<board[c].length; s++) {
      if(board[c][s].state === 1) {
        try {
          if (board[c + 1][s].state === 1) {
            if(board[c + 2][s] && 
              board[c + 2][s].state === "empty" && 
              board[c - 1][s] &&
              board[c - 1][s].state === "empty") return c - 1;
            if (board[c + 2][s].state === 1) {
              if (board[c + 3][s].state === "empty") return c + 3;
              if (board[c - 1][s].state === "empty") return c - 1;
            }
          }
        } catch (e) { console.log(e) }
        try {
          if (board[c][s + 1].state === 1) {
            if (board[c][s + 2].state === 1) return c;
          }
        } catch (e) { console.log(e) }
        try {
          if (board[c + 1][s + 1].state === 1) {
            if (board[c + 2][s + 2].state === 1) {
              if(board[c + 3][s + 3].state === "empty") return c + 3;
              if(board[c - 1][s - 1].state === "empty") return c - 1;
            }
          }
        } catch (e) { console.log(e) }
        try {
          if (board[c + 1][s - 1].state === 1) {
            if (board[c + 2][s - 2].state === 1) {
              if(board[c + 3][s - 3].state === "empty") return c + 3;
              if(board[c - 1][s + 1].state === "empty") return c - 1;
            }
          }
        } catch (e) { console.log(e) }
      }
    }
  }
  return null;
}
