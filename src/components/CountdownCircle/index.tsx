import { useState, useEffect } from 'react';

export default function CountdownCircle({
  className,
  timeLeft,
  width,
  height,
}: {
  className?: string;
  timeLeft: number;
  width?: string;
  height?: string;
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
    <svg
      className={className ?? ''}
      viewBox="-35 -35 70 70"
      width={width}
      height={height}
    >
      <circle
        className={`-rotate-90 fill-transparent stroke-black stroke-[4px] ${
          timeLeft && isAnimating ? 'animate-countdown' : ''
        }`}
        r="33"
      ></circle>
      <text
        className="text-3xl font-bold"
        textAnchor="middle"
        dominantBaseline="central"
      >
        {timeLeft}
      </text>
    </svg>
  );
}
