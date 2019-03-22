import React from 'react';

const CalendarEntryEmotionsView = (props) => {
  const emotionsViewList = props.emotions.map((emotions, index) => {
    console.log(emotions)
    if (emotions.default_emotion) {

      return (
        <div className="calendar-day-single-entry-emotion" key={index}>
          {emotions.default_emotion
            ? emotions.default_emotion.name
            : emotions.custom_emotion.name}
          : {emotions.percent}%
        </div>
      )
    }
  })
  return (
    <>
      {emotionsViewList}
    </>
  )
}

export default CalendarEntryEmotionsView;