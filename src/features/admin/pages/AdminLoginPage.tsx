import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, AlertCircle, Loader2, ShieldCheck } from 'lucide-react';
import { useAuth, AuthUser } from '../../../contexts/AuthContext';
import { authService } from '../../auth/services/auth.service';
import { usersService } from '../../users/services/users.service';
import { cn } from '../../../lib/utils';
import { Button } from '../../../components/ui/Button';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    try {
      setIsLoading(true);

      // Authenticate with Supabase
      const res = await authService.signIn(email, password);

      const tempUser: AuthUser = {
        id: res.userId,
        email,
        name: 'Admin',
        role: null,
        verified: true,
        onboarded: true,
      };
      login(tempUser, res.accessToken);

      // Fetch the actual backend profile to verify admin status
      try {
        const backendUser = await usersService.getMe() as any;
        if (backendUser?.role === 'ADMIN' || backendUser?.role === 'SUPER_ADMIN') {
          const fullUser: AuthUser = {
            id: backendUser.id || res.userId,
            email: backendUser.email || email,
            name: backendUser.name || 'Admin',
            role: backendUser.role,
            verified: true,
            onboarded: true,
          };
          login(fullUser, res.accessToken);
          navigate('/admin/dashboard', { replace: true });
          return;
        } else {
          // Not an admin
          setError('Access denied. This account does not have administrator privileges.');
          return;
        }
      } catch {
        setError('Failed to verify administrator privileges.');
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Invalid credentials.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 border border-slate-200">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center mb-4">
            <ShieldCheck className="text-white w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Admin Login</h1>
          <p className="text-slate-500 text-sm mt-1">Sign in to the PataDev administration panel</p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm flex items-start gap-3">
            <AlertCircle size={18} className="shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Admin Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-colors"
              placeholder="admin@patadev.com"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 pr-10 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-colors"
                placeholder="Enter password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 flex justify-center items-center gap-2"
          >
            {isLoading ? <Loader2 size={18} className="animate-spin" /> : null}
            {isLoading ? "Authenticating..." : "Access Dashboard"}
          </Button>
        </form>
      </div>
    </div>
  );
}
