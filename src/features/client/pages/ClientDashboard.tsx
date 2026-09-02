import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { Badge } from "../../../components/ui/Badge";
import { 
  Plus, FolderOpen, Clock, DollarSign, 
  Users, MessageCircle, Briefcase,
  Eye, Edit
} from "lucide-react";

const ClientDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [stats] = useState({
    projects: 12,
    activeProjects: 4,
    completedProjects: 6,
    totalSpent: 24500
  });

  const projects = [
    { id: 1, title: "E-commerce Website", status: "In Progress", budget: 5000, bids: 8, date: "2024-01-15" },
    { id: 2, title: "Mobile App Development", status: "Open", budget: 8000, bids: 12, date: "2024-01-20" },
    { id: 3, title: "UI/UX Redesign", status: "Completed", budget: 3000, bids: 5, date: "2024-01-10" }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Client Dashboard</h1>
          <p className="text-gray-500">Manage your projects and track progress</p>
        </div>
        <Button onClick={() => navigate("/client/projects/new")}>
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FolderOpen className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Projects</p>
              <p className="text-xl font-bold text-gray-900">{stats.projects}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Clock className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Active</p>
              <p className="text-xl font-bold text-green-600">{stats.activeProjects}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <CheckCircle className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Completed</p>
              <p className="text-xl font-bold text-purple-600">{stats.completedProjects}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <DollarSign className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Spent</p>
              <p className="text-xl font-bold text-yellow-600">${stats.totalSpent.toLocaleString()}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Projects */}
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Projects</h2>
      <div className="space-y-4">
        {projects.map((project) => (
          <Card key={project.id} className="p-4 hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-semibold text-gray-900">{project.title}</h3>
                  <Badge className={
                    project.status === "In Progress" ? "bg-blue-100 text-blue-800" :
                    project.status === "Open" ? "bg-green-100 text-green-800" :
                    "bg-gray-100 text-gray-800"
                  }>
                    {project.status}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                  <span className="flex items-center">
                    <DollarSign className="w-4 h-4 mr-1" />
                    ${project.budget.toLocaleString()}
                  </span>
                  <span className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {project.bids} bids
                  </span>
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {new Date(project.date).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => navigate(`/projects/${project.id}`)}>
                  <Eye className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => navigate(`/client/projects/${project.id}/edit`)}>
                  <Edit className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => navigate(`/client/projects/${project.id}/bids`)}>
                  <Briefcase className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <MessageCircle className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Add this since CheckCircle was used but not imported
import { CheckCircle } from "lucide-react";

export default ClientDashboard;