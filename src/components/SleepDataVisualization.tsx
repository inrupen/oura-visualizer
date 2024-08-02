import React, { useContext } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import styled, { ThemeContext } from 'styled-components';

const ChartCard = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
`;

interface SleepDataVisualizationProps {
  data: any[];
}

const SleepDataVisualization: React.FC<SleepDataVisualizationProps> = ({
  data,
}) => {
  const theme = useContext(ThemeContext); // Accessing theme via useContext

  if (!data || data.length === 0) {
    return <p>No data to display.</p>; // Display this message if no data
  }

  return (
    <ChartCard>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke={theme?.chartGrid} />
          <XAxis dataKey="day" stroke={theme?.text} />
          <YAxis stroke={theme?.text} />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="deep_sleep_duration"
            stackId="1"
            stroke="#8884d8"
            fill="#8884d8"
          />
          <Area
            type="monotone"
            dataKey="light_sleep_duration"
            stackId="1"
            stroke="#82ca9d"
            fill="#82ca9d"
          />
          <Area
            type="monotone"
            dataKey="rem_sleep_duration"
            stackId="1"
            stroke="#ffc658"
            fill="#ffc658"
          />
          <Area
            type="monotone"
            dataKey="awake_time"
            stackId="1"
            stroke="#ff7300"
            fill="#ff7300"
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};

export default SleepDataVisualization;
