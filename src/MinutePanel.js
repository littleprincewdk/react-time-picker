import React from 'react';
import PropTypes from 'prop-types';

import Style from './TimePicker.less';

export default class MinutePanel extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  getMinutes() {
    const { curTime } = this.props;
    const minutes = [[], [], []];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 4; j++) {
        const minute = (4 * i + j) * 5;
        const item = {
          title: minute,
          value: minute,
          className: [],
        };
        if (minute === curTime.minute) {
          item.className.push(Style.active);
        }
        minutes[i][j] = item;
      }
    }

    return minutes;
  }
  handleChange(e) {
    const target = e.target || e.srcElement;
    let minute = target.dataset.minute;
    if (typeof minute !== 'undefined') {
      const { curTime } = this.props;
      minute = parseInt(minute, 10);
      const time = {
        ...curTime,
        minute,
      };
      this.props.handleSelectTime(time, 'minute');
    }
  }

  render() {
    const minutes = this.getMinutes();
    return (
      <div className={`${Style.body} ${Style.minute}`} onClick={this.handleChange}>
        {minutes.map((row, index) => (
          <div key={index} className={Style.row}>
            {row.map(item => (
              <span key={item.value} data-minute={item.value} className={`${Style.cell} ${item.className ? item.className : ''}`}>{item.title}</span>
            ))}
          </div>
        ))}
      </div>
    );
  }
}

MinutePanel.propTypes = {
  today: PropTypes.object,
  curTime: PropTypes.object,
  decadesStart: PropTypes.number,
  onTimeChange: PropTypes.func,
  handleSelectTime: PropTypes.func,
  handleSwitchPanel: PropTypes.func,
};
