import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { ChartData, ChartOptions } from 'chart.js';
import { HRVandRHRData } from '../types';

// Register components
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface HRVTrendsChartProps {
  trendData: HRVandRHRData[];
}

const HRVTrendsChart: React.FC<HRVTrendsChartProps> = ({ trendData }) => {
  const data: ChartData<'line'> = {
    labels: trendData.map(d => d.date),
    datasets: [
      {
        label: 'HRV',
        data: trendData.map(d => d.hrv),
        borderColor: '#82ca9d',
        fill: false,
        yAxisID: 'y1',
      },
      {
        label: 'Resting Heart Rate',
        data: trendData.map(d => d.restingHeartRate),
        borderColor: '#8884d8',
        fill: false,
        yAxisID: 'y2',
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
      y1: {
        title: {
          display: true,
          text: 'HRV',
        },
        position: 'left',
      },
      y2: {
        title: {
          display: true,
          text: 'Resting Heart Rate',
        },
        position: 'right',
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default HRVTrendsChart;
