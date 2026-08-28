import { FormEvent, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Card from '../../../components/ui/Card';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { authService } from '../services/auth.service';
import { useAuth } from '../../../contexts/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      // TODO: authService.signIn currently only returns role/id/token -
      // fetch full user (including `verified`) once GET /auth/me exists.
      const res = await authService.signIn(email, password);
      login({ id: res.userId, email, role: res.role, verified: false }, res.accessToken);
      navigate('/dashboard');
    } catch {
      setError('Could not log in. Check your email and password.');
    }
  }

  return (
    <div className="max-w-sm mx-auto px-6 py-20">
      <h1 className="text-2xl mb-6">Log in</h1>
      <Card>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          {error && <p className="text-danger text-sm">{error}</p>}
          <Button type="submit" className="w-full">Log in</Button>
        </form>
      </Card>
      <p className="text-sm text-slate mt-4 text-center">
        No account? <Link to="/register" className="text-ink underline">Register</Link>
      </p>
    </div>
  );
}
