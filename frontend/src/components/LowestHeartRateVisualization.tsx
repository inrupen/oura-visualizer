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
import { GenericChartData } from '../types';
import styled from 'styled-components';

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface LowestHeartRateVisualizationProps {
  data: GenericChartData[];
}

const ChartContainer = styled.div`
  background-color: #1c1c1e;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const LowestHeartRateVisualization: React.FC<
  LowestHeartRateVisualizationProps
> = ({ data }) => {
  const chartData: ChartData<'line'> = {
    labels: data.map((d) => d.date),
    datasets: [
      {
        label: 'Lowest Heart Rate (bpm)',
        data: data.map((d) => d.value),
        borderColor: '#ff7300',
        backgroundColor: 'rgba(255, 115, 0, 0.2)',
        fill: true,
        tension: 0.4,
        pointRadius: 5,
      },
      {
        label: 'Ideal Heart Rate Range (min)',
        data: data.map(() => 60), // Assuming 60 bpm is the lower bound of ideal range
        borderColor: '#00ff00',
        backgroundColor: 'rgba(0, 255, 0, 0.1)',
        borderDash: [10, 5],
        pointRadius: 0,
      },
      {
        label: 'Ideal Heart Rate Range (max)',
        data: data.map(() => 100), // Assuming 100 bpm is the upper bound of ideal range
        borderColor: '#00ff00',
        backgroundColor: 'rgba(0, 255, 0, 0.1)',
        borderDash: [10, 5],
        pointRadius: 0,
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
          text: 'BPM',
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

export default LowestHeartRateVisualization;
