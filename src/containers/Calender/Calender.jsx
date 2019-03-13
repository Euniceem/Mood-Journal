import React, { Component } from 'react';
import './Calender.scss';

class Calender extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="calender-container">
        <h1 className="title">Calender</h1>
      </div>
    )
  }
}

export default Calender;