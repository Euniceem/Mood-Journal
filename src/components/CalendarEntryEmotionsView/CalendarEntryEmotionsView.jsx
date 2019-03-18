import React from 'react';

const CalendarEntryEmotionsView = (props) => {
  const emotionsViewList = props.emotions.map(emotions => {
    console.log(emotions)
    return (

      <div className="calendar-day-single-entry-emotion" key={emotions.id}>
        {emotions.default_emotion_id !== null
          ? emotions.default_emotion.name
          : emotions.custom_emotion.name}
        : {emotions.percent}
      </div>
    )
  })
  return (
    <>
      {emotionsViewList}
    </>


  )
}

export default CalendarEntryEmotionsView;