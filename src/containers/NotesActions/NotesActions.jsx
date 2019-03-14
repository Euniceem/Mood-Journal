import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './NotesActions.scss';

library.add(faTimes);

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
        <div className="title">Select a few actions</div>

        <div className="actions-wrap">
          <div className="actions">
            
            <div className="action"><span className="name">Working</span>
              <FontAwesomeIcon onClick={ this.removeAction } className="fa-icon" icon="times" />
            </div>
            <div className="action"><span className="name">Breakfast</span>
              <FontAwesomeIcon onClick={ this.removeAction } className="fa-icon" icon="times" />
            </div>
            <div className="action"><span className="name">Relaxing</span>
              <FontAwesomeIcon onClick={ this.removeAction } className="fa-icon" icon="times" />
            </div>
            <div className="action"><span className="name">Sports</span>
              <FontAwesomeIcon onClick={ this.removeAction } className="fa-icon" icon="times" />
            </div>
            <div className="action"><span className="name">Gym</span>
              <FontAwesomeIcon onClick={ this.removeAction } className="fa-icon" icon="times" />
            </div>
            <div className="action"><span className="name">Going Out</span>
              <FontAwesomeIcon onClick={ this.removeAction } className="fa-icon" icon="times" />
            </div>
            <div className="action"><span className="name">Sleeping</span>
              <FontAwesomeIcon onClick={ this.removeAction } className="fa-icon" icon="times" />
            </div>
            <div className="action"><span className="name">Family</span>
              <FontAwesomeIcon onClick={ this.removeAction } className="fa-icon" icon="times" />
            </div>
            <div className="action"><span className="name">Friends</span>
              <FontAwesomeIcon onClick={ this.removeAction } className="fa-icon" icon="times" />
            </div>
          </div>
        </div>

        <div className="notes-wrap">
          <div className="title">Notes</div>
          <textarea placeholder="Tell us more about yourself." name="" id="" cols="30" rows="10"></textarea>
        </div>
      </div>
    );
  }
}

export default NotesActions;
