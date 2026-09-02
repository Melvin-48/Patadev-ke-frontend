import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Code2, Briefcase, ArrowRight } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { useAuth } from '../../../contexts/AuthContext';

type RoleSelection = 'CLIENT' | 'DEVELOPER' | null;

export default function RoleSelectionPage() {
  const [selectedRole, setSelectedRole] = useState<RoleSelection>(null);
  const navigate = useNavigate();
  const { setRole } = useAuth();

  const handleContinue = () => {
    if (!selectedRole) return;
    setRole(selectedRole);

    if (selectedRole === 'DEVELOPER') {
      navigate('/onboarding/developer');
    } else {
      navigate('/onboarding/client');
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Simple Header */}
      <header className="w-full border-b border-slate-100 py-4 px-6 flex items-center justify-between bg-white z-10">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-xl bg-[#2563EB] flex items-center justify-center text-white shadow-sm">
            <Code2 size={16} strokeWidth={2.5} />
          </span>
          <span className="font-extrabold text-base text-[#0F172A] tracking-tight leading-none">
            PataDev<span className="text-[#2563EB]"> Ke</span>
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-2xl bg-white animate-[fade-up_0.4s_ease-out_both]">
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight mb-3">
              How will you use PataDev Ke?
            </h1>
            <p className="text-slate-500 text-sm sm:text-base max-w-md mx-auto">
              Choose the option that best describes what you want to do on the platform.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5 mb-10">
            {/* Developer Card */}
            <button
              type="button"
              onClick={() => setSelectedRole('DEVELOPER')}
              className={cn(
                'relative flex flex-col text-left p-6 rounded-2xl border-2 transition-all duration-200 outline-none focus:ring-4 focus:ring-blue-100',
                selectedRole === 'DEVELOPER'
                  ? 'border-[#2563EB] bg-blue-50 shadow-md shadow-blue-100'
                  : 'border-slate-100 hover:border-blue-200 hover:bg-slate-50'
              )}
            >
              <div
                className={cn(
                  'w-12 h-12 rounded-full flex items-center justify-center mb-4 transition-colors',
                  selectedRole === 'DEVELOPER'
                    ? 'bg-[#2563EB] text-white'
                    : 'bg-slate-100 text-slate-500'
                )}
              >
                <Code2 size={24} strokeWidth={2} />
              </div>
              <h3 className={cn("font-bold text-lg mb-2", selectedRole === 'DEVELOPER' ? 'text-[#2563EB]' : 'text-[#0F172A]')}>
                I'm a Developer
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Find projects, showcase your skills, submit proposals, and work with businesses.
              </p>
            </button>

            {/* Client Card */}
            <button
              type="button"
              onClick={() => setSelectedRole('CLIENT')}
              className={cn(
                'relative flex flex-col text-left p-6 rounded-2xl border-2 transition-all duration-200 outline-none focus:ring-4 focus:ring-blue-100',
                selectedRole === 'CLIENT'
                  ? 'border-[#2563EB] bg-blue-50 shadow-md shadow-blue-100'
                  : 'border-slate-100 hover:border-blue-200 hover:bg-slate-50'
              )}
            >
              <div
                className={cn(
                  'w-12 h-12 rounded-full flex items-center justify-center mb-4 transition-colors',
                  selectedRole === 'CLIENT'
                    ? 'bg-[#2563EB] text-white'
                    : 'bg-slate-100 text-slate-500'
                )}
              >
                <Briefcase size={24} strokeWidth={2} />
              </div>
              <h3 className={cn("font-bold text-lg mb-2", selectedRole === 'CLIENT' ? 'text-[#2563EB]' : 'text-[#0F172A]')}>
                I'm a Client
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Find skilled developers, post projects, and turn your ideas into working products.
              </p>
            </button>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleContinue}
              disabled={!selectedRole}
              className={cn(
                'inline-flex items-center gap-2 px-10 py-3.5 rounded-full font-bold text-[15px] transition-all',
                selectedRole
                  ? 'bg-[#2563EB] text-white hover:bg-[#1D4ED8] shadow-md hover:shadow-lg'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              )}
            >
              Continue
              <ArrowRight size={18} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}


