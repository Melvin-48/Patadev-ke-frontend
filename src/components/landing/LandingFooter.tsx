import { Link } from 'react-router-dom';
import { Code2 } from 'lucide-react';

export default function LandingFooter() {
  return (
    <footer className="bg-white border-t border-slate-100 py-12 text-[#07152F]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          
          {/* Col 1 & 2: Brand & Description */}
          <div className="col-span-2 space-y-3">
            <Link to="/" className="flex items-center gap-2 group" aria-label="PataDev Ke home">
              <span className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center text-white shadow-xs">
                <Code2 size={16} strokeWidth={2.5} />
              </span>
              <span className="font-extrabold text-base text-[#07152F] tracking-tight">
                PataDev<span className="text-primary"> Ke</span>
              </span>
            </Link>
            <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
              Kenya's developer-business marketplace. Connecting businesses with skilled developers to build software, milestone by milestone.
            </p>
          </div>

          {/* Col 3: For Clients */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">For Clients</h4>
            <ul className="space-y-2 text-xs font-medium text-slate-600">
              <li><Link to="/signup" className="hover:text-primary transition-colors">Post a Project</Link></li>
              <li><Link to="/projects" className="hover:text-primary transition-colors">Find Developers</Link></li>
              <li><a href="#how-it-works" className="hover:text-primary transition-colors">How It Works</a></li>
            </ul>
          </div>

          {/* Col 4: For Developers */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">For Developers</h4>
            <ul className="space-y-2 text-xs font-medium text-slate-600">
              <li><Link to="/projects" className="hover:text-primary transition-colors">Find Projects</Link></li>
              <li><Link to="/signup" className="hover:text-primary transition-colors">Create Profile</Link></li>
              <li><a href="#faqs" className="hover:text-primary transition-colors">Developer FAQs</a></li>
            </ul>
          </div>

          {/* Col 5: Support & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Support & Legal</h4>
            <ul className="space-y-2 text-xs font-medium text-slate-600">
              <li><Link to="/login" className="hover:text-primary transition-colors">Help Center</Link></li>
              <li><Link to="/login" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/login" className="hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-medium">
          <p>© {new Date().getFullYear()} PataDev Ke. All rights reserved.</p>
          <p>Built for Kenya's tech ecosystem 🇰🇪</p>
        </div>
      </div>
    </footer>
  );
}
