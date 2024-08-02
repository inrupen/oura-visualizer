export interface SleepDayData {
  date: string;
  totalSleep: number;
  timeInBed: number;
  deepSleep: number;
  remSleep: number;
  lightSleep: number;
  hrv: number;
  restingHeartRate: number;
}

export interface SleepEfficiencyData {
  date: string; // Ensure the 'date' is present for chart x-axis
  sleepEfficiency: number;
}

export interface SleepStageData {
  date: string;
  deep: number;
  rem: number;
  light: number;
}

export interface HRVandRHRData {
  date: string;
  hrv: number;
  restingHeartRate: number;
}
