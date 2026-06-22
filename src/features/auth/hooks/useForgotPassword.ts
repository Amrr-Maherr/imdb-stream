"use client";

import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useState } from "react";

type ForgotPasswordData = {
    email: string;
};

export default function useForgotPassword() {
    const [firebaseError, setFirebaseError] = useState<string | null>(null);

    const forgotPassword = async (data: ForgotPasswordData) => {
        try {
            await sendPasswordResetEmail(auth, data.email);
            return { success: true };
        } catch (error: any) {
            const firebaseErr =
                error?.code?.replace("auth/", "") ||
                error?.message ||
                "Unknown error";

            setFirebaseError(firebaseErr);
            return null;
        }
    };

    return {
        forgotPassword,
        firebaseError,
    };
}
