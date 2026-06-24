"use client";

import { useLocale } from "next-intl";

export default function FavoritesPage() {
  const locale = useLocale();

  return (
    <div className="app-container py-12">
      <h1 className="text-2xl font-bold">Favorites</h1>
      <p className="mt-4 text-sm text-muted-foreground">
        {locale === "ar"
          ? "المفضلات سيتم إضافتها لاحقًا."
          : "Favorites will be available in a future update."}
      </p>
    </div>
  );
}
