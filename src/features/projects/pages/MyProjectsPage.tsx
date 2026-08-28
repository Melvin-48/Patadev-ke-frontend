import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, Building2, Filter, MoreHorizontal, Plus } from 'lucide-react';
import PageHeader from '../../../components/dashboard/PageHeader';
import StatusBadge from '../../../components/dashboard/StatusBadge';
import { useToast, Toast } from '../../../components/dashboard/useToast';
import { selectedBidId, mockProjects } from '../../../data/mock';
import { ProjectStatus } from '../../../types';

type Filter = 'All projects' | ProjectStatus;

const filters: Filter[] = ['All projects', 'OPEN', 'MATCHED', 'COMPLETED', 'DRAFT'];

// Client's project list. TODO: replace mockProjects with
// projectsService.list filtered to the current client's own projects.
export default function MyProjectsPage() {
  const [filter, setFilter] = useState<Filter>('All projects');
  const navigate = useNavigate();
  const { toast, notify } = useToast();

  const filtered = filter === 'All projects'
    ? mockProjects
    : mockProjects.filter((project) => project.status === filter);

  function openProject(project: (typeof mockProjects)[number]) {
    if (project.status === 'DRAFT') return navigate('/dashboard/projects/new');
    if (project.status === 'OPEN') return navigate(`/dashboard/projects/${project.id}/bids`);
    return navigate(`/dashboard/engagements/${selectedBidId}`);
  }

  return (
    <>
      <PageHeader
        eyebrow="CLIENT WORKSPACE"
        title="My projects"
        description="Manage your projects, compare bids, and keep work moving forward."
        action={
          <button className="button button-primary" onClick={() => navigate('/dashboard/projects/new')}>
            <Plus size={17} /> New project
          </button>
        }
      />

      <div className="filter-bar">
        <div className="segmented">
          {filters.map((item) => (
            <button key={item} className={filter === item ? 'active' : ''} onClick={() => setFilter(item)}>
              {item === 'All projects' ? item : (
                <>
                  <span className="filter-dot" />{item}
                </>
              )}
            </button>
          ))}
        </div>
        <button className="button button-outline"><Filter size={15} /> Filters</button>
      </div>

      <div className="projects-table panel">
        <div className="table-head">
          <span>PROJECT</span>
          <span>STATUS</span>
          <span>BIDS</span>
          <span>BUDGET</span>
          <span>LAST UPDATED</span>
          <span />
        </div>
        {filtered.map((project) => (
          <div className="table-row" key={project.id} onClick={() => openProject(project)}>
            <div className="table-project">
              <span className={`project-symbol ${project.accent}`}><Building2 size={17} /></span>
              <span>
                <strong>{project.title}</strong>
                <small>{project.category}</small>
              </span>
            </div>
            <StatusBadge status={project.status} />
            <span>{project.bids || '—'}</span>
            <span>{project.budgetLabel}</span>
            <span>{project.updated}</span>
            <button
              className="row-action"
              onClick={(event) => { event.stopPropagation(); openProject(project); }}
              aria-label={`Open ${project.title}`}
            >
              <MoreHorizontal size={18} />
            </button>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="empty-state">
            <Briefcase size={25} />
            <strong>No projects here yet</strong>
            <span>Try a different filter to see more projects.</span>
          </div>
        )}
      </div>

      <Toast message={toast} />
    </>
  );
}