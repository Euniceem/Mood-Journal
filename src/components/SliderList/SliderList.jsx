import React from 'react';
import './SliderList.scss';

import Slider from '../../containers/Slider';

const SliderList = props => {
  const { emotions } = props;
  let emotionsToSliders = emotions;
  
  if (emotions) {
    emotionsToSliders = emotions.map(emotion => {
      const { id, name } = emotion;
  
      return (<Slider key={ `${ id }-${ name }` } emotion={ name } />);
    });
  }

  return (
    <div className="sliders">
      { emotionsToSliders }
    </div>
  );
}

export default SliderList;
