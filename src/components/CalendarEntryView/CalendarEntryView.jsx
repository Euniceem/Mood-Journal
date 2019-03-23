import React from 'react';
import CalendarEntryEmotionsView from '../CalendarEntryEmotionsView';
import { Link } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmileBeam as faSmileBeanRegular, faSmile as faSmileRegular, faMeh as faMehRegular, faFrown as faFrownRegular, faSadTear as faSadTearRegular } from '@fortawesome/free-regular-svg-icons';
import { faSmileBeam, faSmile, faMeh, faFrown, faSadTear } from '@fortawesome/free-solid-svg-icons';
import './CalendarEntryView.scss';

//Moods
//Amazing
library.add(faSmileBeam, faSmileBeanRegular);
//Good
library.add(faSmile, faSmileRegular);
//Ok
library.add(faMeh, faMehRegular);
//Bad
library.add(faFrown, faFrownRegular);
//Awful
library.add(faSadTear, faSadTearRegular);

const CalendarEntryView = (props) => {

  const entryDay = props.entries.map(entries => {
    let date = new Date(entries.created_at).toDateString()
    let time = new Date(entries.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    let stateDate = props.date.toDateString()

    const moodIcon = () => {
      if (entries.mood.name === 'Amazing') {
        return (
          <div className="calendar-emotion">
            <FontAwesomeIcon id="fa-amazing" className="mood" icon={["far", "smile-beam"]} />
          </div>
        )
      }
      if (entries.mood.name === 'Good') {
        return (
          <div className="calendar-emotion">
            <FontAwesomeIcon id="fa-good" className="mood" icon={["far", "smile"]} />
          </div>
        )
      }
      if (entries.mood.name === 'Average') {
        return (
          <div className="calendar-emotion">
            <FontAwesomeIcon id="fa-ok" className="mood" icon={["far", "meh"]} />
          </div>
        )
      }
      if (entries.mood.name === 'Bad') {
        return (
          <div className="calendar-emotion">
            <FontAwesomeIcon id="fa-bad" className="mood" icon={["far", "frown"]} />
          </div>
        )
      }
      if (entries.mood.name === 'Awful') {
        return (
          <div className="calendar-emotion">
            <FontAwesomeIcon id="fa-awful" className="mood" icon={["far", "sad-tear"]} />
          </div>
        )
      } else return null;
    };

    const moodColor = () => {
      if (entries.mood.name === 'Amazing') {
        return 'cal-amazing';
      }
      if (entries.mood.name === 'Good') {
        return 'cal-good';
      }
      if (entries.mood.name === 'Average') {
        return 'cal-average';
      }
      if (entries.mood.name === 'Bad') {
        return 'cal-bad';
      }
      if (entries.mood.name === 'Awful') {
        return 'cal-awful';
      } else return null;
    };

    if (date === stateDate) {
      return (
        <Link to={`/entry/${entries.id}`} key={entries.id} className="calendar-day-single-entry-link">
          <div key={entries.id} className="calendar-day-single-entry-container">
            <div className="day-entry-time-title">{time}</div>
            <div className="calendar-day-single-entry-second-container">
              <div className="calendar-day-single-entry-left-container">
                <div className={`calendar-day-single-entry-mood ${moodColor()}`}>{moodIcon()}</div>
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