'use client';

import { getApps, initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getDatabase, connectDatabaseEmulator } from 'firebase/database';

if (!getApps().length) {
  initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  });
}

export const auth = getAuth();
export const db = getDatabase();

if (process.env.NODE_ENV === 'development') {
  connectAuthEmulator(
    auth,
    `http://${
      process.env.NEXT_PUBLIC_FIREBASE_EMULATOR_IPADDR || 'localhost'
    }:9099`,
    {
      disableWarnings: true,
    },
  );
  connectDatabaseEmulator(
    db,
    process.env.NEXT_PUBLIC_FIREBASE_EMULATOR_IPADDR || 'localhost',
    9000,
  );
}
