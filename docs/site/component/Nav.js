import React from 'react';
import { Link } from 'react-router';

import Style from './Nav.less';
import { nav as navConfig } from 'Root/config';

export default () => ({
  renderNavItem(item, index) {
    return (
      <li className={Style.navItem} key={index}>
        <Link to={item.url} onlyActiveOnIndex={item.url === '/'} activeClassName={Style.active}>{item.title}</Link>
      </li>
    );
  },
  renderNav() {
    return navConfig.map((item, index) => this.renderNavItem(item, index));
  },
  render() {
    return (
      <ul role="nav" className={Style.nav}>
        {this.renderNav()}
      </ul>
    );
  }
});
