import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { darkTheme } from './styles/themes';
import { GlobalStyles } from './styles/GlobalStyles';
import FileUpload from './components/FileUpload';
import SleepEfficiencyChart from './components/SleepEfficiencyChart';
import SleepStagesPieChart from './components/SleepStagesPieChart';
import HRVTrendsChart from './components/HRVTrendsChart';
import {
  calculateSleepEfficiency,
  prepareSleepStageData,
  prepareHRVandRHRData,
} from './utils/processData';
import {
  SleepDayData,
  SleepEfficiencyData,
  SleepStageData,
  HRVandRHRData,
} from './types';
import SleepDataVisualization from './components/SleepDataVisualization';
import HeartRateVisualization from './components/HeartRateVisualization';
import TemperatureVisualization from './components/TemperatureVisualization';
import ActivityVisualization from './components/ActivityVisualization';

const App: React.FC = () => {
  const [data, setData] = useState<SleepDayData[]>([]);
  const [processedData, setProcessedData] = useState<{
    sleepEfficiency: SleepEfficiencyData[];
    sleepStages: SleepStageData[];
    hrvAndRhr: HRVandRHRData[];
  }>({
    sleepEfficiency: [],
    sleepStages: [],
    hrvAndRhr: [],
  });

  const handleDataParsed = (parsedData: SleepDayData[]) => {
    setData(parsedData);
    setProcessedData({
      sleepEfficiency: calculateSleepEfficiency(parsedData),
      sleepStages: prepareSleepStageData(parsedData),
      hrvAndRhr: prepareHRVandRHRData(parsedData),
    });
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <GlobalStyles />
      <div>
        <FileUpload onDataParsed={handleDataParsed} />
        {data.length > 0 && (
          <>
            <SleepEfficiencyChart sleepData={processedData.sleepEfficiency} />
            <SleepStagesPieChart stages={processedData.sleepStages} />
            <HRVTrendsChart trendData={processedData.hrvAndRhr} />
            <h2>Sleep Data</h2>
            <SleepDataVisualization data={data} />
            <h2>Heart Rate</h2>
            <HeartRateVisualization data={data} />
            <h2>Body Temperature</h2>
            <TemperatureVisualization data={data} />
            <h2>Activity Levels</h2>
            <ActivityVisualization data={data} />
          </>
        )}
      </div>
    </ThemeProvider>
  );
};

export default App;
