import React from 'react';
import Square from './square.js'
require('styles/board.css');

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: new Array(9).fill(null), // 棋盘数组
      currentSquare: 'X', // 当前落子
      victoryName: '', // 获胜棋子name
      isVictory: false, //  是否获胜
      isFillAll: false
    }
  }

  handleClick(i) {
    if (this.state.isVictory || this.state.isFillAll) {
      return
    }
    const squares = this.state.squares.slice();
    if (squares[i] === 'X' || squares[i] === 'O') {
      return
    }
    squares[i] = this.state.currentSquare;
    this.setState({squares: squares});
    this.setState({currentSquare: this.state.currentSquare === 'X' ? 'O' : 'X'})
    this.judgeSuccess(squares) // 判断一方是否获胜
    this.judgeIsFillAll(squares) // 判断格子是否全部填满
  }

  judgeSuccess(squares) {
    const board = []
    board.push(squares.slice(0, 3))
    board.push(squares.slice(3, 6))
    board.push(squares.slice(6, 9))
    const result = [ // 所有可能赢的情况
      squares.slice(0, 3),
      squares.slice(3, 6),
      squares.slice(6, 9),
      squares.filter((item, index) => {
        return index === 0 || index === 3 || index === 6
      }),
      squares.filter((item, index) => {
        return index === 1 || index === 4 || index === 7
      }),
      squares.filter((item, index) => {
        return index === 2 || index === 5 || index === 8
      }),
      squares.filter((item, index) => {
        return index === 0 || index === 4 || index === 8
      }), // 反斜线
      squares.filter((item, index) => {
        return index === 2 || index === 4 || index === 6
      }) // 正斜线
    ]
    result.forEach(item => {
      let count = 0
      for (let i = 0; i < item.length; i ++) {
        if (item[i] === 'X') {
          count++
        }
        if (item[i] === 'O') {
          count--
        }
        if (count === 3 || count === -3) {
          this.state.isVictory = true
          this.setState({victoryName: this.state.currentSquare});
          window.alert(this.state.currentSquare + '获胜')
          return
        }
      }
    })
  }

  judgeIsFillAll(squares) {
    const result = squares.every(item => {
      return item === 'X' || item === 'O'
    })
    this.state.isFillAll = result
  }

  renderSquare(i) {
    return <Square value={this.state.squares[i]} onClick={() => this.handleClick(i)}/>
  }

  render() {
    const status = this.state.isVictory ? `${this.state.victoryName}获胜` : `Next player: ${this.state.currentSquare}`

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

export default Board;
