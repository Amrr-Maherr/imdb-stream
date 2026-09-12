'use client';
import { Mail, Eye, EyeOff, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { Button } from '@/shared/components/ui/button';
import { useState } from 'react';
import useLogin from '@/features/auth/hooks/useLogin';
import AuthStatusMessage from '@/features/auth/components/AuthStatusMessage';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
export function EmailPasswordAuth() {
  const tc = useTranslations('Common');
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
        setSuccessMessage(tc('welcomeBack'));
        reset();
        router.push('/');
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <form className={`space-y-4 `} onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <Label htmlFor="auth-email">{tc('email')}</Label>
        <div className="relative">
          <Input
            id="auth-email"
            type="email"
            placeholder={tc('emailPlaceholder')}
            className={`peer pe-9 ${errors?.email ? 'border-red-700' : ''}`}
            autoComplete="email"
            {...register('email', {
              required: tc('emailRequired'),
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
          <Label htmlFor="auth-password">{tc('password')}</Label>
          <Link
            href="/auth/forgot-password"
            className="text-sm text-brand hover:text-brand/80 font-medium transition-colors"
          >
            {tc('forgotPassword')}
          </Link>
        </div>
        <div className="relative">
          <Input
            id="auth-password"
            type={`${showPassword ? 'text' : 'password'}`}
            placeholder={tc('passwordPlaceholder')}
            className={`peer pe-9 ${errors.password ? 'border-red-700' : ''}`}
            autoComplete="current-password"
            {...register('password', {
              required: tc('passwordRequired'),
            })}
          />

          <button
            onClick={() => {
              setShowPassword(!showPassword);
            }}
            type="button"
            className="absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 hover:text-foreground transition-colors"
            tabIndex={-1}
            aria-label={tc('showPassword')}
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
        {isSubmitting ? tc('signingIn') : tc('signIn')}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        {tc('noAccount')}{' '}
        <Link
          href="/auth/signup"
          className="text-brand hover:text-brand/80 font-medium transition-colors"
        >
          {tc('createAccount')}
        </Link>
      </p>
    </form>
  );
}
