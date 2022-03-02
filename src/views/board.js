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

  handleClick(i) { // 点击空格触发该事件
    if (this.state.isVictory || this.state.isFillAll) { // 如果已经有一方获胜，或者所有格子都填充完毕直接返回出去
      return
    }
    const squares = this.state.squares.slice(); // 复制棋盘数据
    if (squares[i] === 'X' || squares[i] === 'O') { // 如果当前点击格子已有数据，则不允许点击，直接返回出去
      return
    }
    squares[i] = this.state.currentSquare;
    this.setState({squares: squares}); // 给当前点击的格子赋值
    this.setState({currentSquare: this.state.currentSquare === 'X' ? 'O' : 'X'}) // 改变下一次落子方
    this.judgeSuccess(squares) // 判断一方是否获胜
    this.judgeIsFillAll(squares) // 判断格子是否全部填满
  }

  judgeSuccess(squares) { // 判断输赢函数
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
    result.forEach(item => { // 判断是否有三星连珠
      let count = 0
      for (let i = 0; i < item.length; i ++) {
        if (item[i] === 'X') { // 如果当前值为X,让结果加一
          count++
        }
        if (item[i] === 'O') { // 如果当前值为O,让结果减一
          count--
        }
        if (count === 3 || count === -3) { // 如果结果等于3或者是-3就有一方获胜
          this.state.isVictory = true
          this.setState({victoryName: this.state.currentSquare}); // 给获胜方赋值
          window.alert(this.state.currentSquare + '获胜')
          return
        }
      }
    })
  }

  judgeIsFillAll(squares) { // 判断格子是否填满
    const result = squares.every(item => {
      return item === 'X' || item === 'O'
    })
    this.state.isFillAll = result
  }

  renderSquare(i) { // 渲染得个格子
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
