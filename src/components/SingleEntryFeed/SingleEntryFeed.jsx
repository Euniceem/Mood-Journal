import React from 'react';
import { Link } from 'react-router-dom';
import './SingleEntryFeed.scss';

const SingleEntryFeed = props => {
  let date = new Date(props.entryData.created_at);
  let time = new Date(props.entryData.created_at);

  const emotionList = props.entryData.entryEmotions.map((emotions, index) => {
    return (
      <div className="emotion" key={index}>
        {emotions.custom_emotion
          ? emotions.custom_emotion.name
          : emotions.default_emotion.name}
        : {emotions.percent}
      </div>
    );
  });

  console.log(emotionList)

  const activityList = props.entryData.entryActivities.map(
    (activities, index) => {
      return (
        <div className="action" key={index}>
          {activities.custom_activity
            ? activities.custom_activity.name
            : activities.default_activity.name}
        </div>
      );
    }
  );

  const moodColor = () => {
    if (props.entryData.mood.name === 'Amazing') {
      return 'amazing';
    }
    if (props.entryData.mood.name === 'Good') {
      return 'good';
    }
    if (props.entryData.mood.name === 'Average') {
      return 'average';
    }
    if (props.entryData.mood.name === 'Bad') {
      return 'bad';
    }
    if (props.entryData.mood.name === 'Awful') {
      return 'awful';
    } else return null;
  };

  return (
    <Link to={`/entry/${props.entryData.id}`} className="entry-container-link">
      <div className={`entry-container ${moodColor()}`}>
        <div className="time-date-container">
          <span className="date">{date.toDateString()}</span>
          <span className="time">{time.toLocaleTimeString()}</span>
        </div>
        <div className="content-container">
          <div className="emotions-main-container">
            <div className={`mood ${moodColor()}`}>
              {props.entryData.mood.name}
            </div>
            <div className="emotions-second-container">
              <div className="emotion-title">Emotions:</div>
              {props.entryData.entryEmotions ? (
                emotionList
              ) : (
                  <div className="emotion-zero-msg">None</div>
                )}
            </div>
          </div>

          <div className="actions-container">
            <div className="activity-title">Activities:</div>
            {props.entryData.entryActivities ? (
              activityList
            ) : (
                <div className="activity-zero-msg">None</div>
              )}
          </div>

          <div className="notes">Notes: {props.entryData.notes}</div>
        </div>
      </div>
    </Link>
  );
};

export default SingleEntryFeed;
