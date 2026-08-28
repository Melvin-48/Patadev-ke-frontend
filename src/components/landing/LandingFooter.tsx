import { Link } from 'react-router-dom';
import { Code2 } from 'lucide-react';

export default function LandingFooter() {
  return (
    <footer className="bg-white border-t border-slate-100 py-12 text-[#07152F]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1: Brand */}
          <div className="col-span-2 md:col-span-1 space-y-3">
            <Link to="/" className="flex items-center gap-2 group" aria-label="PataDev Ke home">
              <span className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center text-white shadow-sm">
                <Code2 size={14} strokeWidth={2.5} />
              </span>
              <span className="font-bold text-[15px] text-[#07152F] tracking-tight">
                PataDev<span className="text-primary"> Ke</span>
              </span>
            </Link>
            <p className="text-xs text-slate-500 leading-relaxed max-w-xs">
              Kenya's developer-business marketplace. Connecting businesses with skilled developers to build software, milestone by milestone.
            </p>
          </div>

          {/* Col 2: Platform */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Platform</h4>
            <ul className="space-y-2 text-xs font-medium text-slate-600">
              <li><Link to="/projects" className="hover:text-primary transition-colors">Find Developers</Link></li>
              <li><Link to="/projects" className="hover:text-primary transition-colors">Find Projects</Link></li>
              <li><a href="#how-it-works" className="hover:text-primary transition-colors">How It Works</a></li>
            </ul>
          </div>

          {/* Col 3: Company */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Company</h4>
            <ul className="space-y-2 text-xs font-medium text-slate-600">
              <li><a href="#about" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#faqs" className="hover:text-primary transition-colors">FAQ</a></li>
              <li><Link to="/login" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Col 4: Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Support</h4>
            <ul className="space-y-2 text-xs font-medium text-slate-600">
              <li><Link to="/login" className="hover:text-primary transition-colors">Help Center</Link></li>
              <li><Link to="/login" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link to="/login" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} PataDev Ke. All rights reserved.</p>
          <p>Built for Kenya's tech ecosystem 🇰🇪</p>
        </div>
      </div>
    </footer>
  );
}
