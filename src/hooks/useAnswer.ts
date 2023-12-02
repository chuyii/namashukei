import { useEffect, useState } from 'react';

import { query, ref, onValue } from 'firebase/database';

import { db } from '@/lib/firebase';

import { Answer, AnswerPath } from '@/types';

export const useAnswer = (userId: string) => {
  const [answer, setAnswer] = useState<Answer | undefined | null>(null);
  useEffect(() => {
    const unsubscribe = onValue(
      query(ref(db, AnswerPath(userId))),
      (snapshot) => {
        if (snapshot.exists()) {
          const answer = Answer.parse(snapshot.val());
          setAnswer(answer);
        } else {
          setAnswer(undefined);
        }
      },
    );

    return unsubscribe;
  }, [userId]);

  return answer;
};
