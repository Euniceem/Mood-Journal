import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadEntry } from '../../actions';
import Header from '../../components/Header';
import './SingleEntryView.scss';
import ActivityList from '../../components/ActivityList/ActivityList';
import EmotionList from '../../components/EmotionList/EmotionList';

class SingleEntryView extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.loadEntry(this.props.match.params.id)
  }



  render() {

    let entry = this.props.entry;
    console.log(entry)

    let date = new Date(entry.created_at).toDateString();
    let time = new Date(entry.created_at).toLocaleTimeString();

    return (
      <div className="single-entry-view-main-container">
        <Header />
        <h1 className="single-entry-view-title">{date} {time}</h1>

        <div className="single-entry-view-mood-activity-container">
          <div className="single-entry-view-mood-container">
            {entry.mood && (
              <div className="single-entry-view-mood">{entry.mood.name}</div>
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

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log("STATE  ", state)
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