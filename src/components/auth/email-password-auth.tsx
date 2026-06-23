"use client";
import { Mail, Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import useLogin from "@/features/auth/hooks/useLogin";
import AuthStatusMessage from "@/features/auth/components/AuthStatusMessage";
import { useRouter } from "next/navigation";
export function EmailPasswordAuth() {
  const { login, firebaseError } = useLogin();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter();
  type Inputs = {
    email: string;
    password: string;
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const result = await login(data);
      console.log(result?.user);
      if (result?.user) {
        setSuccessMessage("Welcome back! You’ve signed in successfully.");
        reset();
        router.push("/");
      }
    } catch (error: any) {
      console.log(error);
    }
  };
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form className={`space-y-4 `} onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <Label htmlFor="auth-email">Email</Label>
        <div className="relative">
          <Input
            id="auth-email"
            type="email"
            placeholder="you@example.com"
            className={`peer pe-9 ${errors?.email ? "border-red-700" : ""}`}
            autoComplete="email"
            {...register("email", {
              required: "Email is required",
            })}
          />

          <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 peer-disabled:opacity-50">
            <Mail size={16} strokeWidth={2} aria-hidden="true" />
          </div>
        </div>
        {errors.email?.message && (
          <AuthStatusMessage
            message={errors.email.message || null}
            type="error"
            className="mt-2 text-sm text-red-600"
          />
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="auth-password">Password</Label>
          <Link
            href="/auth/forgot-password"
            className="text-sm text-brand hover:text-brand/80 font-medium transition-colors"
          >
            Forgot password?
          </Link>
        </div>
        <div className="relative">
          <Input
            id="auth-password"
            type={`${showPassword ? "text" : "password"}`}
            placeholder="Enter your password"
            className={`peer pe-9 ${errors.password ? "border-red-700" : ""}`}
            autoComplete="current-password"
            {...register("password", {
              required: "password is required",
            })}
          />

          <button
            onClick={() => {
              setShowPassword(!showPassword);
            }}
            type="button"
            className="absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 hover:text-foreground transition-colors"
            tabIndex={-1}
            aria-label="Show password"
          >
            {showPassword ? (
              <EyeOff size={16} strokeWidth={2} aria-hidden="true" />
            ) : (
              <Eye size={16} strokeWidth={2} aria-hidden="true" />
            )}
          </button>
        </div>
        {errors.password && (
          <AuthStatusMessage
            message={errors.password.message || null}
            type="error"
            className="mt-2 text-sm text-red-600"
          />
        )}
      </div>
      {firebaseError && (
        <AuthStatusMessage
          message={firebaseError || null}
          type="error"
          className="mt-2 text-sm text-red-600"
        />
      )}
      {successMessage && (
        <AuthStatusMessage
          message={successMessage || null}
          type="success"
          className="mt-2 text-sm text-green-600"
        />
      )}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-brand text-brand-foreground hover:bg-brand/90 font-semibold disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isSubmitting && <Loader2 className="animate-spin" />}
        {isSubmitting ? "Signing in..." : "Sign in"}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link
          href="/auth/signup"
          className="text-brand hover:text-brand/80 font-medium transition-colors"
        >
          Create your account
        </Link>
      </p>
    </form>
  );
}
