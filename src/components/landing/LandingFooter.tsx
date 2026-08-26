import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Linkedin, CheckCircle2 } from 'lucide-react';

export default function LandingFooter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer id="contacts" className="relative w-full py-16 lg:py-24 overflow-hidden border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Top Section: Bold CTA Headline & Create Account Button */}
        <div className="mb-16 sm:mb-20 flex flex-col items-start gap-6 max-w-2xl">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-[#07152F]">
            Ready to start building your software project?
          </h2>

          <div>
            <Link
              to="/register"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-2xl font-bold text-white shadow-xl shadow-primary/25 hover:bg-primary/90 transition-all duration-200 text-sm sm:text-base"
              style={{ background: '#1769FF' }}
            >
              Create Account
            </Link>
          </div>
        </div>

        {/* Bottom Section: Newsletter & Links Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 pt-10 border-t border-slate-200/80 items-start">
          
          {/* Left 5/12: Newsletter */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <h3 className="text-sm font-extrabold text-[#07152F] tracking-wide">
              Newsletter
            </h3>
            <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed max-w-md">
              We&apos;d love to share our latest developer tech insights and milestone escrow updates with you in our monthly newsletter.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 text-emerald-600 text-xs font-semibold py-2">
                <CheckCircle2 size={16} />
                <span>Thank you for subscribing!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex items-center gap-3 pt-2 max-w-md">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-[#07152F] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#07152F] hover:bg-[#07152F]/90 text-xs font-bold text-white shadow-md transition-all shrink-0"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>

          {/* Right 7/12: 3 Navigation Columns & Social Icons */}
          <div className="lg:col-span-7 grid grid-cols-3 gap-6 sm:gap-8">
            
            {/* Column 1: Home */}
            <div className="flex flex-col gap-3">
              <h4 className="text-xs font-extrabold text-[#07152F] tracking-wider">
                Home
              </h4>
              <ul className="flex flex-col gap-2.5 text-xs font-medium text-[#64748B]">
                <li>
                  <a href="#about" className="hover:text-primary transition-colors">
                    Benefits
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-primary transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-primary transition-colors">
                    Services
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 2: Platform */}
            <div className="flex flex-col gap-3">
              <h4 className="text-xs font-extrabold text-[#07152F] tracking-wider">
                Platform
              </h4>
              <ul className="flex flex-col gap-2.5 text-xs font-medium text-[#64748B]">
                <li>
                  <a href="#how-it-works" className="hover:text-primary transition-colors">
                    Solution
                  </a>
                </li>
                <li>
                  <a href="#how-it-works" className="hover:text-primary transition-colors">
                    Overview
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="hover:text-primary transition-colors">
                    Pricing
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: About us & Social Icons */}
            <div className="flex flex-col justify-between h-full gap-6">
              <div className="flex flex-col gap-3">
                <h4 className="text-xs font-extrabold text-[#07152F] tracking-wider">
                  About us
                </h4>
                <ul className="flex flex-col gap-2.5 text-xs font-medium text-[#64748B]">
                  <li>
                    <a href="#about" className="hover:text-primary transition-colors">
                      Connectors
                    </a>
                  </li>
                  <li>
                    <a href="#how-it-works" className="hover:text-primary transition-colors">
                      Security
                    </a>
                  </li>
                  <li>
                    <a href="#contacts" className="hover:text-primary transition-colors">
                      Contact Us
                    </a>
                  </li>
                </ul>
              </div>

              {/* Social Icons */}
              <div className="flex items-center gap-3 pt-2">
                <a
                  href="mailto:contact@patadev.ke"
                  className="w-8 h-8 rounded-xl bg-white hover:bg-primary/10 border border-slate-200 flex items-center justify-center text-[#07152F] hover:text-primary transition-colors shadow-xs"
                  aria-label="Email support"
                >
                  <Mail size={14} />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-xl bg-white hover:bg-primary/10 border border-slate-200 flex items-center justify-center text-[#07152F] hover:text-primary transition-colors shadow-xs"
                  aria-label="LinkedIn profile"
                >
                  <Linkedin size={14} />
                </a>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Copyright Notice */}
        <div className="mt-12 pt-6 text-center text-xs font-medium text-[#64748B] border-t border-slate-200/80">
          © {new Date().getFullYear()} PataDev Ke. All rights reserved.
        </div>

      </div>
    </footer>
  );
}
