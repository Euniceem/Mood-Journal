import React from 'react';
import './FAMood.scss';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSmileBeam as faSmileBeanRegular, 
  faSmile as faSmileRegular, 
  faMeh as faMehRegular, 
  faFrown as faFrownRegular, 
  faSadTear as faSadTearRegular
}
  from '@fortawesome/free-regular-svg-icons'

// Moods
library.add(faSmileBeanRegular);  // Amazing
library.add(faSmileRegular);      // Good
library.add(faMehRegular);        // OK
library.add(faFrownRegular);      // Bad
library.add(faSadTearRegular);    // Awful

const FAMood = props => {
  let moodIcon = 'Choose a mood!';
  let moodId = 'Choose a mood!';
  let { name } = props;

  switch (name) {
    case 'Amazing':
      moodIcon = ['far', 'smile-beam'];
      moodId = 'icon-amazing';
      break;
    case 'Good':
      moodIcon = ['far', 'smile'];
      moodId = 'icon-good';
      break;
    case 'OK':
      moodIcon = ['far', 'meh'];
      moodId = 'icon-ok';
      break;
    case 'Bad':
      moodIcon = ['far', 'frown'];
      moodId = 'icon-bad';
      break;
    case 'Awful':
      moodIcon = ['far', 'sad-tear'];
      moodId = 'icon-awful';
      break;
    default:
      moodIcon = 'Choose a mood!';
      moodId = 'Choose a mood!';
      break;
  }

  return (
    <>
      <FontAwesomeIcon id={ moodId } icon={ moodIcon } />
    </>
  );
}

export default FAMood;
