"use client";

import Image from "next/image";
import { Quote, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";

type AuthorDetails = {
  name: string;
  username: string;
  avatar_path: string | null;
  rating: number | null;
};

type Review = {
  id: string;
  author: string;
  author_details: AuthorDetails;
  content: string;
  created_at: string;
  updated_at: string;
  url: string;
};

type MovieReviewsProps = {
  reviews: Review[];
};

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <Card className="h-full">
      <CardContent className="p-4 flex flex-col h-full">
        <div className="flex items-start gap-3">
          <div className="relative size-9 shrink-0 overflow-hidden rounded-full bg-muted">
            {review.author_details.avatar_path ? (
              <Image
                src={
                  review.author_details.avatar_path.startsWith("/https")
                    ? review.author_details.avatar_path.slice(1)
                    : `${TMDB_IMAGE_BASE}/w185${review.author_details.avatar_path}`
                }
                alt={review.author}
                fill
                className="object-cover"
                sizes="36px"
              />
            ) : (
              <div className="flex size-full items-center justify-center text-muted-foreground">
                <Quote className="size-3.5" />
              </div>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="text-sm font-semibold text-foreground truncate">
                {review.author_details.name || review.author}
              </p>
              {review.author_details.rating && (
                <span className="flex items-center gap-0.5 text-xs text-yellow-400 shrink-0">
                  <Star className="size-3 fill-yellow-400" />
                  {review.author_details.rating}/10
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground">{formatDate(review.created_at)}</p>
          </div>
        </div>
        <div className="mt-3 flex-1 overflow-y-auto">
          <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line line-clamp-6">
            {review.content}
          </p>
        </div>
        {review.content.length > 600 && (
          <a
            href={review.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex text-xs text-brand hover:underline shrink-0"
          >
            Read full review
          </a>
        )}
      </CardContent>
    </Card>
  );
}

export function MovieReviews({ reviews }: MovieReviewsProps) {
  if (reviews.length === 0) return null;

  return (
    <Slider
      slidesPerView={2}
      slidesMobilePerView={1.2}
      spaceBetween={14}
      grabCursor
      freeMode
      className="-mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 pb-2"
    >
      {reviews.map((r) => (
        <div key={r.id} className="h-full">
          <ReviewCard review={r} />
        </div>
      ))}
    </Slider>
  );
}
