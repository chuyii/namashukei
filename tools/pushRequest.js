const admin = require('firebase-admin');
const database = require('firebase/database');
const { parseArgs } = require('node:util');

const dotenv = require('dotenv');
dotenv.config();
dotenv.config({ path: `.env.local`, override: true });

(async () => {
  const options = {
    production: {
      type: 'boolean',
      default: false,
    },
    type: {
      type: 'string',
      short: 't',
      default: 'N',
    },
    seconds: {
      type: 'string',
      short: 's',
      default: '30',
    },
  };
  const { values } = parseArgs({ options });

  if (values.production) {
    admin.initializeApp({
      credential: admin.credential.cert(
        require('../service-account-credentials.json'),
      ),
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    });
  } else {
    admin.initializeApp({
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    });
  }

  const db = admin.database();
  !values.production && db.useEmulator('localhost', 9000);

  await db.ref('/request').set({
    countdown: {
      startAt: database.serverTimestamp(),
      seconds: Number(values.seconds),
    },
    content:
      values.type === 'N'
        ? {
            type: 'N',
            step: 1,
            unit: 'km',
          }
        : {
            type: 'M',
            choices: ['A', 'B', 'C', 'D'],
          },
  });

  process.exit(0);
})();
