import { useParams } from 'react-router-dom';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import { useAuth } from '../../../contexts/AuthContext';

// Role-aware by design, not two separate pages: a client viewing their own
// project sees the bid list (client-only per the backend guard); a
// developer sees a bid form; a logged-out visitor sees neither.
// TODO: load the real project + bids via projectsService/bidsService using
// the :id param, and branch on user?.role / whether this client owns it.
export default function ProjectDetailPage() {
  const { id } = useParams();
  const { user } = useAuth();

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <Card>
        <p className="text-slate text-sm">Project #{id}</p>
        <h1 className="text-2xl mt-1">Project title placeholder</h1>
        <p className="text-slate mt-3">Description placeholder.</p>

        {user?.role === 'DEVELOPER' && (
          <div className="mt-6 pt-6 border-t border-line">
            <h3 className="font-display font-semibold mb-2">Submit a bid</h3>
            {/* TODO: bid form -> bidsService.create */}
          </div>
        )}

        {user?.role === 'CLIENT' && (
          <div className="mt-6 pt-6 border-t border-line">
            <h3 className="font-display font-semibold mb-2">Bids received</h3>
            {/* TODO: bid list -> bidsService.listForProject, accept/decline actions */}
          </div>
        )}
      </Card>
      {!user && <Button className="mt-4">Log in to bid or review bids</Button>}
    </div>
  );
}

