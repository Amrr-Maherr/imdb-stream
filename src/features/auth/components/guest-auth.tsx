"use client";

import { useState } from "react";
import { User, Loader2, Check } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import useGuestLogin from "@/features/auth/hooks/useGuestLogin";

export function GuestAuth() {
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
          Signing in...
        </>
      ) : success ? (
        <>
          <Check size={16} />
          Welcome!
        </>
      ) : (
        <>
          <User size={16} />
          Continue as Guest
        </>
      )}
    </Button>
  );
}
