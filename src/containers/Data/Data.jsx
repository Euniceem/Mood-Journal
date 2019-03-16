import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  Line
} from 'recharts';
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
    let moodData = [];
    let emotionData = [];

    for (let day in this.props.avgWeek) {
      this.props.avgWeek[day].day = parseInt(day);
      moodData.push(this.props.avgWeek[day]);
    }

    for (let day in this.props.avgWeek) {
      this.props.avgWeek[day].emotions.day = parseInt(day);
      emotionData.push(this.props.avgWeek[day].emotions);
    }

    return (
      <div className="data-container">
        <Header />
        <h1 className="title">Data</h1>
        <LineChart
          width={350}
          height={200}
          data={moodData}
          margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Line type="monotone" dataKey="moodSum" stroke="#82ca9d" />
          <Tooltip />
        </LineChart>

        <LineChart
          width={350}
          height={200}
          data={emotionData}
          margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Legend />
          <Line type="monotone" dataKey="happiness" stroke="#8884d8" />
          <Line type="monotone" dataKey="anxiety" stroke="#82ca9d" />
          <Line type="monotone" dataKey="energy" stroke="#dcf442" />
          <Line type="monotone" dataKey="stress" stroke="#f45641" />
          <Tooltip />
        </LineChart>
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
