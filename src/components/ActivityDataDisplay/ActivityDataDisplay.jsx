import React from 'react';
import { PieChart, Pie, Legend, Tooltip, Cell } from 'recharts';

const ActivityDataDisplay = props => {
  const { trend_type, time, activity_data } = props;
  const arrayData = [];
  const colors = [
    '#1a1334',
    '#26294a',
    '#01545a',
    '#017351',
    '#03c383',
    '#aad962',
    '#fbbf45',
    '#ef6a32',
    '#ed0345',
    '#a12a5e',
    '#710162',
    '#110141'
  ];

  if (trend_type === 'avg' && time === '7') {
    if (!Array.isArray(activity_data)) {
      return <></>;
    }

    const mapDaytoString = {
      0: 'Sunday',
      1: 'Monday',
      2: 'Tuesday',
      3: 'Wednesday',
      4: 'Thursday',
      5: 'Friday',
      6: 'Saturday'
    };

    const activityList = activity_data.map(dayData => {
      const dayName = mapDaytoString[dayData.day];
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
        <div className={`day ${dayName}`}>
          <h2>{dayName}</h2>
          {dataHolder}
        </div>
      );
    });

    return <div className="activity-data">{activityList}</div>;
  }

  for (let activity in activity_data) {
    arrayData.push({
      name: activity,
      count:
        trend_type === 'avg'
          ? parseFloat(activity_data[activity])
          : Math.round(activity_data[activity])
    });
  }

  console.log(arrayData);

  return (
    <PieChart width={350} height={300}>
      <Legend />
      <Pie
        data={arrayData}
        dataKey="count"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={80}
        label
      >
        {arrayData.map((entry, index) => {
          return <Cell key={`cell-${index}`} fill={colors[index]} />;
        })}
      </Pie>
      <Tooltip />
    </PieChart>
  );

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
