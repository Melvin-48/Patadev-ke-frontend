import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Code2 } from 'lucide-react';

/**
 * PageTransitionLoader Component
 * Triggers a 3-second spinning loader overlay on page route transitions.
 * Ensures every new page displays the 3s loader cycle before revealing content at top of page.
 */
export default function PageTransitionLoader() {
  const { pathname } = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Start loader overlay on route change
    setIsLoading(true);
    setFadeOut(false);

    // After 2.7s start smooth fade out, complete at 3s
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 2700);

    const completeTimer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [pathname]);

  if (!isLoading) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#07152F] text-white select-none transition-opacity duration-300 ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* ────── Ambient Background Glows ────── */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(23,105,255,0.2) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      {/* ────── Central Spinning Brand Loader ────── */}
      <div className="relative flex flex-col items-center justify-center gap-6 z-10">
        
        {/* Outer Spinning Dual Rings */}
        <div className="relative w-20 h-20 flex items-center justify-center">
          {/* Track 1 (Spinning Clockwise) */}
          <div className="absolute inset-0 rounded-full border-4 border-white/10 border-t-primary border-r-primary animate-spin" />
          
          {/* Track 2 (Spinning Counter-Clockwise) */}
          <div className="absolute inset-2 rounded-full border-4 border-white/5 border-b-blue-400 border-l-blue-400 animate-[spin_1.5s_linear_infinite_reverse]" />
          
          {/* Center Brand Icon */}
          <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/40 animate-pulse">
            <Code2 size={22} strokeWidth={2.5} />
          </div>
        </div>

        {/* Brand Name & Status */}
        <div className="text-center space-y-1.5">
          <div className="text-xl font-extrabold tracking-tight text-white">
            PataDev <span className="text-primary">Ke</span>
          </div>
          <div className="text-xs font-medium text-slate-300 tracking-wider uppercase animate-pulse">
            Loading platform...
          </div>
        </div>

        {/* 3-Second Progress Bar Fill */}
        <div className="w-48 h-1 rounded-full bg-white/10 overflow-hidden mt-2">
          <div className="h-full bg-gradient-to-r from-primary via-blue-400 to-indigo-400 rounded-full animate-[progress_3s_linear]" />
        </div>

      </div>

    </div>
  );
}
