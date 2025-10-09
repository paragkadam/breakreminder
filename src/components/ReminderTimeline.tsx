import { Reminder } from '../types';
import { formatTime } from '../utils/time';

interface TimelineProps {
  reminders: Reminder[];
}

const labelByType: Record<Reminder['type'], string> = {
  break: 'Break',
  stretch: 'Stretch',
  hydrate: 'Hydrate',
  lunch: 'Lunch Prep',
};

const ReminderTimeline = ({ reminders }: TimelineProps) => (
  <div className="card timeline-card">
    <div className="card-header">
      <h3>Up next</h3>
      <p className="muted">The next few gentle nudges for the day.</p>
    </div>
    <div className="timeline">
      {reminders.length === 0 && (
        <p className="muted">Reminders will appear here once the session begins.</p>
      )}
      {reminders.map((reminder) => (
        <div key={reminder.id} className={`timeline-item timeline-${reminder.type}`}>
          <div className="timeline-icon" aria-hidden>
            {labelByType[reminder.type].slice(0, 1)}
          </div>
          <div>
            <div className="timeline-time">{formatTime(reminder.scheduledFor)}</div>
            <div className="timeline-title">{labelByType[reminder.type]}</div>
            <p className="timeline-message">{reminder.message}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default ReminderTimeline;
