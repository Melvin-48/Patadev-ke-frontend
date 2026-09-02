import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Briefcase, Search, Eye, CheckCircle, XCircle, Clock,
  DollarSign, Calendar, User
} from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Badge } from '../../../components/ui/Badge';
import { LoadingSpinner } from '../../../components/common/LoadingSpinner';
import { EmptyState } from '../../../components/common/EmptyState';
import { adminService } from '../services/admin.service';

export default function AdminProjectsPage() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<any[]>([]);
  const [totalProjects, setTotalProjects] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');

  useEffect(() => {
    fetchProjects();
  }, [searchTerm, filterStatus]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const params: any = {};
      if (filterStatus !== 'ALL') params.status = filterStatus;
      if (searchTerm) params.search = searchTerm;
      
      const res = await adminService.getProjects(params);
      setProjects(res.items || []);
      setTotalProjects(res.total || 0);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleModerate = async (projectId: string, action: 'APPROVE' | 'REMOVE') => {
    if (action === 'REMOVE' && !confirm('Are you sure you want to remove this project?')) return;
    try {
      await adminService.moderateListing(projectId, action);
      await fetchProjects();
    } catch (error) {
      console.error(`Error moderating project:`, error);
      alert(`Failed to ${action.toLowerCase()} project.`);
    }
  };

  const getBadgeTone = (status: string) => {
    switch (status) {
      case 'OPEN': return 'success';
      case 'MATCHED':
      case 'IN_PROGRESS': return 'neutral';
      case 'COMPLETED': return 'success';
      case 'DRAFT': return 'neutral';
      case 'REMOVED':
      case 'CANCELLED': return 'danger';
      default: return 'neutral';
    }
  };

  const totalValue = projects.reduce((acc, p) => acc + (Number(p.budget) || 0), 0);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-ink">Project Management</h1>
        <p className="text-slate mt-1">Monitor and moderate platform listings</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-100 rounded-lg">
              <Briefcase className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <p className="text-sm text-slate">Total Listed</p>
              <p className="text-xl font-bold text-ink">{totalProjects}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-success/10 rounded-lg">
              <CheckCircle className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-sm text-slate">Open</p>
              <p className="text-xl font-bold text-success">
                {projects.filter(p => p.status === 'OPEN').length}
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber/15 rounded-lg">
              <Clock className="w-5 h-5 text-amber-dark" />
            </div>
            <div>
              <p className="text-sm text-slate">In Progress / Matched</p>
              <p className="text-xl font-bold text-amber-dark">
                {projects.filter(p => p.status === 'IN_PROGRESS' || p.status === 'MATCHED').length}
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <DollarSign className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-slate">Visible Budget</p>
              <p className="text-xl font-bold text-ink">
                KES {totalValue.toLocaleString()}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate w-4 h-4" />
          <Input
            placeholder="Search projects by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border border-line rounded bg-white text-ink focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="ALL">All Status</option>
          <option value="DRAFT">Draft</option>
          <option value="OPEN">Open</option>
          <option value="MATCHED">Matched</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      </div>

      {/* Projects List */}
      {loading ? (
        <div className="flex items-center justify-center min-h-[40vh]">
          <LoadingSpinner />
        </div>
      ) : projects.length === 0 ? (
        <Card className="p-8">
          <EmptyState
            title="No projects found"
            description="Try adjusting your search or filters"
          />
        </Card>
      ) : (
        <div className="space-y-4">
          <p className="text-sm text-slate mb-4">Showing {projects.length} of {totalProjects} projects</p>
          {projects.map((project: any) => (
            <Card key={project.id} className="p-4 hover:shadow-sm transition-shadow border border-line">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-ink">
                      {project.title}
                    </h3>
                    <Badge tone={getBadgeTone(project.status)}>
                      {project.status}
                    </Badge>
                  </div>
                  <p className="text-slate text-sm line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-4 mt-3 text-sm text-slate">
                    <span className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {project.client?.businessName || project.owner?.name || 'Unknown Client'}
                    </span>
                    <span className="flex items-center">
                      <DollarSign className="w-4 h-4 mr-1" />
                      KES {(project.budget || 0).toLocaleString()}
                    </span>
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(project.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="secondary"
                    className="px-3 py-1 text-sm"
                    onClick={() => navigate(`/projects/${project.id}`)}
                  >
                    <Eye className="w-4 h-4 mr-1 inline-block" />
                    View
                  </Button>
                  
                  {project.status === 'DRAFT' && (
                    <Button
                      variant="primary"
                      className="bg-success text-white hover:bg-success-dark px-3 py-1 text-sm"
                      onClick={() => handleModerate(project.id, 'APPROVE')}
                    >
                      <CheckCircle className="w-4 h-4 mr-1 inline-block" />
                      Approve
                    </Button>
                  )}

                  {project.status !== 'REMOVED' && project.status !== 'CANCELLED' && project.status !== 'COMPLETED' && (
                    <Button
                      variant="secondary"
                      className="text-danger border-danger/20 hover:border-danger hover:bg-danger/5 px-3 py-1 text-sm"
                      onClick={() => handleModerate(project.id, 'REMOVE')}
                    >
                      <XCircle className="w-4 h-4 mr-1 inline-block" />
                      Remove
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}













