import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import { darkTheme } from './styles/themes';
import FileUpload from './components/FileUpload';
import SleepEfficiencyChart from './components/SleepEfficiencyChart';
import SleepStagesPieChart from './components/SleepStagesPieChart';
import HRVTrendsChart from './components/HRVTrendsChart';
import SleepDataVisualization from './components/SleepDataVisualization';
import HeartRateVisualization from './components/HeartRateVisualization';
import ReadinessScoreVisualization from './components/ReadinessScoreVisualization';
import LowestHeartRateVisualization from './components/LowestHeartRateVisualization';
import SleepSummary from './components/SleepSummary';
import Filter from './components/Filter';
import {
  parseCSVData,
  calculateSleepEfficiency,
  prepareSleepStageData,
  prepareHRVandRHRData,
  prepareGenericChartData,
  prepareLowestHeartRateData,
  prepareSleepSummary,
} from './utils/processData';
import {
  SleepDayData,
  SleepEfficiencyData,
  SleepStageData,
  HRVandRHRData,
  GenericChartData,
  SleepSummaryType,
  FilterType,
} from './types';

const App: React.FC = () => {
  const [data, setData] = useState<{
    daily: SleepDayData[];
    weekly: SleepDayData[];
    monthly: SleepDayData[];
  }>({
    daily: [],
    weekly: [],
    monthly: [],
  });

  const [filteredData, setFilteredData] = useState<{
    sleepEfficiency: SleepEfficiencyData[];
    sleepStages: SleepStageData[];
    hrvAndRhr: HRVandRHRData[];
    sleepData: GenericChartData[];
    heartRate: GenericChartData[];
    readinessScore: GenericChartData[];
    lowestHeartRate: GenericChartData[];
    summary: SleepSummaryType;
  }>({
    sleepEfficiency: [],
    sleepStages: [],
    hrvAndRhr: [],
    sleepData: [],
    heartRate: [],
    readinessScore: [],
    lowestHeartRate: [],
    summary: {
      timeAsleep: 'N/A',
      totalDuration: 'N/A',
      stages: {
        awake: 'N/A',
        rem: 'N/A',
        light: 'N/A',
        deep: 'N/A',
      },
    },
  });

  const [filter, setFilter] = useState<FilterType>('daily');

  const handleDataParsed = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('http://localhost:5500/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      const parsedData = {
        daily: parseCSVData(result.daily),
        weekly: parseCSVData(result.weekly),
        monthly: parseCSVData(result.monthly),
      };
      console.log('Parsed Data:', parsedData); // Debugging line
      setData(parsedData);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  useEffect(() => {
    if (data[filter]) {
      const selectedData = data[filter] || [];
      console.log('Selected Data:', selectedData); // Debugging line
      setFilteredData({
        sleepEfficiency: calculateSleepEfficiency(selectedData),
        sleepStages: prepareSleepStageData(selectedData),
        hrvAndRhr: prepareHRVandRHRData(selectedData),
        sleepData: prepareGenericChartData(
          selectedData,
          'total_sleep_duration'
        ),
        heartRate: prepareGenericChartData(selectedData, 'average_heart_rate'),
        readinessScore: prepareGenericChartData(
          selectedData,
          'readiness_score'
        ),
        lowestHeartRate: prepareLowestHeartRateData(selectedData),
        summary: prepareSleepSummary(selectedData),
      });
    }
  }, [data, filter]);

  return (
    <ThemeProvider theme={darkTheme}>
      <GlobalStyles />
      <div className="container">
        <FileUpload onDataParsed={handleDataParsed} />
        <div className="filter">
          <Filter onFilterChange={setFilter} />
        </div>
        {filteredData.summary && (
          <SleepSummary summary={filteredData.summary} />
        )}
        {filteredData.sleepEfficiency.length > 0 && (
          <>
            <div className="chart-container">
              <SleepEfficiencyChart sleepData={filteredData.sleepEfficiency} />
            </div>
            <div className="chart-container">
              <SleepStagesPieChart stages={filteredData.sleepStages} />
            </div>
            <div className="chart-container">
              <HRVTrendsChart trendData={filteredData.hrvAndRhr} />
            </div>
            <h2>Sleep Data</h2>
            <div className="chart-container">
              <SleepDataVisualization data={filteredData.sleepData} />
            </div>
            <h2>Heart Rate</h2>
            <div className="chart-container">
              <HeartRateVisualization data={filteredData.heartRate} />
            </div>
            <h2>Lowest Heart Rate</h2>
            <div className="chart-container">
              <LowestHeartRateVisualization
                data={filteredData.lowestHeartRate}
              />
            </div>
            <h2>Readiness Score</h2>
            <div className="chart-container">
              <ReadinessScoreVisualization data={filteredData.readinessScore} />
            </div>
          </>
        )}
      </div>
    </ThemeProvider>
  );
};

export default App;
