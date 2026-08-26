import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Code2, Briefcase, User, Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
import { cn } from '../../../lib/utils';

type UserRole = 'CLIENT' | 'DEVELOPER';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [role, setRole] = useState<UserRole>('CLIENT');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [fieldErrors, setFieldErrors] = useState<{
    fullName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const validate = () => {
    const errors: {
      fullName?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
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

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validate()) return;

    try {
      setIsLoading(true);
      await register(email, password, role, fullName);
      
      // Navigate to role-specific onboarding flow
      if (role === 'CLIENT') {
        navigate('/onboarding/client');
      } else {
        navigate('/onboarding/developer');
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Registration failed. Please try again.';
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

      <div className="relative z-10 w-full max-w-[480px] flex flex-col items-center py-6">
        
        {/* Branding Logo: </> PataDev Ke */}
        <Link
          to="/"
          className="flex items-center gap-2.5 group mb-6 transition-transform hover:scale-105"
          aria-label="PataDev Ke Home"
        >
          <span className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-200 shadow-xs">
            <Code2 size={20} strokeWidth={2.5} />
          </span>
          <span className="font-semibold text-2xl text-[#07152F] tracking-tight">
            PataDev <span className="text-primary">Ke</span>
          </span>
        </Link>

        {/* Signup Card */}
        <div className="w-full bg-white/90 backdrop-blur-xl shadow-2xl shadow-slate-200/60 rounded-3xl p-7 sm:p-9 border border-slate-200/60 transition-all">
          
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#07152F] tracking-tight">
              Create your account
            </h1>
            <p className="text-xs sm:text-sm text-[#64748B] font-medium mt-1.5 leading-relaxed">
              Join PataDev and connect with businesses or developers.
            </p>
          </div>

          {/* Role Selection Buttons */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              type="button"
              onClick={() => setRole('CLIENT')}
              className={cn(
                'p-3.5 rounded-2xl border text-left flex flex-col gap-2 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/40',
                role === 'CLIENT'
                  ? 'border-primary bg-primary/5 text-primary shadow-xs ring-1 ring-primary/30'
                  : 'border-slate-200/80 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50/50',
              )}
            >
              <div className="flex items-center justify-between w-full">
                <span className={cn(
                  'w-8 h-8 rounded-xl flex items-center justify-center transition-colors',
                  role === 'CLIENT' ? 'bg-primary text-white' : 'bg-slate-100 text-slate-500',
                )}>
                  <Briefcase size={16} />
                </span>
                <span className={cn(
                  'w-4 h-4 rounded-full border flex items-center justify-center',
                  role === 'CLIENT' ? 'border-primary bg-primary' : 'border-slate-300',
                )}>
                  {role === 'CLIENT' && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                </span>
              </div>
              <div>
                <div className="text-xs font-bold text-[#07152F]">CLIENT</div>
                <div className="text-[11px] text-[#64748B] leading-tight mt-0.5">
                  Find developers and build your project.
                </div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setRole('DEVELOPER')}
              className={cn(
                'p-3.5 rounded-2xl border text-left flex flex-col gap-2 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/40',
                role === 'DEVELOPER'
                  ? 'border-primary bg-primary/5 text-primary shadow-xs ring-1 ring-primary/30'
                  : 'border-slate-200/80 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50/50',
              )}
            >
              <div className="flex items-center justify-between w-full">
                <span className={cn(
                  'w-8 h-8 rounded-xl flex items-center justify-center transition-colors',
                  role === 'DEVELOPER' ? 'bg-primary text-white' : 'bg-slate-100 text-slate-500',
                )}>
                  <Code2 size={16} />
                </span>
                <span className={cn(
                  'w-4 h-4 rounded-full border flex items-center justify-center',
                  role === 'DEVELOPER' ? 'border-primary bg-primary' : 'border-slate-300',
                )}>
                  {role === 'DEVELOPER' && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                </span>
              </div>
              <div>
                <div className="text-xs font-bold text-[#07152F]">DEVELOPER</div>
                <div className="text-[11px] text-[#64748B] leading-tight mt-0.5">
                  Find projects and showcase your expertise.
                </div>
              </div>
            </button>
          </div>

          {/* Error Alert Banner */}
          {error && (
            <div className="mb-5 p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-600 text-xs font-semibold flex items-center gap-2.5">
              <AlertCircle size={16} className="shrink-0 text-red-500" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            
            {/* Full Name */}
            <div>
              <label
                htmlFor="fullName"
                className="block text-xs font-bold text-[#07152F] mb-1 text-left"
              >
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User size={17} />
                </div>
                <input
                  id="fullName"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (fieldErrors.fullName) setFieldErrors(prev => ({ ...prev, fullName: undefined }));
                  }}
                  placeholder="e.g. Jane Doe"
                  className={cn(
                    'w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border text-sm font-medium text-[#07152F] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all',
                    fieldErrors.fullName ? 'border-red-300 ring-1 ring-red-300' : 'border-slate-200',
                  )}
                />
              </div>
              {fieldErrors.fullName && (
                <p className="mt-1 text-[11px] font-medium text-red-500 text-left">
                  {fieldErrors.fullName}
                </p>
              )}
            </div>

            {/* Email Address */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-bold text-[#07152F] mb-1 text-left"
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
                    'w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border text-sm font-medium text-[#07152F] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all',
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

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-xs font-bold text-[#07152F] mb-1 text-left"
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
                  placeholder="Minimum 8 characters"
                  className={cn(
                    'w-full pl-10 pr-11 py-2.5 rounded-xl bg-white border text-sm font-medium text-[#07152F] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all',
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

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-xs font-bold text-[#07152F] mb-1 text-left"
              >
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock size={17} />
                </div>
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (fieldErrors.confirmPassword) setFieldErrors(prev => ({ ...prev, confirmPassword: undefined }));
                  }}
                  placeholder="Re-enter your password"
                  className={cn(
                    'w-full pl-10 pr-11 py-2.5 rounded-xl bg-white border text-sm font-medium text-[#07152F] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all',
                    fieldErrors.confirmPassword ? 'border-red-300 ring-1 ring-red-300' : 'border-slate-200',
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                  aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                >
                  {showConfirmPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
              {fieldErrors.confirmPassword && (
                <p className="mt-1 text-[11px] font-medium text-red-500 text-left">
                  {fieldErrors.confirmPassword}
                </p>
              )}
            </div>

            {/* Terms Statement */}
            <p className="text-[11px] text-[#64748B] text-center pt-1 leading-normal">
              By creating an account, you agree to our{' '}
              <a href="#terms" className="text-primary hover:underline font-semibold">Terms of Service</a>{' '}
              and{' '}
              <a href="#privacy" className="text-primary hover:underline font-semibold">Privacy Policy</a>.
            </p>

            {/* Submit Action Button */}
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
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight size={16} strokeWidth={2.5} />
                </>
              )}
            </button>

          </form>

        </div>

        {/* Login Prompt Link */}
        <div className="text-center mt-6 text-xs text-[#64748B] font-medium">
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-primary hover:underline">
            Log In
          </Link>
        </div>

      </div>
    </div>
  );
}