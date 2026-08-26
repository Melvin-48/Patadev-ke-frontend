import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Code2 } from 'lucide-react';
import AuthBrandPanel from './AuthBrandPanel';

interface AuthLayoutProps {
  title: string;
  description: string;
  icon?: ReactNode;
  brandHeadline?: string;
  brandSubheadline?: string;
  children: ReactNode;
  bottomLink?: ReactNode;
}

export default function AuthLayout({
  title,
  description,
  icon,
  brandHeadline,
  brandSubheadline,
  children,
  bottomLink,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen w-full flex bg-[#FAFCFF] font-sans text-[#07152F] overflow-hidden">
      
      {/* ────── LEFT AUTHENTICATION PANEL (55% Desktop, 100% Mobile) ────── */}
      <div className="w-full lg:w-[55%] min-h-screen flex flex-col justify-between p-6 sm:p-10 lg:p-14 bg-gradient-to-br from-blue-50/80 via-slate-50 to-indigo-50/60 relative z-10 overflow-y-auto">
        
        {/* Soft Ambient Background Lighting Blobs */}
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
          <div
            className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(23,105,255,0.06) 0%, transparent 70%)',
              filter: 'blur(90px)',
            }}
          />
          <div
            className="absolute -bottom-32 left-1/4 w-[500px] h-[500px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 70%)',
              filter: 'blur(90px)',
            }}
          />
        </div>

        {/* Content Container Constrained to 440px */}
        <div className="relative z-10 w-full max-w-[440px] mx-auto my-auto py-6">
          
          {/* Form Wrapper Glass Card (Contains PataDev Ke Logo) */}
          <div className="bg-white/90 backdrop-blur-xl shadow-xl shadow-slate-200/50 rounded-3xl p-7 sm:p-9 border border-slate-200/80">
            
            {/* Logo INSIDE the Form Card */}
            <div className="mb-6">
              <Link
                to="/"
                className="inline-flex items-center gap-2.5 group transition-transform hover:scale-105"
                aria-label="PataDev Ke Home"
              >
                <span className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-200 shadow-xs">
                  <Code2 size={19} strokeWidth={2.5} />
                </span>
                <span className="font-extrabold text-xl text-[#07152F] tracking-tight">
                  PataDev <span className="text-primary">Ke</span>
                </span>
              </Link>
            </div>

            {/* Optional Auth Icon */}
            {icon && (
              <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                {icon}
              </div>
            )}

            {/* Heading & Supporting Text */}
            <div className="mb-6">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#07152F] tracking-tight leading-tight">
                {title}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1.5 leading-relaxed">
                {description}
              </p>
            </div>

            {/* Main Form Content */}
            {children}

          </div>

          {/* Bottom Link */}
          {bottomLink && (
            <div className="mt-6 text-center text-xs text-slate-500 font-medium">
              {bottomLink}
            </div>
          )}

        </div>

      </div>

      {/* ────── RIGHT BRAND PANEL WITH IMAGE BACKGROUND (45% Desktop, Hidden on Mobile) ────── */}
      <div className="hidden lg:block lg:w-[45%] relative min-h-screen">
        <AuthBrandPanel headline={brandHeadline} subheadline={brandSubheadline} />
      </div>

    </div>
  );
}
