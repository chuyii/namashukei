import { useState, useEffect } from 'react';

export default function CountdownCircle({
  className,
  timeLeft,
}: {
  className?: string;
  timeLeft: number;
}) {
  const [isAnimating, setIsAnimating] = useState(false);
  useEffect(() => {
    setIsAnimating(false);
    const timer = setTimeout(() => {
      setIsAnimating(true);
    }, 50);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  return (
    <div className={`relative h-[70px] w-[70px] ${className ?? ''}`}>
      <svg
        className={`-rotate-90 fill-transparent stroke-black stroke-[4px] ${
          timeLeft && isAnimating ? 'animate-countdown' : ''
        }`}
        width="70"
        height="70"
      >
        <circle cx="35" cy="35" r="32"></circle>
      </svg>
      <p className="absolute inset-0 m-auto text-center text-3xl font-bold leading-[70px]">
        {timeLeft}
      </p>
    </div>
  );
}
