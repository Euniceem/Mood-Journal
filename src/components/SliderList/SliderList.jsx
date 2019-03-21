import React from 'react';
import './SliderList.scss';

import Slider from '../../containers/Slider';

const SliderList = props => {
  const { emotions } = props;
  let emotionsToSliders = emotions;
  
  if (emotions) {
    emotionsToSliders = emotions.map(emotion => {
      const { id, name } = emotion;
  
      return (<Slider key={ `${ id }-${ name }` } emotion={ name } handleSliderData={ props.handleSliderData } sliderValue={ props.sliderValues } />);
    });
  }

  return (
    <div className="sliders">
      { emotionsToSliders }

      <div className="edit-sliders">
        <div className="button-wrap">
          <button onClick={ props.openEditSliders }>Edit Sliders</button>
        </div>
      </div>
    </div>
  );
}

export default SliderList;
