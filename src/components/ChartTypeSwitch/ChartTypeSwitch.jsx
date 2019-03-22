import React from 'react';
import './ChartTypeSwitch.scss';

const ChartTypeSwitch = props => {
  const { chart_type, handleOptionsOnClick } = props;

  return (
    <div className="mood-or-emotions-switch">
      <button
        className={chart_type === 'mood' ? 'btn mood selected' : 'btn mood'}
        data-input-type="chart_type"
        value="mood"
        onClick={handleOptionsOnClick}
      >
        Mood
      </button>
      <button
        className={
          chart_type === 'emotions' ? 'btn emotion selected' : 'btn emotion'
        }
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
