import { useMemo } from 'react';

import { QRCodeSVG } from 'qrcode.react';

import { useAuth } from '@/lib/auth';

import { useAnswer } from '@/hooks/useAnswer';
import { useNotice } from '@/hooks/useNotice';
import { useRequestWithCountdown } from '@/hooks/useRequestWithCountdown';

import MultipleChoiceForm from '@/components/MultipleChoiceForm';
import NumericalQuestionForm from '@/components/NumericalQuestionForm';

import CountdownCircle from './CountdownCircle';

export default function UserPage() {
  const { currentUser } = useAuth();
  const __html = useNotice(currentUser.uid);
  const answer = useAnswer(currentUser.uid);
  const { timeLeft, request } = useRequestWithCountdown();

  const originUrl = useMemo(() => new URL(window.location.href).origin, []);

  return (
    <div className="m-8">
      {__html && <div dangerouslySetInnerHTML={{ __html }}></div>}
      {request ? (
        <>
          <CountdownCircle className="mx-auto mb-4" timeLeft={timeLeft} />
          {request.type === 'N' ? (
            <NumericalQuestionForm
              className="mb-8"
              request={request}
              answer={answer}
            />
          ) : (
            <MultipleChoiceForm
              className="mb-8"
              request={request}
              answer={answer}
            />
          )}
        </>
      ) : (
        <>
          <p className="mb-4 text-xl">お待ちください</p>
        </>
      )}
      <p className="mb-4 break-words text-xl">{originUrl}</p>
      <QRCodeSVG
        className="mx-auto h-full w-full max-w-[15rem]"
        value={originUrl}
      />
    </div>
  );
}
