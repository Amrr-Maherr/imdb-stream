"use client";

import { useState } from "react";
import { User, Loader2, Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/shared/components/ui/button";
import useGuestLogin from "@/features/auth/hooks/useGuestLogin";

export function GuestAuth() {
  const tc = useTranslations("Common");
  const { loginAsGuest, loading } = useGuestLogin();

  const [success, setSuccess] = useState(false);

  const handleGuest = async () => {
    setSuccess(false);

    const result = await loginAsGuest();

    if (result?.user) {
      setSuccess(true);

      console.log(result);
    }
  };

  return (
    <Button
      disabled={loading || success}
      onClick={handleGuest}
      type="button"
      variant="ghost"
      className="w-full gap-2 text-muted-foreground hover:text-foreground disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {loading ? (
        <>
          <Loader2 size={16} className="animate-spin" />
          {tc("signingIn")}
        </>
      ) : success ? (
        <>
          <Check size={16} />
          {tc("welcome")}
        </>
      ) : (
        <>
          <User size={16} />
          {tc("continueAsGuest")}
        </>
      )}
    </Button>
  );
}
