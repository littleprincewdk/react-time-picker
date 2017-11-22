import React from 'react';
import ReactDOM from 'react-dom';
import { Router, hashHistory } from 'react-router';
import 'normalize.css';

import './asset/css/components.less';
import './asset/css/index.less';

import Routes from './site/Routes';

ReactDOM.render(
  <Router history={hashHistory} routes={Routes} />,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./site/App.js', () => {
    console.log('update');
  });
}
