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
    <footer id="contacts" className="relative w-full py-16 lg:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Unified Combined CTA & Footer Card matching Reference Design */}
        <div
          className="relative rounded-[36px] overflow-hidden p-8 sm:p-14 lg:p-20 text-white shadow-2xl transition-all duration-500"
          style={{
            background:
              'radial-gradient(ellipse at top left, #3B82F6 0%, #1769FF 30%, #07152F 70%, #030A19 100%)',
          }}
        >
          {/* Subtle Ambient Glow Blobs */}
          <div
            aria-hidden="true"
            className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none opacity-30"
            style={{
              background: 'radial-gradient(circle, rgba(255,255,255,0.25) 0%, transparent 65%)',
              filter: 'blur(80px)',
            }}
          />

          {/* Top Section: Bold CTA Headline & Contact Button */}
          <div className="relative z-10 mb-16 sm:mb-24 flex flex-col items-start gap-6 max-w-2xl">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight text-white">
              Ready to start building your software project?
            </h2>

            <div>
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-2xl font-bold bg-white text-[#07152F] shadow-xl hover:bg-slate-100 transition-all duration-200 text-sm sm:text-base"
              >
                Contact us
              </Link>
            </div>
          </div>

          {/* Bottom Section: Newsletter & Links Grid */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 pt-10 border-t border-white/15 items-start">
            
            {/* Left 5/12: Newsletter */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <h3 className="text-sm font-bold text-white tracking-wide">
                Newsletter
              </h3>
              <p className="text-xs sm:text-sm text-blue-100/80 leading-relaxed max-w-md">
                We&apos;d love to share our latest developer tech insights and milestone escrow updates with you in our monthly newsletter.
              </p>

              {subscribed ? (
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold py-2">
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
                    className="flex-1 px-4 py-2.5 rounded-xl bg-white/15 backdrop-blur-md border border-white/20 text-xs text-white placeholder-blue-100/60 focus:outline-none focus:ring-2 focus:ring-white/40 transition-all"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/20 text-xs font-bold text-white transition-all shrink-0"
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
                <h4 className="text-xs font-bold text-white tracking-wider">
                  Home
                </h4>
                <ul className="flex flex-col gap-2.5 text-xs text-blue-100/70">
                  <li>
                    <a href="#about" className="hover:text-white transition-colors">
                      Benefits
                    </a>
                  </li>
                  <li>
                    <a href="#services" className="hover:text-white transition-colors">
                      Features
                    </a>
                  </li>
                  <li>
                    <a href="#services" className="hover:text-white transition-colors">
                      Services
                    </a>
                  </li>
                </ul>
              </div>

              {/* Column 2: Platform */}
              <div className="flex flex-col gap-3">
                <h4 className="text-xs font-bold text-white tracking-wider">
                  Platform
                </h4>
                <ul className="flex flex-col gap-2.5 text-xs text-blue-100/70">
                  <li>
                    <a href="#how-it-works" className="hover:text-white transition-colors">
                      Solution
                    </a>
                  </li>
                  <li>
                    <a href="#how-it-works" className="hover:text-white transition-colors">
                      Overview
                    </a>
                  </li>
                  <li>
                    <a href="#pricing" className="hover:text-white transition-colors">
                      Pricing
                    </a>
                  </li>
                </ul>
              </div>

              {/* Column 3: About us & Social Icons */}
              <div className="flex flex-col justify-between h-full gap-6">
                <div className="flex flex-col gap-3">
                  <h4 className="text-xs font-bold text-white tracking-wider">
                    About us
                  </h4>
                  <ul className="flex flex-col gap-2.5 text-xs text-blue-100/70">
                    <li>
                      <a href="#about" className="hover:text-white transition-colors">
                        Connectors
                      </a>
                    </li>
                    <li>
                      <a href="#how-it-works" className="hover:text-white transition-colors">
                        Security
                      </a>
                    </li>
                    <li>
                      <a href="#contacts" className="hover:text-white transition-colors">
                        Contact Us
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Social Icons */}
                <div className="flex items-center gap-3 pt-2">
                  <a
                    href="mailto:contact@patadev.ke"
                    className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white transition-colors"
                    aria-label="Email support"
                  >
                    <Mail size={14} />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white transition-colors"
                    aria-label="LinkedIn profile"
                  >
                    <Linkedin size={14} />
                  </a>
                </div>
              </div>

            </div>

          </div>

          {/* Bottom Copyright Notice */}
          <div className="relative z-10 mt-12 pt-6 text-center text-xs text-blue-100/50">
            © {new Date().getFullYear()} PataDev Ke. All rights reserved.
          </div>

        </div>

      </div>
    </footer>
  );
}
