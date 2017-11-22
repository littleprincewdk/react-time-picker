import React from 'react';
import PropTypes from 'prop-types';

import Style from './TimePicker.less';

import { isSameMonth } from './utils';

const months = [
  [{ title: 'Jan', value: 0 }, { title: 'Feb', value: 1 }, { title: 'Mar', value: 2 }, { title: 'Apr', value: 3 }],
  [{ title: 'May', value: 4 }, { title: 'Jun', value: 5 }, { title: 'Jul', value: 6 }, { title: 'Aug', value: 7 }],
  [{ title: 'Sep', value: 8 }, { title: 'Oct', value: 9 }, { title: 'Nov', value: 10 }, { title: 'Dec', value: 11 }],
];

export default class MonthPanel extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  getMonths() {
    const { today, curTime, retTime } = this.props;
    return months.map(row => row.map(item => {
      const _item = { ...item, className: [] };
      const itemTime = { ...curTime, month: item.value };
      if (isSameMonth(retTime, itemTime)) {
        _item.className.push(Style.active);
      }
      if (isSameMonth(today, itemTime)) {
        _item.className.push(Style.cur);
      }
      return _item;
    }));
  }
  handleChange(e) {
    const target = e.target || e.srcElement;
    let month = target.dataset.month;
    if (typeof month !== 'undefined') {
      const { curTime } = this.props;
      month = parseInt(month, 10);
      const time = {
        ...curTime,
        month,
      };
      this.props.handleSelectTime(time, 'month');
      this.props.handleSwitchPanel('date');
    }
  }

  render() {
    const months = this.getMonths();
    return (
      <div className={`${Style.body} ${Style.month}`} onClick={this.handleChange}>
        {months.map((row, index) => (
          <div key={index} className={Style.row}>
            {row.map(item => (
              <span key={item.value} data-month={item.value} className={`${Style.cell} ${item.className ? item.className.join(' ') : ''}`}>{item.title}</span>
            ))}
          </div>
        ))}
      </div>
    );
  }
}

MonthPanel.propTypes = {
  today: PropTypes.object,
  curTime: PropTypes.object,
  retTime: PropTypes.object,
  onTimeChange: PropTypes.func,
  handleSelectTime: PropTypes.func,
  handleSwitchPanel: PropTypes.func,
};
