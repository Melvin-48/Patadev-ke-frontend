import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
import { cn } from '../../../lib/utils';
import AuthLayout from '../../../components/auth/AuthLayout';
import AuthSocialButtons from '../../../components/auth/AuthSocialButtons';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [fieldErrors, setFieldErrors] = useState<{
    fullName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    agreeTerms?: string;
  }>({});

  const validate = () => {
    const errors: {
      fullName?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
      agreeTerms?: string;
    } = {};

    if (!fullName.trim()) {
      errors.fullName = 'Full Name is required.';
    }

    if (!email) {
      errors.email = 'Email address is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Please enter a valid email address.';
    }

    if (!password) {
      errors.password = 'Password is required.';
    } else if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters.';
    }

    if (!confirmPassword) {
      errors.confirmPassword = 'Please confirm your password.';
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match.';
    }

    if (!agreeTerms) {
      errors.agreeTerms = 'You must agree to the Terms of Service and Privacy Policy.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validate()) return;

    try {
      setIsLoading(true);

      // ────── 3-Second Loader Cycle ──────
      await Promise.all([
        register(email, password, 'CLIENT', fullName), // Default role until onboarding
        new Promise((resolve) => setTimeout(resolve, 3000)),
      ]);

      // Navigate to main onboarding flow
      navigate('/onboarding');
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Registration failed. Please try again.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create your account"
      description="Join PataDev and connect with businesses and developers."
      brandHeadline="Build better.
Connect smarter."
      brandSubheadline="Where businesses find skilled developers and developers find meaningful projects."
      bottomLink={
        <span>
          Already have an account?{' '}
          <Link to="/signup" className="font-bold text-primary hover:underline">
            Log in
          </Link>
        </span>
      }
    >
      {/* Error Banner */}
      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-xs font-semibold flex items-center gap-2">
          <AlertCircle size={15} className="shrink-0 text-red-500" />
          <span>{error}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} noValidate className="space-y-3.5">
        
        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block text-xs font-bold text-[#07152F] mb-1">
            Full Name
          </label>
          <input
            id="fullName"
            type="text"
            required
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
              if (fieldErrors.fullName) setFieldErrors(prev => ({ ...prev, fullName: undefined }));
            }}
            placeholder="John Doe"
            className={cn(
              'w-full px-3.5 py-2.5 rounded-lg bg-white border text-xs font-medium text-[#07152F] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all',
              fieldErrors.fullName ? 'border-red-300 ring-1 ring-red-300' : 'border-slate-200',
            )}
          />
          {fieldErrors.fullName && (
            <p className="mt-1 text-[11px] font-medium text-red-500">{fieldErrors.fullName}</p>
          )}
        </div>

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
              if (fieldErrors.email) setFieldErrors(prev => ({ ...prev, email: undefined }));
            }}
            placeholder="name@example.com"
            className={cn(
              'w-full px-3.5 py-2.5 rounded-lg bg-white border text-xs font-medium text-[#07152F] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all',
              fieldErrors.email ? 'border-red-300 ring-1 ring-red-300' : 'border-slate-200',
            )}
          />
          {fieldErrors.email && (
            <p className="mt-1 text-[11px] font-medium text-red-500">{fieldErrors.email}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-xs font-bold text-[#07152F] mb-1">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (fieldErrors.password) setFieldErrors(prev => ({ ...prev, password: undefined }));
              }}
              placeholder="Enter your password"
              className={cn(
                'w-full px-3.5 py-2.5 pr-10 rounded-lg bg-white border text-xs font-medium text-[#07152F] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all',
                fieldErrors.password ? 'border-red-300 ring-1 ring-red-300' : 'border-slate-200',
              )}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          <p className="mt-1 text-[10px] text-slate-400">
            Use at least 8 characters with a mix of letters, numbers, and symbols.
          </p>
          {fieldErrors.password && (
            <p className="mt-1 text-[11px] font-medium text-red-500">{fieldErrors.password}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label htmlFor="confirmPassword" className="block text-xs font-bold text-[#07152F] mb-1">
            Confirm password
          </label>
          <div className="relative">
            <input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              required
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (fieldErrors.confirmPassword) setFieldErrors(prev => ({ ...prev, confirmPassword: undefined }));
              }}
              placeholder="Confirm your password"
              className={cn(
                'w-full px-3.5 py-2.5 pr-10 rounded-lg bg-white border text-xs font-medium text-[#07152F] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all',
                fieldErrors.confirmPassword ? 'border-red-300 ring-1 ring-red-300' : 'border-slate-200',
              )}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
              aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
            >
              {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {fieldErrors.confirmPassword && (
            <p className="mt-1 text-[11px] font-medium text-red-500">{fieldErrors.confirmPassword}</p>
          )}
        </div>

        {/* Terms Checkbox */}
        <div>
          <label className="flex items-start gap-2 cursor-pointer select-none text-xs text-slate-600">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => {
                setAgreeTerms(e.target.checked);
                if (fieldErrors.agreeTerms) setFieldErrors(prev => ({ ...prev, agreeTerms: undefined }));
              }}
              className="w-4 h-4 mt-0.5 rounded text-primary focus:ring-primary border-slate-300 shrink-0"
            />
            <span>
              I agree to the{' '}
              <a href="#terms" className="font-semibold text-primary hover:underline">Terms of Service</a>{' '}
              and{' '}
              <a href="#privacy" className="font-semibold text-primary hover:underline font-semibold">Privacy Policy</a>.
            </span>
          </label>
          {fieldErrors.agreeTerms && (
            <p className="mt-1 text-[11px] font-medium text-red-500">{fieldErrors.agreeTerms}</p>
          )}
        </div>

        {/* Create Account CTA Button with 3s loader cycle */}
        <button
          type="submit"
          disabled={isLoading}
          className={cn(
            'relative overflow-hidden w-full inline-flex items-center justify-center py-2.5 px-4 rounded-lg font-bold text-white shadow-sm transition-all duration-150 text-xs mt-1',
            isLoading
              ? 'bg-primary/80 cursor-wait'
              : 'bg-[#1769FF] hover:bg-blue-600 active:scale-[0.99]',
          )}
        >
          {isLoading && (
            <span className="absolute inset-0 bg-blue-700/50 animate-[pulse_1s_ease-in-out_infinite]" />
          )}

          <span className="relative z-10">
            {isLoading ? (
              <span className="inline-flex items-center gap-2">
                <Loader2 size={16} className="animate-spin" />
                <span>Creating account...</span>
              </span>
            ) : (
              <span>Create account</span>
            )}
          </span>
        </button>

      </form>

      {/* Social Signup */}
      <AuthSocialButtons />
    </AuthLayout>
  );
}