"use client";

import { Slider } from "@/components/ui/slider";

type RankedRowProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  startRank?: number;
};

export function RankedRow({
  title,
  subtitle,
  children,
}: RankedRowProps) {
  return (
    <section className="space-y-4">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground">{title}</h2>
          {subtitle && (
            <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>
          )}
        </div>
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
