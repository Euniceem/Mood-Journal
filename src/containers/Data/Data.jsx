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
import { fetchData } from '../../actions';

import Header from '../../components/Header';
import TimeSelector from '../../components/TimeSelector';

class Data extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chart_type: 'mood',
      trend_type: 'average',
      time: 'today'
    };

    this.handleOptionsOnClick = this.handleOptionsOnClick.bind(this);
  }

  componentDidMount() {
    this.props.fetchData();
  }

  handleOptionsOnClick(e) {
    const inputType = e.target.dataset.inputType;
    const value = e.target.value;

    this.setState({ [inputType]: value });
  }

  filterData() {}

  render() {
    let moodData = [];
    let emotionData = [];

    for (let day in this.props.avgWeek) {
      moodData.push({
        mood: this.props.avgWeek[day].moodSum,
        anxiety: this.props.avgWeek[day].emotions.anxiety,
        energy: this.props.avgWeek[day].emotions.energy,
        happiness: this.props.avgWeek[day].emotions.happiness,
        index: parseInt(day)
      });
    }

    for (let day in this.props.avgWeek) {
      this.props.avgWeek[day].emotions.day = parseInt(day);
      emotionData.push(this.props.avgWeek[day].emotions);
    }

    return (
      <div className="data-container">
        <Header />
        <div className="mood-or-emotions-switch">
          <button
            className="btn"
            data-input-type="chart_type"
            value="mood"
            onClick={this.handleOptionsOnClick}
          >
            Mood
          </button>
          <button
            className="btn"
            data-input-type="chart_type"
            value="emotions"
            onClick={this.handleOptionsOnClick}
          >
            Emotions
          </button>
        </div>

        <h1 className="title">Data</h1>
        <LineChart
          className={
            this.state.chart_type === 'mood' ? 'chart show' : 'chart hide'
          }
          width={350}
          height={200}
          data={moodData}
          margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Legend />
          <Line type="monotone" dataKey="mood" stroke="#82ca9d" />
          <Tooltip />
        </LineChart>

        <LineChart
          className={
            this.state.chart_type === 'emotions' ? 'chart show' : 'chart hide'
          }
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
          <Line type="monotone" dataKey="energy" stroke="#dcf442" />
          <Line type="monotone" dataKey="stress" stroke="#f45641" />
          <Tooltip />
        </LineChart>

        <TimeSelector
          trend_type={this.state.trend_type}
          handleOptionsOnClick={this.handleOptionsOnClick}
        />

        <div className="select-trend-type-container" />
        <button
          className="btn"
          data-input-type="trend_type"
          value="average"
          onClick={this.handleOptionsOnClick}
        >
          Average
        </button>
        <button
          className="btn"
          data-input-type="trend_type"
          value="past"
          onClick={this.handleOptionsOnClick}
        >
          Past
        </button>
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
