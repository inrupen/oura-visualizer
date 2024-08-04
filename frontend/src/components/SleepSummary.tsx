import React from 'react';
import styled from 'styled-components';
import { SleepSummaryType } from '../types';

interface SleepSummaryProps {
  summary: SleepSummaryType;
}

const SummaryContainer = styled.div`
  background-color: #1c1c1e;
  color: #fff;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const SleepSummary: React.FC<SleepSummaryProps> = ({ summary }) => {
  return (
    <SummaryContainer>
      <h2>Time Asleep</h2>
      <p>{summary.timeAsleep}</p>
      <h2>Total Duration</h2>
      <p>{summary.totalDuration}</p>
      <h2>Stages</h2>
      <p>Awake: {summary.stages.awake}</p>
      <p>REM: {summary.stages.rem}</p>
      <p>Light: {summary.stages.light}</p>
      <p>Deep: {summary.stages.deep}</p>
    </SummaryContainer>
  );
};

export default SleepSummary;
