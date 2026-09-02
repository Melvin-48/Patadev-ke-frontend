import { Link } from 'react-router-dom';
import {
  Compass,
  FileCheck2,
  TrendingUp,
  CircleDollarSign,
  Briefcase,
  Sparkles,
  ArrowRight,
  Clock3,
} from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
import { mockDevelopers, mockProjects } from '../../../data/mock';

export default function DevDashboard() {
  const { user } = useAuth();

  const opportunities = [
    {
      id: 'opp-1',
      title: 'Fintech Dashboard Redesign',
      category: 'Fintech Â· React, Node.js',
      budget: 'KES 840,000 â€“ KES 1,200,000',
      timeline: '8â€“12 weeks',
      proposals: 6,
    },
    {
      id: 'opp-2',
      title: 'Inventory & POS System',
      category: 'Retail Â· TypeScript, Next.js',
      budget: 'KES 500,000 â€“ KES 720,000',
      timeline: '6â€“8 weeks',
      proposals: 9,
    },
    {
      id: 'opp-3',
      title: 'B2B Customer Portal & API',
      category: 'SaaS Â· PostgreSQL, NestJS',
      budget: 'KES 1,100,000 â€“ KES 1,400,000',
      timeline: '12â€“16 weeks',
      proposals: 3,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/60">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#07152F] tracking-tight">
            Welcome back, {user?.name || 'Developer'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
            Discover projects tailored to your tech stack and submit proposals.
          </p>
        </div>

        <Link
          to="/projects"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#1769FF] hover:bg-blue-600 shadow-sm transition-all self-start sm:self-auto"
        >
          <Compass size={16} />
          <span>Explore Projects</span>
        </Link>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Bids</span>
            <span className="w-8 h-8 rounded-xl bg-blue-50 text-[#1769FF] flex items-center justify-center">
              <FileCheck2 size={18} />
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#07152F]">3</div>
          <span className="text-[11px] font-semibold text-emerald-600 mt-1 inline-block">+1 this week</span>
        </div>

        <div className="bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Matched Projects</span>
            <span className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <TrendingUp size={18} />
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#07152F]">7</div>
          <span className="text-[11px] font-semibold text-slate-400 mt-1 inline-block">Based on your stack</span>
        </div>

        <div className="bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Earned</span>
            <span className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <CircleDollarSign size={18} />
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#07152F]">KES 1.9M</div>
          <span className="text-[11px] font-semibold text-slate-400 mt-1 inline-block">Across completed milestones</span>
        </div>

        <div className="bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Profile Score</span>
            <span className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Sparkles size={18} />
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#07152F]">92%</div>
          <span className="text-[11px] font-semibold text-emerald-600 mt-1 inline-block">Verified badge</span>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Recommended Projects (8 cols) */}
        <section className="lg:col-span-8 bg-white/70 backdrop-blur-xl border border-slate-200/70 rounded-3xl p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-extrabold text-[#07152F] tracking-tight">Recommended For You</h2>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Top opportunities matching your selected skills and services
              </p>
            </div>
            <Link to="/projects" className="text-xs font-bold text-[#1769FF] hover:underline">
              View All
            </Link>
          </div>

          <div className="space-y-4">
            {opportunities.map((opp) => (
              <div
                key={opp.id}
                className="p-5 rounded-2xl bg-white border border-slate-200/70 shadow-2xs hover:shadow-md hover:border-blue-200 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <span className="text-[10px] font-extrabold text-blue-600 uppercase tracking-wider bg-blue-50 px-2.5 py-1 rounded-full inline-block mb-2">
                    {opp.category}
                  </span>
                  <h3 className="text-base font-extrabold text-[#07152F]">{opp.title}</h3>
                  <div className="flex items-center gap-4 text-xs text-slate-500 font-medium mt-2">
                    <span className="font-bold text-[#07152F]">{opp.budget}</span>
                    <span>â€¢</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock3 size={13} className="text-slate-400" />
                      {opp.timeline}
                    </span>
                    <span>â€¢</span>
                    <span>{opp.proposals} proposals</span>
                  </div>
                </div>

                <Link
                  to="/bids"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#1769FF] hover:bg-blue-600 transition-colors shrink-0 self-start sm:self-auto"
                >
                  <span>Submit Proposal</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Aside (4 cols) */}
        <aside className="lg:col-span-4 space-y-6">
          {/* Profile Completeness Card */}
          <div className="bg-white/80 backdrop-blur-xl border border-slate-200/70 rounded-3xl p-6 shadow-xs">
            <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block mb-2">
              Profile Strength
            </span>
            <h3 className="text-base font-extrabold text-[#07152F]">Stand Out to Clients</h3>
            <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">
              Developers with verified credentials and portfolio links receive 3x more proposal acceptances.
            </p>

            <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-600">
                <span>Profile setup</span>
                <span className="text-[#1769FF]">Complete</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-[#1769FF] rounded-full w-[92%]" />
              </div>
            </div>

            <Link
              to="/developer/settings"
              className="mt-5 w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Update Tech Stack
            </Link>
          </div>

          {/* Quick Help */}
          <div className="bg-blue-50/70 border border-blue-100 rounded-3xl p-6">
            <h4 className="text-sm font-extrabold text-[#07152F]">Need Assistance?</h4>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Our Kenyan developer relations team is available to assist with milestone disputes and payments.
            </p>
            <button
              type="button"
              className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-[#1769FF] hover:underline"
            >
              Contact Support â†’
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
