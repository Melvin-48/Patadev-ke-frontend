import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../ui/Button';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="border-b border-line bg-white sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="font-display font-bold text-lg text-ink">
          PataDev <span className="text-amber-dark">Ke</span>
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link to="/projects" className="text-slate hover:text-ink">Browse Projects</Link>
          {isAuthenticated ? (
            <>
              <Link to={`/${user?.role === 'CLIENT' ? 'client' : 'developer'}/dashboard`} className="text-slate hover:text-ink">
                Dashboard
              </Link>
              <Button variant="secondary" onClick={() => { logout(); navigate('/'); }}>Log out</Button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-slate hover:text-ink">Log in</Link>
              <Link to="/register"><Button>Get started</Button></Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}