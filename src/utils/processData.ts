import { SleepDayData, SleepEfficiencyData, SleepStageData, HRVandRHRData } from '../types';

export const calculateSleepEfficiency = (data: SleepDayData[]): SleepEfficiencyData[] => {
  return data.map(day => ({
    date: day.day, // Ensure 'date' is included for chart x-axis
    sleepEfficiency: day.efficiency,
  }));
};

export const prepareSleepStageData = (data: SleepDayData[]): SleepStageData[] => {
  return data.map(day => ({
    date: day.day,
    deep: day.deep_sleep_duration,
    rem: day.rem_sleep_duration,
    light: day.light_sleep_duration,
  }));
};

export const prepareHRVandRHRData = (data: SleepDayData[]): HRVandRHRData[] => {
  return data.map(day => ({
    date: day.day,
    hrv: day.average_hrv,
    restingHeartRate: day.average_heart_rate,
  }));
};
