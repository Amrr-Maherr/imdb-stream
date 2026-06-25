"use client";

import { useState } from "react";
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

const navItems: { id: SectionId; label: string; icon: typeof User }[] = [
  { id: "account", label: "Account", icon: User },
  { id: "preferences", label: "Preferences", icon: Palette },
  { id: "playback", label: "Playback", icon: Play },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "privacy", label: "Privacy & Security", icon: Shield },
  { id: "app", label: "App Info", icon: Info },
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
  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:gap-10">
      <nav className="lg:w-56 shrink-0">
        <div className="flex items-center gap-2 mb-6">
          <Settings2 className="size-5 text-brand" />
          <h1 className="text-xl font-bold text-foreground">Settings</h1>
        </div>
        <div className="flex flex-row gap-1 overflow-x-auto lg:flex-col lg:gap-0.5 pb-2 lg:pb-0">
          {navItems.map(({ id, label, icon: Icon }) => (
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
              {label}
            </button>
          ))}
        </div>
      </nav>
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}
