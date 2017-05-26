/* eslint react/prop-types: 0 */
/* eslint react/no-multi-comp: 0 */
/* eslint react/prefer-stateless-function: 0 */
/* eslint jsx-a11y/href-no-hash:0 */
import React, { Component } from 'react';
import './tic-tac-toe.less';

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        winner: squares[a],
        winnerArr: lines[i]
      };
    }
  }
  return null;
}

function Square(props) {
  return (
    <button className={props.winner ? 'square winner' : 'square'} onClick={props.handleClick}>
      {props.value}
    </button>
  );
}

function Board(props) {
  const winnerArr = props.winnerArr;
  const renderSquare = (i) => {
    let winner;
    if (winnerArr) {
      for (let j = 0; j < winnerArr.length; j++) {
        if (i === winnerArr[j]) {
          winner = true;
          break;
        }
      }
    }
    return (
      <Square
        winner={winner}
        value={props.squares[i]}
        handleClick={() => props.handleClick(i)}
      />
    );
  };
  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: new Array(9).fill(null)
      }],
      stepNumber: 0,
      nextState: 'O',
      asce: true
    };
  }
  handleClick = (i) => {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    squares[i] = this.state.nextState;
    this.setState({
      history: history.concat({
        squares
      }),
      stepNumber: history.length,
      // stepNumber: this.state.stepNumber + 1,
      nextState: this.state.nextState === 'O' ? 'X' : 'O'
    });
  };
  jumpTo = (index) => {
    this.setState({
      stepNumber: index,
      nextState: index % 2 === 0 ? 'O' : 'X'
    });
  };
  toggleOrder = () => {
    this.setState({
      asce: !this.state.asce
    });
  };
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    let moves = history.map((step, index) => {
      const desc = index ? `Move #${index}` : 'Game Start';
      return (
        <li key={Math.random()} className={this.state.stepNumber === index ? 'active' : ''}>
          <a href="#" onClick={() => this.jumpTo(index)}>{desc}</a>
        </li>
      );
    });
    moves = this.state.asce ? moves : moves.reverse();
    let status;
    let winnerArr;
    if (winner) {
      status = `Winner ${winner.winner}!`;
      winnerArr = winner.winnerArr;
    } else {
      status = `Next player: ${this.state.nextState}`;
    }
    const button = this.state.asce ?
      <button onClick={this.toggleOrder}>降序</button> :
      <button onClick={this.toggleOrder}>升序</button>;
    return (
      <div className="game">
        <div
          className="game-board"
        >
          <Board
            winnerArr={winnerArr}
            squares={current.squares}
            nextStep={this.state.nextState}
            handleClick={this.handleClick}
          />
        </div>
        <div className="game-info">
          {status}
          <div className="order">
            {button}
          </div>
          <ol>
            {moves}
          </ol>
        </div>
      </div>
    );
  }
}
