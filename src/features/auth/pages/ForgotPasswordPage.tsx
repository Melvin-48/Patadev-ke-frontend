import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Code2, Mail, ArrowRight, ArrowLeft, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
import { cn } from '../../../lib/utils';

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
    <div
      className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 bg-[#FAFCFF] overflow-hidden font-sans"
      style={{
        backgroundImage: `
          radial-gradient(circle at 50% 20%, rgba(23, 105, 255, 0.06) 0%, transparent 60%),
          radial-gradient(circle at 80% 80%, rgba(99, 102, 241, 0.04) 0%, transparent 50%)
        `,
      }}
    >
      {/* Soft Ambient Background Blur Blobs */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
        <div
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(23,105,255,0.07) 0%, transparent 70%)',
            filter: 'blur(100px)',
          }}
        />
        <div
          className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 70%)',
            filter: 'blur(100px)',
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-[440px] flex flex-col items-center">
        
        {/* Branding Logo: </> PataDev Ke */}
        <Link
          to="/"
          className="flex items-center gap-2.5 group mb-8 transition-transform hover:scale-105"
          aria-label="PataDev Ke Home"
        >
          <span className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-200 shadow-xs">
            <Code2 size={20} strokeWidth={2.5} />
          </span>
          <span className="font-semibold text-2xl text-[#07152F] tracking-tight">
            PataDev <span className="text-primary">Ke</span>
          </span>
        </Link>

        {/* Password Reset Card */}
        <div className="w-full bg-white/90 backdrop-blur-xl shadow-2xl shadow-slate-200/60 rounded-3xl p-8 sm:p-10 border border-slate-200/60 transition-all text-center">
          
          {isSubmitted ? (
            /* ────── SUCCESS STATE ────── */
            <div className="space-y-6 animate-fadeIn">
              {/* Soft Green Icon Badge */}
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 size={26} strokeWidth={2} />
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#07152F] tracking-tight">
                  Check your email
                </h1>
                <p className="text-xs sm:text-sm text-[#64748B] font-medium mt-2 leading-relaxed max-w-[340px] mx-auto">
                  If an account exists with that email address, we&apos;ve sent instructions to reset your password.
                </p>
              </div>

              <div className="pt-2">
                <Link
                  to="/login"
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full font-bold text-white shadow-lg shadow-primary/25 bg-[#1769FF] hover:bg-blue-600 transition-all text-sm"
                >
                  <ArrowLeft size={16} strokeWidth={2.5} />
                  <span>Back to Login</span>
                </Link>
              </div>
            </div>
          ) : (
            /* ────── FORM STATE ────── */
            <div>
              {/* Soft Blue Icon Cue Badge */}
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 shadow-xs">
                <Mail size={22} strokeWidth={2} />
              </div>

              {/* Heading & Supporting Text */}
              <div className="mb-6">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#07152F] tracking-tight">
                  Forgot your password?
                </h1>
                <p className="text-xs sm:text-sm text-[#64748B] font-medium mt-1.5 leading-relaxed max-w-[340px] mx-auto">
                  Enter your email address and we&apos;ll send you a link to reset your password.
                </p>
              </div>

              {/* Error Alert Banner */}
              {error && (
                <div className="mb-5 p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-600 text-xs font-semibold flex items-center gap-2.5 text-left">
                  <AlertCircle size={16} className="shrink-0 text-red-500" />
                  <span>{error}</span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                
                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-bold text-[#07152F] mb-1.5 text-left"
                  >
                    Email address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Mail size={17} />
                    </div>
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (fieldError) setFieldError(undefined);
                      }}
                      placeholder="you@example.com"
                      className={cn(
                        'w-full pl-10 pr-4 py-3 rounded-xl bg-white border text-sm font-medium text-[#07152F] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all',
                        fieldError ? 'border-red-300 ring-1 ring-red-300' : 'border-slate-200',
                      )}
                    />
                  </div>
                  {fieldError && (
                    <p className="mt-1 text-[11px] font-medium text-red-500 text-left">
                      {fieldError}
                    </p>
                  )}
                </div>

                {/* Primary CTA Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={cn(
                    'w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full font-bold text-white shadow-lg shadow-primary/25 transition-all duration-200 text-sm mt-2',
                    isLoading
                      ? 'bg-primary/70 cursor-not-allowed'
                      : 'bg-[#1769FF] hover:bg-blue-600 active:scale-[0.99]',
                  )}
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Sending Link...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Reset Link</span>
                      <ArrowRight size={16} strokeWidth={2.5} />
                    </>
                  )}
                </button>

              </form>

              {/* Back to Login Link */}
              <div className="mt-6 pt-2">
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center gap-1.5 text-xs font-medium text-[#64748B] hover:text-primary transition-colors"
                >
                  <ArrowLeft size={14} />
                  <span>Back to Login</span>
                </Link>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
