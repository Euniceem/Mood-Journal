import React from 'react';
import { Link } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmileBeam as faSmileBeanRegular, faSmile as faSmileRegular, faMeh as faMehRegular, faFrown as faFrownRegular, faSadTear as faSadTearRegular } from '@fortawesome/free-regular-svg-icons';
import { faSmileBeam, faSmile, faMeh, faFrown, faSadTear } from '@fortawesome/free-solid-svg-icons';
import './SingleEntryFeed.scss';

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

const SingleEntryFeed = props => {
  let date = new Date(props.entryData.created_at)
    .toLocaleDateString('en-US', {
      weekday : 'long',
      month : 'short',
      day : 'numeric',
      year : 'numeric'
    });
  let time = new Date(props.entryData.created_at)
    .toLocaleTimeString('en-US', {
      hour : 'numeric',
      minute : 'numeric'
    });

  const emotionList = props.entryData.entryEmotions.map((emotion, index) => {
    if (!emotion.custom_emotion && !emotion.default_emotion) {
      return <></>;
    }

    return (
      <div className="emotion" key={index}>
        {emotion.custom_emotion
          ? emotion.custom_emotion.name
          : emotion.default_emotion.name}
        : {emotion.percent}
      </div>
    );
  });

  const activityList = props.entryData.entryActivities.map(
    (activity, index) => {
      if (!activity.custom_activity && !activity.default_activity) {
        return <></>;
      }

      return (
        <div className="action" key={index}>
          {activity.custom_activity
            ? activity.custom_activity.name
            : activity.default_activity.name}
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

  const moodIcon = () => {
    if (props.entryData.mood.name === 'Amazing') {
      return (
        <div className="emotion">
          <FontAwesomeIcon id="fa-amazing" className="mood" icon={["far", "smile-beam"]} />
        </div>
      )
    }
    if (props.entryData.mood.name === 'Good') {
      return (
        <div className="emotion">
          <FontAwesomeIcon id="fa-good" className="mood" icon={["far", "smile"]} />
        </div>
      )
    }
    if (props.entryData.mood.name === 'Average') {
      return (
        <div className="emotion">
          <FontAwesomeIcon id="fa-ok" className="mood" icon={["far", "meh"]} />
        </div>
      )
    }
    if (props.entryData.mood.name === 'Bad') {
      return (
        <div className="emotion">
          <FontAwesomeIcon id="fa-bad" className="mood" icon={["far", "frown"]} />
        </div>
      )
    }
    if (props.entryData.mood.name === 'Awful') {
      return (
        <div className="emotion">
          <FontAwesomeIcon id="fa-awful" className="mood" icon={["far", "sad-tear"]} />
        </div>
      )
    } else return null;
  };

  return (
    <Link to={`/entry/${props.entryData.id}`} className="entry-container-link">
      <div className={`entry-container ${moodColor()}`}>
        <div className="time-date-container">
          <span className="date">{date}</span>
          <span className="time">{time}</span>
        </div>
        <div className="content-container">
          <div className="emotions-main-container">
            <div className={`mood ${moodColor()}`}>
              <div className="mood-icon-container">
                {moodIcon()}
              </div>
              <div className="mood-name">
                {props.entryData.mood.name}
              </div>
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
            <div className="activity-list">
              {props.entryData.entryActivities ? (
                activityList
              ) : (
                  <div className="activity-zero-msg">None</div>
                )}
            </div>
          </div>
          <div className="notes-container">
            <div className="notes-title">Notes: </div>
            <div className="notes">{props.entryData.notes}</div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SingleEntryFeed;
