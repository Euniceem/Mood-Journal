import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Data.scss';
import { fetchData } from '../../actions';

import Header from '../../components/Header';
import TimeSelector from '../../components/TimeSelector';
import ChartTypeSwitch from '../../components/ChartTypeSwitch';
import TrendTypeSwitch from '../../components/TrendTypeSwitch';
import LineChartBuilder from '../../components/LineChartBuilder';
import ActivityDataDisplay from '../../components/ActivityDataDisplay';

class Data extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chart_type: 'mood',
      trend_type: 'avg',
      time: '1',
      line_chart_data: this.props.data.moodData.avgDay,
      activity_data: this.props.data.activityData.avgDay
    };

    this.handleOptionsOnClick = this.handleOptionsOnClick.bind(this);
    this.selectAverageData = this.selectAverageData.bind(this);
    this.filterDataByTime = this.filterDataByTime.bind(this);
  }

  componentDidMount() {
    this.props.fetchData();
    this.setState({ line_chart_data: this.props.data.moodData.avgDay });
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
          return this.setState({
            line_chart_data: this.props.data.moodData.avgDay,
            activity_data: this.props.data.activityData.avgDay
          });
        case '7':
          return this.setState({
            line_chart_data: this.props.data.moodData.avgWeek,
            activity_data: this.props.data.activityData.avgWeek
          });
        default:
          return this.setState({
            line_chart_data: this.props.data.moodData.avgDay,
            activity_data: this.props.data.activityData.avgDay
          });
      }
    }

    switch (this.state.time) {
      case '1':
        return this.setState({
          line_chart_data: this.props.data.emotionData.avgDay,
          activity_data: this.props.data.activityData.avgDay
        });
      case '7':
        return this.setState({
          line_chart_data: this.props.data.emotionData.avgWeek,
          activity_data: this.props.data.activityData.avgWeek
        });
      default:
        return this.setState({
          line_chart_data: this.props.data.emotionData.avgDay,
          activity_data: this.props.data.activityData.avgDay
        });
    }
  }

  filterDataByTime() {
    let startDate = new Date();

    startDate.setDate(startDate.getDate() - parseInt(this.state.time));

    const selectedActivitySums = {};

    this.props.data.activityData.allDays
      .filter(day => {
        return new Date(day.date) > startDate;
      })
      .forEach(day => {
        for (let activity in day) {
          if (activity === 'date') {
            return;
          }

          selectedActivitySums[activity]
            ? (selectedActivitySums[activity] += parseInt(day[activity]))
            : (selectedActivitySums[activity] = parseInt(day[activity]));
        }
      });

    this.setState({ activity_data: selectedActivitySums });

    if (this.state.chart_type === 'mood') {
      const selectedMoodEntries = this.props.data.moodData.allDays.filter(
        avgDay => {
          return new Date(avgDay.date) > startDate;
        }
      );

      return this.setState({
        line_chart_data: selectedMoodEntries
      });
    }

    const selectedEmotionEntries = this.props.data.emotionData.allDays.filter(
      avgDay => {
        return new Date(avgDay.date) > startDate;
      }
    );

    return this.setState({
      line_chart_data: selectedEmotionEntries
    });
  }

  render() {
    return (
      <div className="data-container">
        <Header />
        <ChartTypeSwitch handleOptionsOnClick={this.handleOptionsOnClick} />

        <LineChartBuilder
          chart_type={this.state.chart_type}
          chart_data={this.state.line_chart_data}
        />

        <TimeSelector
          trend_type={this.state.trend_type}
          handleOptionsOnClick={this.handleOptionsOnClick}
        />

        <TrendTypeSwitch handleOptionsOnClick={this.handleOptionsOnClick} />

        <ActivityDataDisplay
          trend_type={this.state.trend_type}
          time={this.state.time}
          activity_data_object={this.state.activity_data}
        />
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
