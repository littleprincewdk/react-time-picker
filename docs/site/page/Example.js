import React from 'react';

import Style from './Example.less';
import SubNav from 'Component/SubNav';

import { componentList } from 'Root/config';

export default () => ({
  getSubNav() {
    return componentList.map(item => ({
      title: item.title,
      url: `/example/${item.url}`,
    }));
  },
  render() {
    return (
      <div className={Style.root}>
        <SubNav subNavConfig={this.getSubNav()} />
        <div className={Style.main}>
          {this.props.children}
        </div>
      </div>
    );
  }
});
