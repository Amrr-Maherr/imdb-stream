"use client";

import { Slider } from "@/shared/components/ui/slider";

type MediaRowProps = {
  title: string;
  children: React.ReactNode;
  subtitle?: string;
  slidesPerView?: number;
  slidesMobilePerView?: number;
  spaceBetween?: number;
};

export function MediaRow({
  title,
  children,
  subtitle,
  slidesPerView = 6,
  slidesMobilePerView = 2.5,
  spaceBetween = 16,
}: MediaRowProps) {
  return (
    <section>
      <div className="flex items-end justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold text-foreground">{title}</h2>
          {subtitle && (
            <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>
          )}
        </div>
      </div>
      <Slider
        slidesPerView={slidesPerView}
        slidesMobilePerView={slidesMobilePerView}
        spaceBetween={spaceBetween}
        grabCursor
        freeMode
      >
        {children}
      </Slider>
    </section>
  );
}
