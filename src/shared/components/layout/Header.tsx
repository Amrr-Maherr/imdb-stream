"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import SearchBar from "./SearchBar";
import UserMenu from "./UserMenu";
import LanguageSwitcher from "@/shared/components/ui/language-switcher";
import ThemeToggle from "@/shared/components/ui/theme-toggle";
import { Button } from "@/shared/components/ui/button";
import { useAuth } from "@/shared/provider/authProvider";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/shared/components/ui/drawer";
export default function Header() {
  const t = useTranslations("Header");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const { user, loading, logout } = useAuth();

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border/50 bg-background/80 shadow-md backdrop-blur-md"
          : "bg-background/0"
      }`}
    >
      <div className="app-container flex h-16 items-center gap-4">
        <Logo />

        <NavLinks />

        <div className="flex items-center gap-1 ms-auto md:gap-2">
          <SearchBar
            open={searchOpen}
            onToggle={() => setSearchOpen((p) => !p)}
          />

          <div className="hidden items-center gap-1 md:flex md:gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>

          {!loading &&
            (user ? (
              <>
                <Button
                  onClick={logout}
                  variant="outline"
                  size="sm"
                  className="hidden md:inline-flex"
                >
                  {t("signOut")}
                </Button>

                <UserMenu />
              </>
            ) : (
              <Button
                asChild
                variant="outline"
                size="sm"
                className="hidden md:inline-flex"
              >
                <Link href="/auth/signin">{t("signIn")}</Link>
              </Button>
            ))}

          <Drawer
            open={mobileMenuOpen}
            onOpenChange={setMobileMenuOpen}
          >
            <DrawerTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label={t("toggleMenu")}
              >
                {mobileMenuOpen ? (
                  <X className="size-5" />
                ) : (
                  <Menu className="size-5" />
                )}
              </Button>
            </DrawerTrigger>
            <DrawerContent className="p-0">
              <DrawerHeader className="border-b border-border px-5 py-3.5">
                <DrawerTitle className="text-base font-semibold">
                  Menu
                </DrawerTitle>
              </DrawerHeader>
              <div className="space-y-4 px-5 py-4">
                <NavLinks mobile />
                <div className="flex flex-col gap-2 border-t border-border pt-4">
                  {user ? (
                    <Button
                      onClick={logout}
                      variant="outline"
                      className="w-full"
                    >
                      {t("signOut")}
                    </Button>
                  ) : (
                    <Button asChild variant="outline" className="w-full">
                      <Link href="/auth/signin">{t("signIn")}</Link>
                    </Button>
                  )}
                  <div className="flex items-center gap-2">
                    <LanguageSwitcher />
                    <ThemeToggle />
                  </div>
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </header>
  );
}
