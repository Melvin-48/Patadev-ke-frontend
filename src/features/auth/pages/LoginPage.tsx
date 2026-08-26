import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Code2, Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
import { cn } from '../../../lib/utils';

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
    <div
      className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 bg-[#FAFCFF] overflow-hidden font-sans"
      style={{
        backgroundImage: `
          radial-gradient(circle at 50% 20%, rgba(23, 105, 255, 0.06) 0%, transparent 60%),
          radial-gradient(circle at 80% 80%, rgba(99, 102, 241, 0.04) 0%, transparent 50%)
        `,
      }}
    >
      {/* Ambient background blur blobs */}
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

        {/* Login Card */}
        <div className="w-full bg-white/90 backdrop-blur-xl shadow-2xl shadow-slate-200/60 rounded-3xl p-8 sm:p-10 border border-slate-200/60 transition-all">
          
          {/* Heading & Supporting Text */}
          <div className="text-center mb-7">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#07152F] tracking-tight">
              Welcome back
            </h1>
            <p className="text-xs sm:text-sm text-[#64748B] font-medium mt-1.5 leading-relaxed">
              Sign in to continue to your PataDev account.
            </p>
          </div>

          {/* Error Alert Banner */}
          {error && (
            <div className="mb-6 p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-600 text-xs font-semibold flex items-center gap-2.5">
              <AlertCircle size={16} className="shrink-0 text-red-500" />
              <span>{error}</span>
            </div>
          )}

          {/* Login Form */}
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
                    if (fieldErrors.email) setFieldErrors(prev => ({ ...prev, email: undefined }));
                  }}
                  placeholder="you@example.com"
                  className={cn(
                    'w-full pl-10 pr-4 py-3 rounded-xl bg-white border text-sm font-medium text-[#07152F] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all',
                    fieldErrors.email ? 'border-red-300 ring-1 ring-red-300' : 'border-slate-200',
                  )}
                />
              </div>
              {fieldErrors.email && (
                <p className="mt-1 text-[11px] font-medium text-red-500 text-left">
                  {fieldErrors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-xs font-bold text-[#07152F] mb-1.5 text-left"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock size={17} />
                </div>
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
                    'w-full pl-10 pr-11 py-3 rounded-xl bg-white border text-sm font-medium text-[#07152F] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all',
                    fieldErrors.password ? 'border-red-300 ring-1 ring-red-300' : 'border-slate-200',
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
              {fieldErrors.password && (
                <p className="mt-1 text-[11px] font-medium text-red-500 text-left">
                  {fieldErrors.password}
                </p>
              )}
            </div>

            {/* Remember Me + Forgot Password Row */}
            <div className="flex items-center justify-between text-xs pt-0.5">
              <label className="flex items-center gap-2 cursor-pointer select-none text-[#64748B] hover:text-[#07152F] transition-colors">
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
                className="font-semibold text-primary hover:text-blue-700 transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {/* Sign In CTA Button */}
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
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight size={16} strokeWidth={2.5} />
                </>
              )}
            </button>

          </form>

        </div>

        {/* Signup Prompt Link */}
        <div className="text-center mt-6 text-xs text-[#64748B] font-medium">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="font-bold text-primary hover:underline">
            Sign Up
          </Link>
        </div>

      </div>
    </div>
  );
}