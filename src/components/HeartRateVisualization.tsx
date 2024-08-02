import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface HeartRateVisualizationProps {
  data: any[];
}

const HeartRateVisualization: React.FC<HeartRateVisualizationProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="average_heart_rate" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default HeartRateVisualization;
