import React from 'react';
import CalendarEntryEmotionsView from '../CalendarEntryEmotionsView';
import './CalendarEntryView.scss';

const CalendarEntryView = (props) => {
  // console.log("DATE", props.date)

  const entryDayEmotionList = props.entries.map(entries => {
    // console.log("ENTRY EMOTIONS", entries.entryEmotions)

    return entries.entryEmotions;
    // (
    // <div className="calendar-day-single-entry-emotion" key={entries.id}>
    //   {entries.entryEmotions.default_emotion_id
    //     ? entries.entryEmotions.default_emotion
    //     : entries.entryEmotions.custom_emotion}
    //   {/* : {entries.entryEmotions.percent} */}
    // </div>
    // )
  })
  console.log('ENTRYDAYEMOTIONLIST', entryDayEmotionList)

  const entryDay = props.entries.map(entries => {
    let date = new Date(entries.created_at).toDateString()
    let time = new Date(entries.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    let stateDate = props.date.toDateString()

    if (date === stateDate) {
      // console.log('>>>> hit', entries)
      return (
        <div key={entries.id} className="calendar-day-single-entry-container">
          <div className="day-entry-time-title">{time}</div>

          <div className="calendar-day-single-entry-left-container">
            <div className="calendar-day-single-entry-mood">{entries.mood.name}</div>
          </div>

          <div className="calendar-day-single-entry-right-container">
            {entries.entryEmotions ?
              <CalendarEntryEmotionsView emotions={entries.entryEmotions} />
              // <>
              //   {entryDayEmotionList}
              //   {/* <div className="calendar-day-single-entry-percent">{entries.entryEmotions.percent}</div> */}
              // </>
              :
              <div className="calendar-day-single-entry-emotion-none-msg">None</div>
            }
          </div>
        </div>
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