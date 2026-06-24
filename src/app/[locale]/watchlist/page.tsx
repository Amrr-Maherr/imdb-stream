"use client";

import { useLocale } from "next-intl";

export default function WatchlistPage() {
  const locale = useLocale();

  return (
    <div className="app-container py-12">
      <h1 className="text-2xl font-bold">Watchlist</h1>
      <p className="mt-4 text-sm text-muted-foreground">
        {locale === "ar" ? "قائمة المشاهدة سيتم إضافتها لاحقًا." : "Watchlist will be available in a future update."}
      </p>
    </div>
  );
}
