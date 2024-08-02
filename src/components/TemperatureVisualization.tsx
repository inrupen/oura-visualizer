import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface TemperatureVisualizationProps {
  data: any[];
}

const TemperatureVisualization: React.FC<TemperatureVisualizationProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="readiness_temperature_deviation" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default TemperatureVisualization;
