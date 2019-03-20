import React from 'react';
import './SliderList.scss';

import Slider from '../../containers/Slider';

const SliderList = props => {
  const { emotions } = props;
  let emotionsToSliders = emotions;
  
  if (emotions) {
    console.log(`%cEmotions Are:`, `color: orange; font-weight: bold; font-size: 1.3em;`);
    console.table(emotions);
        emotionsToSliders = emotions.map(emotion => {
          const { id, name } = emotion;
      
          return (<Slider key={ `${ id }-${ name }` } emotion={ name } />);
        });
  }

  return (
    <div className="sliders">
      { emotionsToSliders }

      {/* Number of sliders will be loaded onto props and dynamically rendered eventually */}
      {/* <div className="slider-wrap">
        <div className="affect">
          <span className="field">Happiness:</span> <span className="percentage">{ this.state.happiness }%</span>
        </div>

        <input onChange={ this.updateInput } data-field="happiness" ref={ this.happiness } type="range" min="0" max="100" value={ this.state.happiness } className="slider" />
      </div>

      <div className="slider-wrap">
        <div className="affect">
        <span className="field">Stress:</span> <span className="percentage">{ this.state.stress }%</span>
        </div>

        <input onChange={ this.updateInput } data-field="stress" ref={ this.stress } type="range" min="0" max="100" value={ this.state.stress } className="slider" />
      </div>

      <div className="slider-wrap">
        <div className="affect">
        <span className="field">Anxiety:</span> <span className="percentage">{ this.state.anxiety }%</span>
        </div>

        <input onChange={ this.updateInput } data-field="anxiety" ref={ this.anxiety } type="range" min="0" max="100" value={ this.state.anxiety } className="slider" />
      </div>

      <div className="slider-wrap">
        <div className="affect">
        <span className="field">Fatigue:</span> <span className="percentage">{ this.state.fatigue }%</span>
        </div>

        <input onChange={ this.updateInput } data-field="fatigue" ref={ this.fatigue } type="range" min="0" max="100" value={ this.state.fatigue } className="slider" />
      </div>

      <div className="edit-sliders">
        <div className="button-wrap">
          <button onClick={ this.openEditSliders }>Edit Sliders</button>
        </div>
      </div> */}
    </div>
  );
}

export default SliderList;
