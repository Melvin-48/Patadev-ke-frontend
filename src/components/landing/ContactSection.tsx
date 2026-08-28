import { Link } from 'react-router-dom';
import { CheckCircle, LayoutDashboard, Check, CreditCard, MessageCircle } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { mockMilestones } from '../../data/mock';

export default function ContactSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="py-24 bg-white">
      <div
        className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 600ms cubic-bezier(0.22, 1, 0.36, 1), transform 600ms cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Content (For Businesses) */}
          <div className="order-2 lg:order-1">
            <span className="inline-block text-[#2563EB] text-xs font-extrabold uppercase tracking-widest mb-6">
              For Businesses
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight leading-tight mb-6">
              Have a project in mind?
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-10 max-w-lg">
              Find the right developer and turn your idea into a working product.
            </p>

            <ul className="space-y-5 mb-10">
              {[
                'Post projects easily, no technical jargon needed',
                'Review developer proposals side by side',
                'Track project milestones in real time',
                'Release payments only when work is approved',
              ].map((benefit) => (
                <li key={benefit} className="flex items-start gap-3 text-base text-[#0F172A] font-medium">
                  <CheckCircle size={22} className="text-[#2563EB] flex-shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>

            <Link
              to="/signup"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#2563EB] text-white font-bold text-[15px] hover:bg-[#1D4ED8] transition-colors shadow-sm"
            >
              Post a Project
            </Link>
          </div>

          {/* UI Mockup (Proposal/Project Interface) */}
          <div className="order-1 lg:order-2">
            <div className="bg-white border border-slate-200 shadow-xl shadow-slate-200/50 rounded-3xl overflow-hidden relative">
              {/* Mockup Window Controls */}
              <div className="flex items-center gap-3 px-5 py-3 border-b border-slate-100 bg-[#F8FAFC]">
                <div className="flex gap-2">
                  <span className="w-3 h-3 rounded-full bg-slate-300" />
                  <span className="w-3 h-3 rounded-full bg-slate-300" />
                  <span className="w-3 h-3 rounded-full bg-slate-300" />
                </div>
              </div>

              {/* Mockup Body */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-bold text-[#0F172A] text-lg">Customer CRM Platform</h3>
                    <p className="text-xs text-slate-500 mt-1">Proposal from Alex Morgan</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#2563EB] bg-blue-50 border border-blue-100 px-3 py-1 rounded-full">
                    Awaiting Approval
                  </span>
                </div>

                {/* Milestone Tracker Mockup */}
                <div className="space-y-4 mb-6">
                  {mockMilestones.slice(0, 3).map((m, i) => (
                    <div key={m.title} className="flex items-start gap-4 p-4 rounded-xl border border-slate-100 bg-[#F8FAFC]">
                      <div className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                        i === 0 ? 'bg-[#2563EB] text-white' : 'bg-slate-200 text-slate-400'
                      }`}>
                        {i === 0 ? <Check size={14} strokeWidth={3} /> : <span className="text-[10px] font-bold">{i + 1}</span>}
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm font-bold ${i === 0 ? 'text-[#0F172A]' : 'text-slate-600'}`}>{m.title}</p>
                        <p className="text-xs text-slate-500 mt-1">{m.detail}</p>
                      </div>
                      <span className="text-sm font-bold text-[#0F172A]">{m.amount}</span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3">
                  <button className="flex-1 bg-[#2563EB] text-white text-sm font-bold py-3 rounded-xl">Accept Proposal</button>
                  <button className="flex-1 bg-white border border-slate-200 text-[#0F172A] text-sm font-bold py-3 rounded-xl">Message Alex</button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
