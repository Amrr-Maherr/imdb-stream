"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { Play, Subtitles, Volume2, Monitor } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Switch } from "@/shared/components/ui/switch";
import { cn } from "@/shared/utils/utils";

const qualityOptions = ["Auto", "1080p", "720p", "480p", "360p"];

const languageKeys = ["english", "arabic", "french", "spanish", "german", "japanese"];

export function PlaybackSettings() {
  const t = useTranslations("Settings.playback");
  const [autoPlay, setAutoPlay] = useState(true);
  const [subtitles, setSubtitles] = useState(true);
  const [quality, setQuality] = useState("Auto");
  const [contentLang, setContentLang] = useState("english");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-foreground">{t("heading")}</h2>
        <p className="text-sm text-muted-foreground mt-0.5">
          {t("description")}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Play className="size-4 text-brand" />
            {t("playbackSettings")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label
                htmlFor="autoplay"
                className="text-sm font-medium text-foreground"
              >
                {t("autoplay")}
              </label>
              <p className="text-xs text-muted-foreground">
                {t("autoplayDesc")}
              </p>
            </div>
            <Switch
              id="autoplay"
              checked={autoPlay}
              onCheckedChange={setAutoPlay}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label
                htmlFor="subtitles"
                className="text-sm font-medium text-foreground"
              >
                {t("captions")}
              </label>
              <p className="text-xs text-muted-foreground">
                {t("captionsDesc")}
              </p>
            </div>
            <Switch
              id="subtitles"
              checked={subtitles}
              onCheckedChange={setSubtitles}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Monitor className="size-4 text-brand" />
            {t("quality")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {qualityOptions.map((option) => (
              <button
                key={option}
                onClick={() => setQuality(option)}
                className={cn(
                  "rounded-lg border px-3.5 py-2 text-sm font-medium transition-colors",
                  quality === option
                    ? "border-brand bg-brand/10 text-brand"
                    : "border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {option === "Auto" ? t("auto") : option}
              </button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            {t("qualityDesc")}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Subtitles className="size-4 text-brand" />
            Default Content Language
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {languageKeys.map((key) => (
              <button
                key={key}
                onClick={() => setContentLang(key)}
                className={cn(
                  "rounded-lg border px-3.5 py-2 text-sm font-medium transition-colors",
                  contentLang === key
                    ? "border-brand bg-brand/10 text-brand"
                    : "border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {t(key)}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
