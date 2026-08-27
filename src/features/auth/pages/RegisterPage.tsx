import { FormEvent, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Card from '../../../components/ui/Card';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { authService } from '../services/auth.service';
import { useAuth } from '../../../contexts/AuthContext';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'CLIENT' | 'DEVELOPER'>('CLIENT');
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      const res = await authService.signUp(email, password, role);
      login({ id: res.userId, email, role: res.role, verified: false }, res.accessToken);
      navigate(`/dashboard/profile/setup/${role.toLowerCase()}`);
    } catch {
      setError('Could not create account. Try a different email.');
    }
  }

  return (
    <div className="max-w-sm mx-auto px-6 py-20">
      <h1 className="text-2xl mb-6">Create an account</h1>
      <Card>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-2">
            <button type="button" onClick={() => setRole('CLIENT')}
              className={`flex-1 py-2 rounded border text-sm ${role === 'CLIENT' ? 'border-ink bg-ink text-paper' : 'border-line text-slate'}`}>
              I need a system built
            </button>
            <button type="button" onClick={() => setRole('DEVELOPER')}
              className={`flex-1 py-2 rounded border text-sm ${role === 'DEVELOPER' ? 'border-ink bg-ink text-paper' : 'border-line text-slate'}`}>
              I build systems
            </button>
          </div>
          <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          {error && <p className="text-danger text-sm">{error}</p>}
          <Button type="submit" className="w-full">Create account</Button>
        </form>
      </Card>
      <p className="text-sm text-slate mt-4 text-center">
        Already have an account? <Link to="/login" className="text-ink underline">Log in</Link>
      </p>
    </div>
  );
}
