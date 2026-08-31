import { useState, useEffect } from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import { 
  ArrowLeft, DollarSign, Clock, User, CheckCircle, 
  XCircle, MessageCircle, ThumbsUp, ThumbsDown,
  AlertCircle, Search, Download
} from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { Button } from "@/components/ui/Button";
import { Badge } from '../../../components/ui/Badge';
import { Input } from '../../../components/ui/Input';
import { LoadingSpinner } from '../../../components/common/LoadingSpinner';
import { EmptyState } from '../../../components/common/EmptyState';
import { bidsService } from '../services/bids.service';
import { projectsService } from '../../projects/services/projects.service';
import type { Bid } from '../types/bid.types';
import type { Project } from '../../projects/types/project.types';

export default function ProjectBidsViewPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [bids, setBids] = useState<Bid[]>([]);
  const [filteredBids, setFilteredBids] = useState<Bid[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [] = useState<Bid | null>(null);
  const [] = useState(false);

  useEffect(() => {
    if (id) {
      fetchData(id);
    }
  }, [id]);

  const fetchData = async (projectId: string) => {
    try {
      setLoading(true);
      const [projectData, bidsData] = await Promise.all([
        projectsService.getProjectById(projectId),
        bidsService.getBidsForProject(projectId)
      ]);
      setProject(projectData);
      setBids(bidsData);
      setFilteredBids(bidsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = () => {
    let filtered = bids;
    
    if (searchTerm) {
      filtered = filtered.filter(bid => 
        ((bid as any).developer?.name ?? "")?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bid.message?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (filterStatus !== 'ALL') {
      filtered = filtered.filter(bid => bid.status === filterStatus);
    }
    
    setFilteredBids(filtered);
  };

  useEffect(() => {
    handleFilter();
  }, [searchTerm, bids]);

  const handleAcceptBid = async (bidId: string) => {
    if (!confirm('Are you sure you want to accept this bid?')) return;
    try {
      await bidsService.acceptBid(bidId);
      await fetchData(id!);
      alert('Bid accepted successfully!');
    } catch (error) {
      console.error('Error accepting bid:', error);
      alert('Failed to accept bid. Please try again.');
    }
  };

  const handleRejectBid = async (bidId: string) => {
    if (!confirm('Are you sure you want to reject this bid?')) return;
    try {
      await bidsService.rejectBid(bidId);
      await fetchData(id!);
      alert('Bid rejected successfully!');
    } catch (error) {
      console.error('Error rejecting bid:', error);
      alert('Failed to reject bid. Please try again.');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACCEPTED': return 'bg-green-100 text-green-800 border-green-200';
      case 'PENDING': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'REJECTED': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ACCEPTED': return <CheckCircle className="w-4 h-4" />;
      case 'PENDING': return <Clock className="w-4 h-4" />;
      case 'REJECTED': return <XCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <LoadingSpinner />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-red-700">Project not found</h3>
          <Button className="mt-4" onClick={() => navigate('/client/dashboard')}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <Button
          variant="ghost"
          className="mb-4"
          onClick={() => navigate('/client/dashboard')}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
        
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Project Bids</h1>
            <p className="text-gray-500 mt-1">{project.title}</p>
          </div>
          <div className="flex gap-2">
            <Badge className="text-lg px-4 py-2 bg-blue-100 text-blue-800">
              {bids.length} Bids
            </Badge>
          </div>
        </div>
      </div>

      {/* Project Summary */}
      <Card className="p-4 mb-6 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-gray-600">Budget</p>
            <p className="text-lg font-semibold text-gray-900"></p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Status</p>
            <Badge className={getStatusColor(project.status)}>
              {project.status}
            </Badge>
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Bids</p>
            <p className="text-lg font-semibold text-gray-900">{bids.length}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Posted</p>
            <p className="text-lg font-semibold text-gray-900">
              {new Date(project.createdAt ?? Date.now()).toLocaleDateString()}
            </p>
          </div>
        </div>
      </Card>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search bids by developer or message..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="ALL">All Status</option>
          <option value="PENDING">Pending</option>
          <option value="ACCEPTED">Accepted</option>
          <option value="REJECTED">Rejected</option>
        </select>
        <Button variant="outline" onClick={() => window.print()}>
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </div>

      {/* Bids List */}
      {filteredBids.length === 0 ? (
        <EmptyState
          icon={<AlertCircle className="w-12 h-12 text-gray-400" />}
          title="No bids found"
          description={searchTerm || filterStatus !== 'ALL' ? 
            "No bids match your filters. Try adjusting your search." :
            "No bids have been submitted for this project yet."}
        />
      ) : (
        <div className="space-y-4">
          {filteredBids.map((bid: any) => (
            <Card key={bid.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                      {((bid as any).developer?.name ?? "")?.charAt(0) || 'D'}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {((bid as any).developer?.name ?? "") || 'Anonymous Developer'}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span className="flex items-center">
                          <User className="w-3 h-3 mr-1" />
                          Developer
                        </span>
                        {bid.developer?.rating && (
                          <span className="flex items-center">
                            <ThumbsUp className="w-3 h-3 mr-1 text-green-500" />
                            {bid.developer.rating}★
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-2">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="flex items-center text-lg font-semibold text-green-600">
                        <DollarSign className="w-4 h-4" />
                        {bid.amount?.toLocaleString()}
                      </span>
                      <Badge className={getStatusColor(bid.status)}>
                        <span className="flex items-center gap-1">
                          {getStatusIcon(bid.status)}
                          {bid.status}
                        </span>
                      </Badge>
                      <span className="text-sm text-gray-400">
                        Submitted: {new Date(bid.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    
                    {bid.message && (
                      <p className="mt-2 text-gray-600 bg-gray-50 p-3 rounded-lg">
                        "{bid.message}"
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/messages?developer=${bid.developerId}`)}
                  >
                    <MessageCircle className="w-4 h-4 mr-1" />
                    Message
                  </Button>
                  
                  {project.status === 'OPEN' && bid.status === 'PENDING' && (
                    <>
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => handleAcceptBid(bid.id)}
                      >
                        <ThumbsUp className="w-4 h-4 mr-1" />
                        Accept
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
                        onClick={() => handleRejectBid(bid.id)}
                      >
                        <ThumbsDown className="w-4 h-4 mr-1" />
                        Reject
                      </Button>
                    </>
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














