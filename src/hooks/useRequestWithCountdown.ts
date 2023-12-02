import { useEffect, useState } from 'react';

import { ref, onValue } from 'firebase/database';

import { db } from '@/lib/firebase';

import { FromRequest, RequestContent, RequestPath } from '@/types';

export function useRequestWithCountdown() {
  const [timeLeft, setTimeLeft] = useState(0);
  const [request, setRequest] = useState<RequestContent | undefined | null>(
    null,
  );
  useEffect(() => {
    let serverTimeOffset = 0;
    const unsubscribe1 = onValue(
      ref(db, '.info/serverTimeOffset'),
      (snapshot) => {
        serverTimeOffset = snapshot.val() as number;
      },
    );
    let timer: ReturnType<typeof setInterval>;
    const unsubscribe2 = onValue(ref(db, RequestPath), (snapshot) => {
      if (snapshot.exists()) {
        const val = FromRequest.parse(snapshot.val());
        const startAt = val.countdown.startAt;
        clearInterval(timer);
        setRequest(val.content);
        const update = (isInTimer: boolean) => {
          const timeLeft =
            val.countdown.seconds * 1000 -
            (Date.now() + serverTimeOffset - startAt);
          if (timeLeft < 0) {
            setTimeLeft(0);
            setRequest(undefined);
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
        setRequest(undefined);
      }
    });

    return () => {
      unsubscribe1();
      unsubscribe2();
      clearInterval(timer);
    };
  }, []);

  return { timeLeft, request };
}
