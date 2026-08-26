import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Code2, Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
import { cn } from '../../../lib/utils';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in both email and password.');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      await login(email, password);

      // Navigate to project dashboard or projects list
      navigate('/projects');
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Invalid credentials. Please try again.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Demo account filler helpers for easy testing
  const fillDemoAccount = (roleEmail: string) => {
    setEmail(roleEmail);
    setPassword('Password123!');
    setError(null);
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center p-4 sm:p-6 overflow-hidden"
      style={{
        background:
          'linear-gradient(150deg, #C7DCFF 0%, #D6E8FF 18%, #EAF2FF 40%, #F0F6FF 65%, #E8F0FE 100%)',
      }}
    >
      {/* Decorative ambient background blobs */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
        <div
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(99,179,237,0.4) 0%, transparent 65%)',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 65%)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      {/* Main Login Glass Card */}
      <div className="relative z-10 w-full max-w-md">
        
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <Link
            to="/"
            className="flex items-center gap-2.5 group mb-3"
            aria-label="Back to PataDev homepage"
          >
            <span className="w-10 h-10 rounded-2xl bg-primary text-white flex items-center justify-center font-bold shadow-lg shadow-primary/30 group-hover:scale-105 transition-transform">
              <Code2 size={20} strokeWidth={2.5} />
            </span>
            <span className="text-2xl font-extrabold text-[#07152F] tracking-tight">
              PataDev<span className="text-primary">.ke</span>
            </span>
          </Link>
          
          <h1 className="text-2xl font-extrabold text-[#07152F] tracking-tight">
            Welcome back
          </h1>
          <p className="text-xs text-[#64748B] font-medium mt-1">
            Sign in to manage projects, submit bids, and fund milestones.
          </p>
        </div>

        {/* Glass Form Container */}
        <div
          className="rounded-3xl p-8 sm:p-10 backdrop-blur-xl border border-white/80 shadow-2xl"
          style={{ background: 'rgba(255, 255, 255, 0.75)' }}
        >
          {error && (
            <div className="mb-6 p-3.5 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-600 text-xs font-semibold flex items-center gap-2">
              <AlertCircle size={16} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-bold uppercase tracking-wider text-[#07152F] mb-1.5"
              >
                Email Address
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
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/90 border border-slate-200 text-sm font-medium text-[#07152F] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="password"
                  className="block text-xs font-bold uppercase tracking-wider text-[#07152F]"
                >
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs font-semibold text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock size={17} />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-11 py-3 rounded-xl bg-white/90 border border-slate-200 text-sm font-medium text-[#07152F] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
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
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-medium text-[#475569]">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-primary focus:ring-primary border-slate-300"
                />
                <span>Remember this device for 30 days</span>
              </label>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              disabled={isLoading}
              className={cn(
                'w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-white shadow-xl shadow-primary/25 transition-all duration-200 text-sm',
                isLoading ? 'bg-primary/70 cursor-not-allowed' : 'bg-primary hover:bg-primary/90',
              )}
            >
              {isLoading ? (
                <span>Signing in...</span>
              ) : (
                <>
                  <span>Sign In to Account</span>
                  <ArrowRight size={16} strokeWidth={2.5} />
                </>
              )}
            </button>
          </form>

          {/* Demo Login Quick Switcher */}
          <div className="mt-8 pt-6 border-t border-slate-200/60">
            <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 text-center">
              Quick Demo Login
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => fillDemoAccount('client@patadev.ke')}
                className="py-2 px-3 rounded-lg bg-slate-100/90 hover:bg-slate-200/80 text-[11px] font-semibold text-slate-700 transition-colors border border-slate-200/50 text-center"
              >
                Client Account
              </button>
              <button
                type="button"
                onClick={() => fillDemoAccount('dev@patadev.ke')}
                className="py-2 px-3 rounded-lg bg-slate-100/90 hover:bg-slate-200/80 text-[11px] font-semibold text-slate-700 transition-colors border border-slate-200/50 text-center"
              >
                Developer Account
              </button>
            </div>
          </div>

        </div>

        {/* Footer Link to Register */}
        <div className="text-center mt-6 text-xs text-[#64748B] font-medium">
          Don&apos;t have a PataDev account?{' '}
          <Link to="/register" className="font-bold text-primary hover:underline">
            Sign up now
          </Link>
        </div>

        {/* Escrow assurance note */}
        <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] font-medium text-[#64748B]">
          <ShieldCheck size={14} className="text-emerald-500" />
          <span>Encrypted 256-bit authentication</span>
        </div>

      </div>
    </div>
  );
}