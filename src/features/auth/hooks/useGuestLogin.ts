"use client";

import { signInAnonymously } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useState } from "react";

export default function useGuestLogin() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loginAsGuest = async () => {
        setLoading(true);
        setError(null);

        try {
            const result = await signInAnonymously(auth);
            return result;
        } catch (err: any) {
            const message =
                err?.code ||
                err?.message ||
                "Unknown error";

            setError(message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return {
        loginAsGuest,
        loading,
        error,
    };
}