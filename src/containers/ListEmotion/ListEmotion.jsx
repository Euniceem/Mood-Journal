import React, { Component } from 'react';
import './ListEmotion.scss';

import FAMood from '../../components/FAMood';

class ListEmotion extends Component {
  // toggleSelected = () => {
  //   const { mood } = this.state;
  //   const { selected } = this.state;

  //   this.props.handleSelectMood(selected, mood);
  // }

  render() {
    const { selectedMood, mood, mood_id } = this.props;
    let className = 'text';

    if (selectedMood === mood) {
      className = 'text selected';
    }

    return (
      <li onClick={this.props.handleSelectMood} data-mood_id={mood_id} data-name={mood}>
        {/* image is applied through css */}
        <img data-mood_id={mood_id} data-name={mood} src="" alt="" />
        <FAMood handleSelectMood={this.props.handleSelectMood} data-mood_id={mood_id} data-name={mood} name={mood} mood_id={mood_id} />
        <div data-mood_id={mood_id} data-name={mood} className={className}>{mood}</div>
      </li>
    );
  }
}

export default ListEmotion;
