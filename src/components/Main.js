// require('normalize.css/normalize.css');
// require('styles/App.css');

import React from 'react';
import HelloReact from '../views/home.js'


class AppComponent extends React.Component {
  render() {
    return (
      <HelloReact></HelloReact>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
