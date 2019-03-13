import React, { Component } from 'react';
import './Calender.scss';
import Header from '../../components/Header';

class Calender extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="calender-container">
        <Header />
        <h1 className="title">Calender</h1>
      </div>
    )
  }
}

export default Calender;