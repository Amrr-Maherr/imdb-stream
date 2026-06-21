import { getTranslations } from "next-intl/server";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "TvShows" });
  return { title: t("title") };
}

export default async function TvShowsPage() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-background pt-16">
      <main className="app-container flex flex-1 flex-col items-center py-16">
        <h1 className="text-3xl font-bold text-foreground">TV Shows</h1>
      </main>
    </div>
  );
}
