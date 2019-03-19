import React from 'react';

const ChartTypeSwitch = props => {
  const handleOptionsOnClick = props.handleOptionsOnClick;

  return (
    <div className="mood-or-emotions-switch">
      <button
        className="btn"
        data-input-type="chart_type"
        value="mood"
        onClick={handleOptionsOnClick}
      >
        Mood
      </button>
      <button
        className="btn"
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
