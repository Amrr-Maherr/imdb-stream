"use client";

import { Slider } from "@/components/ui/slider";

type MediaRowProps = {
  title: string;
  children: React.ReactNode;
};

export function MediaRow({ title, children }: MediaRowProps) {
  return (
    <section>
      <h2 className="text-xl font-bold text-foreground mb-4">{title}</h2>
      <Slider
        slidesPerView={6}
        slidesMobilePerView={2.5}
        spaceBetween={16}
        grabCursor
        freeMode
      >
        {children}
      </Slider>
    </section>
  );
}
