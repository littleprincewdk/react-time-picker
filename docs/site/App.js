import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Nav from './component/Nav';

import { AppStyle as Style } from '../asset/Css';

class App extends Component {
  render() {
    return (
      <div className={Style.app}>
        <Nav />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element,
};
App.defaultProps = {
  children: null,
};


export default App;

