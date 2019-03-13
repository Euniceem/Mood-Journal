import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './Header.scss';

library.add(faArrowLeft);

class Header extends Component {
  constructor (props) {
    super(props);

    this.state = {
      title : 'Add an Entry'
    };
  }

  render() {
    return (
      <div className="header">
        <div className="title-wrap">
          <FontAwesomeIcon className="fa-icon" icon="arrow-left" />
          <span className="title">{ this.state.title }</span>
        </div>
      </div>
    );
  }
}

export default Header;
