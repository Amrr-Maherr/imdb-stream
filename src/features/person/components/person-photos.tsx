import Image from "next/image";
import { Slider } from "@/shared/components/ui/slider";

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";

type PersonPhotosProps = {
  profiles: { file_path: string; aspect_ratio: number }[];
};

export function PersonPhotos({ profiles }: PersonPhotosProps) {
  if (profiles.length === 0) return null;

  return (
    <section>
      <h2 className="text-xl font-bold text-foreground mb-4">Photos</h2>
      <Slider
        slidesPerView={4}
        slidesMobilePerView={2}
        spaceBetween={12}
        grabCursor
        freeMode
        className="-mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 pb-8"
      >
        {profiles.map((img) => (
          <div
            key={img?.file_path}
            className="relative aspect-[2/3] w-full overflow-hidden rounded-lg bg-muted"
          >
            <Image
              src={`${TMDB_IMAGE_BASE}/w342${img?.file_path}`}
              alt="Profile photo"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 50vw, 25vw"
            />
          </div>
        ))}
      </Slider>
    </section>
  );
}
