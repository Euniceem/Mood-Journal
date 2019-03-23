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

    return (
      <>
        <Header />
        <div className="calender-container">
          <Calendar
            onChange={this.onChangeDate}
            value={this.state.date}
            calendarType="US"
            className="calendar-view"
            minDetail="decade"
            view="month"
            onClickDay={this.onChangeDay}
          />
          {this.state.showDayEntry === true && this.props.entries ?

            <div className="calendar-day-entry-container">

              <div className="calendar-day-entry-date-title">{this.state.date.toDateString()}</div>

              <CalendarEntryView entries={this.props.entries} date={this.state.date} />

            </div>
            :
            null
          }
        </div>
      </>
    );
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