import React from 'react';
import PropTypes from 'prop-types';

import Style from './TimePicker.less';

import { isSameYear } from './utils';


export default class YearPanel extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.getBodyPanel(this.$BodyPanel);
  }

  getYears() {
    const { today, curTime, retTime } = this.props;
    const latestDecadesStart = curTime.decade * 10;
    const latestDecadesEnd = latestDecadesStart + 9;
    const years = [[], [], []];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 4; j++) {
        const year = latestDecadesStart - 1 + i * 4 + j;
        const className = [];
        if (year < latestDecadesStart) {
          className.push(Style.prev);
        }
        if (year > latestDecadesEnd) {
          className.push(Style.next);
        }
        const item = {
          title: year,
          value: year,
          className,
        };
        if (year === curTime.year) {
          item.className.push(Style.active);
        }
        if (isSameYear(today, { ...curTime, year })) {
          item.className.push(Style.cur);
        }
        years[i][j] = item;
      }
    }
    return years;
  }
  handleChange(e) {
    const target = e.target || e.srcElement;
    let year = target.dataset.year;
    if (typeof year !== 'undefined') {
      const { curTime } = this.props;
      year = parseInt(year, 10);
      const time = {
        ...curTime,
        year,
      };
      this.props.handleSelectTime(time, 'year');
      this.props.handleSwitchPanel('month');
    }
  }

  render() {
    const years = this.getYears();
    return (
      <div className={`${Style.body} ${Style.year} ${Style.animated}`} onClick={this.handleChange} ref={ele => { this.$BodyPanel = ele; }}>
        {years.map((row, index) => (
          <div key={index} className={Style.row}>
            {row.map(item => (
              <span key={item.value} data-year={item.value} className={`${Style.cell} ${item.className ? item.className.join(' ') : ''}`}>{item.title}</span>
            ))}
          </div>
        ))}
      </div>
    );
  }
}

YearPanel.propTypes = {
  today: PropTypes.object,
  curTime: PropTypes.object,
  decadesStart: PropTypes.number,
  onTimeChange: PropTypes.func,
  handleSelectTime: PropTypes.func,
  handleSwitchPanel: PropTypes.func,
  getBodyPanel: PropTypes.func,
};
