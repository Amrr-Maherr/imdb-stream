"use client";

import { useState } from "react";
import { Palette, Sun, Moon, Monitor, Globe, Languages } from "lucide-react";
import { useTheme } from "next-themes";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/utils/utils";

const themeOptions = [
  { value: "light" as const, label: "Light", icon: Sun },
  { value: "dark" as const, label: "Dark", icon: Moon },
  { value: "system" as const, label: "System", icon: Monitor },
];

const languages = [
  { code: "en", label: "English" },
  { code: "ar", label: "Arabic" },
];

export function PreferencesSettings() {
  const { theme, setTheme } = useTheme();
  const [language, setLanguage] = useState("en");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-foreground">Preferences</h2>
        <p className="text-sm text-muted-foreground mt-0.5">
          Customize your experience
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Palette className="size-4 text-brand" />
            Theme
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            {themeOptions.map(({ value, label, icon: Icon }) => (
              <button
                key={value}
                onClick={() => setTheme(value)}
                className={cn(
                  "flex flex-1 items-center justify-center gap-2 rounded-lg border px-4 py-3 text-sm font-medium transition-colors",
                  theme === value
                    ? "border-brand bg-brand/10 text-brand"
                    : "border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <Icon className="size-4" />
                {label}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Globe className="size-4 text-brand" />
            Language
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {languages.map(({ code, label }) => (
              <button
                key={code}
                onClick={() => setLanguage(code)}
                className={cn(
                  "flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors",
                  language === code
                    ? "border-brand bg-brand/10 text-brand"
                    : "border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <Languages className="size-4" />
                {label}
              </button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Language selection changes the interface language. Content language
            can be set in Playback settings.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
