import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { AlertCircle } from "lucide-react";
import { fetchApi } from "@/shared/services/fetchApi";
import type { TMDBCollectionDetails } from "@/shared/types/tmdb";
import { CollectionHero } from "@/features/collection/components/collection-hero";
import { CollectionMainContent } from "@/features/collection/components/collection-main-content";
import { CollectionSidebar } from "@/features/collection/components/collection-sidebar";

interface Props {
  params: Promise<{ locale: string; slug: string; id: string }>;
}

async function getCollection(id: string) {
  return fetchApi<TMDBCollectionDetails>({
    endpoint: `collection/${id}`,
    revalidate: 3600,
  });
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  try {
    const collection = await getCollection(id);
    return {
      title: collection.name,
      description: collection.overview?.slice(0, 160),
    };
  } catch {
    return { title: "Collection" };
  }
}

export default async function CollectionPage({ params }: Props) {
  const { id, locale } = await params;
  const t = await getTranslations({ locale, namespace: "Collection" });

  let collection: TMDBCollectionDetails;
  try {
    collection = await getCollection(id);
  } catch {
    return (
      <div className="flex flex-1 flex-col items-center justify-center bg-background p-8">
        <div className="flex flex-col items-center gap-4 text-center max-w-md">
          <AlertCircle className="size-12 text-muted-foreground" />
          <h1 className="text-2xl font-bold text-foreground">
            {t("notFound")}
          </h1>
          <p className="text-muted-foreground">{t("notFoundDescription")}</p>
          <Link
            href="/"
            className="mt-2 inline-flex items-center gap-2 rounded-lg bg-foreground px-5 py-2.5 text-sm font-semibold text-background hover:bg-foreground/90 transition-all"
          >
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  const parts = collection.parts ?? [];
  const years = parts
    .map((p) => p.release_date?.slice(0, 4))
    .filter(Boolean) as string[];
  const sortedYears = years.sort();
  const releaseRange =
    sortedYears.length > 0
      ? sortedYears[0] === sortedYears[sortedYears.length - 1]
        ? sortedYears[0]
        : `${sortedYears[0]} - ${sortedYears[sortedYears.length - 1]}`
      : null;
  const avgRating =
    parts.length > 0
      ? parts.reduce((sum, p) => sum + p.vote_average, 0) / parts.length
      : 0;

  return (
    <div className="flex flex-col flex-1 bg-background">
      <CollectionHero
        backdropPath={collection.backdrop_path}
        posterPath={collection.poster_path}
        name={collection.name}
        partsCount={parts.length}
        releaseRange={releaseRange}
        avgRating={avgRating}
      />

      <div className="w-full mx-auto app-container mt-8 md:mt-10 pb-16 space-y-8">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">
          <CollectionMainContent
            name={collection.name}
            overview={collection.overview}
            parts={parts}
          />
          <CollectionSidebar
            partsCount={parts.length}
            releaseRange={releaseRange}
            avgRating={avgRating}
            parts={parts}
          />
        </div>
      </div>
    </div>
  );
}
