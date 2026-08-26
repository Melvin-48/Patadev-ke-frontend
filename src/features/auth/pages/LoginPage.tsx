import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
import { cn } from '../../../lib/utils';
import AuthLayout from '../../../components/auth/AuthLayout';
import AuthSocialButtons from '../../../components/auth/AuthSocialButtons';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});

  const validate = () => {
    const errors: { email?: string; password?: string } = {};
    if (!email) {
      errors.email = 'Email address is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Please enter a valid email address.';
    }

    if (!password) {
      errors.password = 'Password is required.';
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
      await login(email, password);
      navigate('/projects');
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Invalid credentials. Please try again.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      description="Sign in to your PataDev account."
      brandHeadline="Build better.
Connect smarter."
      brandSubheadline="Where businesses find skilled developers and developers find meaningful projects."
      bottomLink={
        <span>
          Don&apos;t have an account?{' '}
          <Link to="/signup" className="font-bold text-primary hover:underline">
            Sign up
          </Link>
        </span>
      }
    >
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
              if (fieldErrors.email) setFieldErrors(prev => ({ ...prev, email: undefined }));
            }}
            placeholder="name@example.com"
            className={cn(
              'w-full px-3.5 py-2.5 rounded-lg bg-white border text-sm font-medium text-[#07152F] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all',
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
                'w-full px-3.5 py-2.5 pr-10 rounded-lg bg-white border text-sm font-medium text-[#07152F] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all',
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
          {fieldErrors.password && (
            <p className="mt-1 text-[11px] font-medium text-red-500">{fieldErrors.password}</p>
          )}
        </div>

        {/* Remember me + Forgot password */}
        <div className="flex items-center justify-between text-xs pt-0.5">
          <label className="flex items-center gap-2 cursor-pointer select-none text-slate-600 hover:text-[#07152F] transition-colors">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded text-primary focus:ring-primary border-slate-300"
            />
            <span className="font-medium">Remember me</span>
          </label>

          <Link
            to="/forgot-password"
            className="font-semibold text-primary hover:underline transition-colors"
          >
            Forgot password?
          </Link>
        </div>

        {/* Log in Button */}
        <button
          type="submit"
          disabled={isLoading}
          className={cn(
            'w-full inline-flex items-center justify-center py-2.5 px-4 rounded-lg font-bold text-white shadow-sm transition-all duration-150 text-sm mt-1',
            isLoading
              ? 'bg-primary/70 cursor-not-allowed'
              : 'bg-[#1769FF] hover:bg-blue-600 active:scale-[0.99]',
          )}
        >
          {isLoading ? (
            <span className="inline-flex items-center gap-2">
              <Loader2 size={16} className="animate-spin" />
              <span>Logging in...</span>
            </span>
          ) : (
            <span>Log in</span>
          )}
        </button>

      </form>

      {/* Social Login */}
      <AuthSocialButtons />
    </AuthLayout>
  );
}