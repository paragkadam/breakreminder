import { motion } from 'framer-motion';

interface HeaderProps {
  isWorking: boolean;
  currentTime: Date;
  onStart: () => void;
  onStop: () => void;
  interval: number;
}

const Header = ({ isWorking, currentTime, onStart, onStop, interval }: HeaderProps) => (
  <header className="app-header">
    <div>
      <p className="greeting">Hello, Sunshine ✨</p>
      <h1>Wellness Break Companion</h1>
      <p className="subtitle">
        Gentle nudges every {interval} minutes to stretch, hydrate, and breathe.
      </p>
    </div>

    <div className="header-actions">
      <div className="time-display">
        <span>{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        <p>{currentTime.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}</p>
      </div>

      {isWorking ? (
        <motion.button whileTap={{ scale: 0.96 }} className="btn stop" onClick={onStop}>
          End Day
        </motion.button>
      ) : (
        <motion.button whileTap={{ scale: 0.96 }} className="btn start" onClick={onStart}>
          Start Work Session
        </motion.button>
      )}
    </div>
  </header>
);

export default Header;
