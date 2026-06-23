"use client";

import {
  signInWithPhoneNumber,
  RecaptchaVerifier,
  ConfirmationResult,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useState } from "react";
import storeUserData from "./saveUserToLocalStorage";

export type Step = "phone" | "otp";

export default function usePhoneAuth() {
  const [step, setStep] = useState<Step>("phone");
  const [firebaseError, setFirebaseError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null);

  const createVerifier = () => {
    const existing = (window as any).recaptchaVerifier;
    if (existing) {
      existing.clear();
      delete (window as any).recaptchaVerifier;
    }
    const verifier = new RecaptchaVerifier(auth, "recaptcha-container", {
      size: "invisible",
    });
    (window as any).recaptchaVerifier = verifier;
    return verifier;
  };

  const clearVerifier = () => {
    const existing = (window as any).recaptchaVerifier;
    if (existing) {
      existing.clear();
      delete (window as any).recaptchaVerifier;
    }
  };

  const sendOtp = async (phoneNumber: string) => {
    setLoading(true);
    setFirebaseError(null);
    try {
      const verifier = createVerifier();
      const result = await signInWithPhoneNumber(auth, phoneNumber, verifier);
      setConfirmationResult(result);
      setStep("otp");
      return true;
    } catch (error: any) {
      setFirebaseError(
        error?.code?.replace("auth/", "") ||
          error?.message ||
          "Unknown error"
      );
      return false;
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (otp: string) => {
    if (!confirmationResult) return false;
    setLoading(true);
    setFirebaseError(null);
    try {
      const response = await confirmationResult.confirm(otp);
      if (response) {
        storeUserData(response)
      }
      return true;
    } catch (error: any) {
      setFirebaseError(
        error?.code?.replace("auth/", "") ||
          error?.message ||
          "Unknown error"
      );
      return false;
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    clearVerifier();
    setStep("phone");
    setFirebaseError(null);
    setLoading(false);
    setConfirmationResult(null);
  };

  return { step, loading, firebaseError, sendOtp, verifyOtp, reset };
}
