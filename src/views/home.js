// require('normalize.css/normalize.css');
// require('styles/App.css');

import React from 'react';
import Board from './board.js'

class HelloReact extends React.Component {
  render() {
    return (
      <Board></Board>
    );
  }
}

HelloReact.defaultProps = {
  test: 'Hello React'
};

export default HelloReact;
