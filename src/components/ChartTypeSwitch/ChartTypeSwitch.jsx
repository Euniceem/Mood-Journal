import React from 'react';
import './ChartTypeSwitch.scss';

const ChartTypeSwitch = props => {
  const handleOptionsOnClick = props.handleOptionsOnClick;

  return (
    <div className="mood-or-emotions-switch">
      <button
        className="btn mood"
        data-input-type="chart_type"
        value="mood"
        onClick={handleOptionsOnClick}
      >
        Mood
      </button>
      <button
        className="btn emotion"
        data-input-type="chart_type"
        value="emotions"
        onClick={handleOptionsOnClick}
      >
        Emotions
      </button>
    </div>
  );
};

export default ChartTypeSwitch;
