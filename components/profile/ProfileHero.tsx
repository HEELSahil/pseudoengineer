'use client';

import Link from 'next/link';

import {
  Mail,
  Phone,
  Globe,
  Pencil,
  Linkedin,
  Award,
  Globe2,
} from 'lucide-react';

type Props = {
  name: string;
  email: string;
  image?: string;
  phone?: string;
  country?: string;
  linkedin?: string;
  portfolio?: string;
  rank?: string;
};

export default function ProfileHero({
  name,
  email,
  image,
  phone,
  country,
  linkedin,
  portfolio,
  rank,
}: Props) {
  const initials = (
    name?.trim()?.[0] ??
    email?.trim()?.[0] ??
    'U'
  ).toUpperCase();

  return (
    <div className="relative overflow-hidden rounded-xl border border-white/10 dark:border-white/10 bg-white/5 bg-white dark:bg-zinc-900/20 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-6">
      <div className="flex items-center gap-5">
        <div className="h-20 w-20 rounded-xl grid place-items-center bg-gradient-to-br from-lime-500 to-emerald-500 text-white text-3xl font-semibold ring-4 ring-white dark:ring-zinc-900 shadow-lg">
          {initials}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h4 className="text-lg font-semibold tracking-tight truncate">
                {name}
              </h4>
              {rank && (
                <div className="mt-1 inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-100/60 dark:bg-amber-500/10 text-amber-800 dark:text-amber-300 px-2.5 py-0.5 text-xs font-medium">
                  <Award className="h-3.5 w-3.5" />
                  <span className="truncate">{rank}</span>
                </div>
              )}
            </div>

            <Link
              href="/settings"
              className="hidden sm:inline-flex items-center gap-2 rounded-full border border-zinc-200/50 dark:border-zinc-700/60 bg-white/60 dark:bg-white/5 px-1.5 py-1.5 text-sm font-medium hover:bg-white/80 dark:hover:bg-white/10 transition-colors"
              title="Edit Profile"
            >
              <Pencil className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Contact list */}
      <ul className="mt-6 space-y-4 text-sm">
        {email && (
          <li className="flex items-center gap-3">
            <Mail className="h-4 w-4 opacity-70" />
            <span className="font-medium">{email}</span>
          </li>
        )}
        {phone && (
          <li className="flex items-center gap-3">
            <Phone className="h-4 w-4 opacity-70" />
            <span className="font-medium">{phone}</span>
          </li>
        )}
        {country && (
          <li className="flex items-center gap-3">
            <Globe className="h-4 w-4 opacity-70" />
            <span className="font-medium">{country}</span>
          </li>
        )}
        {linkedin && (
          <li className="flex items-center gap-3">
            <Linkedin className="h-4 w-4 opacity-70" />
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:underline"
            >
              {linkedin}
            </a>
          </li>
        )}
        {portfolio && (
          <li className="flex items-center gap-3">
            <Globe2 className="h-4 w-4 opacity-70" />
            <a
              href={portfolio}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:underline"
            >
              {portfolio}
            </a>
          </li>
        )}
      </ul>
    </div>
  );
}
