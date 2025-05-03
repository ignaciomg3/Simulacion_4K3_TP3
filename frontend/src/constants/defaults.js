export const DEFAULT_DAYS = 100;
export const DEFAULT_START_DAY = 1;
export const DEFAULT_END_DAY = 100;
export const DEFAULT_WORKERS = 24;
export const DEFAULT_MIN_WORKERS = 20;
export const DEFAULT_DAILY_REVENUE = 4000;
export const DEFAULT_DAILY_COSTS = 2400;
export const DEFAULT_WORKER_COST = 30;
export const DEFAULT_TARGET_PROFIT = 1000;

// Parametros de la simulación, distribución de obreros ausentes
export const ABSENTEE_DISTRIBUTION = [
  { absent: 0, frequency: 36 },
  { absent: 1, frequency: 38 },
  { absent: 2, frequency: 19 },
  { absent: 3, frequency: 6 },
  { absent: 4, frequency: 1 },
  { absent: 5, frequency: 0 }
];

export const DEFAULT_ABSENTEE_DISTRIBUTION = [
  { absent: 0, frequency: 36, probability: 36 },
  { absent: 1, frequency: 38, probability: 38 },
  { absent: 2, frequency: 19, probability: 19 },
  { absent: 3, frequency: 6, probability: 6 },
  { absent: 4, frequency: 1, probability: 1 },
  { absent: 5, frequency: 0, probability: 0 }
];