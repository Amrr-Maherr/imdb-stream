"use client";

import { useState } from "react";
import { Play, Subtitles, Volume2, Monitor } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

const qualityOptions = ["Auto", "1080p", "720p", "480p", "360p"];

const languages = [
  "English",
  "Arabic",
  "French",
  "Spanish",
  "German",
  "Japanese",
];

export function PlaybackSettings() {
  const [autoPlay, setAutoPlay] = useState(true);
  const [subtitles, setSubtitles] = useState(true);
  const [quality, setQuality] = useState("Auto");
  const [contentLang, setContentLang] = useState("English");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-foreground">Playback</h2>
        <p className="text-sm text-muted-foreground mt-0.5">
          Control your viewing experience
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Play className="size-4 text-brand" />
            Playback Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label
                htmlFor="autoplay"
                className="text-sm font-medium text-foreground"
              >
                Auto-play next episode
              </label>
              <p className="text-xs text-muted-foreground">
                Automatically play the next episode in a series
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
                Subtitles
              </label>
              <p className="text-xs text-muted-foreground">
                Show subtitles by default when available
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
            Video Quality
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
                {option}
              </button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Higher quality uses more data. Auto adjusts based on your connection.
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
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => setContentLang(lang)}
                className={cn(
                  "rounded-lg border px-3.5 py-2 text-sm font-medium transition-colors",
                  contentLang === lang
                    ? "border-brand bg-brand/10 text-brand"
                    : "border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {lang}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
