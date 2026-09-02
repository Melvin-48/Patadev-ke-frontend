import { useState, useEffect } from 'react';

import { 
  Users, UserCheck, UserX, Search,
  Shield, ShieldCheck, ShieldAlert,
  Calendar, CheckCircle, XCircle
} from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Badge } from '../../../components/ui/Badge';
import { LoadingSpinner } from '../../../components/common/LoadingSpinner';
import { EmptyState } from '../../../components/common/EmptyState';
import { adminService } from '../services/admin.service';
import type { UserAccount } from '../types/admin.types';

export default function AdminAccountsPage() {
  const [accounts, setAccounts] = useState<UserAccount[]>([]);
  const [totalAccounts, setTotalAccounts] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');

  useEffect(() => {
    fetchAccounts();
  }, [searchTerm, filterRole, filterStatus]);

  const fetchAccounts = async () => {
    try {
      setLoading(true);
      const params: any = {};
      if (filterRole !== 'ALL') params.role = filterRole;
      if (filterStatus !== 'ALL') params.status = filterStatus;
      if (searchTerm) params.search = searchTerm;
      
      const res = await adminService.getAccounts(params);
      setAccounts(res.items);
      setTotalAccounts(res.total);
    } catch (error) {
      console.error('Error fetching accounts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApproveAccount = async (account: UserAccount) => {
    try {
      if (account.role === 'DEVELOPER') {
        await adminService.verifyDeveloper(account.id, 'APPROVED');
      } else {
        await adminService.updateAccountStatus(account.id, 'ACTIVE');
      }
      await fetchAccounts();
    } catch (error) {
      console.error('Error approving account:', error);
      alert('Failed to approve account.');
    }
  };

  const handleSuspendAccount = async (userId: string) => {
    if (!confirm('Are you sure you want to suspend this account?')) return;
    try {
      await adminService.updateAccountStatus(userId, 'SUSPENDED');
      await fetchAccounts();
    } catch (error) {
      console.error('Error suspending account:', error);
      alert('Failed to suspend account.');
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'ADMIN':
      case 'SUPER_ADMIN': return <ShieldAlert className="w-4 h-4 text-purple-600" />;
      case 'CLIENT': return <Shield className="w-4 h-4 text-primary-600" />;
      case 'DEVELOPER': return <ShieldCheck className="w-4 h-4 text-success" />;
      default: return <Shield className="w-4 h-4 text-slate" />;
    }
  };

  const getBadgeTone = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'success';
      case 'PENDING': return 'amber';
      case 'SUSPENDED': return 'danger';
      default: return 'neutral';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-ink">Account Management</h1>
        <p className="text-slate mt-1">Manage user accounts and permissions</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate w-4 h-4" />
          <Input
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="px-4 py-2 border border-line rounded bg-white text-ink focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="ALL">All Roles</option>
          <option value="CLIENT">Clients</option>
          <option value="DEVELOPER">Developers</option>
          <option value="ADMIN">Admins</option>
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border border-line rounded bg-white text-ink focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="ALL">All Status</option>
          <option value="ACTIVE">Active</option>
          <option value="PENDING">Pending</option>
          <option value="SUSPENDED">Suspended</option>
        </select>
      </div>

      {/* Accounts List */}
      {loading ? (
        <div className="flex items-center justify-center min-h-[40vh]">
          <LoadingSpinner />
        </div>
      ) : accounts.length === 0 ? (
        <Card className="p-8">
          <EmptyState
            title="No accounts found"
            description="Try adjusting your search or filters"
          />
        </Card>
      ) : (
        <div className="space-y-4">
          <p className="text-sm text-slate mb-4">Showing {accounts.length} of {totalAccounts} accounts</p>
          {accounts.map((account) => (
            <Card key={account.id} className="p-4 hover:shadow-sm transition-shadow">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold text-lg">
                    {(account.name || account.email || 'U').charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-ink">{account.name || 'Unknown Name'}</h3>
                      <Badge tone={getBadgeTone(account.status ?? "UNKNOWN")}>
                        {account.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate">{account.email}</p>
                    <div className="flex items-center gap-3 mt-1 text-sm text-slate">
                      <span className="flex items-center">
                        {getRoleIcon(account.role)}
                        <span className="ml-1">{account.role}</span>
                      </span>
                      <span className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        Joined: {new Date(account.createdAt ?? Date.now()).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {account.status === 'PENDING' && (
                    <Button
                      variant="primary"
                      className="bg-success text-white hover:bg-success-dark px-3 py-1 text-sm"
                      onClick={() => handleApproveAccount(account)}
                    >
                      <CheckCircle className="w-4 h-4 mr-1 inline-block" />
                      Approve
                    </Button>
                  )}
                  {account.status === 'ACTIVE' && account.role !== 'SUPER_ADMIN' && (
                    <Button
                      variant="secondary"
                      className="text-danger border-danger/20 hover:border-danger hover:bg-danger/5 px-3 py-1 text-sm"
                      onClick={() => handleSuspendAccount(account.id)}
                    >
                      <XCircle className="w-4 h-4 mr-1 inline-block" />
                      Suspend
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
















