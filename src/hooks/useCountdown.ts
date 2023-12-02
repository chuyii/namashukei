import { useEffect, useState } from 'react';

import { ref, onValue } from 'firebase/database';

import { db } from '@/lib/firebase';

import { CountdownPath, FromCountdown } from '@/types';

export function useCountdown() {
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  useEffect(() => {
    let serverTimeOffset = 0;
    const unsubscribe1 = onValue(
      ref(db, '.info/serverTimeOffset'),
      (snapshot) => {
        serverTimeOffset = snapshot.val() as number;
      },
    );
    let timer: ReturnType<typeof setInterval>;
    const unsubscribe2 = onValue(ref(db, CountdownPath), (snapshot) => {
      if (snapshot.exists()) {
        const val = FromCountdown.parse(snapshot.val());
        const startAt = val.startAt;
        clearInterval(timer);
        const update = (isInTimer: boolean) => {
          const timeLeft =
            val.seconds * 1000 - (Date.now() + serverTimeOffset - startAt);
          if (timeLeft < 0) {
            setTimeLeft(0);
            isInTimer && clearInterval(timer);
          } else {
            const seconds = Math.ceil(timeLeft / 1000);
            timeLeft !== seconds && setTimeLeft(seconds);
          }
        };
        update(false);
        timer = setInterval(() => update(true), 100);
      } else {
        setTimeLeft(0);
      }
    });

    return () => {
      unsubscribe1();
      unsubscribe2();
      clearInterval(timer);
    };
  }, []);

  return { timeLeft };
}
