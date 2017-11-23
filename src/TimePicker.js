import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Popper from 'popper.js';

import Style from './TimePicker.less';
import HeaderPanel from './HeaderPanel';
import BodyPanel from './BodyPanel';
import FooterPanel from './FooterPanel';

import { transform, getLatestDecadesStart } from './utils';

const pickers = {};
const defaultOptions = {
  placement: 'bottom-start',
  clockPressChangeInterval: 300,
};

export default class TimePicker extends React.Component {
  static init(referenceElement, name, options) {
    let $TimePicker = document.getElementById('time-picker');
    if (!$TimePicker) {
      $TimePicker = document.createElement('div');
      $TimePicker.setAttribute('id', 'time-picker');
      document.body.appendChild($TimePicker);
    }
    const $Wrapper = document.createElement('div');
    const $Mask = document.createElement('div');
    $Mask.classList.add(Style.mask);
    $Mask.setAttribute('data-name', name);
    $Mask.addEventListener('click', () => {
      TimePicker.hide(name);
    });

    $TimePicker.appendChild($Wrapper);
    $TimePicker.appendChild($Mask);

    ReactDOM.render(
      <TimePicker
        referenceElement={referenceElement}
        name={name}
        {...defaultOptions}
        {...options}
      />,
      $Wrapper,
    );
  }
  static show(name) {
    pickers[name].show();
    document.querySelector(`.${Style.mask}[data-name="${name}"]`).style.display = 'block';
  }
  static hide(name) {
    pickers[name].hide();
    document.querySelector(`.${Style.mask}[data-name="${name}"]`).style.display = 'none';
  }

  constructor(props) {
    super(props);
    const today = new Date();
    this.today = transform(today);
    this.state = {
      isShow: false,
      curTime: transform(new Date(props.time)) || today,
      panel: 'date',
    };
    this.state.curTime.decade = getLatestDecadesStart(this.state.curTime.year) / 10;
    this.state.retTime = this.state.curTime;

    pickers[props.name] = this;

    this.handleSwitchPanel = this.handleSwitchPanel.bind(this);
    this.handleSwitchTime = this.handleSwitchTime.bind(this);
    this.handleSelectTime = this.handleSelectTime.bind(this);
    this.getBodyPanel = this.getBodyPanel.bind(this);
  }

  componentWillMount() {

  }
  componentDidMount() {
    const { referenceElement, placement } = this.props;
    const popper = new Popper(referenceElement, this.picker, {
      placement,
    });
  }
  componentWillUpdate(nextProps, nextState) {

  }
  componentDidUpdate(nextProps, nextState) {
    if (nextState.panel !== this.state.panel) {
      this.content.classList.remove(Style.zoomOut);
      this.content.classList.add(Style.zoomIn);
    }
  }
  componentWillUnmount() {

  }

  show() {
    this.setState({
      isShow: true,
    });
  }
  hide() {
    this.picker.classList.add(Style.zoomOut);
    setTimeout(() => {
      this.setState({
        isShow: false,
      }, () => {
        this.picker.classList.remove(Style.zoomOut);
      });
    }, 1000);
  }
  getBodyPanel($Panel) {
    this.$BodyPanel = $Panel;
  }
  handleSwitchPanel(panel) {
    this.content.classList.add(Style.zoomOut);
    setTimeout(() => {
      this.setState({
        panel,
      });
    }, 100);
  }
  handleSwitchTime(curTime, increment, name) {
    const fadeOut = increment > 0 ? Style.fadeOutLeft : Style.fadeOutRight;
    const fadeIn = increment > 0 ? Style.fadeInRight : Style.fadeInLeft;
    this.$BodyPanel.classList.add(fadeOut);
    setTimeout(() => {
      this.setState({
        curTime,
      }, () => {
        this.$BodyPanel.classList.remove(fadeOut);
        this.$BodyPanel.classList.add(fadeIn);
        setTimeout(() => {
          this.$BodyPanel.classList.remove(fadeIn);
        }, 100);
      });
    }, 100);
  }
  handleSelectTime(time, panel) {
    this.setState({
      curTime: time,
      retTime: time,
    });
    const { name, onTimeChange } = this.props;
    if (['date', 'minute'].indexOf(panel) > -1) {
      TimePicker.hide(name);
    }
    if (typeof onTimeChange === 'function') {
      onTimeChange(time);
    }
  }

  render() {
    const { placement, clockPressChangeInterval } = this.props;
    const { curTime, retTime, panel } = this.state;
    return (
      <div className={`${Style.wrapper} ${Style.animated} ${Style.hinge}`} style={{ display: this.state.isShow ? 'block' : 'none' }} ref={ele => { this.picker = ele; }} data-placement={placement}>
        <div className={`${Style.picker} ${Style.animated} ${Style.zoomIn}`} ref={ele => { this.content = ele; }}>
          <HeaderPanel
            panel={panel}
            curTime={curTime}
            retTime={retTime}
            handleSelectTime={this.handleSelectTime}
            handleSwitchTime={this.handleSwitchTime}
            handleSwitchPanel={this.handleSwitchPanel}
          />
          <BodyPanel
            panel={panel}
            today={this.today}
            curTime={curTime}
            retTime={retTime}
            getBodyPanel={this.getBodyPanel}
            handleSelectTime={this.handleSelectTime}
            handleSwitchTime={this.handleSwitchTime}
            handleSwitchPanel={this.handleSwitchPanel}
            clockPressChangeInterval={clockPressChangeInterval}
          />
          {
            ['date', 'month', 'year'].indexOf(panel) > -1 ?
              <FooterPanel
                panel={panel}
                handleSwitchPanel={this.handleSwitchPanel}
              />
              : null
          }
        </div>
      </div>
    );
  }
}

TimePicker.propTypes = {
  referenceElement: PropTypes.object,
  name: PropTypes.string,
  placement: PropTypes.string,
  onTimeChange: PropTypes.func,
  clockPressChangeInterval: PropTypes.number,
};
