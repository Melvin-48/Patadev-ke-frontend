import { useState, useEffect } from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import { 
  ArrowLeft, Calendar, DollarSign, Clock, CheckCircle,
  AlertCircle, FileText,
  Plus, Edit} from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { Button } from "../../../components/ui/Button";
import { Badge } from '../../../components/ui/Badge';
import { Input } from '../../../components/ui/Input';
import { LoadingSpinner } from '../../../components/common/LoadingSpinner';
import { EmptyState } from '../../../components/common/EmptyState';
import { milestonesService } from '../services/milestones.service';
import { bidsService } from '../../bids/services/bids.service';
import type { Milestone } from '../types/milestone.types';


export default function EngagementsMilestonesPage() {
  const { bidId } = useParams<{ bidId: string }>();
  const navigate = useNavigate();
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddMilestone, setShowAddMilestone] = useState(false);
  const [newMilestone, setNewMilestone] = useState({
    title: '',
    description: '',
    amount: '',
    dueDate: ''
  });

  useEffect(() => {
    if (bidId) {
      fetchData(bidId);
    }
  }, [bidId]);

  const fetchData = async (id: string) => {
    try {
      setLoading(true);
      // Fetch  details and milestones
      const [, milestonesData] = await Promise.all([
        bidsService.getBidById(id),
        milestonesService.getMilestonesForBid(id)
      ]);
      setMilestones(milestonesData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMilestone = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bidId) return;

    try {
      await milestonesService.createMilestone({
        bidId: bidId,
        title: newMilestone.title,
        description: newMilestone.description,
        amount: parseFloat(newMilestone.amount),
        dueDate: newMilestone.dueDate
      });
      await fetchData(bidId);
      setShowAddMilestone(false);
      setNewMilestone({ title: '', description: '', amount: '', dueDate: '' });
      alert('Milestone added successfully!');
    } catch (error) {
      console.error('Error adding milestone:', error);
      alert('Failed to add milestone. Please try again.');
    }
  };

  const handleUpdateMilestoneStatus = async (milestoneId: string, status: string) => {
    try {
      await milestonesService.updateMilestoneStatus(milestoneId, status);
      await fetchData(bidId!);
      alert('Milestone updated successfully!');
    } catch (error) {
      console.error('Error updating milestone:', error);
      alert('Failed to update milestone. Please try again.');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED': return 'bg-green-100 text-green-800';
      case 'IN_PROGRESS': return 'bg-blue-100 text-blue-800';
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'REJECTED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'COMPLETED': return <CheckCircle className="w-4 h-4" />;
      case 'IN_PROGRESS': return <Clock className="w-4 h-4" />;
      case 'PENDING': return <AlertCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const totalAmount = milestones.reduce((sum, m) => sum + (m.amount || 0), 0);
  const completedAmount = milestones
    .filter(m => m.status === 'COMPLETED')
    .reduce((sum, m) => sum + (m.amount || 0), 0);
  const progress = totalAmount > 0 ? Math.round((completedAmount / totalAmount) * 100) : 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        variant="ghost"
        className="mb-6"
        onClick={() => navigate('/developer/dashboard')}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Dashboard
      </Button>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Engagement Milestones</h1>
        <p className="text-gray-500 mt-1">
          Track project progress and milestone payments
        </p>
      </div>

      {/* Progress Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="p-4">
          <p className="text-sm text-gray-500">Total Milestones</p>
          <p className="text-2xl font-bold text-gray-900">{milestones.length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-500">Total Amount</p>
          <p className="text-2xl font-bold text-green-600"></p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-500">Completed</p>
          <p className="text-2xl font-bold text-blue-600"></p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-500">Progress</p>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-600 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-sm font-semibold text-gray-900">{progress}%</span>
          </div>
        </Card>
      </div>

      {/* Add Milestone Button */}
      <div className="mb-6">
        <Button onClick={() => setShowAddMilestone(!showAddMilestone)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Milestone
        </Button>
      </div>

      {/* Add Milestone Form */}
      {showAddMilestone && (
        <Card className="p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">New Milestone</h3>
          <form onSubmit={handleAddMilestone} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title *
              </label>
              <Input
                required
                placeholder="Milestone title"
                value={newMilestone.title}
                onChange={(e) => setNewMilestone({...newMilestone, title: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Describe this milestone"
                value={newMilestone.description}
                onChange={(e) => setNewMilestone({...newMilestone, description: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount ($) *
                </label>
                <Input
                  type="number"
                  min="1"
                  step="0.01"
                  required
                  placeholder="0.00"
                  value={newMilestone.amount}
                  onChange={(e) => setNewMilestone({...newMilestone, amount: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Due Date
                </label>
                <Input
                  type="date"
                  value={newMilestone.dueDate}
                  onChange={(e) => setNewMilestone({...newMilestone, dueDate: e.target.value})}
                />
              </div>
            </div>
            <div className="flex gap-3">
              <Button type="submit">Add Milestone</Button>
              <Button variant="outline" onClick={() => setShowAddMilestone(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Milestones List */}
      {milestones.length === 0 ? (
        <EmptyState
          icon={<FileText className="w-12 h-12 text-gray-400" />}
          title="No milestones yet"
          description="Start adding milestones to track project progress"
        />
      ) : (
        <div className="space-y-4">
          {milestones.map((milestone) => (
            <Card key={milestone.id} className="p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {milestone.title}
                    </h3>
                    <Badge className={getStatusColor(milestone.status)}>
                      <span className="flex items-center gap-1">
                        {getStatusIcon(milestone.status)}
                        {milestone.status}
                      </span>
                    </Badge>
                  </div>
                  {milestone.description && (
                    <p className="text-gray-600 mb-3">{milestone.description}</p>
                  )}
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <DollarSign className="w-4 h-4 mr-1" />
                      
                    </span>
                    {milestone.dueDate && (
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        Due: {new Date(milestone.dueDate).toLocaleDateString()}
                      </span>
                    )}
                    {(milestone as any).completedAt && (
                      <span className="flex items-center">
                        <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
                        Completed: {new Date((milestone as any).completedAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {milestone.status === 'PENDING' && (
                    <>
                      <Button
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={() => handleUpdateMilestoneStatus(milestone.id, 'IN_PROGRESS')}
                      >
                        <Clock className="w-4 h-4 mr-1" />
                        Start
                      </Button>
                    </>
                  )}
                  {milestone.status === 'IN_PROGRESS' && (
                    <Button
                      size="sm"
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => handleUpdateMilestoneStatus(milestone.id, 'COMPLETED')}
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Complete
                    </Button>
                  )}
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}




















