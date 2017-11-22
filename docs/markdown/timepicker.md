### React Time Picker

### usage
```
constructor(props) {
    super(props);
    this.state = {
        startTime: moment().valueOf(),
    };
}
componentDidMount() {
    TimePicker.init(this.input, 'startTime', {
      placement: 'bottom-start',
      // time format
      // { year: 2017, month: 10, date: 22, hour: 19, minute: 51, second: 0 }
      // notice month is from 0
      onTimeChange: (time) => {
          this.setState({
              startTime: moment(time).valueOf(),
          });
      },
      time: this.state.startTime,
    });
}
handleShowPicker() {
    TimePicker.show('startTime');
}
render() {
    return (
        <input
          type="text"
          value={moment(this.state.startTime).format('YYYY-MM-DD HH:mm:ss')}
          ref={ele => {this.input = ele;}}
          onFocus={this.handleShowPicker}
        />
    )
}
```
### options
| Name |Default | Description
---|---|---
 placement | "bottom-start" | position
 onTimeChange | | callback function triggered after time has changed
 time | now | initial time
 clockPressChangeInterval | 300ms | when press clock panel chevron, how many time to change once  