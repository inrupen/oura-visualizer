import {
  SleepDayData,
  SleepEfficiencyData,
  SleepStageData,
  HRVandRHRData,
  GenericChartData,
  SleepSummaryType,
} from '../types';

export const parseCSVData = (csvData: any[]): SleepDayData[] => {
  return csvData.map((row: any) => ({
    day: row['day'],
    total_sleep_duration: parseFloat(row['total_sleep_duration']) || 0,
    time_in_bed: parseFloat(row['time_in_bed']) || 0,
    awake_time: parseFloat(row['awake_time']) || 0,
    light_sleep_duration: parseFloat(row['light_sleep_duration']) || 0,
    rem_sleep_duration: parseFloat(row['rem_sleep_duration']) || 0,
    deep_sleep_duration: parseFloat(row['deep_sleep_duration']) || 0,
    efficiency: parseFloat(row['efficiency']) || 0,
    average_heart_rate: parseFloat(row['average_heart_rate']) || 0,
    average_hrv: parseFloat(row['average_hrv']) || 0,
    average_breath: parseFloat(row['average_breath']) || 0,
    average_temperature: parseFloat(row['average_temperature']) || 0,
    readiness_score: parseFloat(row['readiness_score']) || 0,
    lowest_heart_rate: parseFloat(row['lowest_heart_rate']) || 0,
  }));
};

export const calculateSleepEfficiency = (
  data: SleepDayData[]
): SleepEfficiencyData[] => {
  return data.map((day) => ({
    date: new Date(day.day).toLocaleDateString(),
    efficiency: day.efficiency,
  }));
};

export const prepareSleepStageData = (
  data: SleepDayData[]
): SleepStageData[] => {
  return data.map((day) => ({
    date: new Date(day.day).toLocaleDateString(),
    deep: day.deep_sleep_duration / 60, // Convert minutes to hours
    rem: day.rem_sleep_duration / 60, // Convert minutes to hours
    light: day.light_sleep_duration / 60, // Convert minutes to hours
    awake: day.awake_time / 60, // Convert minutes to hours
  }));
};

export const prepareHRVandRHRData = (data: SleepDayData[]): HRVandRHRData[] => {
  return data.map((day) => ({
    date: new Date(day.day).toLocaleDateString(),
    hrv: day.average_hrv,
    rhr: day.average_heart_rate,
  }));
};

export const prepareGenericChartData = (
  data: SleepDayData[],
  key: keyof SleepDayData
): GenericChartData[] => {
  return data.map((day) => ({
    date: new Date(day.day).toLocaleDateString(),
    value:
      key === 'total_sleep_duration'
        ? parseFloat((day[key] / 60).toFixed(2))
        : Number(day[key]), // Convert minutes to hours for sleep duration
  }));
};

export const prepareLowestHeartRateData = (
  data: SleepDayData[]
): GenericChartData[] => {
  return data.map((day) => ({
    date: new Date(day.day).toLocaleDateString(),
    value: day.lowest_heart_rate,
  }));
};

export const prepareSleepSummary = (data: SleepDayData[]): SleepSummaryType => {
  if (data.length === 0) {
    return {
      timeAsleep: 'N/A',
      totalDuration: 'N/A',
      stages: {
        awake: 'N/A',
        rem: 'N/A',
        light: 'N/A',
        deep: 'N/A',
      },
    };
  }

  const latestData = data[data.length - 1];

  return {
    timeAsleep: latestData.total_sleep_duration
      ? `${(latestData.total_sleep_duration / 60).toFixed(2)} hrs`
      : 'N/A',
    totalDuration: latestData.time_in_bed
      ? `${(latestData.time_in_bed / 60).toFixed(2)} hrs`
      : 'N/A',
    stages: {
      awake: latestData.awake_time
        ? `${(latestData.awake_time / 60).toFixed(2)} hrs`
        : 'N/A',
      rem: latestData.rem_sleep_duration
        ? `${(latestData.rem_sleep_duration / 60).toFixed(2)} hrs`
        : 'N/A',
      light: latestData.light_sleep_duration
        ? `${(latestData.light_sleep_duration / 60).toFixed(2)} hrs`
        : 'N/A',
      deep: latestData.deep_sleep_duration
        ? `${(latestData.deep_sleep_duration / 60).toFixed(2)} hrs`
        : 'N/A',
    },
  };
};
