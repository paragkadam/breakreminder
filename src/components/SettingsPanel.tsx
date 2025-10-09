import { ChangeEvent } from 'react';
import { Settings } from '../types';

interface Props {
  settings: Settings;
  onChange: (settings: Settings) => void;
  disabled?: boolean;
}

const SettingsPanel = ({ settings, onChange, disabled }: Props) => {
  const updateField = (key: keyof Settings) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      const value =
        event.target.type === 'checkbox'
          ? event.target.checked
          : event.target.type === 'number'
          ? Number(event.target.value)
          : event.target.value;

      onChange({ ...settings, [key]: value });
    };

  return (
    <div className="card settings-card">
      <div className="card-header">
        <h3>Personalize</h3>
        <p className="muted">Adjust reminders to match her rhythm.</p>
      </div>

      <div className="form-grid">
        <label className="field">
          <span>Break interval (minutes)</span>
          <input
            type="number"
            min={15}
            max={120}
            value={settings.intervalMinutes}
            onChange={updateField('intervalMinutes')}
            disabled={disabled}
          />
        </label>

        <label className="field">
          <span>Stretch reminder (minutes after break)</span>
          <input
            type="number"
            min={0}
            max={30}
            value={settings.stretchOffsetMinutes}
            onChange={updateField('stretchOffsetMinutes')}
            disabled={disabled}
          />
        </label>

        <label className="field">
          <span>Water reminder (minutes after break)</span>
          <input
            type="number"
            min={0}
            max={30}
            value={settings.hydrationOffsetMinutes}
            onChange={updateField('hydrationOffsetMinutes')}
            disabled={disabled}
          />
        </label>

        <label className="field">
          <span>Lunch time</span>
          <input
            type="time"
            value={settings.lunchTime}
            onChange={updateField('lunchTime')}
          />
        </label>

        <label className="field">
          <span>Lunch reminder lead (minutes)</span>
          <input
            type="number"
            min={5}
            max={90}
            value={settings.lunchLeadMinutes}
            onChange={updateField('lunchLeadMinutes')}
          />
        </label>

        <label className="field toggle">
          <input
            type="checkbox"
            checked={settings.soundEnabled}
            onChange={updateField('soundEnabled')}
          />
          <span>Play soft chime on reminders</span>
        </label>
      </div>
    </div>
  );
};

export default SettingsPanel;
