import React, { Component } from 'react';
import './CalendarView.scss';
import Header from '../../components/Header';
import Calendar from 'react-calendar';

class CalendarView extends Component {
  constructor(props) {
    super(props)

    this.state = {
      date: new Date(),
      showDayEntry: false
    }

    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeDay = this.onChangeDay.bind(this);
  }

  onChangeDate(date) {
    this.setState({ date })
  }

  //only shows entries before or on current date/time
  onChangeDay(e) {
    if (e >= new Date()) {
      this.setState({ showDayEntry: false })
    } else {
      this.setState({ showDayEntry: true })
    }
  }

  render() {
    return (
      <div className="calender-container">
        <Header />
        <h1 className="title">Calendar</h1>
        <Calendar
          onChange={this.onChangeDate}
          value={this.state.date}
          calendarType="US"
          className="calendar-view"
          minDetail="decade"
          view="month"
          onClickDay={this.onChangeDay}
        />
        {this.state.showDayEntry === true ?
          <div className="calendar-day-entry-container">
            <div className="day-entry-title">DATE/TIME</div>

          </div>
          :
          null
        }
      </div>
    )
  }
}

export default CalendarView;