'use client';

import { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

const SeriesCompletionTracker = ({ total, completed }) => {
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
  const hasCelebrated = useRef(false);

  useEffect(() => {
    if (percent === 100 && !hasCelebrated.current) {
      hasCelebrated.current = true;
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
      });
    }

    if (percent < 100) {
      hasCelebrated.current = false;
    }
  }, [percent]);

  return (
    <div className="mb-6 w-full max-w-md rounded-md border border-t-4 border-b-4 border-zinc-200 dark:border-zinc-700 px-6 py-4 shadow-lg bg-white dark:bg-zinc-900 transition-shadow">
      <p className="text-sm text-gray-700 dark:text-gray-300 mb-2 font-medium flex justify-between items-center">
        <span>
          Your Progress:{' '}
          <span className="text-black dark:text-white font-bold">
            {completed}
          </span>
          <span className="text-gray-500 dark:text-gray-400"> / {total}</span>
        </span>
        <span className="text-emerald-600 dark:text-emerald-400 font-bold">
          {percent}% complete
        </span>
      </p>
      <div className="w-full h-2.5 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-emerald-600 dark:bg-emerald-500 transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};

export default SeriesCompletionTracker;
