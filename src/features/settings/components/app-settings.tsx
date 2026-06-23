"use client";

import {
  Info,
  HardDrive,
  Smartphone,
  ExternalLink,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AppSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-foreground">App Info</h2>
        <p className="text-sm text-muted-foreground mt-0.5">
          About the application
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Info className="size-4 text-brand" />
            About
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between rounded-lg border border-border px-4 py-3">
            <span className="text-sm text-muted-foreground">Version</span>
            <span className="text-sm font-medium text-foreground">2.4.1</span>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-border px-4 py-3">
            <span className="text-sm text-muted-foreground">Build</span>
            <span className="text-sm font-medium text-foreground">
              2026.06.23
            </span>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-border px-4 py-3">
            <span className="text-sm text-muted-foreground">Environment</span>
            <span className="inline-flex items-center rounded-full bg-green-500/10 px-2.5 py-0.5 text-xs font-medium text-green-600 dark:text-green-400">
              Production
            </span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <HardDrive className="size-4 text-brand" />
            Storage
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-border px-4 py-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">
                Cache & data
              </span>
              <span className="text-sm font-medium text-foreground">
                128 MB
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-brand"
                style={{ width: "12%" }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Minimal cached data stored locally for performance
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Smartphone className="size-4 text-brand" />
            Platform
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between rounded-lg border border-border px-4 py-3">
            <span className="text-sm text-muted-foreground">
              Device
            </span>
            <span className="text-sm font-medium text-foreground">
              Web Browser
            </span>
          </div>
          <a
            href="#"
            className="mt-3 flex items-center justify-between rounded-lg border border-border px-4 py-3 text-sm transition-colors hover:bg-muted"
          >
            <span className="text-muted-foreground">Licenses</span>
            <span className="flex items-center gap-1 text-foreground">
              Open Source
              <ExternalLink className="size-3 text-muted-foreground" />
            </span>
          </a>
        </CardContent>
      </Card>
    </div>
  );
}
