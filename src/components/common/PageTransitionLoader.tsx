import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * PageTransitionLoader Component
 * Minimal translucent white/light-blue glassmorphic page transition loader.
 * Displays a single light-blue circular spinner, "PataDev Ke" brand name, and "Loading..." text for 3s.
 */
export default function PageTransitionLoader() {
  const { pathname } = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Activate loader on route change
    setIsLoading(true);
    setFadeOut(false);

    // Fade out at 2.7s, complete & unmount at 3.0s
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
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-white/95 via-blue-50/90 to-blue-100/80 backdrop-blur-xl select-none transition-opacity duration-300 ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center justify-center gap-2.5 text-center">
        
        {/* Single minimal circular spinner */}
        <div className="w-7 h-7 rounded-full border-2 border-primary/20 border-t-primary animate-spin mb-0.5" />

        {/* Brand Name */}
        <div className="text-lg font-semibold tracking-tight text-[#07152F]">
          PataDev <span className="text-primary">Ke</span>
        </div>

        {/* Contextual Status Text */}
        <div className="text-xs font-medium text-slate-500">
          Loading...
        </div>

      </div>
    </div>
  );
}
