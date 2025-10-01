'use client';

import { Lock, Award, Medal, Star } from 'lucide-react';

export type Badge = {
  id: string;
  name: string;
  caption?: string;
  icon?: 'award' | 'medal' | 'star';
  earned?: boolean;
  comingSoon?: boolean;
};

const ICONS = {
  award: Award,
  medal: Medal,
  star: Star,
};

export default function BadgesGrid({ badges }: { badges: Badge[] }) {
  if (!badges?.length) {
    return (
      <div className="text-sm text-zinc-500">
        No badges yet — keep solving! 🚀
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {badges.map((b) => {
        const Icon = ICONS[b.icon ?? 'award'];
        const locked = !b.earned;
        return (
          <div
            key={b.id}
            className={`
              relative rounded-xl p-4 border
              ${locked ? 'border-zinc-200/50 dark:border-zinc-800/60' : 'border-emerald-400/30'}
              bg-white/50 dark:bg-white/5 backdrop-blur
              hover:bg-white/70 dark:hover:bg-white/10 transition-colors
            `}
          >
            {/* Coming soon ribbon */}
            {b.comingSoon && (
              <span className="absolute -top-2 -right-2 text-[10px] px-2 py-0.5 rounded-full bg-amber-500 text-white shadow">
                Soon
              </span>
            )}

            {/* Icon circle */}
            <div
              className={`
                h-12 w-12 rounded-full grid place-items-center mb-3 shadow
                ${locked ? 'bg-zinc-200 dark:bg-zinc-800' : 'bg-emerald-500/15 border border-emerald-500/30'}
              `}
            >
              {locked ? (
                <Lock className="h-5 w-5 text-zinc-500" />
              ) : (
                <Icon className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              )}
            </div>

            <div className="space-y-0.5">
              <div
                className={`text-sm font-semibold ${locked ? 'text-zinc-500' : ''}`}
              >
                {b.name}
              </div>
              {b.caption && (
                <div className="text-xs text-zinc-500 line-clamp-2">
                  {b.caption}
                </div>
              )}
            </div>

            {/* Overlay for locked badges to dim slightly */}
            {locked && !b.comingSoon && (
              <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-b from-transparent to-black/0" />
            )}
          </div>
        );
      })}
    </div>
  );
}
