/* eslint-disable react/no-array-index-key */
/* eslint-disable semi */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import './index.css';
import Board from './Board'
import { calculateWinner } from './helpers'


function Clock({ time }) {
  console.log('--- Clock Renders ---')
  let a = 3
  setTimeout(() => {
    a = 999
    }, 3000) 
  return (
    <div>
      <h1>{time}</h1>
    </div>
  )
}


class Game extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
      time: 0
    }

    // setInterval(() => {
    //   this.state.time += 1

    //   this.setState({ time: this.state.time += 1})
    // }, 1000)
  }

  handleClick(i) {
    const { history, stepNumber, xIsNext } = this.state
    const newHistory = history.slice(0, stepNumber + 1)
    const current = history[history.length - 1]
    const squares = current.squares.slice()

    if (calculateWinner(squares) || squares[i]) {
      return
    }
    squares[i] = xIsNext ? 'X' : 'O'
    this.setState({
      history: newHistory.concat([{
        squares,
      }]),
      stepNumber: newHistory.length,
      xIsNext: !xIsNext,
    })
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    })
  }

  render() {

    const { history, stepNumber, xIsNext } = this.state
    const current = history[stepNumber]
    const winner = calculateWinner(current.squares)

    const moves = history.map((step, move) => {
      const desc = move ? `Go to move# ${move}` : 'Go to game start'
      return (
        <li key={`move-${move}`}>
          <button type="button" onClick={() => this.jumpTo(move)}>
            {desc}
          </button>
        </li>
      )
    })

    let status
    if (winner) {
      status = `Winner: ${winner}`
    } else {
      status = `Next player: ${xIsNext ? 'X' : 'O'}`
    }


    return (
      <div className="game">
        <div className="game-board">
          <Board
            id="1"
            squares={current.squares}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

export default Game


// const a = {
//   func: function() { 
//     console.log(this) 
//   }
// }

// const b = {}

// const a = [1,3,5,7,8]
// const b = a 

// a.push(99)
// b.push(3)


// console.log( a ) // [1,3,5,7,8, 99, 3]
// console.log( b ) // [1,3,5,7,8, 99, 3]

// console.log( a === b ) // true!

// const c = [1,2]
// const d = [1,2]

// console.log( c === d ) // false !