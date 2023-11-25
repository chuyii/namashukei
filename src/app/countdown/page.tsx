'use client';

import { useCountdown } from '@/hooks/useCountdown';

import CountdownCircle from '@/components/CountdownCircle';

export default function Page() {
  const { timeLeft } = useCountdown();

  return <CountdownCircle timeLeft={timeLeft} />;
}
