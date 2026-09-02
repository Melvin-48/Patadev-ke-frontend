import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { Badge } from "../../../components/ui/Badge";
import { 
  TrendingUp, Briefcase, DollarSign, Clock,
  MessageCircle, Award,
  Eye, CheckCircle
} from "lucide-react";

const DeveloperDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [stats] = useState({
    activeBids: 8,
    wonProjects: 3,
    completedProjects: 5,
    earnings: 18750
  });

  const myBids = [
    { id: 1, projectTitle: "E-commerce Platform", amount: 4500, status: "Pending", date: "2024-01-18" },
    { id: 2, projectTitle: "Mobile App Design", amount: 3000, status: "Accepted", date: "2024-01-15" },
    { id: 3, projectTitle: "API Development", amount: 2000, status: "Pending", date: "2024-01-12" }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Developer Dashboard</h1>
          <p className="text-gray-500">Track your bids and projects</p>
        </div>
        <Button onClick={() => navigate("/projects")}>
          <Briefcase className="w-4 h-4 mr-2" />
          Find Projects
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Active Bids</p>
              <p className="text-xl font-bold text-blue-600">{stats.activeBids}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Award className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Won</p>
              <p className="text-xl font-bold text-green-600">{stats.wonProjects}</p>
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
              <p className="text-sm text-gray-500">Earnings</p>
              <p className="text-xl font-bold text-yellow-600">${stats.earnings.toLocaleString()}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* My Bids */}
      <h2 className="text-xl font-semibold text-gray-900 mb-4">My Bids</h2>
      <div className="space-y-4">
        {myBids.map((bid) => (
          <Card key={bid.id} className="p-4 hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-semibold text-gray-900">{bid.projectTitle}</h3>
                  <Badge className={
                    bid.status === "Accepted" ? "bg-green-100 text-green-800" :
                    "bg-yellow-100 text-yellow-800"
                  }>
                    {bid.status}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                  <span className="flex items-center">
                    <DollarSign className="w-4 h-4 mr-1" />
                    ${bid.amount.toLocaleString()}
                  </span>
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {new Date(bid.date).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => navigate(`/projects/${bid.id}`)}>
                  <Eye className="w-4 h-4" />
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

export default DeveloperDashboard;





