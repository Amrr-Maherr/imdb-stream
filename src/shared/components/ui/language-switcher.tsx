"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ChevronDown } from "lucide-react";

import { cn } from "@/shared/utils/utils";
import { Button } from "./button";

const languages: Record<string, string> = {
  en: "English",
  ar: "Arabic",
};

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const switchLang = (nextLocale: string) => {
    router.push(pathname, { locale: nextLocale });
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button variant="outline" size="sm" className="gap-1.5">
          {locale.toUpperCase()}
          <ChevronDown className="size-3.5 text-muted-foreground" />
        </Button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={4}
          className={cn(
            "z-50 min-w-[8rem] overflow-hidden rounded-lg border bg-popover p-1 text-popover-foreground shadow-md",
            "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
            "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
            "data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2"
          )}
        >
          {Object.entries(languages).map(([code, label]) => (
            <DropdownMenu.Item
              key={code}
              onClick={() => switchLang(code)}
              className={cn(
                "relative flex cursor-default select-none items-center rounded-md px-2 py-1.5 text-sm outline-none transition-colors",
                "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                "data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground",
                code === locale && "bg-accent font-medium"
              )}
            >
              {label}
              {code === locale && (
                <span className="ml-auto text-xs opacity-60">✓</span>
              )}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
