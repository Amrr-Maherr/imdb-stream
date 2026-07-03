"use client";

import { useTranslations } from "next-intl";

export default function Copyright() {
  const t = useTranslations("Footer");
  const year = new Date().getFullYear();

  return (
    <div className="border-t border-border px-4 py-4 md:px-8">
      <p className="text-center text-xs text-muted-foreground">
        {t("copyright", { year })}
      </p>
    </div>
  );
}
