"use client";

import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import type { Video } from "@/types/tmdb";

type VideoCardInnerProps = {
  videoKey: string;
  name: string;
  type: string;
};

function VideoCardInner({ videoKey, name, type }: VideoCardInnerProps) {
  return (
    <Link
      href={`https://www.youtube.com/watch?v=${videoKey}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative aspect-video w-full overflow-hidden rounded-lg bg-muted"
    >
      <Image
        src={`https://img.youtube.com/vi/${videoKey}/hqdefault.jpg`}
        alt={name}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition-colors">
        <div className="flex size-14 items-center justify-center rounded-full bg-brand/90">
          <Play className="size-6 fill-white text-white ml-0.5" />
        </div>
      </div>
      <div className="absolute top-2 left-2 rounded bg-black/60 px-2 py-0.5 text-xs text-white">
        {type}
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
        <p className="text-sm font-medium text-white line-clamp-1">{name}</p>
      </div>
    </Link>
  );
}

type MovieVideosProps = {
  videos: Video[];
};

export function MovieVideos({ videos }: MovieVideosProps) {
  const youtubeVideos = videos.filter((v) => v.site === "YouTube");
  if (youtubeVideos.length === 0) return null;

  return (
    <section>
      <h2 className="text-xl font-bold text-foreground mb-4">Videos</h2>
      <Slider
        slidesPerView={3}
        slidesMobilePerView={1.2}
        spaceBetween={12}
        grabCursor
        freeMode
        className="-mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 pb-8"
      >
        {youtubeVideos.map((video) => (
          <VideoCardInner
            key={video.id}
            videoKey={video.key}
            name={video.name}
            type={video.type}
          />
        ))}
      </Slider>
    </section>
  );
}
