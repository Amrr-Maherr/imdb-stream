"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { FadeIn } from "@/features/movies/components/detail/fade-in";

type BiographySectionProps = {
  biography: string;
  alsoKnownAs: string[];
};

export function BiographySection({ biography, alsoKnownAs }: BiographySectionProps) {
  const [expanded, setExpanded] = useState(false);
  if (!biography) return null;

  const longBio = biography.length > 600;

  return (
    <FadeIn>
      <section>
        <h2 className="text-xl font-bold text-foreground mb-3">Biography</h2>
        <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
          <span className={!expanded && longBio ? "line-clamp-[8]" : ""}>
            {biography}
          </span>
        </div>
        {longBio && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="inline-flex items-center gap-1 mt-2 text-sm font-medium text-brand hover:text-brand/80 transition-colors"
          >
            {expanded ? (
              <>Show Less <ChevronUp className="size-3.5" /></>
            ) : (
              <>Show More <ChevronDown className="size-3.5" /></>
            )}
          </button>
        )}
        {alsoKnownAs.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-muted-foreground uppercase">Also Known As:</span>
            {alsoKnownAs.map((name) => (
              <span key={name} className="rounded-full bg-muted px-3 py-1 text-xs text-foreground">
                {name}
              </span>
            ))}
          </div>
        )}
      </section>
    </FadeIn>
  );
}
