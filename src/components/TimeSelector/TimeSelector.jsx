import React from 'react';
import './TimeSelector.scss';

const TimeSelector = props => {
  const trend_type = props.trend_type;
  const handleOptionsOnClick = props.handleOptionsOnClick;

  if (trend_type === 'average') {
    return (
      <div className="time-select-container">
        <button
          className="btn"
          data-input-type="time"
          value="today"
          onClick={handleOptionsOnClick}
        >
          Day
        </button>
        <button
          className="btn"
          data-input-type="time"
          value="1w"
          onClick={handleOptionsOnClick}
        >
          Week
        </button>
      </div>
    );
  }

  return (
    <div className="time-select-container">
      <button
        className="btn"
        data-input-type="time"
        value="today"
        onClick={handleOptionsOnClick}
      >
        Today
      </button>
      <button
        className="btn"
        data-input-type="time"
        value="1w"
        onClick={handleOptionsOnClick}
      >
        1W
      </button>
      <button
        className="btn"
        data-input-type="time"
        value="1m"
        onClick={handleOptionsOnClick}
      >
        1M
      </button>
      <button
        className="btn"
        data-input-type="time"
        value="3m"
        onClick={handleOptionsOnClick}
      >
        3M
      </button>
      <button
        className="btn"
        data-input-type="time"
        value="6m"
        onClick={handleOptionsOnClick}
      >
        6M
      </button>
      <button
        className="btn"
        data-input-type="time"
        value="1y"
        onClick={handleOptionsOnClick}
      >
        1Y
      </button>
      <button
        className="btn"
        data-input-type="time"
        value="all"
        onClick={handleOptionsOnClick}
      >
        ALL
      </button>
    </div>
  );
};

export default TimeSelector;
