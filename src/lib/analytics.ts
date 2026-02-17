import { logEvent } from 'firebase/analytics';
import { analytics } from './firebase';

type EventMap = {
  bg_upload: { method: 'click' | 'drop' };
  bg_remove: void;
  bg_error: { reason: string };
  overlay_color_change: { color: string };
  overlay_opacity_change: { opacity: number };
  title_set: void;
  date_select: void;
  date_clear: void;
  emoji_select: { emoji: string };
  emoji_clear: void;
  contact_fill: { field: 'phone' | 'email' | 'kakao' | 'instagram' | 'linkedin' };
  card_download: { source: 'main' | 'overlay' };
  preview_open: void;
};

type EventParams<T extends keyof EventMap> = EventMap[T] extends void ? [] : [EventMap[T]];

export function log<T extends keyof EventMap>(event: T, ...args: EventParams<T>) {
  logEvent(analytics, event, args[0] as Record<string, string | number> | undefined);
}
