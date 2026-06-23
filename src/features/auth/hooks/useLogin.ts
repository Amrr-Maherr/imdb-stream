"use client";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useState } from "react";
import { useRouter } from "@/i18n/navigation";
import storeUserData from "./saveUserToLocalStorage";
// login data types
type LoginData = {
    email: string;
    password: string;
};

export default function useLogin() {
    const router = useRouter();
    const [firebaseError, setFirebaseError] = useState<string | null>(null);

    const login = async (data: LoginData) => {

        try {
            const response = await signInWithEmailAndPassword(
                auth,
                data.email,
                data.password
            );
            if (response) {
                storeUserData(response)
                router.push("/");
            } else {
                return;
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
        login,
        firebaseError,
    };
}