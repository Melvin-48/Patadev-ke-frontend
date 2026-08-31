import type { Project } from "../types/project.types";
import { useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import { 
  Search, Grid, List, SlidersHorizontal,
  DollarSign, Clock, MapPin, Briefcase} from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { Button } from "@/components/ui/Button";
import { Input } from '../../../components/ui/Input';
import { Badge } from '../../../components/ui/Badge';
import { LoadingSpinner } from '../../../components/common/LoadingSpinner';
import { EmptyState } from '../../../components/common/EmptyState';
import ProjectCard from '../components/ProjectCard';
import { projectsService } from '../services/projects.service';


export default function BrowseProjectsPage() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<any[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  
  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('ALL');
  const [budgetRange, setBudgetRange] = useState('ALL');
  const [sortBy, setSortBy] = useState('LATEST');

  const categories = ['ALL', 'Web Development', 'Mobile App', 'UI/UX Design', 'Data Science', 'DevOps', 'Other'];

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await projectsService.getProjects();
      setProjects(data);
      setFilteredProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let filtered = [...projects];

    // Search 
    if (searchTerm) {
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category 
    if (category !== 'ALL') {
      filtered = filtered.filter(p => p.category === category);
    }

    // Budget range 
    if (budgetRange !== 'ALL') {
      filtered = filtered.filter(p => {
        const budget = p.budget || 0;
        switch (budgetRange) {
          case 'UNDER_500': return budget < 500;
          case '500_1000': return budget >= 500 && budget <= 1000;
          case '1000_5000': return budget >= 1000 && budget <= 5000;
          case 'OVER_5000': return budget > 5000;
          default: return true;
        }
      });
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'LATEST':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'BUDGET_HIGH':
          return (b.budget || 0) - (a.budget || 0);
        case 'BUDGET_LOW':
          return (a.budget || 0) - (b.budget || 0);
        default:
          return 0;
      }
    });

    setFilteredProjects(filtered);
  }, [searchTerm, category, budgetRange, sortBy]);

  const getProjectStats = (_project: Project) => {
    // This would come from API - mock for now
    return {
      bids: Math.floor(Math.random() * 15) + 1,
      views: Math.floor(Math.random() * 100) + 10,
      daysLeft: Math.floor(Math.random() * 30) + 1
    };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Browse Projects</h1>
            <p className="text-gray-500 mt-1">
              Find the perfect  for your skills
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search projects by title or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            Filters {showFilters ? '▲' : '▼'}
          </Button>
        </div>

        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Budget Range
              </label>
              <select
                value={budgetRange}
                onChange={(e) => setBudgetRange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="ALL">All Budgets</option>
                <option value="UNDER_500">Under </option>
                <option value="500_1000"> - ,000</option>
                <option value="1000_5000">,000 - ,000</option>
                <option value="OVER_5000">Over ,000</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="LATEST">Latest</option>
                <option value="BUDGET_HIGH">Budget: High to Low</option>
                <option value="BUDGET_LOW">Budget: Low to High</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Showing {filteredProjects.length} of {projects.length} projects
        </p>
      </div>

      {/* Projects Grid/List */}
      {filteredProjects.length === 0 ? (
        <EmptyState
          icon={<Briefcase className="w-12 h-12 text-gray-400" />}
          title="No projects found"
          description="Try adjusting your search or filters to find more projects."
        />
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project: any) => {
            const stats = getProjectStats(project);
            return (
              <ProjectCard
                key={project.id}
                project={project}
                bids={stats.bids}
                views={stats.views}
                daysLeft={stats.daysLeft}
              />
            );
          })}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredProjects.map((project: any) => (
            <Card key={project.id} className="p-4 hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {project.title}
                    </h3>
                    <Badge className={project.status === 'OPEN' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}>
                      {project.status}
                    </Badge>
                  </div>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-3 mt-3 text-sm text-gray-500">
                    <span className="flex items-center">
                      <DollarSign className="w-4 h-4 mr-1" />
                      
                    </span>
                    <span className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {project.location || 'Remote'}
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {new Date(project.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 min-w-[120px]">
                  <Button onClick={() => navigate('/projects')}>
                    View Details
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => navigate(`/projects/${project.id}/place-bid`)}>
                    Place Bid
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
















