import { SleepDayData, SleepEfficiencyData, SleepStageData, HRVandRHRData } from '../types';

export const calculateSleepEfficiency = (data: SleepDayData[]): SleepEfficiencyData[] => {
  return data.map(day => ({
    date: day.date, // Ensure 'date' is included for chart x-axis
    totalSleep: day.totalSleep,
    timeInBed: day.timeInBed,
    sleepEfficiency: (day.totalSleep / day.timeInBed) * 100
  }));
};

export const prepareSleepStageData = (data: SleepDayData[]): SleepStageData[] => {
  return data.map(day => ({
    date: day.date,
    deep: day.deepSleep,
    rem: day.remSleep,
    light: day.lightSleep
  }));
};

export const prepareHRVandRHRData = (data: SleepDayData[]): HRVandRHRData[] => {
  let weeklyAverage: HRVandRHRData[] = [];
  // Assuming 'data' is sorted by 'date'
  for (let i = 0; i < data.length; i += 7) {
    let weekSlice = data.slice(i, i + 7);
    let avgHRV = weekSlice.reduce((acc, curr) => acc + curr.hrv, 0) / weekSlice.length;
    let avgRHR = weekSlice.reduce((acc, curr) => acc + curr.restingHeartRate, 0) / weekSlice.length;
    weeklyAverage.push({ date: weekSlice[0].date, hrv: avgHRV, restingHeartRate: avgRHR });
  }
  return weeklyAverage;
};
