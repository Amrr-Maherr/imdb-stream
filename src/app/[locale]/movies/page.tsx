import {
  DesktopFilters,
  MobileBar,
} from "@/features/movies/components/filters/movies-filters";
import GetMovies from "@/features/movies/services/getMovies";
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
  const data = await GetMovies({
    page: 1,
  });
  console.log(data.results);

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-background pt-16">
      <main className="app-container flex flex-1 flex-col items-center py-16">
        <div className="hidden md:block w-full">
          <DesktopFilters />
        </div>
        <div className="md:hidden w-full">
          <MobileBar />
        </div>
        <h1 className="text-3xl font-bold text-foreground">Movies</h1>
        {data?.results?.map((ele) => {
          return <p key={ele.id}>{ele.title}</p>;
        })}
      </main>
    </div>
  );
}
