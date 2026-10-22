'use client';

import { Bookmark, Heart, LogOut, Settings, User } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { Button } from '@/shared/components/ui/button';
import { useAuth } from '@/shared/provider/authProvider';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { cn } from '@/shared/utils/utils';

export default function UserMenu({ transparent }: { transparent?: boolean } = {}) {
  const t = useTranslations('Header');
  const router = useRouter();
  const { user, logout } = useAuth();

  const name = user?.displayName || user?.email || '';
  const initial = name.charAt(0).toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          aria-label={t('account')}
        >
          <span
            className={cn(
              'flex size-7 items-center justify-center rounded-full text-xs font-semibold',
              transparent
                ? 'bg-white/15 text-white backdrop-blur-sm ring-1 ring-white/30'
                : 'bg-muted text-foreground'
            )}
          >
            {initial || <User className="size-4 text-muted-foreground" />}
          </span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" sideOffset={8} className="w-56">
        {name && (
          <>
            <DropdownMenuLabel className="truncate">{name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
          </>
        )}

        <DropdownMenuItem onClick={() => router.push('/profile')}>
          <User className="size-4" />
          {t('nav.profile')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push('/settings')}>
          <Settings className="size-4" />
          {t('nav.settings')}
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => router.push('/watchlist')}>
          <Bookmark className="size-4" />
          {t('nav.watchlist')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push('/favorites')}>
          <Heart className="size-4" />
          {t('nav.favorites')}
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem variant="destructive" onClick={() => logout()}>
          <LogOut className="size-4" />
          {t('signOut')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
