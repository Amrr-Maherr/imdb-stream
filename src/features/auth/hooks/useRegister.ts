"use client";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useState } from "react";
import storeUserData from "./saveUserToLocalStorage";

type RegisterData = {
    name: string;
    email: string;
    password: string;
};

export default function useRegister() {
    const [firebaseError, setFirebaseError] = useState<string | null>(null);

    const register = async (data: RegisterData) => {
        try {
            const response = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            );

            await updateProfile(response.user, {
                displayName: data.name,
            });

            if (response) {
                storeUserData(response)
            }

            return response;
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
        register,
        firebaseError,
    };
}
