import { minutesBetween } from '../utils/time';

interface StatsProps {
  workStart: Date | null;
  completedBreaks: number;
  hydrationCount: number;
  stretchCount: number;
  isWorking: boolean;
}

const SummaryStats = ({
  workStart,
  completedBreaks,
  hydrationCount,
  stretchCount,
  isWorking,
}: StatsProps) => {
  const minutesActive = workStart ? minutesBetween(workStart, new Date()) : 0;

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <p className="stat-label">Session status</p>
        <p className={`stat-value ${isWorking ? 'active' : ''}`}>
          {isWorking ? 'In progress' : 'Paused'}
        </p>
        <p className="stat-caption">Start your day to activate automatic reminders.</p>
      </div>

      <div className="stat-card">
        <p className="stat-label">Breaks enjoyed</p>
        <p className="stat-value">{completedBreaks}</p>
        <p className="stat-caption">Little pauses to keep creativity flowing.</p>
      </div>

      <div className="stat-card">
        <p className="stat-label">Hydration boosts</p>
        <p className="stat-value">{hydrationCount}</p>
        <p className="stat-caption">Water sips make magic happen.</p>
      </div>

      <div className="stat-card">
        <p className="stat-label">Stretch streaks</p>
        <p className="stat-value">{stretchCount}</p>
        <p className="stat-caption">Gentle stretches protect posture.</p>
      </div>

      <div className="stat-card">
        <p className="stat-label">Focused minutes</p>
        <p className="stat-value">{minutesActive}</p>
        <p className="stat-caption">Tracked from the moment she hits start.</p>
      </div>
    </div>
  );
};

export default SummaryStats;
