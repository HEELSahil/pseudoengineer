'use client';

import { FileBadge2, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export type Certification = {
  id: string;
  title: string;
  issuer: string;
  issuedOn?: string;
  url?: string;
  status?: 'in-progress' | 'completed';
};

export default function CertificationsList({
  certs,
}: {
  certs: Certification[];
}) {
  if (!certs?.length) {
    return (
      <div className="rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700 p-6 text-center">
        <FileBadge2 className="mx-auto mb-2 h-6 w-6 text-zinc-400" />
        <div className="text-sm text-zinc-500">
          No certifications yet — coming soon 📜
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {certs.map((c) => (
        <div
          key={c.id}
          className="rounded-xl px-4 py-3 border border-white/50 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur hover:bg-white/80 dark:hover:bg-white/10 transition-colors flex items-center justify-between gap-3"
        >
          <div className="min-w-0">
            <div className="text-sm font-semibold truncate">{c.title}</div>
            <div className="text-xs text-zinc-500">
              {c.issuer}
              {c.issuedOn
                ? ` • ${new Date(c.issuedOn).toLocaleDateString()}`
                : ''}
              {c.status
                ? ` • ${c.status === 'completed' ? 'Completed' : 'In progress'}`
                : ''}
            </div>
          </div>

          {c.url ? (
            <Link
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-sky-600 dark:text-sky-400 hover:underline"
            >
              Verify <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          ) : null}
        </div>
      ))}
    </div>
  );
}
