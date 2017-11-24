import React from 'react';
import PropTypes from 'prop-types';

import Style from './TimePicker.less';

import { getNewMinute, getNewHour, pad } from './utils';

export default class ClockPanel extends React.Component {
  constructor(props) {
    super(props);

    this.handleSwitch = this.handleSwitch.bind(this);
    this.handleSwitchNoon = this.handleSwitchNoon.bind(this);
    this.handleSwitchStart = this.handleSwitchStart.bind(this);
    this.handleSwitchEnd = this.handleSwitchEnd.bind(this);

    this.timer = null;
  }

  getSwitcherProps(increment, name) {
    return {
      className: `${Style.btn} ${Style.switcher}`,
      onClick: this.handleSwitch.bind(null, increment, name),
      onMouseDown: this.handleSwitchStart.bind(null, increment, name),
      onTouchStart: this.handleSwitchStart.bind(null, increment, name),
      onMouseUp: this.handleSwitchEnd,
      onTouchEnd: this.handleSwitchEnd,
      onMouseOut: this.handleSwitchEnd,
    };
  }

  handleSwitch(increment, name) {
    const { curTime, handleSelectTime } = this.props;
    let newTime;
    if (name === 'hour') {
      newTime = getNewHour(curTime, increment);
    } else {
      newTime = getNewMinute(curTime, increment);
    }
    handleSelectTime(newTime);
  }
  handleSwitchNoon() {
    const { curTime, handleSelectTime } = this.props;
    const hour = curTime.hour;
    let newTime;
    if (hour >= 12) {
      newTime = { ...curTime, hour: hour - 12 };
    } else {
      newTime = { ...curTime, hour: hour + 12 };
    }
    handleSelectTime(newTime);
  }
  handleSwitchStart(increment, name) {
    const { clockPressChangeInterval } = this.props;
    this.timer = setInterval(() => {
      this.handleSwitch(increment, name);
    }, clockPressChangeInterval);
  }
  handleSwitchEnd() {
    clearInterval(this.timer);
    this.timer = null;
  }

  render() {
    const { curTime: { minute }, handleSwitchPanel } = this.props;
    let { curTime: { hour } } = this.props;
    let noon;
    if (hour >= 12) {
      noon = 'PM';
      if (hour !== 12) {
        hour -= 12;
      }
    } else {
      noon = 'AM';
    }
    return (
      <div className={`${Style.body} ${Style.clock}`}>
        <div className={Style.row}>
          <div {...this.getSwitcherProps(1, 'hour')}>
            <span>
              <i className={`${Style.icon} ${Style.chevronUp}`} />
            </span>
          </div>
          <div className={Style.fill} />
          <div {...this.getSwitcherProps(1, 'minute')}>
            <span>
              <i className={`${Style.icon} ${Style.chevronUp}`} />
            </span>
          </div>
          <div className={Style.fill} />
          <div className={Style.fill} />
          <div className={Style.fill} />
        </div>
        <div className={Style.row}>
          <div className={Style.time}>
            <span onClick={handleSwitchPanel.bind(null, 'hour')}>{hour}</span>
          </div>
          <div className={`${Style.fill} ${Style.bold}`}>:</div>
          <div className={Style.time}>
            <span onClick={handleSwitchPanel.bind(null, 'minute')}>{pad(minute, 2)}</span>
          </div>
          <div className={Style.fill} />
          <div className={Style.noon}>
            <button className={`${Style.btn} ${Style.btnPrimary}`} onClick={this.handleSwitchNoon}>{noon}</button>
          </div>
        </div>
        <div className={Style.row}>
          <div {...this.getSwitcherProps(-1, 'hour')}>
            <span>
              <i className={`${Style.icon} ${Style.chevronDown}`} />
            </span>
          </div>
          <div className={Style.fill} />
          <div {...this.getSwitcherProps(-1, 'minute')}>
            <span>
              <i className={`${Style.icon} ${Style.chevronDown}`} />
            </span>
          </div>
          <div className={Style.fill} />
          <div className={Style.fill} />
          <div className={Style.fill} />
        </div>
      </div>
    );
  }
}

ClockPanel.propTypes = {
  today: PropTypes.object,
  curTime: PropTypes.object,
  decadesStart: PropTypes.number,
  onTimeChange: PropTypes.func,
  handleSelectTime: PropTypes.func,
  handleSwitchTime: PropTypes.func,
  handleSwitchPanel: PropTypes.func,
  clockPressChangeInterval: PropTypes.number,
};
