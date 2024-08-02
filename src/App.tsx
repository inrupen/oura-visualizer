import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import SleepDataVisualization from './components/SleepDataVisualization';
import HeartRateVisualization from './components/HeartRateVisualization';
import TemperatureVisualization from './components/TemperatureVisualization';
import ActivityVisualization from './components/ActivityVisualization';
import './App.css';

const App: React.FC = () => {
  const [data, setData] = useState<any[]>([]);

  const handleDataParsed = (parsedData: any[]) => {
    setData(parsedData);
  };

  return (
    <div className="App">
      <h1>Oura Ring Data Visualizer</h1>
      <FileUpload onDataParsed={handleDataParsed} />
      {data.length > 0 && (
        <>
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
  );
};

export default App;
