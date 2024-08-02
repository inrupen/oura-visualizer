import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface SleepDataVisualizationProps {
  data: any[];
}

const SleepDataVisualization: React.FC<SleepDataVisualizationProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="deep_sleep_duration" stackId="1" stroke="#8884d8" fill="#8884d8" />
        <Area type="monotone" dataKey="light_sleep_duration" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
        <Area type="monotone" dataKey="rem_sleep_duration" stackId="1" stroke="#ffc658" fill="#ffc658" />
        <Area type="monotone" dataKey="awake_time" stackId="1" stroke="#ff7300" fill="#ff7300" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default SleepDataVisualization;
