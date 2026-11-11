import { EMERGENCY_SERVICE } from './business';

const CHECK_INTERVAL_MS = 60_000;

/** Current hour (0–23) in the business time zone, independent of the visitor's device zone. */
function easternHour(now = new Date()): number {
  const hour = new Intl.DateTimeFormat('en-US', {
    timeZone: EMERGENCY_SERVICE.timeZone,
    hour: 'numeric',
    hourCycle: 'h23',
  }).format(now);
  return Number(hour);
}

// Development only: append ?emergency-preview to any URL to force emergency mode.
function isPreview(): boolean {
  return (
    process.env.NODE_ENV !== 'production' &&
    new URLSearchParams(window.location.search).has('emergency-preview')
  );
}

/** True from 8 PM to midnight Eastern. Client-only: reads the clock and URL. */
export function isEmergencyWindow(): boolean {
  if (isPreview()) return true;
  const hour = easternHour();
  return hour >= EMERGENCY_SERVICE.startHour && hour < EMERGENCY_SERVICE.endHour;
}

/** useSyncExternalStore subscriber that re-checks the window every minute. */
export function subscribeToEmergencyClock(onChange: () => void) {
  const id = window.setInterval(onChange, CHECK_INTERVAL_MS);
  return () => window.clearInterval(id);
}
