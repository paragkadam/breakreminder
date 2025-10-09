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
# BreakReminder Web App Plan

BreakReminder is an interactive, web-based companion designed to gently remind users—especially my wife—to take restorative breaks during the workday. The application delivers scheduled prompts to stretch, hydrate, and pause before meals, supporting healthier habits while working at a computer.

## Vision

* **Primary goal**: Provide automated break reminders every 40 minutes once the work session begins, plus a special reminder before lunch or dinner.
* **Platform roadmap**:
  1. Launch as a polished, lightweight web experience optimized for laptops and desktops.
  2. Extend the same experience to a Google App Script integration for Google Workspace notifications.
  3. Later evolve into an Android APK to run as a native app while reusing the web foundation.

## Key Features

* **Interactive dashboard** with playful, light-tone color palette and engaging micro-interactions.
* **Session controller** allowing the user to start/pause/end the work session, with a visible countdown toward the next break.
* **Automated reminders** that trigger:
  * Stretching suggestions every 40 minutes.
  * Hydration prompts at alternating intervals to encourage regular water intake.
  * Meal-prep reminder prior to scheduled mealtime.
* **Reminder delivery channels** (configurable): on-screen modal, browser notifications, optional sound chime, and planned email/calendar integration via Google Apps Script.
* **Progress tracking** to celebrate completed breaks and provide gentle nudges when a break is missed.

## User Experience Goals

* **Bright and calming palette** (pale blues, mint greens, warm neutrals) to keep the interface friendly and easy on the eyes.
* **Responsive layout** that works smoothly on desktop browsers now and mobile browsers later.
* **Polished feel** with subtle animations (e.g., countdown transitions, button hover states, confetti for taking breaks).
* **Accessibility** considerations including large tap targets, keyboard navigation, and ARIA labels for assistive technologies.

## Technical Approach

* **Frontend stack**: React + TypeScript + Vite for rapid development, component reuse, and future native portability.
* **State management**: React context or lightweight stores (e.g., Zustand) for session and reminder state.
* **Timing engine**: Web Workers or `requestAnimationFrame` loops for accurate countdowns unaffected by tab throttling.
* **Notification pipeline**: Browser Notification API initially; integrate Google Apps Script to send Gmail/calendar alerts.
* **Data persistence**: LocalStorage for user preferences (theme, reminder intervals, sounds) with optional sync to Google account in future iterations.

## Roadmap

1. **MVP Web App**
   * Splash screen and onboarding flow to configure reminder schedule.
   * Interactive dashboard with start/pause controls and live countdown.
   * Modal reminders with actionable tips (stretching guides, water tracker).
   * Sound toggle and theme selector.

2. **Enhanced Engagement**
   * Habit history and streak tracking.
   * Customizable reminder types and frequencies.
   * Google Apps Script integration for calendar-based lunch reminder.

3. **Mobile Expansion**
   * Progressive Web App (PWA) packaging for offline support.
   * React Native or Capacitor build to deliver an Android APK using the shared React UI components.

## Getting Started (Planned)

* Clone the repository and install dependencies: `npm install`.
* Run the development server: `npm run dev`.
* Configure browser permissions for notifications and sounds.
* (Future) Link Google account via OAuth to enable calendar/email reminders.

## Contribution Notes

This project currently focuses on planning and scaffolding. Contributions should follow a component-driven architecture, emphasize accessibility, and maintain the light, joyful visual style.

