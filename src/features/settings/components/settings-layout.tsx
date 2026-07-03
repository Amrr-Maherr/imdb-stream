"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/shared/utils/utils";
import {
  User,
  Palette,
  Play,
  Bell,
  Shield,
  Info,
  Settings2,
} from "lucide-react";

export type SectionId =
  | "account"
  | "preferences"
  | "playback"
  | "notifications"
  | "privacy"
  | "app";

const navItems: { id: SectionId; icon: typeof User }[] = [
  { id: "account", icon: User },
  { id: "preferences", icon: Palette },
  { id: "playback", icon: Play },
  { id: "notifications", icon: Bell },
  { id: "privacy", icon: Shield },
  { id: "app", icon: Info },
];

type SettingsLayoutProps = {
  children: React.ReactNode;
  activeSection: SectionId;
  onSectionChange: (section: SectionId) => void;
};

export function SettingsLayout({
  children,
  activeSection,
  onSectionChange,
}: SettingsLayoutProps) {
  const t = useTranslations("Settings");
  const tNav = useTranslations("Settings.nav");

  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:gap-10">
      <nav className="lg:w-56 shrink-0">
        <div className="flex items-center gap-2 mb-6">
          <Settings2 className="size-5 text-brand" />
          <h1 className="text-xl font-bold text-foreground">{t("title")}</h1>
        </div>
        <div className="flex flex-row gap-1 overflow-x-auto lg:flex-col lg:gap-0.5 pb-2 lg:pb-0">
          {navItems.map(({ id, icon: Icon }) => (
            <button
              key={id}
              onClick={() => onSectionChange(id)}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium whitespace-nowrap transition-colors",
                activeSection === id
                  ? "bg-brand/10 text-brand"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <Icon className="size-4 shrink-0" />
              {tNav(id)}
            </button>
          ))}
        </div>
      </nav>
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}
