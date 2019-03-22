import React from 'react';
import './EntryList.scss';

import Tag from '../Tag';

const EntryList = props => {
  const { presets, className, clickHandler } = props;
  let entryList = [];

  if (presets) {
    entryList = presets.map(preset => {
      return (<Tag key={ `${ preset.id }-${ preset.name }` } className={ className } tagName={ preset.name } clickHandler={ clickHandler } />);
    });
  }

  return (
    <>
      { entryList }
    </>
  );
}

export default EntryList;