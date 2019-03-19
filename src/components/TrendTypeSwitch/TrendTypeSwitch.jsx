import React from 'react';

const TrendTypeSwitch = props => {
  const handleOptionsOnClick = props.handleOptionsOnClick;

  return (
    <div className="select-trend-type-container">
      <button
        className="btn"
        data-input-type="trend_type"
        value="avg"
        onClick={handleOptionsOnClick}
      >
        Average
      </button>
      <button
        className="btn"
        data-input-type="trend_type"
        value="all"
        onClick={handleOptionsOnClick}
      >
        Past
      </button>
    </div>
  );
};

export default TrendTypeSwitch;
