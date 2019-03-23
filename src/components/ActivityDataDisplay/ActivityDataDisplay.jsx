import React from 'react';
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  Cell
} from 'recharts';

const ActivityDataDisplay = props => {
  const { time, activity_data } = props;
  const arrayData = [];
  const colors = [
    '#d53e4f',
    '#f46d43',
    '#fdae61',
    '#fee08b',
    '#ffffbf',
    '#e6f598',
    '#abdda4',
    '#88ddaa',
    '#66c2a5',
    '#37b69b',
    '#3288bd',
    '#71acbc'
  ].reverse();

  if (time === 'avgWeek' || time === 'avgDay') {
    const activityNames = [];
    activity_data.forEach(dayData => {
      for (let activity in dayData) {
        if (
          activity === 'day' ||
          activity === 'hour' ||
          activityNames.includes(activity)
        ) {
          break;
        }

        activityNames.push(activity);
      }
    });

    const barList = activityNames.map((name, index) => {
      return (
        <Bar key={index} dataKey={name} stackId="a" fill={colors[index]} />
      );
    });

    return (
      <BarChart data={activity_data} width={350} height={300}>
        <XAxis dataKey="time_label" />
        <YAxis />
        <Tooltip />
        <Legend />
        {barList}
      </BarChart>
    );
  }

  for (let activity in activity_data) {
    arrayData.push({
      name: activity,
      count: Math.round(activity_data[activity])
    });
  }

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
};

export default ActivityDataDisplay;
