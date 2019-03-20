import React from 'react';

const ActivityDataDisplay = props => {
  const { trend_type, time, activity_data_object } = props;
  const arrayData = [];

  if (trend_type === 'avg' && time === '7') {
    if (!Array.isArray(activity_data_object)) {
      return <></>;
    }

    const mapDaytoWeekDay = {
      0: 'Sunday',
      1: 'Monday',
      2: 'Tuesday',
      3: 'Wednesday',
      4: 'Thursday',
      5: 'Friday',
      6: 'Saturday'
    };

    const activityList = activity_data_object.map(dayData => {
      const dayName = mapDaytoWeekDay[dayData.day];
      const dataHolder = [];

      for (let activity in dayData) {
        if (activity === 'day') {
          break;
        }

        dataHolder.push(
          <div className="activity">
            <span className="name">{activity}: </span>
            {parseFloat(dayData[activity]).toFixed(1)}
          </div>
        );
      }

      return (
        <div className={dayName}>
          <h2>{dayName}</h2>
          {dataHolder}
        </div>
      );
    });

    return <div className="activity-data">{activityList}</div>;
  }

  for (let activity in activity_data_object) {
    arrayData.push({ name: activity, count: activity_data_object[activity] });
  }

  const activityList = arrayData.map(activity => {
    return (
      <div className="activity">
        <span className="name">{activity.name}: </span>
        {trend_type === 'avg'
          ? parseFloat(activity.count).toFixed(1)
          : Math.round(activity.count)}
      </div>
    );
  });

  return <div className="activity-data">{activityList}</div>;
};

export default ActivityDataDisplay;
