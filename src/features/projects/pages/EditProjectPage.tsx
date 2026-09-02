import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { Button } from "../../../components/ui/Button";
import { Input } from '../../../components/ui/Input';
import { LoadingSpinner } from '../../../components/common/LoadingSpinner';
import { projectsService } from '../services/projects.service';
import type { Project } from '../types/project.types';

export default function EditProjectPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<Partial<Project>>({});

  useEffect(() => {
    if (id) {
      fetchProject();
    }
  }, [id]);

  const fetchProject = async () => {
    try {
      setLoading(true);
      const project = await projectsService.getProjectById(id!);
      if (project) {
        setFormData(project);
      }
    } catch (error) {
      console.error('Error fetching project:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      await projectsService.updateProject(id!, formData);
      navigate('/projects');
      alert('Project updated successfully!');
    } catch (error) {
      console.error('Error updating project:', error);
      alert('Failed to update project. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Button
        variant="ghost"
        className="mb-6"
        onClick={() => navigate('/projects')}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Project
      </Button>

      <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Project</h1>

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <Input
              value={formData.title || ''}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              rows={5}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={formData.description || ''}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Budget ($)
            </label>
            <Input
              type="number"
              value={formData.budget || ''}
              onChange={(e) => setFormData({...formData, budget: parseFloat(e.target.value)})}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={formData.category || ''}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
            >
              <option value="Web Development">Web Development</option>
              <option value="Mobile App">Mobile App</option>
              <option value="UI/UX Design">UI/UX Design</option>
              <option value="Data Science">Data Science</option>
              <option value="DevOps">DevOps</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="flex gap-3 pt-4">
            <Button type="submit" disabled={saving}>
              {saving ? (
                <>
                  <LoadingSpinner className="w-4 h-4 mr-2" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
            <Button variant="outline" onClick={() => navigate('/projects')}>
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}












