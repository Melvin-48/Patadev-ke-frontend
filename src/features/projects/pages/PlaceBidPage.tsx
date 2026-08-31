import { useState, useEffect } from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import { 
  ArrowLeft, DollarSign, Clock,
  Send, AlertCircle, CheckCircle} from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { Button } from "@/components/ui/Button";
import { Input } from '../../../components/ui/Input';
import { Badge } from '../../../components/ui/Badge';
import { LoadingSpinner } from '../../../components/common/LoadingSpinner';
import { projectsService } from '../../projects/services/projects.service';
import { bidsService } from "../../bids/services/bids.service";
import type { Project } from '../../projects/types/project.types';

export default function PlaceBidPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    amount: '',
    message: '',
    timeline: '',
    experience: ''
  });

  useEffect(() => {
    if (id) {
      fetchProject(id);
    }
  }, [id]);

  const fetchProject = async (projectId: string) => {
    try {
      setLoading(true);
      const data = await projectsService.getProjectById(projectId);
      setProject(data);
    } catch (error) {
      console.error('Error fetching project:', error);
      setError('Failed to load project details');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !formData.amount) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      
      await bidsService.createBid({
        projectId: id,
        amount: parseFloat(formData.amount),
        message: formData.message || undefined,
      });
      
      setSuccess(true);
      setTimeout(() => {
        navigate('/projects');
      }, 2000);
    } catch (error) {
      console.error('Error submitting bid:', error);
      setError('Failed to submit bid. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <LoadingSpinner />
      </div>
    );
  }

  if (error && !project) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-red-700">{error}</h3>
          <Button className="mt-4" onClick={() => navigate('/projects')}>
            Back to Projects
          </Button>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card className="p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Bid Submitted!</h2>
          <p className="text-gray-600 mb-4">
            Your bid has been successfully submitted for "{project?.title}"
          </p>
          <div className="flex gap-3 justify-center">
            <Button onClick={() => navigate('/projects')}>
              View Project
            </Button>
            <Button variant="default" onClick={() => navigate('/developer/dashboard')}>
              Go to Dashboard
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Button
        variant="ghost"
        className="mb-6"
        onClick={() => navigate('/projects')}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Project
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Place a Bid</h1>
            <p className="text-gray-500 mb-6">Submit your proposal for this project</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bid Amount ($) *
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="number"
                    min="1"
                    step="0.01"
                    required
                    className="pl-10"
                    placeholder="Enter your bid amount"
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                  />
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Project budget: 
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Proposal Message *
                </label>
                <textarea
                  required
                  rows={5}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Explain why you're the right person for this project..."
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Estimated Timeline
                </label>
                <Input
                  placeholder="e.g., 2 weeks, 1 month, etc."
                  value={formData.timeline}
                  onChange={(e) => setFormData({...formData, timeline: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Relevant Experience
                </label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describe your relevant experience and skills..."
                  value={formData.experience}
                  onChange={(e) => setFormData({...formData, experience: e.target.value})}
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <LoadingSpinner className="w-4 h-4 mr-2" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Submit Bid
                  </>
                )}
              </Button>
            </form>
          </Card>
        </div>

        {/* Project Summary */}
        <div className="lg:col-span-1">
          <Card className="p-6 sticky top-4">
            <h3 className="font-semibold text-gray-900 mb-4">Project Summary</h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Title</p>
                <p className="font-medium text-gray-900">{project?.title}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Budget</p>
                <p className="font-medium text-green-600 text-lg">
                  
                </p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Category</p>
                <p className="font-medium text-gray-900">
                  {project?.category || 'General'}
                </p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <Badge className={project?.status === 'OPEN' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                  {project?.status}
                </Badge>
              </div>

              {project?.skills && project.skills.length > 0 && (
                <div>
                  <p className="text-sm text-gray-500 mb-1">Skills Required</p>
                  <div className="flex flex-wrap gap-1">
                    {project.skills.map((skill: string, index: number) => (
                      <Badge key={index} variant="default" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 pt-6 border-t">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                <span>Posted {project?.createdAt ? new Date(project.createdAt).toLocaleDateString() : 'Recently'}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}













