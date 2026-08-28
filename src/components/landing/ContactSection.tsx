import { Check, CreditCard, MessageCircle, LayoutDashboard } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { mockMilestones } from '../../data/mock';

export default function ContactSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="py-20 bg-[#F5F9FF]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        {/* Header */}
        <div
          className="text-center mb-12 transition-all duration-500"
          style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(20px)' }}
        >
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Platform</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#07152F] tracking-tight">
            How PataDev manages your project
          </h2>
          <p className="text-slate-500 mt-3 max-w-md mx-auto text-sm">
            One structured workspace from proposal to final payment.
          </p>
        </div>

        {/* Product mockup */}
        <div
          className="max-w-4xl mx-auto transition-all duration-700"
          style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(30px)', transitionDelay: '150ms' }}
        >
          <div className="bg-white/80 backdrop-blur-xl border border-white/80 shadow-2xl shadow-slate-200/50 rounded-3xl overflow-hidden">

            {/* Mockup topbar */}
            <div className="flex items-center gap-3 px-5 py-3.5 border-b border-slate-100 bg-white/60">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-300" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-300" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-300" />
              </div>
              <div className="flex-1 bg-slate-100/80 rounded-full h-5 flex items-center px-3">
                <span className="text-[10px] text-slate-400 font-medium">app.patadev.ke/dashboard/projects/proj-01</span>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">

              {/* Project Overview */}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-4">
                  <LayoutDashboard size={15} className="text-primary" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Project Overview</span>
                </div>
                <h3 className="font-bold text-[#07152F] text-sm mb-1">Customer CRM Platform</h3>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  In Progress
                </span>

                <div className="space-y-3">
                  <div>
                    <p className="text-[11px] text-slate-400 font-medium mb-1">Progress</p>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full w-[58%] bg-gradient-to-r from-primary to-primary/60 rounded-full" />
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">58% complete</p>
                  </div>
                  <div className="flex justify-between">
                    <div>
                      <p className="text-[11px] text-slate-400 font-medium">Budget</p>
                      <p className="text-sm font-bold text-[#07152F]">KES 912,000</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[11px] text-slate-400 font-medium">Developer</p>
                      <div className="flex items-center gap-1.5 justify-end mt-0.5">
                        <div className="w-5 h-5 rounded-full bg-primary/10 text-primary font-bold text-[9px] flex items-center justify-center">AM</div>
                        <p className="text-xs font-semibold text-[#07152F]">Alex Morgan</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Milestones */}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Check size={15} className="text-emerald-600" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Milestones</span>
                </div>
                <div className="space-y-3">
                  {mockMilestones.map((m) => (
                    <div key={m.title} className="flex items-start gap-2.5">
                      <div className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${
                        m.stage === 'complete' ? 'bg-emerald-100' : m.stage === 'current' ? 'bg-primary/10' : 'bg-slate-100'
                      }`}>
                        {m.stage === 'complete'
                          ? <Check size={9} className="text-emerald-600" strokeWidth={3} />
                          : <span className={`w-2 h-2 rounded-full ${m.stage === 'current' ? 'bg-primary' : 'bg-slate-300'}`} />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-[12px] font-semibold truncate ${m.stage === 'complete' ? 'text-slate-400 line-through' : 'text-[#07152F]'}`}>
                          {m.title}
                        </p>
                        <p className="text-[10px] text-slate-400">{m.detail}</p>
                      </div>
                      <span className="text-[11px] font-bold text-[#07152F] flex-shrink-0">{m.amount}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment + Messages */}
              <div className="p-5 space-y-5">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <CreditCard size={15} className="text-violet-600" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Payment</span>
                  </div>
                  <div className="bg-violet-50 rounded-xl p-3 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-[11px] text-slate-500">Total Budget</span>
                      <span className="text-[11px] font-bold text-[#07152F]">KES 912,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[11px] text-slate-500">Released</span>
                      <span className="text-[11px] font-bold text-emerald-600">KES 288,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[11px] text-slate-500">In Escrow</span>
                      <span className="text-[11px] font-bold text-violet-600">KES 624,000</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <MessageCircle size={15} className="text-amber-600" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Messages</span>
                  </div>
                  <div className="space-y-2">
                    <div className="bg-slate-100 rounded-xl rounded-tl-none px-3 py-2 max-w-[90%]">
                      <p className="text-[11px] text-slate-700">Dashboard concepts are ready for review 🎉</p>
                      <p className="text-[9px] text-slate-400 mt-0.5">Alex · 10:42 AM</p>
                    </div>
                    <div className="bg-primary/10 rounded-xl rounded-tr-none px-3 py-2 max-w-[90%] ml-auto">
                      <p className="text-[11px] text-primary font-medium">Looks great! Option B wins.</p>
                      <p className="text-[9px] text-primary/60 mt-0.5">You · 10:55 AM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
