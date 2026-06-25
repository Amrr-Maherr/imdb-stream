import { Star } from "lucide-react";

type MovieRatingProps = {
  voteAverage: number;
  voteCount: number;
  popularity: number;
};

export function MovieRating({ voteAverage, voteCount, popularity }: MovieRatingProps) {
  const score = Math.round(voteAverage * 10);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <div className="flex size-16 flex-col items-center justify-center rounded-full bg-brand text-brand-foreground">
          <span className="text-xl font-bold leading-none">{score}</span>
          <span className="text-[10px] font-semibold leading-tight">%</span>
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">User Score</p>
          <p className="text-xs text-muted-foreground">{voteCount.toLocaleString()} votes</p>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <Star className="size-4 fill-rating-star text-rating-star" />
        <span className="text-sm font-medium text-foreground">{voteAverage.toFixed(1)}</span>
        <span className="text-xs text-muted-foreground">· {popularity.toFixed(0)} popular</span>
      </div>
      <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full bg-rating-star transition-all"
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}
