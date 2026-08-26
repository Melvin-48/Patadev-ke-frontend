import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Code2, Mail, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your registered email address.');
      return;
    }

    setIsLoading(true);
    setError(null);

    // Simulate password reset email dispatch
    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-hidden bg-[#070D19]"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
      }}
    >
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
        <div
          className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)',
            filter: 'blur(90px)',
          }}
        />
        <div
          className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(23,105,255,0.25) 0%, transparent 70%)',
            filter: 'blur(90px)',
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-xl rounded-3xl bg-white shadow-2xl border border-white/20 overflow-hidden p-8 sm:p-12 text-[#07152F]">
        
        {/* Brand Header */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-200">
              <Code2 size={18} strokeWidth={2.5} />
            </span>
            <span className="font-bold text-lg text-[#07152F] tracking-tight">
              PataDev <span className="text-primary">Ke</span>
            </span>
          </Link>

          <Link
            to="/login"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#64748B] hover:text-primary transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Back to login</span>
          </Link>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-extrabold text-[#07152F] tracking-tight mb-2">
            Reset Password
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B]">
            Enter your account email and we&apos;ll send you a password reset link.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-semibold flex items-center gap-2">
            <AlertCircle size={16} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {submitted ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 size={24} />
            </div>
            <h2 className="text-lg font-bold text-[#07152F]">
              Check your email
            </h2>
            <p className="text-xs text-[#64748B] max-w-sm mx-auto">
              We&apos;ve sent a password recovery link to <span className="font-bold text-[#07152F]">{email}</span>.
            </p>
            <div className="pt-4">
              <Link
                to="/login"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-primary text-white text-xs font-bold shadow-md hover:bg-blue-600 transition-all"
              >
                Return to Login
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold text-[#07152F] mb-1.5 text-left"
              >
                Address email
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
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#F8FAFC] border border-slate-200 text-sm font-medium text-[#07152F] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary focus:bg-white transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl font-bold text-white shadow-lg bg-[#1769FF] hover:bg-blue-600 shadow-primary/25 transition-all text-sm mt-2"
            >
              {isLoading ? 'Sending Link...' : 'Send Reset Link'}
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
