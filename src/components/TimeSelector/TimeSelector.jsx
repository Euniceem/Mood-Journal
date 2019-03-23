import React from 'react';
import './TimeSelector.scss';

const TimeSelector = props => {
  const { time, handleOptionsOnClick } = props;

  return (
    <div className="time-select-container">
      <div
        className={
          time === 'avgDay' || time === 'avgWeek'
            ? 'average-trends selected'
            : 'average-trends'
        }
      >
        <div
          className={
            time === 'avgDay' || time === 'avgWeek' ? 'title selected' : 'title'
          }
        >
          Average:
        </div>
        <div className="buttons">
          <button
            className={time === 'avgDay' ? 'btn selected' : 'btn'}
            data-input-type="time"
            value="avgDay"
            onClick={handleOptionsOnClick}
          >
            Day
          </button>
          <button
            className={time === 'avgWeek' ? 'btn selected' : 'btn'}
            data-input-type="time"
            value="avgWeek"
            onClick={handleOptionsOnClick}
          >
            Week
          </button>
        </div>
      </div>
      <div className="buttons">
        <div
          className={
            time !== 'avgDay' && time !== 'avgWeek'
              ? 'past-trends selected'
              : 'past-trends'
          }
        >
          <div
            className={
              time !== 'avgDay' && time !== 'avgWeek'
                ? 'title selected'
                : 'title'
            }
          >
            History:{' '}
          </div>
          <button
            className={time === '1' ? 'btn selected' : 'btn'}
            data-input-type="time"
            value="1"
            onClick={handleOptionsOnClick}
          >
            Today
          </button>
          <button
            className={time === '7' ? 'btn selected' : 'btn'}
            data-input-type="time"
            value="7"
            onClick={handleOptionsOnClick}
          >
            1W
          </button>
          <button
            className={time === '31' ? 'btn selected' : 'btn'}
            data-input-type="time"
            value="31"
            onClick={handleOptionsOnClick}
          >
            1M
          </button>
          <button
            className={time === '92' ? 'btn selected' : 'btn'}
            data-input-type="time"
            value="92"
            onClick={handleOptionsOnClick}
          >
            3M
          </button>
          <button
            className={time === '184' ? 'btn selected' : 'btn'}
            data-input-type="time"
            value="184"
            onClick={handleOptionsOnClick}
          >
            6M
          </button>
          <button
            className={time === 'all' ? 'btn selected' : 'btn'}
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
