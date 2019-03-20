import React, { Component } from 'react';
import './Slider.scss';

class Slider extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  updateInput = e => {
    const value = e.target.value;
    const field = e.target.dataset.field;

    this.setState({ [field] : value });
  }

  componentDidMount() {
    const field = this.props.emotion;

    this.setState({
      [field] : 3
    });
  }

  render() {
    return (
      <div className="slider-wrap">
        <div className="affect">
        <span className="field">{ this.props.emotion }</span> <span className="percentage">{ this.state[this.props.emotion] }%</span>
        </div>

        <input onChange={ this.updateInput } data-field={ this.props.emotion } ref={ this.props.emotion } type="range" min="0" max="100" value={ this.state[this.props.emotion] } className="slider" />
      </div>
    );
  }
}

export default Slider;
