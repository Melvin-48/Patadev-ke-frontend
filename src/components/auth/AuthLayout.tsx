import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Code2 } from 'lucide-react';
import AuthBrandPanel from './AuthBrandPanel';

interface AuthLayoutProps {
  title: string;
  description: string;
  icon: ReactNode;
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
    <div className="min-h-screen w-full flex bg-white font-sans text-[#07152F] overflow-hidden">
      
      {/* ────── LEFT AUTHENTICATION PANEL (50-55% Desktop, 100% Mobile) ────── */}
      <div className="w-full lg:w-[52%] xl:w-[50%] min-h-screen flex flex-col justify-between p-6 sm:p-10 lg:p-12 bg-white relative z-10 overflow-y-auto">
        
        {/* Top Logo */}
        <div className="w-full max-w-[440px] mx-auto flex items-center justify-start">
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

        {/* Central Auth Content Container */}
        <div className="w-full max-w-[440px] mx-auto my-auto py-8">
          
          {/* Auth Icon */}
          <div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/25 mb-4">
            {icon}
          </div>

          {/* Heading & Supporting Text */}
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#07152F] tracking-tight">
              {title}
            </h1>
            <p className="text-xs sm:text-sm text-[#64748B] font-medium mt-1.5 leading-relaxed">
              {description}
            </p>
          </div>

          {/* Main Form Content */}
          {children}

        </div>

        {/* Bottom Link / Footer */}
        <div className="w-full max-w-[440px] mx-auto text-center pt-4">
          {bottomLink}
        </div>

      </div>

      {/* ────── RIGHT PROMOTIONAL BRAND PANEL (45-50% Desktop, Hidden on Mobile) ────── */}
      <div className="hidden lg:block lg:w-[48%] xl:w-[50%] relative min-h-screen">
        <AuthBrandPanel headline={brandHeadline} subheadline={brandSubheadline} />
      </div>

    </div>
  );
}
