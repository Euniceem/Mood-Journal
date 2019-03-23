import React, { Component } from 'react';
import './NotesActions.scss';

import AddPreset from '../AddPreset';
import EntryList from '../../components/EntryList';

class NotesActions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showForm : false
    }
  }

  openForm = () => {
    return this.setState({ showForm : true });
  }

  render() {
    return (
      <div className="notes-actions">
        <div className="activities">
          <div className="title">Select a few activities...</div>

          <div className="current-wrap">
            <div className="title">Your Activities</div>

            <div className="current-activities">
              <EntryList presets={ this.props.selected } clickHandler={ this.props.removeActivityHandler } className="activity" />
            </div>
          </div>

          <div className="add-activities-wrap">
            <div className="title">Activity Presets</div>

            <div className="add-activities">
              <EntryList presets={ this.props.unselected } clickHandler={ this.props.addActivityHandler } className="activity" />
            </div>
          </div>
        </div>

        <div onClick={ this.openForm } className="custom-wrap">
          { this.state.showForm ?
              <AddPreset onReloadData={ this.props.reloadActivities } sortEmotions={ this.props.sortEmotions } routeOnUpdate={ `https://api.moodcatcher.com/api/activities` } />
            :
            <>
              <span className="text">Add an Activity</span>
              <span className="button">+</span>
            </>
          }
        </div>

        <div className="notes-wrap">
          <div className="notes">
            <div className="title">Notes</div>
            <textarea onChange={ this.props.handleNotes } value={ this.props.notes } placeholder="Tell us more about yourself." name="" id="" cols="30" rows="10"></textarea>
          </div>
        </div>

        <div className="buttons-wrap">
          <div className="buttons">
            <div className="close">
              <button onClick={ this.props.openNotesAndActions }>Close</button>
            </div>
  
            <div className="submit-all">
              <button onClick={ this.props.handleSubmit } disabled={ this.props.selectedMood === 'Pick a mood!' } className={ this.props.selectedMood === 'Pick a mood!' ? "disabled" : "" }>Submit Entry</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NotesActions;
