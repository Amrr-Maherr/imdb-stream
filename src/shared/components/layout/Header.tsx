'use client';

import { useEffect, useState } from 'react';
import { Bookmark, Heart, Menu, Settings, User, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Logo from './Logo';
import NavLinks from './NavLinks';
import SearchBar from './SearchBar';
import UserMenu from './UserMenu';
import LanguageSwitcher from '@/shared/components/ui/language-switcher';
import ThemeToggle from '@/shared/components/ui/theme-toggle';
import { Button } from '@/shared/components/ui/button';
import { useAuth } from '@/shared/provider/authProvider';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/shared/components/ui/drawer';
import { cn } from '@/shared/utils/utils';

export default function Header() {
  const t = useTranslations('Header');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { user, loading, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setMobileMenuOpen(false);

  const accountLinks = [
    { href: '/profile', label: t('nav.profile'), icon: User },
    { href: '/watchlist', label: t('nav.watchlist'), icon: Bookmark },
    { href: '/favorites', label: t('nav.favorites'), icon: Heart },
    { href: '/settings', label: t('nav.settings'), icon: Settings },
  ];

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
        scrolled
          ? 'border-b border-border/50 bg-background/80 shadow-sm backdrop-blur-md'
          : 'bg-background/0'
      )}
    >
      <div className="app-container relative flex h-16 items-center gap-4">
        <Logo />

        <NavLinks />

        <div className="ms-auto flex items-center gap-1 md:gap-2">
          <SearchBar open={searchOpen} onToggle={() => setSearchOpen((p) => !p)} />

          <div className="hidden items-center gap-1 md:flex md:gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>

          {!loading && user && <UserMenu />}

          {!loading && !user && (
            <Button asChild variant="outline" size="sm" className="hidden md:inline-flex">
              <Link href="/auth/signin">{t('signIn')}</Link>
            </Button>
          )}

          <Drawer open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <DrawerTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
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
