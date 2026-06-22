import { VideoCard } from "./video-card";
import type { Video } from "@/types/tmdb";

type MovieVideosProps = {
  videos: Video[];
};

export function MovieVideos({ videos }: MovieVideosProps) {
  const youtubeVideos = videos.filter((v) => v.site === "YouTube");
  if (youtubeVideos.length === 0) return null;

  const display = youtubeVideos;

  return (
    <section>
      <h2 className="text-xl font-bold text-foreground mb-4">Videos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {display.map((video) => (
          <VideoCard
            key={video.id}
            videoKey={video.key}
            name={video.name}
            site={video.site}
            type={video.type}
          />
        ))}
      </div>
    </section>
  );
}
