import React from 'react';
import './ListEmotion.scss';

const ListEmotion = props => {
  return (
    <li>
      {/* image is applied through css */}
      <img src="" alt="" />
      <div className="text">{ props.mood }</div>
    </li>
  );
}

export default ListEmotion;
