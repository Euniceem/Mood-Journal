import React from 'react';
import './Tag.scss';

const Tag = props => {
  return (
    <div onClick={ props.clickHandler } className={ props.className }>
      <span className="name">{ props.tagName }</span>
    </div>
  );
}

export default Tag;
