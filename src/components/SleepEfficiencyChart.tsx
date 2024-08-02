import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { ChartData, ChartOptions } from 'chart.js';
import { SleepEfficiencyData } from '../types';

// Register components
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface SleepEfficiencyChartProps {
  sleepData: SleepEfficiencyData[];
}

const SleepEfficiencyChart: React.FC<SleepEfficiencyChartProps> = ({ sleepData }) => {
  console.log("Sleep Efficiency Data:", sleepData); // Debug log

  const data: ChartData<'line'> = {
    labels: sleepData.map(d => d.date),
    datasets: [
      {
        label: 'Sleep Efficiency (%)',
        data: sleepData.map(d => d.sleepEfficiency),
        borderColor: '#8884d8',
        backgroundColor: '#8884d8',
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
          text: 'Sleep Efficiency (%)',
        },
        min: 0,
        max: 100,
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default SleepEfficiencyChart;
