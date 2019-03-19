import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadEntries } from '../../actions';
import './CalendarView.scss';
import Header from '../../components/Header';
import Calendar from 'react-calendar';
import CalendarEntryView from '../../components/CalendarEntryView';

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

  componentDidMount() {
    this.props.loadEntries()
  }

  onChangeDate(date) {
    this.setState({ date })
  }

  //only shows entries before or on current date/time
  onChangeDay(e) {
    if (e >= new Date()) {
      this.setState({ showDayEntry: false })
    } else {
      this.setState({ showDayEntry: true, date: new Date(e) })
    }
  }

  render() {

    const entryDate = this.props.entries.filter(entries => {
      let date = new Date(entries.created_at);
      return date.toDateString();

    })

    const entryDayMood = () => {

      const entryDay = this.props.entries.map(entries => {
        let date = new Date(entries.created_at).toDateString()
        let stateDate = this.state.date.toDateString()

        if (date === stateDate) {
          if (entries.mood === "Awful") {
            return "awful"
          }
          if (entries.mood === "Bad") {
            return "bad"
          }
          if (entries.mood === "Average") {
            return "average"
          }
          if (entries.mood === "Good") {
            return "good"
          }
          if (entries.mood === "Amazing") {
            return "amazing"
          }
        } else {
          return null;
        }
        return entries.mood
      })
    }


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
          tileClassName={`testing ${entryDayMood()}`}
        />
        {this.state.showDayEntry === true ?

          <div className="calendar-day-entry-container">

            <div className="calendar-day-entry-date-title">{this.state.date.toDateString()}</div>

            <CalendarEntryView entries={this.props.entries} date={this.state.date} />

          </div>
          :
          null
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    entries: state.entries,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadEntries: () => {
      const actionObject = loadEntries()
      return dispatch(actionObject);
    }
  }
}

CalendarView = connect(
  mapStateToProps,
  mapDispatchToProps
)(CalendarView);

export default CalendarView;