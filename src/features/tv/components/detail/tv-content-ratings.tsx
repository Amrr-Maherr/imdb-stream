import { Globe, Monitor } from "lucide-react";
import { Card, CardContent } from "@/shared/components/ui/card";

type ContentRating = {
  iso_3166_1: string;
  rating: string;
};

type TvContentRatingsProps = {
  ratings: ContentRating[];
};

function getCountryName(code: string) {
  try {
    return new Intl.DisplayNames(["en"], { type: "region" }).of(code) || code;
  } catch {
    return code;
  }
}

export function TvContentRatings({ ratings }: TvContentRatingsProps) {
  if (ratings.length === 0) return null;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
      {ratings.map((r, idx) => (
        <Card key={`${r.iso_3166_1}-${idx}`}>
          <CardContent className="flex items-center gap-2 p-3">
            <Globe className="size-3.5 shrink-0 text-muted-foreground" />
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground truncate">
                {getCountryName(r.iso_3166_1)}
              </p>
              <p className="text-sm font-bold text-foreground">
                {r.rating}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
