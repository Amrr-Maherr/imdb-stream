"use client";

import { Eye, EyeOff } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Switch } from "@/shared/components/ui/switch";
import { Label } from "@/shared/components/ui/label";
import { PARAM_KEYS } from "./constants";

function AdultToggle() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const checked = searchParams.get(PARAM_KEYS.adult) === "true";

  function handleChange(val: boolean) {
    const params = new URLSearchParams(searchParams);
    if (val) {
      params.set(PARAM_KEYS.adult, "true");
    } else {
      params.delete(PARAM_KEYS.adult);
    }
    params.set(PARAM_KEYS.page, "1");
    router.push(`?${params.toString()}`);
  }

  return (
    <div className="flex items-center gap-2">
      <Switch
        id="adult-toggle"
        checked={checked}
        onCheckedChange={handleChange}
      />
      <Label
        htmlFor="adult-toggle"
        className="flex items-center gap-1.5 text-xs font-medium cursor-pointer"
      >
        {checked ? (
          <Eye className="size-3.5 text-muted-foreground" />
        ) : (
          <EyeOff className="size-3.5 text-muted-foreground" />
        )}
        Adult
      </Label>
    </div>
  );
}

export { AdultToggle };
