"use client";

import { Star } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { RATING_OPTIONS, PARAM_KEYS } from "./constants";

function RatingSelect() {
  const t = useTranslations("Filters");
  const router = useRouter();
  const searchParams = useSearchParams();
  const value = searchParams.get(PARAM_KEYS.rating) ?? "any";

  function handleChange(val: string) {
    const params = new URLSearchParams(searchParams);
    if (val === "any" || val === "0") {
      params.delete(PARAM_KEYS.rating);
    } else {
      params.set(PARAM_KEYS.rating, val);
    }
    params.set(PARAM_KEYS.page, "1");
    router.push(`?${params.toString()}`);
  }

  const ratingLabels: Record<string, string> = {
    "0": t("any"),
    "1": t("rating1Plus"),
    "2": t("rating2Plus"),
    "3": t("rating3Plus"),
    "4": t("rating4Plus"),
    "5": t("rating5Plus"),
    "6": t("rating6Plus"),
    "7": t("rating7Plus"),
    "8": t("rating8Plus"),
    "9": t("rating9Plus"),
    "10": t("rating10"),
  };

  return (
    <Select value={value} onValueChange={handleChange}>
      <SelectTrigger className="h-9 min-w-[8.5rem] text-xs">
        <Star className="size-3.5 shrink-0 text-amber-500" />
        <SelectValue placeholder={t("rating")} />
      </SelectTrigger>
      <SelectContent>
        {RATING_OPTIONS.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {ratingLabels[opt.value]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export { RatingSelect };
