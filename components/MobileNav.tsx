'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import {
  Menu,
  LogOut,
  Settings,
  User,
  BookOpen,
  FileText,
  Info,
  Mail,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import headerNavLinks from '@data/headerNavLinks';

const iconFor = (title: string) => {
  const t = title.toLowerCase();
  if (t.includes('course')) return <BookOpen className="h-4 w-4 mr-2" />;
  if (t.includes('note')) return <FileText className="h-4 w-4 mr-2" />;
  if (t.includes('about')) return <Info className="h-4 w-4 mr-2" />;
  if (t.includes('contact')) return <Mail className="h-4 w-4 mr-2" />;
  return null;
};

export default function MobileMenuDropdown() {
  const { status } = useSession();
  const authed = status === 'authenticated';

  return (
    <div className="sm:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          side="bottom"
          sideOffset={20}
          collisionPadding={16}
          className="w-64 py-2 space-y-1 bg-white/80 dark:bg-gray-900/90 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 shadow-sm rounded-xl"
        >
          <DropdownMenuGroup>
            {headerNavLinks.map((link) => (
              <DropdownMenuItem key={link.title} asChild className="py-2">
                <Link
                  href={link.href}
                  className="flex items-center text-gray-900 dark:text-gray-100"
                >
                  {iconFor(link.title)}
                  {link.title}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>

          {authed && (
            <>
              <DropdownMenuSeparator className="my-2 h-px bg-zinc-200 dark:bg-zinc-700" />
              <DropdownMenuLabel className="text-xs uppercase tracking-wide text-zinc-500">
                Account
              </DropdownMenuLabel>

              <DropdownMenuItem asChild className="py-2">
                <Link href="/profile" className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild className="py-2">
                <Link href="/settings" className="flex items-center">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator className="my-2 h-px bg-zinc-200 dark:bg-zinc-700" />

              <DropdownMenuItem
                onClick={() => signOut({ callbackUrl: '/' })}
                className="py-2 text-red-600 focus:text-red-600 cursor-pointer"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Log out
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
