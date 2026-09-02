import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowUpRight,
  Building2,
  ChevronDown,
  CircleDollarSign,
  Clock3,
  ListFilter,
  Search,
  Star,
  UsersRound,
} from 'lucide-react';
import PageHeader from '../../../components/dashboard/PageHeader';
import { useToast, Toast } from '../../../components/dashboard/useToast';
import { useAuth } from '../../../contexts/AuthContext';
import { mockProjects } from '../../../data/mock';

export default function BrowseProjectsPage() {
  const [search, setSearch] = useState('');
  const { toast, notify } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isDeveloper = user?.role === 'DEVELOPER';

  const browseProjects = mockProjects.filter(
    (project) => String(project.status) === 'OPEN' || project.status === 'DRAFT',
  );
  const results = browseProjects.filter(
    (project) =>
      project.title.toLowerCase().includes(search.toLowerCase()) ||
      project.category.toLowerCase().includes(search.toLowerCase()),
  );

  function openProject(project: (typeof mockProjects)[number]) {
    if (isDeveloper) {
      return navigate('/dashboard/bids', { state: { openBidForm: true } });
    }
    return navigate(`/dashboard/projects/${project.id}/bids`);
  }

  return (
    <>
      <PageHeader
        eyebrow="DEVELOPER WORKSPACE"
        title="Find your next project"
        description="Explore work from thoughtful clients and build something meaningful."
        action={
          <button className="button button-outline" onClick={() => notify('Saved projects opened')}>
            <Star size={16} /> Saved projects
          </button>
        }
      />

      <div className="browse-toolbar">
        <div className="search-input">
          <Search size={17} />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search projects or skills"
          />
        </div>
        <button className="button button-outline">
          <ListFilter size={16} /> Sort: Newest <ChevronDown size={14} />
        </button>
      </div>

      <div className="browse-layout">
        <div className="browse-results">
          <div className="results-heading">
            <strong>{results.length} projects</strong>
            <span>Showing opportunities matched to your profile</span>
          </div>
          {results.map((project) => (
            <button className="browse-card" key={project.id} onClick={() => openProject(project)}>
              <div className="browse-card-top">
                <span className={`project-symbol ${project.accent}`}>
                  <Building2 size={18} />
                </span>
                <span className="saved-star">
                  <Star size={17} />
                </span>
              </div>
              <span className="eyebrow">{project.category}</span>
              <h2>{project.title}</h2>
              <p>{project.description}</p>
              <div className="browse-card-footer">
                <span><CircleDollarSign size={15} />{project.budgetLabel}</span>
                <span><Clock3 size={15} />8â€“12 weeks</span>
                <span><UsersRound size={15} />{project.bids + 4} proposals</span>
              </div>
              <div className="browse-card-action">
                View project <ArrowUpRight size={15} />
              </div>
            </button>
          ))}
          {results.length === 0 && (
            <div className="empty-state panel">
              <Search size={25} />
              <strong>No matching projects</strong>
              <span>Try another search.</span>
            </div>
          )}
        </div>

        <aside className="browse-side panel">
          <span className="eyebrow">YOUR PROFILE</span>
          <h3>Stand out to the right clients</h3>
          <div className="profile-progress">
            <div>
              <span>Profile completeness</span>
              <strong>78%</strong>
            </div>
            <div className="progress">
              <span />
            </div>
          </div>
          <p>Add your portfolio URL and one more skill to get better matches.</p>
          <button className="text-button" onClick={() => navigate('/dashboard/settings')}>
            Complete profile <ArrowUpRight size={14} />
          </button>
        </aside>
      </div>

      <Toast message={toast} />
    </>
  );
}

