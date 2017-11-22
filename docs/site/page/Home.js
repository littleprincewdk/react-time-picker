import React from 'react';

import Style from './Home.less';

import { logo } from '../../asset/Image';

export default () => ({
  render() {
    return (
      <div className={Style.header}>
        <img src={logo} className={Style.logo} alt="logo" />
        <h2>Welcome to Xng Components</h2>
      </div>
    );
  }
});
