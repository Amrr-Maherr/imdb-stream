"use client";

import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/features/auth/services/firebase";
import { useState } from "react";
import { useRouter } from "@/i18n/navigation";


export default function useGoogleAuth() {
    const router = useRouter();
    const [firebaseError, setFirebaseError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const loginWithGoogle = async () => {
        setLoading(true);
        setFirebaseError(null);

        try {
            const provider = new GoogleAuthProvider();
            const response = await signInWithPopup(auth, provider);
            if (response) {
                router.push("/");
            }
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
