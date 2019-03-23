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
  const { mood_chart_data, emotion_chart_data } = props;

  if (isMood) {
    return (
      <AreaChart
        className="mood chart"
        width={350}
        height={275}
        data={mood_chart_data}
        margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
      >
        <XAxis dataKey="time_label" />
        <YAxis type="number" domain={[0, 5]} />
        <Legend />
        <Area
          type="monotone"
          dataKey="mood"
          stroke="#2976A4"
          strokeWidth="1"
          fill="#B2DAE7"
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
      data={emotion_chart_data}
      margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
    >
      <XAxis dataKey="time_label" />
      <YAxis type="number" domain={[0, 100]} />
      <Legend />
      <Line
        type="monotone"
        dataKey="happiness"
        stroke="#93D3D6"
        strokeWidth="1.5"
        dot={false}
      />
      <Line
        type="monotone"
        dataKey="energy"
        stroke="#ECE99A"
        strokeWidth="1.5"
        dot={false}
      />
      <Line
        type="monotone"
        dataKey="stress"
        stroke="#FFCB96"
        strokeWidth="1.5"
        dot={false}
      />
      <Tooltip />
    </LineChart>
  );
};

export default LineChartBuilder;
