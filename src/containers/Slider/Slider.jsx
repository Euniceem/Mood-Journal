import React, { Component } from 'react';
import './Slider.scss';

class Slider extends Component {
  render() {
    const { emotion } = this.props;

    console.log(this.props.sliderValue);

    return (
      <div className="slider-wrap">
        <div className="affect">
        <span className="field">{ emotion }</span> <span className="percentage">{ this.props.sliderValue[emotion] || "3" }%</span>
        </div>

        <input onChange={ this.props.handleSliderData } data-field={ emotion } ref={ emotion } type="range" min="0" max="100" value={ this.props.sliderValue[emotion] || "3" } className="slider" />
      </div>
    );
  }
}

export default Slider;
