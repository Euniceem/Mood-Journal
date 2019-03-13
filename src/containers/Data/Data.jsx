import React, { Component } from 'react';
import './Data.scss';
import Header from '../../components/Header';

class Data extends Component {
  constructor(props) {
    super(props)

  }
  render() {
    return (
      <div className="data-container">
        <Header />
        <h1 className="title">Data</h1>
      </div>
    )
  }
}

export default Data;