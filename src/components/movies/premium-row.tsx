"use client";

import { Star, Award } from "lucide-react";
import { Slider } from "@/components/ui/slider";

type PremiumRowProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  averageRating?: number;
};

export function PremiumRow({
  title,
  subtitle,
  children,
  averageRating,
}: PremiumRowProps) {
  return (
    <section className="relative">
      <div className="flex items-end justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center size-8 rounded-full bg-brand/10 text-brand">
            <Award className="size-4" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">{title}</h2>
            {subtitle && (
              <p className="text-sm text-muted-foreground mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
        </div>
        {averageRating && (
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand/10 text-brand text-sm font-semibold">
            <Star className="size-4 fill-brand text-brand" />
            <span>{averageRating.toFixed(1)}</span>
            <span className="text-brand/60 text-xs font-normal">avg</span>
          </div>
        )}
      </div>
      <Slider
        slidesPerView={5}
        slidesMobilePerView={2.5}
        spaceBetween={14}
        grabCursor
        freeMode
      >
        {children}
      </Slider>
    </section>
  );
}
