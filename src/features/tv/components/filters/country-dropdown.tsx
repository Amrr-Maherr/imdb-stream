"use client";

import { MapPin } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { COUNTRIES, PARAM_KEYS } from "./constants";

function CountryDropdown() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const value = searchParams.get(PARAM_KEYS.country) ?? "any";

  function handleChange(val: string) {
    const params = new URLSearchParams(searchParams);
    if (val === "any") {
      params.delete(PARAM_KEYS.country);
    } else {
      params.set(PARAM_KEYS.country, val);
    }
    params.set(PARAM_KEYS.page, "1");
    router.push(`?${params.toString()}`);
  }

  return (
    <Select value={value} onValueChange={handleChange}>
      <SelectTrigger className="h-9 min-w-[8.5rem] text-xs">
        <MapPin className="size-3.5 shrink-0 text-muted-foreground" />
        <SelectValue placeholder="Country" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="any">All Countries</SelectItem>
        {COUNTRIES.map((country) => (
          <SelectItem key={country.value} value={country.value}>
            {country.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export { CountryDropdown };
