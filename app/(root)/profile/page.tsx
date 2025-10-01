'use client';

import { useSession } from 'next-auth/react';
import ProfileHero from '@/components/profile/ProfileHero';
import RadialProgress from '@/components/ui/radial-progress';

import BadgesGrid, { Badge } from '@/components/profile/BadgesGrid';
import CertificationsList, {
  Certification,
} from '@/components/profile/CertificationsList';

export default function ProfilePage() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 animate-pulse">
          <div className="md:col-span-12 lg:col-span-4 min-w-0">
            <div className="h-64 rounded-xl bg-zinc-100 dark:bg-zinc-900" />
          </div>

          <div className="md:col-span-12 lg:col-span-8 space-y-6 min-w-0">
            <div className="h-40 rounded-xl bg-zinc-100 dark:bg-zinc-900" />
            <div className="h-40 rounded-xl bg-zinc-100 dark:bg-zinc-900" />
            <div className="h-40 rounded-xl bg-zinc-100 dark:bg-zinc-900" />
          </div>
        </div>
      </div>
    );
  }

  if (status !== 'authenticated') {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-semibold">
          Please sign in to view your profile.
        </h2>
      </div>
    );
  }

  const user = session.user;

  // 🔹 Temporary placeholders
  const phone = '+1 (555) 123-4567';
  const country = 'United States';
  const linkedin = 'https://linkedin.com/in/username';
  const portfolio = 'https://website.com';

  const courseData = [
    {
      id: 'c1',
      title: 'Data Structures & Algorithms',
      completed: 3,
      total: 10,
    },
    { id: 'c2', title: 'Next.js Mastery', completed: 7, total: 12 },
    { id: 'c3', title: 'TypeScript Essentials', completed: 4, total: 8 },
  ];

  const COLORS = [
    'text-emerald-500',
    'text-sky-500',
    'text-amber-500',
    'text-fuchsia-500',
    'text-rose-500',
  ];

  const courses = courseData.map((c, i) => {
    const pct = Math.round((c.completed / c.total) * 100);
    return { ...c, pct, color: COLORS[i % COLORS.length] };
  });

  const badges: Badge[] = [
    {
      id: 'b1',
      name: 'First Steps',
      caption: 'Completed your first task',
      icon: 'star',
      earned: true,
    },
    {
      id: 'b2',
      name: 'Video Learner',
      caption: 'Watched 10 videos',
      icon: 'award',
      earned: true,
    },
    {
      id: 'b3',
      name: 'Daily Streak',
      caption: '7-day streak',
      icon: 'medal',
      earned: false,
    },
    {
      id: 'b4',
      name: 'Problem Solver',
      caption: 'Solve 50 challenges',
      icon: 'star',
      earned: false,
    },
    {
      id: 'b5',
      name: 'Series Master',
      caption: 'Finish a full series',
      icon: 'award',
      earned: false,
      comingSoon: true,
    },
  ];

  const certs: Certification[] = [
    // Leave empty to see empty state
    // Example:
    {
      id: 'cf1',
      title: 'React Developer',
      issuer: 'PseudoEngineer',
      issuedOn: '2025-09-25',
      url: 'https://...',
      status: 'completed',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 pb-12">
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
        {/* LEFT column */}
        <div className="min-w-0 xl:col-span-4">
          <ProfileHero
            name={user?.name || user?.email || 'User'}
            email={user?.email || ''}
            image={user?.image || ''}
            phone={phone}
            country={country}
            linkedin={linkedin}
            portfolio={portfolio}
            rank="Bronze III"
          />
        </div>

        {/* RIGHT column */}
        <div className="min-w-0 xl:col-span-8 space-y-4">
          <GlassCard title="Course Progress">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {courses.map((c) => (
                <div key={c.id} className="flex items-center gap-3 min-w-0">
                  <RadialProgress
                    value={c.pct}
                    size={72}
                    strokeWidth={8}
                    indicatorClassName={c.color}
                    trackClassName="text-zinc-200/40 dark:text-zinc-700/50"
                  >
                    <span className="text-xs font-semibold tabular-nums">
                      {c.pct}%
                    </span>
                  </RadialProgress>
                  <div className="min-w-0">
                    <div className="text-sm font-medium truncate">
                      {c.title}
                    </div>
                    <div className="text-xs text-zinc-500">
                      {c.completed}/{c.total} done
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard title="My Badges">
            <BadgesGrid badges={badges} />
          </GlassCard>

          <GlassCard title="My Certifications">
            <CertificationsList certs={certs} />
          </GlassCard>
        </div>
      </div>
    </div>
  );
}

/** Helper for consistent glass cards on the right */
function GlassCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-white/10 dark:border-white/10 bg-white/5 dark:bg-zinc-900/20 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
      <div className="px-5 sm:px-6 py-4 border-b border-white/10">
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <div className="px-5 sm:px-6 py-5">{children}</div>
    </div>
  );
}
