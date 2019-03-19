import React from 'react';
import CalendarEntryEmotionsView from '../CalendarEntryEmotionsView';
import { Link } from 'react-router-dom';
import './CalendarEntryView.scss';

const CalendarEntryView = (props) => {

  const entryDay = props.entries.map(entries => {
    let date = new Date(entries.created_at).toDateString()
    let time = new Date(entries.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    let stateDate = props.date.toDateString()

    if (date === stateDate) {
      return (
        <Link to={`/entry/${entries.id}`} key={entries.id} className="calendar-day-single-entry-link">
          <div key={entries.id} className="calendar-day-single-entry-container">
            <div className="day-entry-time-title">{time}</div>
            <div className="calendar-day-single-entry-second-container">
              <div className="calendar-day-single-entry-left-container">
                <div className="calendar-day-single-entry-mood">{entries.mood.name}</div>
              </div>

              <div className="calendar-day-single-entry-right-container">
                {entries.entryEmotions ?
                  <CalendarEntryEmotionsView key={entries.entryEmotions.id} emotions={entries.entryEmotions} />
                  :
                  <div className="calendar-day-single-entry-emotion-none-msg">None</div>
                }
              </div>
            </div>
          </div>
        </Link>
      )

    } else {
      return null;
    }
  })

  return (
    <>
      {entryDay}
    </>
  )
}

export default CalendarEntryView;