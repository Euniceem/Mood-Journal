import React, { Component } from 'react';
import './NotesActions.scss';

import Tag from '../../components/Tag';

class NotesActions extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  removeAction = (e) => {
    console.log(`User wants to remove this action from their entry!`);
  }

  render() {
    return (
      <div className="notes-actions">
        <div className="title-wrap"><span className="title">Select a few activities...</span></div>

        <div className="actions-wrap">
          <div className="actions">
            <Tag className="action" tagName="Working" removeHandler={ this.removeAction } />
            <Tag className="action" tagName="Breakfast" removeHandler={ this.removeAction } />
            <Tag className="action" tagName="Relaxing" removeHandler={ this.removeAction } />
            <Tag className="action" tagName="Sports" removeHandler={ this.removeAction } />
            <Tag className="action" tagName="Gym" removeHandler={ this.removeAction } />
            <Tag className="action" tagName="Going Out" removeHandler={ this.removeAction } />
            <Tag className="action" tagName="Sleeping" removeHandler={ this.removeAction } />
            <Tag className="action" tagName="Family" removeHandler={ this.removeAction } />
            <Tag className="action" tagName="Friends" removeHandler={ this.removeAction } />
          </div>
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
