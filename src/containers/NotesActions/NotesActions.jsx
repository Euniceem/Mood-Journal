import React, { Component } from 'react';
import './NotesActions.scss';

import EntryList from '../../components/EntryList';

class NotesActions extends Component {
  render() {
    return (
      <div className="notes-actions">
        <div className="activities">
          <div className="title">Select a few activities...</div>

          <div className="current-wrap">
            <div className="title">Your Activities</div>

            {/* going to have to load these presets in dynamically */}
            <div className="current-activities">
              {/* <Tag className="activity" tagName="Working" removeHandler={ this.removeActivity } />
              <Tag className="activity" tagName="Breakfast" removeHandler={ this.removeActivity } />
              <Tag className="activity" tagName="Relaxing" removeHandler={ this.removeActivity } />
              <Tag className="activity" tagName="Sports" removeHandler={ this.removeActivity } /> */}

              <EntryList presets={ this.props.selected } clickHandler={ this.props.removeActivityHandler } className="activity" />
            </div>
          </div>

          <div className="add-activities-wrap">
            <div className="title">Activity Presets</div>

            {/* this will require communication with the back-end as well */}
            <div className="add-activities">
              {/* <Tag className="activity" tagName="Gym" removeHandler={ this.removeActivity } />
              <Tag className="activity" tagName="Going Out" removeHandler={ this.removeActivity } />
              <Tag className="activity" tagName="Sleeping" removeHandler={ this.removeActivity } />
              <Tag className="activity" tagName="Family" removeHandler={ this.removeActivity } /> */}

              <EntryList presets={ this.props.unselected } clickHandler={ this.props.addActivityHandler } className="activity" />
            </div>
          </div>
        </div>

        {/* the custom feature is pretty much like POSTing a new kanban card to the database */}
        <div className="custom-wrap">
          <span className="text">Add an Activity</span>
          <span className="button">+</span>
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
