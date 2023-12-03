import { useEffect, useState } from 'react';

import { query, ref, onValue } from 'firebase/database';
import sanitizeHTML from 'sanitize-html';

import { db } from '@/lib/firebase';

import { Notice, NoticePath } from '@/types';

export function useNotice(userId: string) {
  const [notice, setNotice] = useState<string | undefined | null>(null);
  useEffect(() => {
    const unsubscribe = onValue(
      query(ref(db, NoticePath(userId))),
      (snapshot) => {
        if (snapshot.exists()) {
          const notice = Notice.parse(snapshot.val());
          setNotice(sanitizeHTML(notice));
        } else {
          setNotice(undefined);
        }
      },
    );

    return unsubscribe;
  }, [userId]);

  return notice;
}
