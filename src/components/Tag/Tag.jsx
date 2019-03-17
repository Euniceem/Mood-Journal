import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './Tag.scss';

library.add(faTimes);

const Tag = props => {
  return (
    <div className={ props.className }>
      <span className="name">{ props.tagName }</span>
      <FontAwesomeIcon onClick={ props.removeHandler } className="fa-icon" icon="times" />
    </div>
  );
}

export default Tag;
