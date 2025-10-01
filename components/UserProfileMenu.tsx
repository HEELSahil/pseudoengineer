'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { ChevronDown, LogOut, Settings, User as UserIcon } from 'lucide-react';

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function UserProfileMenu() {
  const { data: session, status } = useSession();

  if (status !== 'authenticated') return null;

  const user = session.user;
  const name = user?.name || user?.email || 'User';
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center lg:px-4 gap-2 rounded-full focus-visible:outline-none">
        <Avatar className="h-8 w-8 ring-0 outline-none">
          <AvatarImage src={user?.image ?? undefined} alt={name} />
          <AvatarFallback className="flex h-full w-full items-center justify-center rounded-full bg-zinc-200 dark:bg-zinc-700 text-xs font-semibold">
            {initials}
          </AvatarFallback>
        </Avatar>
        <ChevronDown
          className="h-4 w-4 opacity-80"
          aria-hidden="true"
          strokeWidth={3}
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-56 py-2 space-y-1 md:bg-white/80 md:dark:bg-gray-900/90 backdrop-blur-md md:backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 shadow-sm px-4 rounded-xl"
        side="bottom"
        sideOffset={20}
        collisionPadding={16}
        align="end"
      >
        <DropdownMenuLabel className="text-gray-700 dark:text-gray-200">
          My Account
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="my-2 h-px bg-zinc-200 dark:bg-zinc-700" />

        <DropdownMenuGroup>
          <DropdownMenuItem asChild className="py-2 cursor-pointer">
            <Link href="/profile" className="flex items-center">
              <UserIcon className="mr-2 h-4 w-4" />
              Profile
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem className="py-2">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="my-2 h-px bg-zinc-200 dark:bg-zinc-700" />

        <DropdownMenuItem
          onClick={() => signOut({ callbackUrl: '/' })}
          className="text-red-600 focus:text-red-600 cursor-pointer"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
