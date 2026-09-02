import React, { useEffect, useState } from "react";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { LoadingSpinner } from "../../../components/common/LoadingSpinner";
import { EmptyState } from "../../../components/common/EmptyState";
import { adminService } from "../services/admin.service";
import { Link } from "react-router-dom";

import {
  Users, Briefcase, DollarSign, Clock,
  UserCheck, AlertCircle, CheckCircle,
  Eye, FileText
} from "lucide-react";

import { useAuth } from "../../../contexts/AuthContext";

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    pendingApprovals: 0,
    activeProjects: 0,
    totalRevenue: 0,
  });
  const [pendingActions, setPendingActions] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, pendingUsersRes, projectsRes, disputesRes, financialRes] = await Promise.allSettled([
          adminService.getAccounts(),
          adminService.getAccounts({ status: 'PENDING' }),
          adminService.getProjects({ status: 'OPEN' }),
          adminService.getDisputes({ status: 'OPEN' }),
          adminService.getFinancialReport().catch(() => ({ totalRevenue: 0 }))
        ]);

        const totalUsers = usersRes.status === 'fulfilled' ? usersRes.value.total : 0;
        const pendingUsers = pendingUsersRes.status === 'fulfilled' ? pendingUsersRes.value : { total: 0, items: [] };
        const activeProjects = projectsRes.status === 'fulfilled' ? projectsRes.value.total : 0;
        const revenue = financialRes.status === 'fulfilled' ? (financialRes.value.totalRevenue || financialRes.value.totalCommission || 0) : 0;
        const pendingDisputes = disputesRes.status === 'fulfilled' ? disputesRes.value.items : [];

        setStats({
          totalUsers,
          pendingApprovals: pendingUsers.total,
          activeProjects,
          totalRevenue: revenue
        });

        // Combine pending actions
        const actions: any[] = [];
        pendingUsers.items.slice(0, 5).forEach((u: any) => {
          actions.push({
            id: `u-${u.id}`,
            label: `Account Approval: ${u.email}`,
            type: "account",
            time: new Date(u.createdAt).toLocaleDateString(),
            link: "/admin/accounts"
          });
        });
        pendingDisputes.slice(0, 5).forEach((d: any) => {
          actions.push({
            id: `d-${d.id}`,
            label: `Open Dispute against ${d.against?.email || 'Unknown'}`,
            type: "dispute",
            time: new Date(d.createdAt).toLocaleDateString(),
            link: "/admin/disputes"
          });
        });
        setPendingActions(actions);
      } catch (err) {
        console.error("Failed to load dashboard data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-ink">Admin Dashboard</h1>
        <p className="text-slate">Monitor and manage platform operations</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-100 rounded-lg">
              <Users className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <p className="text-sm text-slate">Total Users</p>
              <p className="text-xl font-bold text-ink">{stats.totalUsers}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber/15 rounded-lg">
              <Clock className="w-5 h-5 text-amber-dark" />
            </div>
            <div>
              <p className="text-sm text-slate">Pending Approvals</p>
              <p className="text-xl font-bold text-amber-dark">{stats.pendingApprovals}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-success/10 rounded-lg">
              <Briefcase className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-sm text-slate">Active Projects</p>
              <p className="text-xl font-bold text-success">{stats.activeProjects}</p>
            </div>
          </div>
        </Card>
        {user?.role === 'SUPER_ADMIN' && (
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <DollarSign className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-slate">Platform Revenue</p>
                <p className="text-xl font-bold text-purple-600">KES {stats.totalRevenue.toLocaleString()}</p>
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* Pending Actions */}
      <h2 className="font-display text-lg font-semibold text-ink mb-4">Pending Actions</h2>
      <Card className="p-0 overflow-hidden">
        {pendingActions.length === 0 ? (
          <div className="p-8">
            <EmptyState 
              title="No Pending Actions" 
              description="You're all caught up! There are no pending approvals or disputes."
            />
          </div>
        ) : (
          <div className="divide-y divide-line">
            {pendingActions.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 hover:bg-slate/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    item.type === "account" ? "bg-amber/15 text-amber-dark" : "bg-danger/10 text-danger"
                  }`}>
                    {item.type === "account" ? <UserCheck className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                  </div>
                  <div>
                    <p className="font-medium text-ink">{item.label}</p>
                    <p className="text-sm text-slate">{item.type === "account" ? "Needs Verification" : "Awaiting Resolution"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-slate">{item.time}</span>
                  <Link to={item.link}>
                    <Button variant="secondary" className="px-2 py-1 text-xs">
                      <Eye className="w-4 h-4 mr-1 inline-block" /> View
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default AdminDashboard;






