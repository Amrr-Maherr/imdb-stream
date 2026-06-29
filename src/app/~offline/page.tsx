import type { Metadata } from "next";
import { ErrorState } from "@/shared/components/error-state";

export const metadata: Metadata = {
  title: "You're Offline",
};

export default function OfflinePage() {
  return (
    <ErrorState
      title="You're offline"
      description="Please check your internet connection and try again."
      actionLabel="Retry"
      actionHref="/"
    />
  );
}
