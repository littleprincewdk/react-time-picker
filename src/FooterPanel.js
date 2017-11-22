import React from 'react';
import PropTypes from 'prop-types';

import Style from './TimePicker.less';

export default class FooterPanel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { handleSwitchPanel } = this.props;
    return (
      <div className={Style.footer} onClick={handleSwitchPanel.bind(null, 'clock')}>
        <span className={`${Style.btn} ${Style.pickerSwitch}`}>
          <i className={`${Style.icon} ${Style.clock}`} />
        </span>
      </div>
    );
  }
}

FooterPanel.propTypes = {
  handleSwitchPanel: PropTypes.func,
};
