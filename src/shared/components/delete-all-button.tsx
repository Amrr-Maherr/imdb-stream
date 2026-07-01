"use client";

import { cn } from "@/shared/utils/utils";

interface DeleteAllButtonProps {
  onClick: () => void;
  disabled?: boolean;
  deleting?: boolean;
  className?: string;
}

function DeleteAllButton({
  onClick,
  disabled = false,
  deleting = false,
  className,
}: DeleteAllButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || deleting}
      className={cn(
        "rounded-lg bg-destructive px-4 py-2 text-sm font-semibold text-destructive-foreground hover:bg-destructive/90 disabled:opacity-50",
        className,
      )}
    >
      {deleting ? "Deleting..." : "Delete All"}
    </button>
  );
}

export { DeleteAllButton };
