import React from 'react';

const CalendarEntryEmotionsView = (props) => {

  const emotionsViewList = props.emotions.map((emotions, index) => {

    if (!emotions.custom_emotion && !emotions.default_emotion) {
      return (
        <React.Fragment key={index}>.</React.Fragment>
      )
    }
    if (emotions.percent !== 0) {
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