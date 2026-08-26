import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, Loader2, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
import { cn } from '../../../lib/utils';
import AuthLayout from '../../../components/auth/AuthLayout';

export default function ForgotPasswordPage() {
  const { forgotPassword } = useAuth();

  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldError, setFieldError] = useState<string | undefined>();

  const validate = () => {
    if (!email.trim()) {
      setFieldError('Email address is required.');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setFieldError('Please enter a valid email address.');
      return false;
    }
    setFieldError(undefined);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validate()) return;

    try {
      setIsLoading(true);
      await forgotPassword(email);
      setIsSubmitted(true);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unable to send the reset link. Please try again.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Forgot your password?"
      description="Enter your email address and we'll send you a link to reset your password."
      brandHeadline="Build better.
Connect smarter."
      brandSubheadline="Where businesses find skilled developers and developers find meaningful projects."
      bottomLink={
        <Link to="/login" className="font-bold text-primary hover:underline">
          Back to login
        </Link>
      }
    >
      {isSubmitted ? (
        /* ────── SUCCESS STATE ────── */
        <div className="space-y-5 animate-fadeIn py-2 text-left">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center">
            <CheckCircle2 size={20} />
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#07152F] tracking-tight">
              Check your email
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-1.5 leading-relaxed">
              Instructions to reset your password have been sent if an account exists for this email address.
            </p>
          </div>

          <div className="pt-2">
            <Link
              to="/login"
              className="w-full inline-flex items-center justify-center py-2.5 px-4 rounded-lg font-bold text-white bg-[#1769FF] hover:bg-blue-600 transition-all text-xs"
            >
              Back to login
            </Link>
          </div>
        </div>
      ) : (
        /* ────── FORM STATE ────── */
        <div>
          {/* Error Alert */}
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-xs font-semibold flex items-center gap-2">
              <AlertCircle size={15} className="shrink-0 text-red-500" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {/* Email Address */}
            <div>
              <label htmlFor="email" className="block text-xs font-bold text-[#07152F] mb-1">
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (fieldError) setFieldError(undefined);
                }}
                placeholder="name@example.com"
                className={cn(
                  'w-full px-3.5 py-2.5 rounded-lg bg-white border text-sm font-medium text-[#07152F] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all',
                  fieldError ? 'border-red-300 ring-1 ring-red-300' : 'border-slate-200',
                )}
              />
              {fieldError && (
                <p className="mt-1 text-[11px] font-medium text-red-500">{fieldError}</p>
              )}
            </div>

            {/* Primary Reset CTA */}
            <button
              type="submit"
              disabled={isLoading}
              className={cn(
                'w-full inline-flex items-center justify-center py-2.5 px-4 rounded-lg font-bold text-white shadow-sm transition-all duration-150 text-xs mt-1',
                isLoading
                  ? 'bg-primary/70 cursor-not-allowed'
                  : 'bg-[#1769FF] hover:bg-blue-600 active:scale-[0.99]',
              )}
            >
              {isLoading ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2 size={16} className="animate-spin" />
                  <span>Sending link...</span>
                </span>
              ) : (
                <span>Send reset link</span>
              )}
            </button>
          </form>
        </div>
      )}
    </AuthLayout>
  );
}
