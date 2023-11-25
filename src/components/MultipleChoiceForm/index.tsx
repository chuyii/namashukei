import { useCallback } from 'react';

import { set, ref } from 'firebase/database';

import { useAuth } from '@/lib/auth';
import { db } from '@/lib/firebase';

import { Answer, AnswerPath, MultipleChoice } from '@/types';

import MultipleChoiceForm from './ui';

export default function EnhancedMultipleChoiceForm({
  className,
  request,
  answer,
}: {
  className?: string;
  request: MultipleChoice;
  answer?: Answer;
}) {
  const { currentUser } = useAuth();
  const submit = useCallback(
    async (answer: number) => {
      await set(ref(db, AnswerPath(currentUser.uid)), answer);
    },
    [currentUser.uid],
  );

  return (
    <MultipleChoiceForm
      className={className}
      request={request}
      onSubmit={submit}
      answer={answer}
    />
  );
}
