import React from 'react';
import {
  AreaChart,
  Area,
  LineChart,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  Line
} from 'recharts';

const LineChartBuilder = props => {
  const isMood = props.chart_type === 'mood' ? true : false;
  const chart_data = props.chart_data;

  if (isMood) {
    return (
      <AreaChart
        className="mood chart"
        width={350}
        height={275}
        data={chart_data}
        margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
      >
        <XAxis dataKey="time_label" />
        <YAxis />
        <Legend />
        <Area
          type="monotone"
          dataKey="avg"
          stroke="#aad962"
          strokeWidth="2"
          fill="#aad962"
        />
        <Tooltip />
      </AreaChart>
    );
  }

  return (
    <LineChart
      className="emotion chart"
      width={350}
      height={250}
      data={chart_data}
      margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
    >
      <XAxis dataKey="time_label" />
      <YAxis />
      <Legend />
      <Line
        type="monotone"
        dataKey="happiness"
        stroke="#aad962"
        strokeWidth="1.5"
        dot={false}
      />
      <Line
        type="monotone"
        dataKey="energy"
        stroke="#fbbf45"
        strokeWidth="1.5"
        dot={false}
      />
      <Line
        type="monotone"
        dataKey="stress"
        stroke="#ef6a32"
        strokeWidth="1.5"
        dot={false}
      />
      <Tooltip />
    </LineChart>
  );
};

export default LineChartBuilder;
