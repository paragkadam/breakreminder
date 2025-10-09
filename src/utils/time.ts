export const formatTime = (date: Date) =>
  date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

export const minutesFromNow = (minutes: number) =>
  new Date(Date.now() + minutes * 60 * 1000);

export const parseTime = (time: string) => {
  const [hours, minutes] = time.split(':').map(Number);
  const result = new Date();
  result.setHours(hours, minutes, 0, 0);
  return result;
};

export const createId = () =>
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

export const minutesBetween = (from: Date, to: Date) =>
  Math.round((to.getTime() - from.getTime()) / (60 * 1000));
