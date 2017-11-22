import React from 'react';
import PropTypes from 'prop-types';

import ClockPanel from './ClockPanel';
import MinutePanel from './MinutePanel';
import HourPanel from './HourPanel';
import DatePanel from './DatePanel';
import MonthPanel from './MonthPanel';
import YearPanel from './YearPanel';

export default class BodyPanel extends React.Component {
  render() {
    const { panel } = this.props;
    let Panel = null;
    switch (panel) {
      case 'clock':
        Panel = ClockPanel;
        break;
      case 'minute':
        Panel = MinutePanel;
        break;
      case 'hour':
        Panel = HourPanel;
        break;
      case 'date':
        Panel = DatePanel;
        break;
      case 'month':
        Panel = MonthPanel;
        break;
      case 'year':
        Panel = YearPanel;
        break;
      default:
        break;
    }
    return (
      <Panel {...this.props} />
    );
  }
}

BodyPanel.propTypes = {
  today: PropTypes.object,
  curTime: PropTypes.object,
  panel: PropTypes.string,
  onTimeChange: PropTypes.func,
  handleSelectTime: PropTypes.func,
  handleSwitchPanel: PropTypes.func,
};
