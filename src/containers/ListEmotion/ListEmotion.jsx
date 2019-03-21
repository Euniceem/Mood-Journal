import React, { Component } from 'react';
import './ListEmotion.scss';

class ListEmotion extends Component {
  // toggleSelected = () => {
  //   const { mood } = this.state;
  //   const { selected } = this.state;

  //   this.props.handleSelectMood(selected, mood);
  // }

  render() {
    const { selectedMood, mood } = this.props;
    let className = 'text';

    if (selectedMood === mood) {
      className = 'text selected';
    }

    return (
      <li onClick={ this.props.handleSelectMood } data-name={ mood }>
        {/* image is applied through css */}
        <img data-name={ mood } src="" alt="" />
        <div data-name={ mood } className={ className }>{ mood }</div>
      </li>
    );
  }
}

export default ListEmotion;
