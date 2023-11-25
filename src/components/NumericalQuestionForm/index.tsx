import { useCallback } from 'react';

import { set, ref } from 'firebase/database';

import { useAuth } from '@/lib/auth';
import { db } from '@/lib/firebase';

import { Answer, AnswerPath, NumericalQuestion } from '@/types';

import NumericalQuestionForm from './ui';

export default function EnhancedNumericalQuestionForm({
  className,
  request,
  answer,
}: {
  className?: string;
  request: NumericalQuestion;
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
    <NumericalQuestionForm
      className={className}
      request={request}
      onSubmit={submit}
      answer={answer}
    />
  );
}
