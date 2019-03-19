import React from 'react';
import './TimeSelector.scss';

const TimeSelector = props => {
  const trend_type = props.trend_type;
  const handleOptionsOnClick = props.handleOptionsOnClick;

  if (trend_type === 'avg') {
    return (
      <div className="time-select-container">
        <button
          className="btn"
          data-input-type="time"
          value="1"
          onClick={handleOptionsOnClick}
        >
          Day
        </button>
        <button
          className="btn"
          data-input-type="time"
          value="7"
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
        value="1"
        onClick={handleOptionsOnClick}
      >
        Today
      </button>
      <button
        className="btn"
        data-input-type="time"
        value="7"
        onClick={handleOptionsOnClick}
      >
        1W
      </button>
      <button
        className="btn"
        data-input-type="time"
        value="31"
        onClick={handleOptionsOnClick}
      >
        1M
      </button>
      <button
        className="btn"
        data-input-type="time"
        value="92"
        onClick={handleOptionsOnClick}
      >
        3M
      </button>
      <button
        className="btn"
        data-input-type="time"
        value="184"
        onClick={handleOptionsOnClick}
      >
        6M
      </button>
      <button
        className="btn"
        data-input-type="time"
        value="365"
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
