import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Data.scss';
import { fetchData } from '../../actions';

import Header from '../../components/Header';
import TimeSelector from '../../components/TimeSelector';
import ChartTypeSwitch from '../../components/ChartTypeSwitch';
import TrendTypeSwitch from '../../components/TrendTypeSwitch';
import LineChartBuilder from '../../components/LineChartBuilder';

class Data extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chart_type: 'mood',
      trend_type: 'avg',
      time: '1',
      chartData: this.props.data.moodData.avgDay
    };

    this.handleOptionsOnClick = this.handleOptionsOnClick.bind(this);
    this.selectAverageData = this.selectAverageData.bind(this);
    this.filterDataByTime = this.filterDataByTime.bind(this);
  }

  componentDidMount() {
    this.props.fetchData();
    this.setState({ chartData: this.props.data.moodData.avgDay });
  }

  handleOptionsOnClick(e) {
    const inputType = e.target.dataset.inputType;
    const value = e.target.value;

    new Promise((resolve, reject) =>
      resolve(this.setState({ [inputType]: value }))
    ).then(() => {
      if (inputType === 'time' && this.state.trend_type === 'all') {
        this.filterDataByTime();
      } else {
        this.selectAverageData();
      }
    });
  }

  selectAverageData() {
    if (this.state.chart_type === 'mood') {
      switch (this.state.time) {
        case '1':
          return this.setState({ chartData: this.props.data.moodData.avgDay });
        case '7':
          return this.setState({ chartData: this.props.data.moodData.avgWeek });
        default:
          return this.setState({ chartData: this.props.data.moodData.avgDay });
      }
    }

    switch (this.state.time) {
      case '1':
        return this.setState({ chartData: this.props.data.emotionData.avgDay });
      case '7':
        return this.setState({
          chartData: this.props.data.emotionData.avgWeek
        });
      default:
        return this.setState({ chartData: this.props.data.emotionData.avgDay });
    }
  }

  filterDataByTime() {
    let startDate = new Date();

    startDate.setDate(startDate.getDate() - parseInt(this.state.time));

    if (this.state.chart_type === 'mood') {
      const selectedMoodEntries = this.props.data.moodData.allDays.filter(
        avgDay => {
          return new Date(avgDay.date) > startDate;
        }
      );

      return this.setState({
        chartData: selectedMoodEntries
      });
    }

    const selectedEmotionEntries = this.props.data.emotionData.allDays.filter(
      avgDay => {
        return new Date(avgDay.date) > startDate;
      }
    );

    return this.setState({
      chartData: selectedEmotionEntries
    });
  }

  render() {
    return (
      <div className="data-container">
        <Header />
        <ChartTypeSwitch handleOptionsOnClick={this.handleOptionsOnClick} />

        <LineChartBuilder
          chart_type={this.state.chart_type}
          chartData={this.state.chartData}
        />

        <TimeSelector
          trend_type={this.state.trend_type}
          handleOptionsOnClick={this.handleOptionsOnClick}
        />

        <TrendTypeSwitch handleOptionsOnClick={this.handleOptionsOnClick} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.data
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
