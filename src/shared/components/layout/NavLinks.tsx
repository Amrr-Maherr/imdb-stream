'use client';

import type { ComponentProps } from 'react';
import { ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { cn } from '@/shared/utils/utils';

type NavChild = {
  href: ComponentProps<typeof Link>['href'];
  key: string;
};

type NavItem = {
  href: string;
  key: string;
  children?: NavChild[];
};

const links: NavItem[] = [
  { href: '/', key: 'home' },
  {
    href: '/movies',
    key: 'movies',
    children: [
      { href: '/movies', key: 'allMovies' },
      { href: { pathname: '/movies', query: { sort_by: 'popularity.desc' } }, key: 'popular' },
      {
        href: { pathname: '/movies', query: { sort_by: 'vote_average.desc' } },
        key: 'topRated',
      },
      {
        href: { pathname: '/movies', query: { sort_by: 'primary_release_date.desc' } },
        key: 'newReleases',
      },
    ],
  },
  {
    href: '/tv-shows',
    key: 'tvShows',
    children: [
      { href: '/tv-shows', key: 'allTvShows' },
      { href: { pathname: '/tv-shows', query: { sort_by: 'popularity.desc' } }, key: 'popular' },
      {
        href: { pathname: '/tv-shows', query: { sort_by: 'vote_average.desc' } },
        key: 'topRated',
      },
      {
        href: { pathname: '/tv-shows', query: { sort_by: 'first_air_date.desc' } },
        key: 'newReleases',
      },
    ],
  },
  { href: '/people', key: 'people' },
];

export default function NavLinks({
  mobile,
  onNavigate,
}: {
  mobile?: boolean;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const t = useTranslations('Header.nav');

  const isActive = (href: string) =>
    pathname === href || (href !== '/' && pathname.startsWith(`${href}/`));

  if (mobile) {
    return (
      <nav className="flex flex-col gap-1">
        {links.map((link) => (
          <div key={link.href}>
            <Link
              href={link.href}
              onClick={onNavigate}
              aria-current={pathname === link.href ? 'page' : undefined}
              className={cn(
                'block rounded-md px-3 py-2 text-sm font-medium transition-colors',
                isActive(link.href)
                  ? 'bg-accent text-foreground'
                  : 'text-foreground hover:bg-accent'
              )}
            >
              {t(link.key)}
            </Link>

            {link.children && (
              <div className="my-1 flex flex-col gap-0.5 border-s border-border ps-3">
                {link.children.map((child) => (
                  <Link
                    key={child.key}
                    href={child.href}
                    onClick={onNavigate}
                    className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  >
                    {t(child.key)}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    );
  }

  return (
    <nav className="hidden items-center gap-0.5 md:flex">
      {links.map((link) => {
        const active = isActive(link.href);
        const base = cn(
          'relative inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
          active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
        );

        if (link.children) {
          return (
            <DropdownMenu key={link.href}>
              <DropdownMenuTrigger asChild>
                <button type="button" className={base} aria-current={active ? 'page' : undefined}>
                  {t(link.key)}
                  <ChevronDown className="size-3.5 opacity-70" />
                  {active && (
                    <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-brand" />
                  )}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-52">
                {link.children.map((child) => (
                  <DropdownMenuItem key={child.key} asChild>
                    <Link href={child.href} className="cursor-pointer">
                      {t(child.key)}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          );
        }

        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={active ? 'page' : undefined}
            className={base}
          >
            {t(link.key)}
            {active && (
              <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-brand" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
