import { motion } from 'framer-motion';
import { Reminder } from '../types';
import { formatTime } from '../utils/time';

interface Props {
  reminder: Reminder;
  onAcknowledge: () => void;
  onSnooze: (minutes: number) => void;
}

const accentByType: Record<Reminder['type'], string> = {
  break: '#7bdff2',
  stretch: '#c8e7ff',
  hydrate: '#b2f7ef',
  lunch: '#ffd6a5',
};

const iconByType: Record<Reminder['type'], string> = {
  break: '🪴',
  stretch: '🧘‍♀️',
  hydrate: '💧',
  lunch: '🥗',
};

const ActiveReminder = ({ reminder, onAcknowledge, onSnooze }: Props) => (
  <div className="card active-reminder" style={{ borderColor: accentByType[reminder.type] }}>
    <div className="card-header">
      <span className="badge" style={{ background: accentByType[reminder.type] }}>
        {iconByType[reminder.type]}
      </span>
      <div>
        <h3>{reminder.title}</h3>
        <p className="scheduled">Scheduled for {formatTime(reminder.scheduledFor)}</p>
      </div>
    </div>

    <p className="message">{reminder.message}</p>

    <div className="actions">
      <motion.button
        whileTap={{ scale: 0.98 }}
        className="btn primary"
        onClick={onAcknowledge}
      >
        Done
      </motion.button>
      <div className="snooze-group">
        <span>Snooze:</span>
        {[5, 10, 15].map((minutes) => (
          <motion.button
            key={minutes}
            whileTap={{ scale: 0.96 }}
            className="btn ghost"
            onClick={() => onSnooze(minutes)}
          >
            {minutes}m
          </motion.button>
        ))}
      </div>
    </div>
  </div>
);

export default ActiveReminder;
