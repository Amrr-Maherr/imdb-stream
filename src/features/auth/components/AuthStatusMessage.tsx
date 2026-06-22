import React from "react";

type AuthStatusMessageProps = {
  message: string | null;
  type?: "success" | "error";
  className?: string;
};

export default function AuthStatusMessage({
  message,
  type = "success",
  className = "",
}: AuthStatusMessageProps) {
  if (!message) return null;

  return (
    <div role={type === "error" ? "alert" : "status"} className={className}>
      {message}
    </div>
  );
}
