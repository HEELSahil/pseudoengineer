'use client';

import * as React from 'react';

type Props = {
  value: number;
  size?: number;
  strokeWidth?: number;
  trackClassName?: string;
  indicatorClassName?: string;
  children?: React.ReactNode;
};

export default function RadialProgress({
  value,
  size = 160,
  strokeWidth = 10,
  trackClassName = 'text-zinc-200/30 dark:text-zinc-700/40',
  indicatorClassName = 'text-emerald-500',
  children,
}: Props) {
  const r = (size - strokeWidth) / 2;
  const C = Math.PI * 2 * r;
  const pct = Math.max(0, Math.min(100, value));
  const dash = (pct / 100) * C;

  return (
    <div
      className="relative inline-grid place-items-center"
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          strokeWidth={strokeWidth}
          className={trackClassName}
          stroke="currentColor"
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          strokeWidth={strokeWidth}
          className={`${indicatorClassName} transition-[stroke-dasharray] duration-700 ease-out`}
          stroke="currentColor"
          strokeLinecap="round"
          fill="none"
          strokeDasharray={`${dash} ${C - dash}`}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">{children}</div>
    </div>
  );
}
