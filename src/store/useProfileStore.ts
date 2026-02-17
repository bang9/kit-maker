import { create } from 'zustand';
import type { DateRange } from 'react-day-picker';

interface ProfileState {
  backgroundImage: string | null;
  overlayColor: string;
  overlayOpacity: number;
  dateRange: DateRange;
  title: string;
  emoji: string | null;
  phone: string | null;
  email: string | null;
  kakao: string | null;
  instagram: string | null;
  linkedin: string | null;

  setBackgroundImage: (image: string | null) => void;
  setOverlayColor: (color: string) => void;
  setOverlayOpacity: (opacity: number) => void;
  setDateRange: (range: DateRange) => void;
  setTitle: (title: string) => void;
  setEmoji: (emoji: string | null) => void;
  setPhone: (phone: string | null) => void;
  setEmail: (email: string | null) => void;
  setKakao: (kakao: string | null) => void;
  setInstagram: (instagram: string | null) => void;
  setLinkedin: (linkedin: string | null) => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
  backgroundImage: null,
  overlayColor: '#000000',
  overlayOpacity: 70,
  dateRange: { from: undefined, to: undefined },
  title: 'KEEP IN TOUCH',
  emoji: '\u{1F64C}',
  phone: null,
  email: null,
  kakao: null,
  instagram: null,
  linkedin: null,

  setBackgroundImage: (image) => set({ backgroundImage: image }),
  setOverlayColor: (color) => set({ overlayColor: color }),
  setOverlayOpacity: (opacity) => set({ overlayOpacity: opacity }),
  setDateRange: (range) => set({ dateRange: range }),
  setTitle: (title) => set({ title }),
  setEmoji: (emoji) => set({ emoji }),
  setPhone: (phone) => set({ phone }),
  setEmail: (email) => set({ email }),
  setKakao: (kakao) => set({ kakao }),
  setInstagram: (instagram) => set({ instagram }),
  setLinkedin: (linkedin) => set({ linkedin }),
}));
