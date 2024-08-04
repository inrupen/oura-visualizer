import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { ChartData, ChartOptions } from 'chart.js';
import { GenericChartData } from '../types';

// Register components
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface HeartRateVisualizationProps {
  data: GenericChartData[];
}

const HeartRateVisualization: React.FC<HeartRateVisualizationProps> = ({ data }) => {
  const chartData: ChartData<'line'> = {
    labels: data.map(d => d.date),
    datasets: [
      {
        label: 'Average Heart Rate (bpm)',
        data: data.map(d => d.value),
        borderColor: '#82ca9d',
        backgroundColor: '#82ca9d',
        fill: false,
        tension: 0.1,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    scales: {
      x: {
        type: 'category',
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'BPM',
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default HeartRateVisualization;
