import React, { Component } from 'react';
import './Slider.scss';

class Slider extends Component {
  render() {
    const { emotion } = this.props;
    const value = this.props.sliderValue[emotion];

    return (
      <div className="slider-wrap">
        <div className="affect">
        <span className="field">{ emotion }</span> <span className="percentage">{ value || "0" }%</span>
        </div>

        <input onChange={ this.props.handleSliderData } data-field={ emotion } ref={ emotion } type="range" min="0" max="100" value={ value || "0" } className="slider" />
      </div>
    );
  }
}

export default Slider;
