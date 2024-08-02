import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { ChartData, ChartOptions } from 'chart.js';
import { SleepStageData } from '../types';

// Register components
Chart.register(ArcElement, Tooltip, Legend);

interface SleepStagesPieChartProps {
  stages: SleepStageData[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const SleepStagesPieChart: React.FC<SleepStagesPieChartProps> = ({ stages }) => {
  const aggregatedData = stages.reduce(
    (acc, stage) => {
      acc.deep += stage.deep;
      acc.rem += stage.rem;
      acc.light += stage.light;
      return acc;
    },
    { deep: 0, rem: 0, light: 0 }
  );

  const data: ChartData<'pie'> = {
    labels: ['Deep Sleep', 'REM Sleep', 'Light Sleep'],
    datasets: [
      {
        data: [aggregatedData.deep, aggregatedData.rem, aggregatedData.light],
        backgroundColor: ['#0088FE', '#00C49F', '#FFBB28'],
      },
    ],
  };

  const options: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.label}: ${context.raw} minutes`,
        },
      },
    },
  };

  return <Pie data={data} options={options} />;
};

export default SleepStagesPieChart;
