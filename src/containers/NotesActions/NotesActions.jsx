import React, { Component } from 'react';
import './NotesActions.scss';

class NotesActions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      
    };
  }

  render() {
    return (
      <div className="notes-actions">
        <div className="actions-wrap">
          <div className="title">Select a few actions:</div>
          <div className="actions">
            <div className="action">Work</div>
            <div className="action">Breakfast</div>
            <div className="action">Relaxation</div>
            <div className="action">Sports</div>
            <div className="action">Gym</div>
            <div className="action">Conference</div>
            <div className="action">Hibernation</div>
            <div className="action">Family</div>
            <div className="action">Friends</div>
          </div>
        </div>
      </div>
    );
  }
}

export default NotesActions;
