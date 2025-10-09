# Break Reminder

A beautifully calm, web-based wellness companion that nudges your loved one to pause, stretch, and hydrate throughout the workday. Built with React + Vite, it focuses on gentle interactions, light colors, and an uplifting tone.

## Features

- 🎯 **Smart session control** – Start and stop the workday with a single tap; the app handles all reminders from there.
- ⏱️ **Automatic 40-minute cadence** – Default interval nudges every 40 minutes (fully adjustable) to take a mindful break.
- 🧘‍♀️ **Stretch & hydration prompts** – Follow-up reminders for stretching and water appear just after each break.
- 🥗 **Before-lunch heads-up** – Configurable alert ahead of the selected lunch time to start wrapping up.
- 🔔 **Soft chime notifications** – Optional audio cue when a reminder becomes active.
- 📊 **At-a-glance insights** – Track completed breaks, hydration boosts, stretch streaks, and focused minutes.
- 🎨 **Polished, light UI** – Soothing gradients, playful illustrations, and smooth motion for a delightful experience.

## Getting started

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

To create a production build:

```bash
npm run build
```

Serve the production build locally:

```bash
npm run preview
```

## Tech stack

- React 18 with hooks
- TypeScript for safer components
- Vite for lightning-fast dev and builds
- Framer Motion for subtle animations

## Next steps

- Hook up push notifications or SMS for cross-device reminders.
- Package as a Trusted Web Activity / PWA, then wrap into an APK.
- Sync reminders with Google Calendar for broader coverage.
- Persist settings and completion stats in local storage or a lightweight backend.
