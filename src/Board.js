import React, { useState } from "react";
import Square from "./Square";
import "./App.css";

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));

  const [isXNext, setIsNext] = useState(true);

  const nextSymbol = isXNext ? "X" : "O";

  const winner = calculateWinner(squares);

  function calculateWinner(squares) {
    const possibleLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < possibleLines.length; i++) {
      const [a, b, c] = possibleLines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  const renderRestertButton = () => {
    return (
      <Restart
        onClick={() => {
          setSquares(Array(9).fill(null));
          setIsNext(true);
        }}
      />
    );
  };
  const renderSquare = (i) => {
    return (
      <Square
        value={squares[i]}
        onClick={() => {
          if (squares[i] !== null || winner !== null) {
            return;
          }
          const nextSquares = [...squares];
          nextSquares[i] = nextSymbol;
          setSquares(nextSquares);
          setIsNext(!isXNext);
        }}
      />
    );
  };

  const isFullBoard = (squares) => {
    for (let i = 0; i < squares.length; i++) {
      if (squares[i] === null) {
        return false;
      }
    }
    return true;
  };

  const getStatus = () => {
    if (winner) {
      return `Winner: ${winner}`;
    } else if (isFullBoard(squares)) {
      return `Draw!`;
    } else {
      return `Next Player: ${nextSymbol} `;
    }
  };

  const Restart = ({ onClick }) => {
    return <button onClick={onClick}>play again</button>;
  };

  return (
    <div>
      <h2>tic-tac-toe</h2>
      <div>{getStatus()}</div>
      <div className="restartBtn">{renderRestertButton()}</div>
      <table className="tableBorder">
        <thead>
          <tr>
            <td className="tableRow">{renderSquare(0)}</td>
            <td className="tableRow">{renderSquare(1)}</td>
            <td className="tableRow">{renderSquare(2)}</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="tableRow">{renderSquare(3)}</td>
            <td className="tableRow">{renderSquare(4)}</td>
            <td className="tableRow">{renderSquare(5)}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td className="tableRow">{renderSquare(6)}</td>
            <td className="tableRow">{renderSquare(7)}</td>
            <td className="tableRow">{renderSquare(8)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default Board;
