import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../ui/Button';

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <header className="border-b border-line bg-white">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="font-display font-bold text-lg text-ink">
          PataDev <span className="text-amber-dark">Ke</span>
        </Link>

        <nav className="flex items-center gap-4 text-sm">
          <Link to="/projects" className="text-slate hover:text-ink">Browse Projects</Link>

          {isAuthenticated ? (
            <>
              <Link to="/dashboard/notifications" className="text-slate hover:text-ink">Notifications</Link>
              <Link to="/messages" className="text-slate hover:text-ink">Messages</Link>
              <Link
                to="/dashboard"
                className="text-slate hover:text-ink"
              >
                Dashboard
              </Link>
              <Button variant="secondary" onClick={handleLogout}>Log out</Button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-slate hover:text-ink">Log in</Link>
              <Link to="/register">
                <Button>Get started</Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
