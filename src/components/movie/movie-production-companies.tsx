"use client";

import Image from "next/image";
import Link from "next/link";
import { Building } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { slugify } from "@/lib/slugify";

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";

type ProductionCompany = {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country: string;
};

type MovieProductionCompaniesProps = {
  companies: ProductionCompany[];
};

export function MovieProductionCompanies({
  companies,
}: MovieProductionCompaniesProps) {
  if (companies.length === 0) return null;

  return (
    <Slider
      slidesPerView={5}
      slidesMobilePerView={2}
      spaceBetween={16}
      grabCursor
      freeMode
      className="-mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 pb-8"
    >
      {companies.map((c) => (
        <Link
          key={c.id}
          href={`/company/${slugify(c.name)}/${c.id}`}
          className="group w-full"
        >
          <div className="flex h-24 items-center justify-center rounded-xl border border-border bg-card p-4 group-hover:bg-muted transition-colors">
            {c.logo_path ? (
              <Image
                src={`${TMDB_IMAGE_BASE}/w185${c.logo_path}`}
                alt={c.name}
                width={120}
                height={60}
                className="max-h-full w-auto object-contain opacity-60 group-hover:opacity-100 transition-opacity"
                style={{ objectFit: "contain" }}
              />
            ) : (
              <Building className="size-8 text-muted-foreground" />
            )}
          </div>
          <p className="mt-2 text-xs font-medium text-foreground text-center line-clamp-1 group-hover:text-brand transition-colors">
            {c.name}
          </p>
        </Link>
      ))}
    </Slider>
  );
}
