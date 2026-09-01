import React from "react";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";

import {
  Users, Briefcase, DollarSign, Clock,
  UserCheck, AlertCircle,
  Eye
} from "lucide-react";

const AdminDashboard: React.FC = () => {
  const stats = {
    totalUsers: 1250,
    activeUsers: 980,
    pendingApprovals: 23,
    totalProjects: 340,
    activeProjects: 180,
    totalRevenue: 125000
  };

  const recentActivity = [
    { id: 1, user: "John Doe", action: "Registered", time: "2 mins ago", type: "user" },
    { id: 2, user: "Jane Smith", action: "Submitted Project", time: "15 mins ago", type: "project" },
    { id: 3, user: "Alice Johnson", action: "Needs Approval", time: "1 hour ago", type: "pending" }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-500">Monitor and manage the platform</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Users</p>
              <p className="text-xl font-bold text-gray-900">{stats.totalUsers}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Pending Approvals</p>
              <p className="text-xl font-bold text-yellow-600">{stats.pendingApprovals}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Briefcase className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Active Projects</p>
              <p className="text-xl font-bold text-green-600">{stats.activeProjects}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <DollarSign className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Revenue</p>
              <p className="text-xl font-bold text-purple-600">${stats.totalRevenue.toLocaleString()}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
      <Card className="p-4">
        <div className="space-y-4">
          {recentActivity.map((item) => (
            <div key={item.id} className="flex items-center justify-between py-2 border-b last:border-0">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  item.type === "pending" ? "bg-yellow-100" :
                  item.type === "project" ? "bg-blue-100" :
                  "bg-green-100"
                }`}>
                  {item.type === "pending" ? <AlertCircle className="w-4 h-4 text-yellow-600" /> :
                   item.type === "project" ? <Briefcase className="w-4 h-4 text-blue-600" /> :
                   <UserCheck className="w-4 h-4 text-green-600" />}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{item.user}</p>
                  <p className="text-sm text-gray-500">{item.action}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-400">{item.time}</span>
                <Button variant="ghost" size="sm">
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default AdminDashboard;





