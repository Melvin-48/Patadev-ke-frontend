import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FolderKanban, FileText, Plus, Activity } from 'lucide-react';
import DashboardHeader from '../../../components/dashboard/DashboardHeader';
import DashboardKpiCard from '../../../components/dashboard/DashboardKpiCard';
import QuickActions from '../../../components/dashboard/QuickActions';
import ProjectCard from '../../../components/dashboard/ProjectCard';
import ProposalRow from '../../../components/dashboard/ProposalRow';
import AttentionCard from '../../../components/dashboard/AttentionCard';
import ActivityItem from '../../../components/dashboard/ActivityItem';

import { ProjectsService } from '../services/projects.service';
import {
  Project,
  Proposal,
  ActivityItemData,
  AttentionItemData,
  ClientDashboardMetrics,
} from '../types/project.types';

type ProjectFilter = 'ALL' | 'ACTIVE' | 'PENDING' | 'COMPLETED';

export default function ClientDashboard() {
  const [metrics, setMetrics] = useState<ClientDashboardMetrics | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [attentionItems, setAttentionItems] = useState<AttentionItemData[]>([]);
  const [activities, setActivities] = useState<ActivityItemData[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>('ALL');

  useEffect(() => {
    let isMounted = true;

    async function loadDashboardData() {
      try {
        setIsLoading(true);
        const [
          metricsData,
          projectsData,
          proposalsData,
          attentionData,
          activitiesData,
        ] = await Promise.all([
          ProjectsService.getClientMetrics(),
          ProjectsService.getClientProjects(),
          ProjectsService.getRecentProposals(),
          ProjectsService.getAttentionItems(),
          ProjectsService.getRecentActivities(),
        ]);

        if (isMounted) {
          setMetrics(metricsData);
          setProjects(projectsData);
          setProposals(proposalsData);
          setAttentionItems(attentionData);
          setActivities(activitiesData);
        }
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadDashboardData();

    return () => {
      isMounted = false;
    };
  }, []);

  // Filter projects based on active tab
  const filteredProjects = projects.filter((p) => {
    if (activeFilter === 'ACTIVE') return p.status === 'In Progress' || p.status === 'Action Required';
    if (activeFilter === 'PENDING') return p.status === 'Pending';
    if (activeFilter === 'COMPLETED') return p.status === 'Completed';
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      
      {/* 1. Header */}
      <DashboardHeader />

      {/* 2. KPI Summary */}
      {metrics && <DashboardKpiCard metrics={metrics} isLoading={isLoading} />}

      {/* 3. Quick Actions */}
      <QuickActions />

      {/* 4. Main Responsive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* â”€â”€â”€â”€â”€â”€ LEFT / LARGE COLUMN (8 cols desktop) â”€â”€â”€â”€â”€â”€ */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* â”€â”€â”€â”€â”€â”€ Active Projects Section â”€â”€â”€â”€â”€â”€ */}
          <section className="bg-white/40 backdrop-blur-md rounded-3xl p-6 border border-slate-200/50 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl font-extrabold text-[#07152F] tracking-tight">
                  Active Projects
                </h2>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Manage your current projects and milestones
                </p>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200/60 self-start sm:self-auto text-xs font-bold">
                {(['ALL', 'ACTIVE', 'PENDING', 'COMPLETED'] as ProjectFilter[]).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveFilter(tab)}
                    className={`px-3 py-1 rounded-lg transition-all duration-150 capitalize cursor-pointer ${
                      activeFilter === tab
                        ? 'bg-white text-primary shadow-2xs font-extrabold'
                        : 'text-slate-500 hover:text-[#07152F]'
                    }`}
                  >
                    {tab.toLowerCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Projects List or Empty State */}
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[1, 2].map((i) => (
                  <div key={i} className="h-56 bg-white/70 rounded-2xl animate-pulse border border-slate-200/50" />
                ))}
              </div>
            ) : filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {filteredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            ) : (
              /* Empty State for Projects */
              <div className="text-center py-12 px-4 rounded-2xl bg-white/80 border border-dashed border-slate-200">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-3">
                  <FolderKanban size={24} />
                </div>
                <h3 className="text-base font-bold text-[#07152F]">No projects found</h3>
                <p className="text-xs text-slate-500 font-medium mt-1 max-w-sm mx-auto">
                  Post your first project and start connecting with skilled developers.
                </p>
                <Link
                  to="/client/projects/new"
                  className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#1769FF] hover:bg-blue-600 shadow-sm transition-all"
                >
                  <Plus size={14} strokeWidth={2.5} />
                  <span>Post a Project</span>
                </Link>
              </div>
            )}
          </section>

          {/* â”€â”€â”€â”€â”€â”€ Recent Proposals Section â”€â”€â”€â”€â”€â”€ */}
          <section className="bg-white/40 backdrop-blur-md rounded-3xl p-6 border border-slate-200/50 shadow-xs">
            <div className="flex items-center justify-between gap-4 mb-5">
              <div>
                <h2 className="text-xl font-extrabold text-[#07152F] tracking-tight">
                  Recent Proposals
                </h2>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Developers who recently bid on your projects
                </p>
              </div>

              <Link
                to="/client/dashboard"
                className="text-xs font-bold text-primary hover:underline"
              >
                View all
              </Link>
            </div>

            {isLoading ? (
              <div className="space-y-3">
                {[1, 2].map((i) => (
                  <div key={i} className="h-16 bg-white/70 rounded-xl animate-pulse border border-slate-200/50" />
                ))}
              </div>
            ) : proposals.length > 0 ? (
              <div className="space-y-3">
                {proposals.map((proposal) => (
                  <ProposalRow key={proposal.id} proposal={proposal} />
                ))}
              </div>
            ) : (
              /* Empty State for Proposals */
              <div className="text-center py-10 px-4 rounded-2xl bg-white/80 border border-dashed border-slate-200">
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-2">
                  <FileText size={20} />
                </div>
                <h3 className="text-sm font-bold text-[#07152F]">No proposals yet</h3>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  Once developers submit proposals, they will appear here.
                </p>
              </div>
            )}
          </section>

        </div>

        {/* â”€â”€â”€â”€â”€â”€ RIGHT SIDEBAR COLUMN (4 cols desktop) â”€â”€â”€â”€â”€â”€ */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Needs Your Attention (Conditional rendering) */}
          <AttentionCard items={attentionItems} />

          {/* Recent Activity Card */}
          <div className="bg-white/80 backdrop-blur-xl border border-slate-200/70 rounded-3xl p-6 shadow-xs">
            <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <Activity size={16} />
                </div>
                <h3 className="text-base font-extrabold text-[#07152F] tracking-tight">
                  Recent Activity
                </h3>
              </div>
            </div>

            {isLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-12 bg-slate-100/80 rounded-xl animate-pulse" />
                ))}
              </div>
            ) : activities.length > 0 ? (
              <div className="divide-y divide-slate-100">
                {activities.map((activity) => (
                  <ActivityItem key={activity.id} activity={activity} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-xs font-medium text-slate-400">
                No recent activity
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
