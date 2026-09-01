import React, { useEffect, useState } from 'react';
import LandingFooter from '../landing/LandingFooter';

export interface TOCItem {
  id: string;
  title: string;
}

interface LegalPageLayoutProps {
  title: string;
  subtitle: string;
  lastUpdated: string;
  toc: TOCItem[];
  children: React.ReactNode;
}

export default function LegalPageLayout({
  title,
  subtitle,
  lastUpdated,
  toc,
  children,
}: LegalPageLayoutProps) {
  const [activeSection, setActiveSection] = useState<string>('');

  // Handle intersection observer to highlight active TOC item
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -60% 0px' }
    );

    toc.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [toc]);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      // Offset for fixed navbar
      const y = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
      // Update hash without jumping
      window.history.pushState(null, '', `#${id}`);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <main className="flex-1 w-full max-w-[1200px] mx-auto px-5 sm:px-8 py-12 lg:py-20">
        
        {/* Page Header */}
        <div className="mb-12 lg:mb-16 max-w-3xl">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0F172A] tracking-tight mb-4">
            {title}
          </h1>
          <p className="text-lg text-slate-500 mb-4">{subtitle}</p>
          <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
            Last updated: {lastUpdated}
          </p>
        </div>

        {/* Content Layout */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          
          {/* Table of Contents - Sidebar */}
          <aside className="w-full lg:w-72 shrink-0">
            <div className="lg:sticky lg:top-28 bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <h3 className="font-bold text-[#0F172A] mb-4 uppercase tracking-wider text-sm">
                Table of Contents
              </h3>
              <nav className="flex flex-col gap-2.5 max-h-[60vh] overflow-y-auto custom-scrollbar pr-2">
                {toc.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => handleScroll(e, item.id)}
                    className={`text-sm font-medium transition-colors ${
                      activeSection === item.id || window.location.hash === `#${item.id}`
                        ? 'text-[#2563EB]'
                        : 'text-slate-500 hover:text-[#0F172A]'
                    }`}
                  >
                    {item.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Legal Content */}
          <div className="flex-1 max-w-[800px] prose prose-slate prose-headings:text-[#0F172A] prose-headings:font-bold prose-a:text-[#2563EB] prose-a:no-underline hover:prose-a:underline prose-p:leading-relaxed prose-li:leading-relaxed">
            <div className="space-y-12">
              {children}
            </div>
            
            <div className="mt-16 pt-8 border-t border-slate-200">
              <p className="text-sm text-slate-500 italic">
                These documents are provided as part of the PataDev Ke platform and should be reviewed and finalized by the project's legal advisor before production use.
              </p>
            </div>
          </div>
        </div>
      </main>

      <LandingFooter />
    </div>
  );
}
