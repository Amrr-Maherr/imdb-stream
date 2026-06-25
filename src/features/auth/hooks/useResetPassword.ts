"use client";

import { confirmPasswordReset } from "firebase/auth";
import { auth } from "@/features/auth/services/firebase";
import { useState } from "react";

type ResetPasswordData = {
    oobCode: string;
    newPassword: string;
};

export default function useResetPassword() {
    const [firebaseError, setFirebaseError] = useState<string | null>(null);

    const resetPassword = async (data: ResetPasswordData) => {
        try {
            await confirmPasswordReset(auth, data.oobCode, data.newPassword);
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
        resetPassword,
        firebaseError,
    };
}
