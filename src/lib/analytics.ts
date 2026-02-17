import { logEvent } from 'firebase/analytics';
import { analytics } from './firebase';

export function log(event: string, params?: Record<string, string | number>) {
  logEvent(analytics, event, params);
}
