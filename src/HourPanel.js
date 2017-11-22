import React from 'react';
import PropTypes from 'prop-types';

import Style from './TimePicker.less';

import { pad } from './utils';

export default class HourPanel extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  getHours() {
    const { curTime } = this.props;
    const hours = [[], [], [], [], [], []];
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 4; j++) {
        const minute = 4 * i + j;
        const item = {
          title: pad(minute, 2),
          value: minute,
          className: [],
        };
        if (minute === curTime.hour) {
          item.className.push(Style.active);
        }
        hours[i][j] = item;
      }
    }

    return hours;
  }
  handleChange(e) {
    const target = e.target || e.srcElement;
    let hour = target.dataset.hour;
    if (typeof hour !== 'undefined') {
      const { curTime } = this.props;
      hour = parseInt(hour, 10);
      const time = {
        ...curTime,
        hour,
      };
      this.props.handleSelectTime(time, 'hour');
      this.props.handleSwitchPanel('minute');
    }
  }

  render() {
    const hours = this.getHours();
    return (
      <div className={`${Style.body} ${Style.minute}`} onClick={this.handleChange}>
        {hours.map((row, index) => (
          <div key={index} className={Style.row}>
            {row.map(item => (
              <span key={item.value} data-hour={item.value} className={`${Style.cell} ${item.className ? item.className : ''}`}>{item.title}</span>
            ))}
          </div>
        ))}
      </div>
    );
  }
}

HourPanel.propTypes = {
  today: PropTypes.object,
  curTime: PropTypes.object,
  decadesStart: PropTypes.number,
  onTimeChange: PropTypes.func,
  handleSelectTime: PropTypes.func,
  handleSwitchPanel: PropTypes.func,
};
