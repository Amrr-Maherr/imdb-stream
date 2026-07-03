import type { Metadata } from "next";
import { ErrorState } from "@/shared/components/error-state";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("ErrorState");
  return { title: t("pageNotFound") };
}

export default async function NotFound() {
  const t = await getTranslations("ErrorState");
  return (
    <ErrorState
      title={t("pageNotFound")}
      description={t("pageNotFoundDesc")}
      actionLabel={t("goHome")}
      actionHref="/"
    />
  );
}
