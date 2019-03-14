import React, { Component } from 'react';
import './CalendarView.scss';
import Header from '../../components/Header';
import Calendar from 'react-calendar';


class CalendarView extends Component {
  constructor(props) {
    super(props)

    this.state = {
      date: new Date(),
    }

    this.onChange = this.onChange.bind(this)
  }

  onChange(date) {
    this.setState({ date })
  }

  render() {
    return (
      <div className="calender-container">
        <Header />
        <h1 className="title">Calendar</h1>
        <Calendar
          onChange={this.onChange}
          value={this.state.date}
          calendarType="US"
          className="calendar-view"
          minDetail="decade"
          view="month"
        />
      </div>
    )
  }
}

export default CalendarView;