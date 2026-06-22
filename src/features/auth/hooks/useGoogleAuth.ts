"use client";

import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useState } from "react";

export default function useGoogleAuth() {
    const [firebaseError, setFirebaseError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const loginWithGoogle = async () => {
        setLoading(true);
        setFirebaseError(null);

        try {
            const provider = new GoogleAuthProvider();
            const response = await signInWithPopup(auth, provider);
            return response;
        } catch (error: any) {
            const firebaseErr =
                error?.code ||
                error?.message ||
                "Unknown error";
            setFirebaseError(firebaseErr);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return {
        loginWithGoogle,
        loading,
        firebaseError,
    };
}
