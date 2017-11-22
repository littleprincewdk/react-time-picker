import React from 'react';
import { Link, } from 'react-router';

import Style from './SubNav.less';

export default () => ({
  renderNavItem(item, index) {
    return (
      <li className={Style.navItem} key={index}>
        <Link
          to={item.url}
          activeClassName={Style.active}
        >{item.title}</Link>
      </li>
    );
  },
  renderNav() {
    const { subNavConfig } = this.props;
    return subNavConfig.map((item, index) => this.renderNavItem(item, index));
  },
  render() {
    return (
      <ul role="nav" className={Style.subNav}>
        {this.renderNav()}
      </ul>
    );
  }
});
