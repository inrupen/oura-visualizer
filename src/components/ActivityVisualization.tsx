import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ActivityVisualizationProps {
  data: any[];
}

const ActivityVisualization: React.FC<ActivityVisualizationProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="readiness_contributors_previous_day_activity" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ActivityVisualization;
