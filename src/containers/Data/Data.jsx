import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Data.scss';
import Header from '../../components/Header';
import { fetchData } from '../../actions';

class Data extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.props.fetchData();
  }

  render() {
    return (
      <div className="data-container">
        <Header />
        <h1 className="title">Data</h1>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    avgDay: state.avgDay,
    avgWeek: state.avgWeek
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: () => dispatch(fetchData())
  };
};

Data = connect(
  mapStateToProps,
  mapDispatchToProps
)(Data);

export default Data;
