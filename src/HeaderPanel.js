import React from 'react';
import PropTypes from 'prop-types';

import Style from './TimePicker.less';

import { getNewMonth, getNewYear } from './utils';

const week = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default class HeaderPanel extends React.Component {
  constructor(props) {
    super(props);
    this.handleSwitchMonth = this.handleSwitchMonth.bind(this);
    this.handleSwitchYear = this.handleSwitchYear.bind(this);
    this.handleSwitchDecade = this.handleSwitchDecade.bind(this);
  }

  handleSwitchMonth(increment) {
    const { curTime, handleSwitchTime } = this.props;
    const newTime = getNewMonth(curTime, increment);
    handleSwitchTime(newTime, increment, 'month');
  }
  handleSwitchYear(increment) {
    const { curTime, handleSwitchTime } = this.props;
    const newTime = getNewYear(curTime, increment);
    handleSwitchTime(newTime, increment, 'year');
  }
  handleSwitchDecade(increment) {
    const { curTime, handleSwitchTime } = this.props;
    const newTime = { ...curTime, decade: curTime.decade + increment };
    handleSwitchTime(newTime, increment, 'decade');
  }

  renderWeek() {
    return week.map((day, index) => (
      <span key={index} className={Style.cell}>{day}</span>
    ));
  }
  render() {
    const { panel, curTime, handleSwitchPanel } = this.props;
    const Week = (
      <div className={Style.week}>
        {this.renderWeek()}
      </div>
    );
    let title = '';
    let _handleSwitchPanel = null;
    let handleSwitch = null;
    switch (panel) {
      case 'clock':
        title = <i className={`${Style.icon} ${Style.calendar}`} />;
        _handleSwitchPanel = handleSwitchPanel.bind(null, 'date');
        break;
      case 'minute':
        title = <i className={`${Style.icon} ${Style.calendar}`} />;
        _handleSwitchPanel = handleSwitchPanel.bind(null, 'date');
        break;
      case 'hour':
        title = <i className={`${Style.icon} ${Style.calendar}`} />;
        _handleSwitchPanel = handleSwitchPanel.bind(null, 'date');
        break;
      case 'date':
        title = `${month[curTime.month]} ${curTime.year}`;
        _handleSwitchPanel = handleSwitchPanel.bind(null, 'month');
        handleSwitch = this.handleSwitchMonth;
        break;
      case 'month':
        title = curTime.year;
        _handleSwitchPanel = handleSwitchPanel.bind(null, 'year');
        handleSwitch = this.handleSwitchYear;
        break;
      case 'year':
        const latestDecadesStart = curTime.decade * 10;
        title = `${latestDecadesStart} - ${latestDecadesStart + 9}`;
        handleSwitch = this.handleSwitchDecade;
        break;
      default:
        break;
    }

    return (
      <div className={Style.header}>
        <div className={Style.switch}>
          {handleSwitch && <div className={`${Style.btn} ${Style.prev}`} onClick={handleSwitch.bind(null, -1)}>{'‹'}</div>}
          <div className={`${Style.btn} ${Style.cur}`} onClick={_handleSwitchPanel}>
            {title}
          </div>
          {handleSwitch && <div className={`${Style.btn} ${Style.next}`} onClick={handleSwitch.bind(null, 1)}>{'›'}</div>}
        </div>
        {panel === 'date' && Week}
      </div>
    );
  }
}

HeaderPanel.propTypes = {
  panel: PropTypes.string,
  curTime: PropTypes.object,
  handleSwitchPanel: PropTypes.func,
  handleSwitchTime: PropTypes.func,
  handleSelectTime: PropTypes.func,
};
