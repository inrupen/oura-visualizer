export interface SleepDayData {
  day: string;
  total_sleep_duration: number;
  time_in_bed: number;
  awake_time: number;
  light_sleep_duration: number;
  rem_sleep_duration: number;
  deep_sleep_duration: number;
  efficiency: number;
  average_heart_rate: number;
  average_hrv: number;
  average_breath: number;
  average_temperature: number;
  readiness_score: number;
  lowest_heart_rate: number; // Add this line
}

export interface SleepEfficiencyData {
  date: string;
  efficiency: number;
}

export interface SleepStageData {
  date: string;
  deep: number;
  rem: number;
  light: number;
  awake: number;
}

export interface HRVandRHRData {
  date: string;
  hrv: number;
  rhr: number;
}

export interface GenericChartData {
  date: string;
  value: number;
}

export interface SleepSummaryType {
  timeAsleep: string;
  totalDuration: string;
  stages: {
    awake: string;
    rem: string;
    light: string;
    deep: string;
  };
}

export type FilterType = 'daily' | 'weekly' | 'monthly';
