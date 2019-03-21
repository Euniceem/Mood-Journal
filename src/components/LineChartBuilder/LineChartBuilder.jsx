import React from 'react';
import {
  LineChart,
  CartesianGrid,
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
      <LineChart
        className="mood chart"
        width={350}
        height={275}
        data={chart_data}
        margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
      >
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis dataKey="time_label" />
        <YAxis />
        <Legend />
        <Line
          type="monotone"
          dataKey="avg"
          stroke="#82ca9d"
          strokeWidth="2"
          dot={false}
        />
        <Tooltip />
      </LineChart>
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
      {/* <CartesianGrid strokeDasharray="3 3" /> */}
      <XAxis dataKey="time_label" />
      <YAxis />
      <Legend />
      <Line
        type="monotone"
        dataKey="happiness"
        stroke="#8884d8"
        strokeWidth="1"
        dot={false}
      />
      <Line
        type="monotone"
        dataKey="energy"
        stroke="#dcf442"
        strokeWidth="1"
        dot={false}
      />
      <Line
        type="monotone"
        dataKey="stress"
        stroke="#f45641"
        strokeWidth="1"
        dot={false}
      />
      <Tooltip />
    </LineChart>
  );
};

export default LineChartBuilder;
