import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../lib/supabase/client';
import { usersApi } from '../../../api/users';
import { useAuth } from '../../../contexts/AuthContext';
import { Loader2 } from 'lucide-react';

export default function AuthCallbackPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    let mounted = true;

    async function handleAuthCallback() {
      // The session should already be captured by the Supabase client
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error || !session) {
        if (mounted) navigate('/login');
        return;
      }

      try {
        const backendUser = await usersApi.getMe();
        if (backendUser) {
          login(backendUser as any);
        }
        
        if (mounted) {
          if (backendUser) {
            if (backendUser.role === 'ADMIN') {
              navigate('/admin', { replace: true });
            } else {
              navigate('/dashboard', { replace: true });
            }
          } else {
            navigate('/onboarding');
          }
        }
      } catch (err) {
        // Unregistered user
        if (mounted) navigate('/onboarding');
      }
    }

    handleAuthCallback();

    return () => {
      mounted = false;
    };
  }, [navigate, login]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
      <div className="flex flex-col items-center gap-3">
        <Loader2 size={32} className="text-[#2563EB] animate-spin" />
        <p className="text-slate-600 font-medium">Authenticating...</p>
      </div>
    </div>
  );
}
