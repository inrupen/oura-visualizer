import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import FileUpload from './components/FileUpload';
import SleepDataVisualization from './components/SleepDataVisualization';
import HeartRateVisualization from './components/HeartRateVisualization';
import TemperatureVisualization from './components/TemperatureVisualization';
import ActivityVisualization from './components/ActivityVisualization';
import { darkTheme, lightTheme } from './themes';
import './App.css';

const Container = styled.div`
  text-align: center;
  padding: 20px;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.color};
`;

const Button = styled.button`
  padding: 10px 20px;
  margin: 10px;
  cursor: pointer;
  background-color: ${(props) => props.theme.color};
  color: ${(props) => props.theme.background};
  border: none;
  border-radius: 5px;
`;

const App: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [theme, setTheme] = useState(darkTheme);

  const handleDataParsed = (parsedData: any[]) => {
    setData(parsedData);
  };

  const toggleTheme = () => {
    setTheme(theme === darkTheme ? lightTheme : darkTheme);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <h1>Oura Ring Data Visualizer</h1>
        <Button onClick={toggleTheme}>
          Switch to {theme === darkTheme ? 'Light' : 'Dark'} Mode
        </Button>
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
      </Container>
    </ThemeProvider>
  );
};

export default App;
