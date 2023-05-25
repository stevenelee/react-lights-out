import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    // create array-of-arrays of true/false values
    for (let i = 0; i < nrows; i++) {
        initialBoard[i] = [];

        for (let j = 0; j < ncols; j++) {
          initialBoard[i][j] = chanceLightStartsOn()
        };
    }
    return initialBoard;
  }

  //check the board in state to determine whether the player has won.
  function hasWon() {
    for (let i = 0; i < nrows; i++) {
      for (let j = 0; j < ncols; j++) {
        if (board[i][j] === false) return false;
      }
    }
    return true
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      //  Make a (deep) copy of the oldBoard
      let newBoard = [];
      for (const row of oldBoard){
        newBoard.push([...row])
      }

      // in the copy, flip this cell and the cells around it
      flipCell(y, x, newBoard);
      flipCell(y-1, x, newBoard);
      flipCell(y+1, x, newBoard);
      flipCell(y, x-1, newBoard);
      flipCell(y, x+1, newBoard);

      // return the copy
      return newBoard
    });
  }


  // make table board
  function makeTableBoard(){
    let actualGameboard = [];

    for (let y=0; y<board.length; y++){
      const row = board[y];
      let tempRow = [];

      for (let x=0; x<row.length; x++){
        tempRow.push(
        <Cell
        flipCellsAroundMe={()=>flipCellsAround(`${y}-${x}`)}
        isLit={row[x]}
        />
        )
      }
      actualGameboard.push(<tr>{tempRow}</tr>)
    }
    return (
      <table>{actualGameboard}</table>
    )
  }
// if the game is won, just show a winning msg & render nothing else
  return (
    <div>
    {hasWon() ? <h1>Hey you won!</h1> : makeTableBoard()}
    </div>
  );

}

export default Board;