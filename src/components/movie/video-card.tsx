import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";

type VideoCardProps = {
  videoKey: string;
  name: string;
  site: string;
  type: string;
};

export function VideoCard({ videoKey, name, site, type }: VideoCardProps) {
  if (site !== "YouTube") return null;

  return (
    <Link
      href={`https://www.youtube.com/watch?v=${videoKey}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative aspect-video overflow-hidden rounded-lg bg-muted"
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
