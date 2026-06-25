import Image from "next/image";
import type { TMDBEpisodeDetails } from "@/shared/types/tmdb";
import { Users, Film, Monitor, Link2 } from "lucide-react";
import { MovieSection } from "@/features/movies/components/detail/movie-section";
import { MovieVideos } from "@/features/movies/components/detail/movie-videos";
import { MovieExternalLinks } from "@/features/movies/components/detail/movie-external-links";
import { CastCard } from "@/features/movies/components/detail/cast-card";
import { FadeIn } from "@/features/movies/components/detail/fade-in";
import { Slider } from "@/shared/components/ui/slider";

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";

type EpisodeMainContentProps = {
  ep: TMDBEpisodeDetails;
};

function getDirector(crew: TMDBEpisodeDetails["crew"]) {
  return crew.find((m) => m.job === "Director") ?? null;
}

function getWriters(crew: TMDBEpisodeDetails["crew"]) {
  return crew.filter(
    (m) => m.job === "Writer" || m.job === "Screenplay" || m.job === "Teleplay",
  );
}

function getProducers(crew: TMDBEpisodeDetails["crew"]) {
  return crew.filter(
    (m) => m.job === "Producer" || m.job === "Executive Producer",
  );
}

function groupCrewByDepartment(crew: TMDBEpisodeDetails["crew"]) {
  const priority = [
    "Directing",
    "Writing",
    "Production",
    "Camera",
    "Sound",
    "Art",
    "Editing",
    "Costume & Make-Up",
    "Visual Effects",
  ];
  const groups = new Map<string, typeof crew>();
  for (const m of crew) {
    const dept = m.department || "Other";
    if (!groups.has(dept)) groups.set(dept, []);
    groups.get(dept)!.push(m);
  }
  return priority
    .map((d) => [d, groups.get(d)] as const)
    .filter(([, v]) => v && v.length > 0) as [string, typeof crew][];
}

export function EpisodeMainContent({ ep }: EpisodeMainContentProps) {
  const stills = ep.images?.stills ?? [];
  const videos = ep.videos?.results ?? [];
  const director = getDirector(ep.crew);
  const writers = getWriters(ep.crew);
  const producers = getProducers(ep.crew);

  const externalIds = ep.external_ids
    ? {
        imdb_id: ep.external_ids.imdb_id,
        facebook_id: null as string | null,
        instagram_id: null as string | null,
        twitter_id: null as string | null,
        wikidata_id: null as string | null,
      }
    : null;

  return (
    <div className="flex-1 min-w-0 space-y-10">
      <FadeIn>
        <section>
          {ep.overview && (
            <p className="text-muted-foreground leading-relaxed">
              {ep.overview}
            </p>
          )}

          <div className="flex flex-wrap gap-x-6 gap-y-1 mt-4 text-sm text-muted-foreground">
            {director && (
              <p>
                <span className="font-medium text-foreground">Director:</span>{" "}
                {director.name}
              </p>
            )}
            {writers.length > 0 && (
              <p>
                <span className="font-medium text-foreground">
                  Writer{writers.length > 1 ? "s" : ""}:
                </span>{" "}
                {writers.map((w) => w.name).join(", ")}
              </p>
            )}
            {producers.length > 0 && (
              <p>
                <span className="font-medium text-foreground">
                  Producer{producers.length > 1 ? "s" : ""}:
                </span>{" "}
                {producers.map((p) => p.name).join(", ")}
              </p>
            )}
          </div>
        </section>
      </FadeIn>

      {ep.guest_stars.length > 0 && (
        <FadeIn delay={0.05}>
          <MovieSection title="Guest Stars" icon={<Users className="size-5" />}>
            <Slider
              slidesPerView={6}
              slidesMobilePerView={3}
              spaceBetween={16}
              grabCursor
              freeMode
              className="-mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 pb-8"
            >
              {ep.guest_stars.map((star) => (
                <CastCard
                  key={star.credit_id}
                  name={star.name}
                  character={star.character}
                  profilePath={star.profile_path}
                  creditId={star.credit_id}
                />
              ))}
            </Slider>
          </MovieSection>
        </FadeIn>
      )}

      {ep.crew.length > 0 && (
        <FadeIn delay={0.1}>
          <MovieSection title="Crew" icon={<Monitor className="size-5" />}>
            {groupCrewByDepartment(ep.crew).map(([dept, members]) => (
              <div key={dept} className="mb-4 last:mb-0">
                <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-2">
                  {dept}
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {members.slice(0, 6).map((m) => (
                    <div key={m.credit_id} className="text-sm text-foreground">
                      <p className="font-medium truncate">{m.name}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        {m.job}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </MovieSection>
        </FadeIn>
      )}

      {videos.length > 0 && (
        <FadeIn delay={0.15}>
          <MovieVideos videos={videos} />
        </FadeIn>
      )}

      {stills.length > 0 && (
        <FadeIn delay={0.2}>
          <MovieSection
            title="Episode Images"
            icon={<Film className="size-5" />}
          >
            <Slider
              slidesPerView={3}
              slidesMobilePerView={1.5}
              spaceBetween={12}
              grabCursor
              freeMode
              className="-mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 pb-8"
            >
              {stills.map((img) => (
                <div
                  key={img?.file_path}
                  className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted"
                >
                  <Image
                    src={`${TMDB_IMAGE_BASE}/w500${img?.file_path}`}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 75vw, 33vw"
                  />
                </div>
              ))}
            </Slider>
          </MovieSection>
        </FadeIn>
      )}

      {externalIds && (
        <FadeIn delay={0.25}>
          <MovieSection
            title="External Links"
            icon={<Link2 className="size-5" />}
          >
            <MovieExternalLinks ids={externalIds} homepage={null} />
          </MovieSection>
        </FadeIn>
      )}
    </div>
  );
}
