"use client";

import { Children, useCallback, useRef } from "react";
import type { Swiper as SwiperClass } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  FreeMode,
  Navigation,
  Pagination,
  EffectFade,
  EffectCoverflow,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "swiper/css/effect-fade";
import "swiper/css/effect-coverflow";

export interface SliderProps {
  children: React.ReactNode;
  slidesPerView?: number | "auto";
  slidesMobilePerView?: number;
  spaceBetween?: number;
  loop?: boolean;
  autoplay?: boolean | { delay: number };
  navigation?: boolean;
  pagination?: boolean | { type: "bullets" | "fraction" | "progressbar" };
  breakpoints?: Record<number, Omit<SliderProps, "breakpoints">>;
  direction?: "horizontal" | "vertical";
  speed?: number;
  centeredSlides?: boolean;
  freeMode?: boolean;
  grabCursor?: boolean;
  effect?: "slide" | "fade" | "coverflow";
  className?: string;
  onSwiper?: (swiper: SwiperClass) => void;
  onSlideChange?: (swiper: SwiperClass) => void;
}

export function Slider({
  children,
  slidesPerView = "auto",
  slidesMobilePerView,
  spaceBetween = 16,
  loop = false,
  autoplay = false,
  navigation = false,
  pagination = false,
  breakpoints,
  direction = "horizontal",
  speed = 400,
  centeredSlides = false,
  freeMode = false,
  grabCursor = true,
  effect = "slide",
  className = "",
  onSwiper,
  onSlideChange,
}: SliderProps) {
  const activeSlidesPerView = slidesMobilePerView ?? slidesPerView;

  const mergedBreakpoints: Record<number, object> = {
    ...breakpoints,
  };
  if (slidesMobilePerView != null) {
    mergedBreakpoints[640] = { slidesPerView };
  }
  const swiperRef = useRef<SwiperClass | null>(null);

  const handleSwiper = useCallback(
    (swiper: SwiperClass) => {
      swiperRef.current = swiper;
      onSwiper?.(swiper);
    },
    [onSwiper],
  );

  const slides = Children.map(children, (child, index) => (
    <SwiperSlide key={index} className="h-full">
      {child}
    </SwiperSlide>
  ));

  const autoplayConfig =
    autoplay === true
      ? { delay: 3000, disableOnInteraction: false }
      : autoplay
        ? { delay: autoplay.delay, disableOnInteraction: false }
        : undefined;

  const paginationConfig =
    pagination === true
      ? { clickable: true }
      : pagination
        ? { ...pagination, clickable: true }
        : false;

  const modules = [FreeMode, EffectFade, EffectCoverflow];
  if (autoplay) modules.push(Autoplay);
  if (navigation) modules.push(Navigation);
  if (pagination) modules.push(Pagination);

  const containerClassName = [className, "h-full"].filter(Boolean).join(" ");

  return (
    <div className={containerClassName}>
      <Swiper
        className="h-full"
        modules={modules}
        slidesPerView={activeSlidesPerView}
        spaceBetween={spaceBetween}
        loop={loop}
        autoplay={autoplayConfig}
        navigation={navigation}
        pagination={paginationConfig}
        breakpoints={mergedBreakpoints as Record<number, object>}
        direction={direction}
        speed={speed}
        centeredSlides={centeredSlides}
        freeMode={freeMode}
        grabCursor={grabCursor}
        effect={effect === "slide" ? undefined : effect}
        onSwiper={handleSwiper}
        onSlideChange={onSlideChange}
      >
        {slides}
      </Swiper>
    </div>
  );
}
