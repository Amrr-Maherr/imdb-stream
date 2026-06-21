"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "@/i18n/navigation";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import SearchBar from "./SearchBar";
import UserMenu from "./UserMenu";
import LanguageSwitcher from "@/components/ui/language-switcher";
import ThemeToggle from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border/50 bg-background/80 shadow-md backdrop-blur-md"
          : "bg-background/0"
      }`}
    >
      <div className="flex h-16 items-center gap-4 px-4 md:px-8">
        <Logo />

        <NavLinks />

        <div className="flex items-center gap-1 ml-auto md:gap-2">
          <SearchBar open={searchOpen} onToggle={() => setSearchOpen((p) => !p)} />

          <div className="hidden items-center gap-1 md:flex md:gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>

          <Link
            href="/auth/signin"
            className="hidden md:inline-flex items-center justify-center h-8 px-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg"
          >
            Sign In
          </Link>

          <UserMenu />

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen((p) => !p)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="space-y-4 border-t border-border bg-background px-4 py-4 md:hidden">
          <NavLinks mobile />
          <div className="flex flex-col gap-2 border-t border-border pt-4">
            <Link
              href="/auth/signin"
              className="flex items-center justify-center h-9 px-4 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg border border-border"
            >
              Sign In
            </Link>
            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
