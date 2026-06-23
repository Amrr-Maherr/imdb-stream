"use client";

import Image from "next/image";
import { Slider } from "@/components/ui/slider";

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";

type MoviePhotosProps = {
  backdrops: { file_path: string }[];
  posters: { file_path: string }[];
  logos?: { file_path: string }[];
};

export function MoviePhotos({ backdrops, posters, logos }: MoviePhotosProps) {
  const all = [...backdrops, ...posters, ...(logos ?? [])];
  if (all.length === 0) return null;

  return (
    <section>
      <h2 className="text-xl font-bold text-foreground mb-4">
        Photos{logos && logos.length > 0 ? " & Logos" : ""}
      </h2>
      <Slider
        slidesPerView={3}
        slidesMobilePerView={1.5}
        spaceBetween={12}
        grabCursor
        freeMode
        className="-mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 pb-8"
      >
        {all.map((img, i) => (
          <div
            key={i}
            className="relative aspect-video w-full h-50 overflow-hidden rounded-lg bg-muted"
          >
            <Image
              src={`${TMDB_IMAGE_BASE}/w780${img?.file_path}`}
              alt={`Movie photo ${i + 1}`}
              fill
              className="object-cover"
              sizes="280px"
            />
          </div>
        ))}
      </Slider>
    </section>
  );
}
