'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

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
  trackClassName,
  indicatorClassName,
  children,
}: Props) {
  const r = (size - strokeWidth) / 2;
  const c = Math.PI * 2 * r;
  const clamped = Math.max(0, Math.min(100, value));
  const dash = (clamped / 100) * c;

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
        {/* track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          strokeWidth={strokeWidth}
          className={cn(
            'text-zinc-200/20 dark:text-zinc-700/40',
            trackClassName,
          )}
          stroke="currentColor"
          fill="transparent"
        />
        {/* indicator */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          strokeWidth={strokeWidth}
          className={cn(
            // subtle gradient feel using currentColor + rounded caps
            'text-emerald-500 transition-[stroke-dasharray] duration-700 ease-out',
            indicatorClassName,
          )}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          strokeDasharray={`${dash} ${c - dash}`}
        />
      </svg>

      {/* center content */}
      <div className="absolute inset-0 grid place-items-center">{children}</div>
    </div>
  );
}
