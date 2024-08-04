import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { ChartData, ChartOptions } from 'chart.js';
import { HRVandRHRData } from '../types';
import styled from 'styled-components';

// Register components
Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface HRVTrendsChartProps {
  trendData: HRVandRHRData[];
}

const ChartContainer = styled.div`
  background-color: #1c1c1e;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const HRVTrendsChart: React.FC<HRVTrendsChartProps> = ({ trendData }) => {
  const chartData: ChartData<'line'> = {
    labels: trendData.map((d) => d.date),
    datasets: [
      {
        label: 'HRV',
        data: trendData.map((d) => d.hrv),
        borderColor: '#ff0000',
        backgroundColor: 'rgba(255, 0, 0, 0.2)',
        fill: true,
        tension: 0.4,
        pointRadius: 5,
      },
      {
        label: 'RHR',
        data: trendData.map((d) => d.rhr),
        borderColor: '#00ff00',
        backgroundColor: 'rgba(0, 255, 0, 0.2)',
        fill: true,
        tension: 0.4,
        pointRadius: 5,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#ffffff',
        },
      },
      tooltip: {
        backgroundColor: '#333',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
      },
    },
    scales: {
      x: {
        type: 'category',
        title: {
          display: true,
          text: 'Date',
          color: '#ffffff',
        },
        ticks: {
          color: '#ffffff',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Value',
          color: '#ffffff',
        },
        ticks: {
          color: '#ffffff',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
    },
  };

  return (
    <ChartContainer>
      <Line data={chartData} options={options} />
    </ChartContainer>
  );
};

export default HRVTrendsChart;
