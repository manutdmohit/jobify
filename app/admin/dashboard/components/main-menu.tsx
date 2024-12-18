import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import MenuItem from './menu-item';
import MenuTitle from './menu-title';
import Link from 'next/link';
import { LightDarkToggle } from '@/components/ui/light-dark-toggle';
import { cn } from '@/lib/utils';

export default function MainMenu({ className }: { className?: String }) {
  return (
    <nav
      className={cn('md:bg-muted overflow-auto p-4 flex flex-col', className)}
    >
      <header className="hidden md:block border-b dark:border-b-black border-b-zinc-300 pb-4">
        <MenuTitle />
      </header>
      <ul className="py-4 grow">
        <MenuItem href="/admin/dashboard">My dashboard</MenuItem>
        <MenuItem href="/admin/dashboard/schools">Schools</MenuItem>
        <MenuItem href="/admin/dashboard/tutors">Tutors</MenuItem>
        <MenuItem href="/admin/dashboard/institutions">Institutions</MenuItem>
        <MenuItem href="/admin/dashboard/account">Account</MenuItem>
        <MenuItem href="/admin/dashboard/settings">Settings</MenuItem>
      </ul>
      <footer className="flex gap-2 items-center">
        <Avatar>
          <AvatarFallback className="bg-pink-300 dark:bg-pink-300">
            MS
          </AvatarFallback>
        </Avatar>
        <Link href="/" className="hover:underline">
          Logout
        </Link>
        <LightDarkToggle className="ml-auto" />
      </footer>
    </nav>
  );
}
