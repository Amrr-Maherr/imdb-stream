"use client";

import Image from "next/image";
import Link from "next/link";
import { Tv, ShoppingCart, CreditCard, Monitor, ExternalLink } from "lucide-react";
import { Slider } from "@/components/ui/slider";

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";

type WatchProvider = {
  logo_path: string;
  provider_id: number;
  provider_name: string;
  display_priority: number;
};

type WatchProvidersData = {
  link?: string;
  flatrate?: WatchProvider[];
  rent?: WatchProvider[];
  buy?: WatchProvider[];
  free?: WatchProvider[];
  ads?: WatchProvider[];
};

type MovieWatchProvidersProps = {
  providers: WatchProvidersData | null;
};

function ProviderSlider({
  label,
  icon,
  providers,
}: {
  label: string;
  icon: React.ReactNode;
  providers: WatchProvider[];
}) {
  if (!providers || providers.length === 0) return null;

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-muted-foreground">{icon}</span>
        <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {label}
        </span>
      </div>
      <Slider
        slidesPerView="auto"
        slidesMobilePerView={3}
        spaceBetween={12}
        grabCursor
        freeMode
        className="pb-4"
      >
        {providers.map((p) => (
          <div
            key={p.provider_id}
            className="flex-shrink-0 w-[80px]"
            title={p.provider_name}
          >
            <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-muted">
              {p.logo_path ? (
                <Image
                  src={`${TMDB_IMAGE_BASE}/w92${p.logo_path}`}
                  alt={p.provider_name}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              ) : null}
            </div>
            <p className="mt-1 text-[11px] text-muted-foreground text-center line-clamp-1 leading-tight">
              {p.provider_name}
            </p>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export function MovieWatchProviders({ providers }: MovieWatchProvidersProps) {
  if (!providers) return null;

  const hasAny =
    providers.flatrate?.length ||
    providers.rent?.length ||
    providers.buy?.length ||
    providers.free?.length ||
    providers.ads?.length;

  if (!hasAny) return null;

  return (
    <div className="space-y-4">
      <ProviderSlider label="Stream" icon={<Tv className="size-4" />} providers={providers.flatrate ?? []} />
      <ProviderSlider label="Rent" icon={<CreditCard className="size-4" />} providers={providers.rent ?? []} />
      <ProviderSlider label="Buy" icon={<ShoppingCart className="size-4" />} providers={providers.buy ?? []} />
      <ProviderSlider label="Free" icon={<Monitor className="size-4" />} providers={providers.free ?? []} />
      {providers.link && (
        <Link
          href={providers.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm text-brand hover:underline"
        >
          <ExternalLink className="size-3.5" />
          See all options
        </Link>
      )}
    </div>
  );
}
