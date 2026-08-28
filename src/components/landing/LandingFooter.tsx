import { Link } from 'react-router-dom';
import { Code2 } from 'lucide-react';

export default function LandingFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0F2A5F] text-slate-300 pt-20 pb-8 border-t border-blue-900/50">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-16">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 pr-0 lg:pr-10">
            <Link to="/" className="flex items-center gap-2 inline-flex mb-5">
              <span className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm">
                <Code2 size={16} strokeWidth={2.5} />
              </span>
              <span className="font-extrabold text-lg text-white tracking-tight leading-none">
                PataDev<span className="text-blue-400"> Ke</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm mb-6">
              Connect businesses with skilled developers and build better digital products — milestone by milestone.
            </p>
          </div>

          {/* Links Columns */}
          <div>
            <h3 className="font-bold text-white mb-5 tracking-wide text-sm">FOR CLIENTS</h3>
            <ul className="space-y-3">
              <li><Link to="/projects" className="text-sm text-slate-400 hover:text-white transition-colors">Find Developers</Link></li>
              <li><Link to="/signup" className="text-sm text-slate-400 hover:text-white transition-colors">Post a Project</Link></li>
              <li><a href="#how-it-works" className="text-sm text-slate-400 hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">Payment Protection</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-5 tracking-wide text-sm">FOR DEVELOPERS</h3>
            <ul className="space-y-3">
              <li><Link to="/projects" className="text-sm text-slate-400 hover:text-white transition-colors">Browse Projects</Link></li>
              <li><Link to="/signup" className="text-sm text-slate-400 hover:text-white transition-colors">Create Profile</Link></li>
              <li><a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">Submit a Proposal</a></li>
              <li><a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">Developer Resources</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-5 tracking-wide text-sm">PLATFORM</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">About PataDev</a></li>
              <li><a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">FAQs</a></li>
              <li><a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">Contact Support</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-700/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Code2 size={16} className="text-slate-500" />
            <p className="text-sm text-slate-500">
              &copy; {currentYear} PataDev Ke. All rights reserved.
            </p>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-slate-500 hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#" className="text-sm text-slate-500 hover:text-slate-300 transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
