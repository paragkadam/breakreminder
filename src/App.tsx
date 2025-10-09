import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ActiveReminder from './components/ActiveReminder';
import Header from './components/Header';
import ReminderTimeline from './components/ReminderTimeline';
import SettingsPanel from './components/SettingsPanel';
import SummaryStats from './components/SummaryStats';
import './styles/app.css';
import { Reminder, Settings } from './types';
import { createId, formatTime, minutesFromNow, parseTime } from './utils/time';

const defaultSettings: Settings = {
  intervalMinutes: 40,
  hydrationOffsetMinutes: 5,
  stretchOffsetMinutes: 2,
  lunchTime: '12:30',
  lunchLeadMinutes: 15,
  soundEnabled: true,
};

const hydrationMessages = [
  'Sip some water to stay energized.',
  'Hydration boost time!',
  'Water break: refresh and refocus.',
];

const stretchMessages = [
  'Unroll your shoulders and stretch it out.',
  'Quick stretch to keep your posture happy.',
  'Rise, stretch, and smile.',
];

const breakMessages = [
  'Step away and breathe deeply.',
  'You deserve a mini reset.',
  'A short break keeps brilliance flowing.',
];

const lunchMessages = [
  'Lunch is around the corner—wrap up this task.',
  'Time to wind down before lunch.',
  'Prep for lunch with a mindful pause.',
];

const selectMessage = (messages: string[]) =>
  messages[Math.floor(Math.random() * messages.length)];

const getChime = () =>
  typeof window === 'undefined'
    ? null
    : new Audio(
        'data:audio/mp3;base64,//uQxAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAACcQCA' +
          'AAB9AAAANgYB9AAABEV4YW1wbGUgQmVsbAAAAAD//2P///8Z///8Z///8Z///8Z///8Z///8Z///8Z',
      );

function App() {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [isWorking, setIsWorking] = useState(false);
  const [workStart, setWorkStart] = useState<Date | null>(null);
  const [nextBreakAt, setNextBreakAt] = useState<Date | null>(null);
  const [queue, setQueue] = useState<Reminder[]>([]);
  const [activeReminder, setActiveReminder] = useState<Reminder | null>(null);
  const [completed, setCompleted] = useState<Reminder[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [lunchReminderSent, setLunchReminderSent] = useState(false);
  const [chime] = useState<HTMLAudioElement | null>(() => getChime());

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isWorking || !nextBreakAt) return;

    if (currentTime >= nextBreakAt) {
      const nextBreak = new Date(nextBreakAt);
      const reminders: Reminder[] = [
        {
          id: createId(),
          title: 'Break Time',
          message: selectMessage(breakMessages),
          scheduledFor: nextBreak,
          type: 'break',
        },
      ];

      if (settings.stretchOffsetMinutes >= 0) {
        reminders.push({
          id: createId(),
          title: 'Stretch & Reset',
          message: selectMessage(stretchMessages),
          scheduledFor: minutesFromNow(settings.stretchOffsetMinutes),
          type: 'stretch',
        });
      }

      if (settings.hydrationOffsetMinutes >= 0) {
        reminders.push({
          id: createId(),
          title: 'Hydrate',
          message: selectMessage(hydrationMessages),
          scheduledFor: minutesFromNow(settings.hydrationOffsetMinutes),
          type: 'hydrate',
        });
      }

      setQueue((prev) => [...prev, ...reminders]);
      const next = new Date(nextBreak.getTime() + settings.intervalMinutes * 60 * 1000);
      setNextBreakAt(next);
    }
  }, [currentTime, isWorking, nextBreakAt, settings.hydrationOffsetMinutes, settings.intervalMinutes, settings.stretchOffsetMinutes]);

  useEffect(() => {
    if (!isWorking || lunchReminderSent) return;
    const lunchTime = parseTime(settings.lunchTime);
    const reminderTime = new Date(
      lunchTime.getTime() - settings.lunchLeadMinutes * 60 * 1000,
    );
    if (currentTime >= reminderTime) {
      setQueue((prev) => [
        ...prev,
        {
          id: createId(),
          title: 'Lunch Prep',
          message: selectMessage(lunchMessages),
          scheduledFor: lunchTime,
          type: 'lunch',
        },
      ]);
      setLunchReminderSent(true);
    }
  }, [currentTime, isWorking, lunchReminderSent, settings.lunchLeadMinutes, settings.lunchTime]);

  useEffect(() => {
    if (!activeReminder && queue.length) {
      const sortedQueue = [...queue].sort(
        (a, b) => a.scheduledFor.getTime() - b.scheduledFor.getTime(),
      );
      const [next, ...rest] = sortedQueue;
      setActiveReminder(next);
      setQueue(rest);
      if (settings.soundEnabled && chime) {
        chime.currentTime = 0;
        void chime.play().catch(() => null);
      }
    }
  }, [activeReminder, chime, queue, settings.soundEnabled]);

  const startDay = () => {
    const start = new Date();
    setIsWorking(true);
    setWorkStart(start);
    setNextBreakAt(minutesFromNow(settings.intervalMinutes));
    setQueue([]);
    setActiveReminder(null);
    setCompleted([]);
    setLunchReminderSent(false);
  };

  const stopDay = () => {
    setIsWorking(false);
    setActiveReminder(null);
    setQueue([]);
  };

  const acknowledgeReminder = (reminder: Reminder) => {
    setCompleted((prev) => [...prev, { ...reminder, acknowledged: true }]);
    setActiveReminder(null);
  };

  const snoozeReminder = (reminder: Reminder, minutes: number) => {
    setQueue((prev) => [
      ...prev,
      {
        ...reminder,
        scheduledFor: minutesFromNow(minutes),
      },
    ]);
    setActiveReminder(null);
  };

  const upcoming = useMemo(
    () =>
      [...queue]
        .sort((a, b) => a.scheduledFor.getTime() - b.scheduledFor.getTime())
        .slice(0, 6),
    [queue],
  );

  const totalBreaksTaken = completed.filter((item) => item.type === 'break').length;
  const totalHydration = completed.filter((item) => item.type === 'hydrate').length;
  const totalStretch = completed.filter((item) => item.type === 'stretch').length;

  return (
    <div
      style={{
        minHeight: '100vh',
        background:
          'radial-gradient(circle at top left, rgba(123,223,242,0.25), transparent 40%), radial-gradient(circle at bottom right, rgba(255,223,186,0.2), transparent 50%), #f8fbff',
      }}
    >
      <div className="app-shell">
        <Header
          isWorking={isWorking}
          currentTime={currentTime}
          onStart={startDay}
          onStop={stopDay}
          interval={settings.intervalMinutes}
        />

        <main className="main-grid">
          <section className="primary-panel">
            <SummaryStats
              workStart={workStart}
              completedBreaks={totalBreaksTaken}
              hydrationCount={totalHydration}
              stretchCount={totalStretch}
              isWorking={isWorking}
            />

            <ReminderTimeline reminders={upcoming} />
          </section>

          <aside className="side-panel">
            <SettingsPanel
              settings={settings}
              onChange={setSettings}
              disabled={isWorking}
            />

            <AnimatePresence>
              {activeReminder && (
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 24 }}
                  transition={{ type: 'spring', stiffness: 220, damping: 24 }}
                >
                  <ActiveReminder
                    reminder={activeReminder}
                    onAcknowledge={() => acknowledgeReminder(activeReminder)}
                    onSnooze={(minutes) => snoozeReminder(activeReminder, minutes)}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </aside>
        </main>

        <footer className="app-footer">
          <p>
            Crafted to keep wellness woven into busy workdays. Next reminder at{' '}
            {nextBreakAt ? formatTime(nextBreakAt) : '—'}.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
