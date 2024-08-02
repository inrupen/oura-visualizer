import React, { useState, useContext } from 'react';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from './styles/themes';
import { GlobalStyles } from './styles/GlobalStyles';
import FileUpload from './components/FileUpload';
import SleepDataVisualization from './components/SleepDataVisualization';
import HeartRateVisualization from './components/HeartRateVisualization';
import TemperatureVisualization from './components/TemperatureVisualization';
import ActivityVisualization from './components/ActivityVisualization';

const App: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [theme, setTheme] = useState('dark');

  const handleDataParsed = (parsedData: any[]) => {
    setData(parsedData);
  };
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
      <GlobalStyles />
      <div>
        <button onClick={toggleTheme}>Toggle Theme</button>
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
    </ThemeProvider>
  );
};

export default App;
