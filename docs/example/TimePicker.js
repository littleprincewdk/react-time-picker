import React from 'react';
import moment from 'moment';

import TimePicker from '../../src/index';

export default class TimePickerPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      time1: moment().valueOf(),
      time2: moment().valueOf(),
      time3: moment().valueOf(),
    };

    this.handleShowPicker = this.handleShowPicker.bind(this);
    this.handleHidePicker = this.handleHidePicker.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
  }

  componentDidMount() {
    TimePicker.init(this.referenceElement1, '1', {
      placement: 'bottom-start',
      onTimeChange: this.handleTimeChange.bind(null, '1'),
      time: this.state.time1,
    });
    TimePicker.init(this.referenceElement2, '2', {
      placement: 'bottom-end',
      onTimeChange: this.handleTimeChange.bind(null, '2'),
      time: this.state.time2,
    });
    TimePicker.init(this.referenceElement3, '3', {
      placement: 'bottom',
      onTimeChange: this.handleTimeChange.bind(null, '3'),
      time: this.state.time3,
    });
  }
  handleTimeChange(name, time) {
    this.setState({
      [`time${name}`]: moment(time).valueOf(),
    });
  }
  handleShowPicker(e) {
    const name = e.target.dataset.name;
    TimePicker.show(name);
  }
  handleHidePicker(e) {
    const name = e.target.dataset.name;
    TimePicker.hide(name);
  }

  render() {
    return (
      <div>
        <input type="text" value={moment(this.state.time1).format('YYYY-MM-DD HH:mm:ss')} data-name="1" ref={ele => { this.referenceElement1 = ele; }} onFocus={this.handleShowPicker} />
        <br />
        <br />
        <input type="text" value={moment(this.state.time2).format('YYYY-MM-DD HH:mm:ss')} data-name="2" ref={ele => { this.referenceElement2 = ele; }} onFocus={this.handleShowPicker} />
        <br />
        <br />
        <input type="text" value={moment(this.state.time3).format('YYYY-MM-DD HH:mm:ss')} data-name="3" ref={ele => { this.referenceElement3 = ele; }} onFocus={this.handleShowPicker} />
        <br />
      </div>
    );
  }
}
