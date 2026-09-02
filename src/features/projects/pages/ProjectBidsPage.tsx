import { useParams, useNavigate } from 'react-router-dom';
import { ArrowUpRight, Star } from 'lucide-react';
import PageHeader from '../../../components/dashboard/PageHeader';
import Avatar from '../../../components/dashboard/Avatar';
import { useToast, Toast } from '../../../components/dashboard/useToast';
import { mockDevelopers, mockProjects } from '../../../data/mock';

const proposalAmounts = ['KES 630,000', 'KES 708,000', 'KES 576,000'];

// Client sees every developer proposal for one of their projects and can
// accept or decline. Rows come from the mock for now.
// TODO: replace with bidsService.listForProject(projectId) and wire
// accept/decline buttons to bidsService.accept / bidsService.decline.
export default function ProjectBidsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast, notify } = useToast();

  const project = mockProjects.find((item) => item.id === id) ?? mockProjects[0];

  function respond(action: 'accept' | 'decline', developer: string) {
    notify(`${action === 'accept' ? 'Accepted' : 'Declined'} ${developer}'s proposal`);
  }

  return (
    <>
      <PageHeader
        eyebrow="CLIENT WORKSPACE"
        title={project.title}
        description="Compare developer proposals and choose who builds it."
        action={
          <button className="button button-outline" onClick={() => navigate('/dashboard/projects')}>
            Back to my projects <ArrowUpRight size={14} />
          </button>
        }
      />

      <section className="panel detail-panel">
        <div className="panel-header">
          <div>
            <span className="eyebrow">PROJECT BIDS</span>
            <h2>Proposals for {project.title}</h2>
          </div>
          <span className="balance-label">{project.bids} bids received</span>
        </div>
        <div className="project-bids-list">
          {mockDevelopers.map((developer, index) => (
            <div className="detail-row" key={developer.name}>
              <Avatar initials={developer.initials} color={developer.color} />
              <div>
                <strong>{developer.name}</strong>
                <span>{developer.role} Â· {developer.skills}</span>
              </div>
              <span className="status-text matched"><Star size={11} /> {developer.rating}</span>
              <strong style={{ color: '#3f4e66', fontSize: 11, marginRight: 6 }}>{proposalAmounts[index]}</strong>
              <div className="proposal-actions">
                <button className="button button-primary small-button" onClick={() => respond('accept', developer.name)}>
                  Accept
                </button>
                <button className="button button-outline small-button" onClick={() => respond('decline', developer.name)}>
                  Decline
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Toast message={toast} />
    </>
  );
}
