import React from 'react';
import PropTypes from 'prop-types';

import Style from './TimePicker.less';

import { getCountDays, getNewMonth, isSameDate } from './utils';

export default class DatePanel extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }
  // get cur month date distribution
  getDates() {
    const { today, curTime, retTime } = this.props;
    const firstDate = new Date();
    firstDate.setFullYear(curTime.year);
    firstDate.setMonth(curTime.month);
    firstDate.setDate(1);
    firstDate.setHours(0);
    firstDate.setMinutes(0);
    firstDate.setSeconds(0);
    firstDate.setMilliseconds(0);
    const firstDay = firstDate.getDay();
    const lastMonthCountDays = getCountDays(getNewMonth(curTime, -1));
    // max row num is 6
    const curMonthDates = [[], [], [], [], [], []];
    const lastMonthTailCount = (firstDay + 7) % 7;
    // prev month
    for (let i = 0; i < lastMonthTailCount; i++) {
      const date = lastMonthCountDays - (lastMonthTailCount - i - 1);
      const item = {
        title: date,
        value: date,
        className: [Style.prev],
      };
      const itemTime = { ...curTime, date };
      if (isSameDate(itemTime, retTime)) {
        item.className.push(Style.active);
      }
      if (isSameDate(itemTime, today)) {
        item.className.push(Style.cur);
      }
      curMonthDates[0][i] = item;
    }
    let maxRow = 0;
    // cur month
    const curMonthCountDays = getCountDays(curTime);
    for (let i = 0; i < curMonthCountDays; i++) {
      const date = i + 1;
      const item = {
        title: date,
        value: date,
        className: [],
      };
      const itemTime = { ...curTime, date };
      if (isSameDate(itemTime, retTime)) {
        item.className.push(Style.active);
      }
      if (isSameDate(itemTime, today)) {
        item.className.push(Style.cur);
      }
      const col = (i + lastMonthTailCount) % 7;
      const row = Math.floor((i + lastMonthTailCount) / 7);
      maxRow = row;
      curMonthDates[row][col] = item;
    }
    // next month
    const nextMonthHeadCount = (maxRow + 1) * 7 - curMonthCountDays - lastMonthTailCount;
    for (let i = 0; i < nextMonthHeadCount; i++) {
      const date = i + 1;
      const item = {
        title: date,
        value: date,
        className: [Style.next],
      };
      const itemTime = { ...curTime, date };
      if (isSameDate(itemTime, retTime)) {
        item.className.push(Style.active);
      }
      if (isSameDate(itemTime, today)) {
        item.className.push(Style.cur);
      }
      const col = 7 - nextMonthHeadCount + i;
      curMonthDates[maxRow][col] = item;
    }

    return curMonthDates;
  }

  handleChange(e) {
    const target = e.target || e.srcElement;
    let date = target.dataset.date;
    if (typeof date !== 'undefined') {
      const { curTime } = this.props;
      date = parseInt(date, 10);
      const time = {
        ...curTime,
        date,
      };
      this.props.handleSelectTime(time, 'date');
    }
  }

  render() {
    const dates = this.getDates();
    return (
      <div className={`${Style.body} ${Style.date}`} onClick={this.handleChange} ref={ele => { this.body = ele; }}>
        {dates.map((row, index) => (
          <div key={index} className={Style.row}>
            {row.map(item => (
              <span key={item.value} data-date={item.value} className={`${Style.cell} ${item.className ? item.className.join(' ') : ''}`}>{item.title}</span>
            ))}
          </div>
        ))}
      </div>
    );
  }
}

DatePanel.propTypes = {
  today: PropTypes.object,
  retTime: PropTypes.object,
  curTime: PropTypes.object,
  onTimeChange: PropTypes.func,
  handleSelectTime: PropTypes.func,
  handleSwitchPanel: PropTypes.func,
};
