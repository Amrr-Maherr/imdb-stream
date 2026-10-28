'use client';

import { useCallback, useEffect, useState } from 'react';
import { Bookmark, Heart, Menu, Settings, User, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import Logo from './Logo';
import NavLinks from './NavLinks';
import SearchBar from './SearchBar';
import SearchTrigger from './SearchTrigger';
import UserMenu from './UserMenu';
import LanguageSwitcher from '@/shared/components/ui/language-switcher';
import ThemeToggle from '@/shared/components/ui/theme-toggle';
import { Button } from '@/shared/components/ui/button';
import { useAuth } from '@/shared/provider/authProvider';
import { useSearchShortcuts } from '@/shared/hooks/useSearchShortcuts';
import { hasHero } from '@/shared/utils/hero-routes';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/shared/components/ui/drawer';
import { cn } from '@/shared/utils/utils';

/** The header only becomes solid once the page has been scrolled past this offset. */
const SCROLL_THRESHOLD = 40;

export default function Header() {
  const t = useTranslations('Header');
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { user, loading, logout } = useAuth();

  /** Pages rendering a hero start with a transparent header. */
  const transparent = hasHero(pathname) && !scrolled;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openSearch = useCallback(() => setSearchOpen(true), []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);

  useSearchShortcuts(openSearch);

  const closeMenu = () => setMobileMenuOpen(false);

  const accountLinks = [
    { href: '/profile', label: t('nav.profile'), icon: User },
    { href: '/watchlist', label: t('nav.watchlist'), icon: Bookmark },
    { href: '/favorites', label: t('nav.favorites'), icon: Heart },
    { href: '/settings', label: t('nav.settings'), icon: Settings },
  ];

  return (
    <header
      data-header-state={transparent ? 'transparent' : 'solid'}
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-300',
        transparent
          ? 'border-transparent bg-transparent'
          : 'border-border/50 bg-background/90 shadow-sm backdrop-blur-xl'
      )}
    >
      {/* Keeps the white nav legible over bright artwork while the header is transparent */}
      <div
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute inset-x-0 top-0 -z-10 h-28 scrim-top transition-opacity duration-300',
          transparent ? 'opacity-100' : 'opacity-0'
        )}
      />

      <div className="app-container relative flex h-16 items-center gap-4">
        <Logo />

        <NavLinks transparent={transparent} />

        <div className="ms-auto flex items-center gap-1 md:gap-2">
          <SearchTrigger onOpen={openSearch} transparent={transparent} />

          <SearchBar open={searchOpen} onToggle={closeSearch} />

          <div className="hidden items-center gap-1 md:flex md:gap-2">
            <LanguageSwitcher transparent={transparent} />
            <ThemeToggle transparent={transparent} />
          </div>

          {!loading && user && <UserMenu transparent={transparent} />}

          {!loading && !user && (
            <Button
              asChild
              variant={transparent ? 'glass' : 'outline'}
              size="sm"
              className="hidden md:inline-flex"
            >
              <Link href="/auth/signin">{t('signIn')}</Link>
            </Button>
          )}

          <Drawer open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <DrawerTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  'md:hidden',
                  transparent && 'text-white hover:bg-white/15 hover:text-white'
                )}
                aria-label={t('toggleMenu')}
              >
                {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
              </Button>
            </DrawerTrigger>
            <DrawerContent className="p-0">
              <DrawerHeader className="border-b border-border px-5 py-3.5">
                <DrawerTitle className="text-base font-semibold">{t('drawerTitle')}</DrawerTitle>
              </DrawerHeader>
              <div className="space-y-4 overflow-y-auto px-5 py-4">
                <NavLinks mobile onNavigate={closeMenu} />

                {!loading && user && (
                  <div className="space-y-0.5 border-t border-border pt-3">
                    <p className="truncate px-3 pb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      {user.displayName || user.email || t('account')}
                    </p>
                    {accountLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={closeMenu}
                        className="flex items-center gap-2.5 rounded-md px-3 py-2 text-sm text-foreground transition-colors hover:bg-accent"
                      >
                        <link.icon className="size-4 text-muted-foreground" />
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-2 border-t border-border pt-4">
                  <LanguageSwitcher />
                  <ThemeToggle />
                </div>

                <div className="border-t border-border pt-4">
                  {user ? (
                    <Button
                      onClick={() => {
                        closeMenu();
                        logout();
                      }}
                      variant="outline"
                      className="w-full"
                    >
                      {t('signOut')}
                    </Button>
                  ) : (
                    <Button asChild className="w-full" onClick={closeMenu}>
                      <Link href="/auth/signin">{t('signIn')}</Link>
                    </Button>
                  )}
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </header>
  );
}
