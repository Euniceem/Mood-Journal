import React from 'react';
import './TimeSelector.scss';

const TimeSelector = props => {
  const handleOptionsOnClick = props.handleOptionsOnClick;

  return (
    <div className="time-select-container">
      <div className="average-trends">
        <div className="title">Average: </div>
        <div className="buttons">
          <button
            className="btn"
            data-input-type="time"
            value="avgDay"
            onClick={handleOptionsOnClick}
          >
            Day
          </button>
          <button
            className="btn"
            data-input-type="time"
            value="avgWeek"
            onClick={handleOptionsOnClick}
          >
            Week
          </button>
        </div>
      </div>
      <div className="buttons">
        <div className="past-trends">
          <div className="title">History: </div>
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
            value="all"
            onClick={handleOptionsOnClick}
          >
            ALL
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimeSelector;
