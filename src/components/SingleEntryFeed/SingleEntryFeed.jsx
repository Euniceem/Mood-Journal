import React from 'react';
import './SingleEntryFeed.scss';

const SingleEntryFeed = (props) => {
  // console.log('SingleEntryProps', props.entryData)
  let date = new Date(props.entryData.created_at);
  let time = new Date(props.entryData.created_at);

  const emotionList = props.entryData.entryEmotions.map(emotions => {
    return (
      < div className="emotion" > {emotions}</div >
    )
  });

  const activityList = props.entryData.entryActivities.map(activities => {
    return (
      <div className="action">{activities}</div>
    )
  });

  return (
    <div className="entry-container">

      <div className="time-date-container">
        <span className="date">{date.toDateString()}</span>
        <span className="time">{time.toLocaleTimeString()}</span>
      </div>
      <div className="content-container">

        <div className="emotions-main-container">
          <div className="mood">{props.entryData.mood.name}</div>
          <div className="emotions-second-container">
            <div className="emotion-title">Emotions:</div>
            {props.entryData.entryEmotions[0] ?
              { emotionList }
              :
              <div className="emotion-zero-msg">None</div>
            }
          </div>
        </div>

        <div className="actions-container">
          <div className="activity-title">Activities:</div>
          {props.entryData.entryActivities[0] ?
            { activityList }
            :
            <div className="activity-zero-msg">None</div>
          }
        </div>

        <div className="notes">Notes: {props.entryData.notes}</div>
      </div>
    </div>
  )
}

export default SingleEntryFeed;
