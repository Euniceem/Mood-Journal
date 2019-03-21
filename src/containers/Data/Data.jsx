import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Data.scss';
import { fetchData } from '../../actions';

import Header from '../../components/Header';
import TimeSelector from '../../components/TimeSelector';
import ChartTypeSwitch from '../../components/ChartTypeSwitch';
import LineChartBuilder from '../../components/LineChartBuilder';
import ActivityDataDisplay from '../../components/ActivityDataDisplay';

class Data extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chart_type: 'mood',
      time: '1',
      mood_chart_data: this.props.data.moodData.avgDay,
      emotion_chart_data: this.props.data.emotionData.avgDay,
      activity_data: this.props.data.activityData.avgDay
    };

    this.handleOptionsOnClick = this.handleOptionsOnClick.bind(this);
    this.filterDataByTime = this.filterDataByTime.bind(this);
  }

  componentDidMount() {
    this.props.fetchData();
  }

  handleOptionsOnClick(e) {
    const inputType = e.target.dataset.inputType;
    const value = e.target.value;

    this.setState({ [inputType]: value });

    if (inputType === 'time') {
      this.filterDataByTime(value);
    }
  }

  filterDataByTime(time) {
    if (time.includes('avg')) {
      return this.setState({
        mood_chart_data: this.props.data.moodData[time],
        emotion_chart_data: this.props.data.emotionData[time],
        activity_data: this.props.data.activityData[time]
      });
    }

    const selectedActivitySums = {};
    let startDate = new Date();

    startDate.setDate(startDate.getDate() - parseInt(time));

    const selectedMoodEntries = this.props.data.moodData.allDays.filter(
      avgDay => {
        return new Date(avgDay.date) > startDate;
      }
    );

    const selectedEmotionEntries = this.props.data.emotionData.allDays.filter(
      avgDay => {
        return new Date(avgDay.date) > startDate;
      }
    );

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

    return this.setState({
      mood_chart_data: selectedMoodEntries,
      emotion_chart_data: selectedEmotionEntries,
      activity_data: selectedActivitySums
    });
  }

  render() {
    return (
      <div className="data-container">
        <Header />
        <ChartTypeSwitch handleOptionsOnClick={this.handleOptionsOnClick} />

        <LineChartBuilder
          chart_type={this.state.chart_type}
          mood_chart_data={this.state.mood_chart_data}
          emotion_chart_data={this.state.emotion_chart_data}
        />

        <TimeSelector
          trend_type={this.state.trend_type}
          handleOptionsOnClick={this.handleOptionsOnClick}
        />

        <ActivityDataDisplay
          trend_type={this.state.trend_type}
          time={this.state.time}
          activity_data={this.state.activity_data}
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
