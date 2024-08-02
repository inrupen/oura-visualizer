export interface SleepDayData {
  day: string;
  totalSleep: number;
  timeInBed: number;
  deep_sleep_duration: number;
  rem_sleep_duration: number;
  light_sleep_duration: number;
  awake_time: number;
  average_hrv: number;
  average_heart_rate: number;
  efficiency: number;
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
