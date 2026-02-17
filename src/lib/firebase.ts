import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyD2U9wFUPzszilc15EbTYkeWIOyKBBbCKw',
  authDomain: 'slack-kit-maker.firebaseapp.com',
  projectId: 'slack-kit-maker',
  storageBucket: 'slack-kit-maker.firebasestorage.app',
  messagingSenderId: '990258104337',
  appId: '1:990258104337:web:1bdeeb1b14da71a989c9b0',
  measurementId: 'G-TTEST566TC',
};

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
