import React, { Component } from 'react';
import './ListEmotion.scss';

class ListEmotion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mood : this.props.mood,
      selected : false
    }
  }

  render() {
    return (
      <li>
        {/* image is applied through css */}
        <img src="" alt="" />
        <div className="text">{ this.props.mood }</div>
    </li>
    );
  }
}

export default ListEmotion;
