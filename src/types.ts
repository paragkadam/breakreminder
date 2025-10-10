export type ReminderType = 'break' | 'stretch' | 'hydrate' | 'lunch';

export interface Reminder {
  id: string;
  title: string;
  message: string;
  scheduledFor: Date;
  type: ReminderType;
  acknowledged?: boolean;
}

export interface Settings {
  intervalMinutes: number;
  hydrationOffsetMinutes: number;
  stretchOffsetMinutes: number;
  lunchTime: string;
  lunchLeadMinutes: number;
  soundEnabled: boolean;
}
