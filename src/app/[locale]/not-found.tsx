import type { Metadata } from "next";
import { ErrorState } from "@/shared/components/error-state";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <ErrorState
      title="Page not found"
      description="The page you're looking for doesn't exist or has been moved."
      actionLabel="Go Home"
      actionHref="/"
    />
  );
}
