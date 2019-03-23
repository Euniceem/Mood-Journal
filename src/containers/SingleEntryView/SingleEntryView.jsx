import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadEntry } from '../../actions';
import Header from '../../components/Header';
import './SingleEntryView.scss';

import ListEmotion from '../ListEmotion';
import ActivityList from '../../components/ActivityList/ActivityList';
import EmotionList from '../../components/EmotionList/EmotionList';

class SingleEntryView extends Component {

  componentDidMount() {
    this.props.loadEntry(this.props.match.params.id)
  }

  render() {
    let entry = this.props.entry;
    let date = new Date(entry.created_at).toDateString();
    let time = new Date(entry.created_at).toLocaleTimeString();
    
    let getMoodId = 'Select a mood!';

    console.log(entry.mood);

    switch (entry.mood) {
      case 'Amazing':
        getMoodId = 1;
        break;
      case 'Good':
        getMoodId = 2;
        break;
      case 'Average':
        getMoodId = 3;
        break;
      case 'Bad':
        getMoodId = 4;
        break;
      case 'Awful':
        getMoodId = 5;
        break;
      default:
        getMoodId = 'Select a mood!';
        break;
    }

    console.log(entry.entryEmotions);

    return (
      <>
      <Header />
      <div className="single-entry-view-main-container">
        <div className="single-entry-view-title-container">
          <div className="title">YOUR OVERALL MOOD WAS:</div>
        </div>

        <div className="single-entry-view-mood-activity-container">
          <div className="single-entry-view-mood-container">
            {entry.mood && (
              <>
                <ListEmotion
                  mood={entry.mood.name === 'Average' ? 'OK' : entry.mood.name}
                  mood_id={getMoodId}
                />
                <div className="single-entry-view-mood">{entry.mood.name === 'Average' ? 'OK' : entry.mood.name}</div>
              </>
            )}
          </div>

          <div className="single-entry-view-activity-container">
            {entry.entryActivities && (
              <ActivityList activities={entry.entryActivities} />
              )}
          </div>
        </div>

        <div className="single-entry-view-emotion-container">
          {entry.entryEmotions && (
            <EmotionList emotions={entry.entryEmotions} />
            )}
        </div>

        <div className="single-entry-view-notes">{entry.notes}</div>
        <h1 className="single-entry-view-title">{date} {time}</h1>
      </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    entry: state.entry,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadEntry: (id) => {
      const actionObject = loadEntry(id)
      return dispatch(actionObject);
    }
  }
}

SingleEntryView = connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleEntryView);

export default SingleEntryView;