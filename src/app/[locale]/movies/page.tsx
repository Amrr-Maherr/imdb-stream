import { getTranslations } from "next-intl/server";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Movies" });
  return { title: t("title") };
}

export default async function MoviesPage() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-background pt-16">
      <main className="flex flex-1 w-full max-w-7xl flex-col items-center py-16 px-4 md:px-8">
        <h1 className="text-3xl font-bold text-foreground">Movies</h1>
      </main>
    </div>
  );
}
