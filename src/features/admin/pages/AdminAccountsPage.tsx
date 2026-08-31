import { useState, useEffect } from 'react';

import { 
  Users, UserCheck, UserX, Search,
  Shield, ShieldCheck, ShieldAlert, Mail,
  Calendar, CheckCircle, XCircle
} from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { Button } from "@/components/ui/Button";
import { Input } from '../../../components/ui/Input';
import { Badge } from '../../../components/ui/Badge';
import { LoadingSpinner } from '../../../components/common/LoadingSpinner';
import { EmptyState } from '../../../components/common/EmptyState';
import { adminService } from '../services/admin.service';
import type { UserAccount } from '../types/admin.types';

export default function AdminAccountsPage() {
  const [accounts, setAccounts] = useState<UserAccount[]>([]);
  const [filteredAccounts, setFilteredAccounts] = useState<UserAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      setLoading(true);
      const data = await adminService.getAccounts();
      setAccounts(data);
      setFilteredAccounts(data);
    } catch (error) {
      console.error('Error fetching accounts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let filtered = [...accounts];
    
    if (searchTerm) {
      filtered = filtered.filter(a => 
        (a.name ?? '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (filterRole !== 'ALL') {
      filtered = filtered.filter(a => a.role === filterRole);
    }
    
    if (filterStatus !== 'ALL') {
      filtered = filtered.filter(a => a.status === filterStatus);
    }
    
    setFilteredAccounts(filtered);
  }, [searchTerm, filterRole, filterStatus, accounts]);

  const handleApproveAccount = async (userId: string) => {
    try {
      await adminService.approveAccount(userId);
      await fetchAccounts();
      alert('Account approved successfully!');
    } catch (error) {
      console.error('Error approving account:', error);
      alert('Failed to approve account.');
    }
  };

  const handleSuspendAccount = async (userId: string) => {
    if (!confirm('Are you sure you want to suspend this account?')) return;
    try {
      await adminService.suspendAccount(userId);
      await fetchAccounts();
      alert('Account suspended successfully!');
    } catch (error) {
      console.error('Error suspending account:', error);
      alert('Failed to suspend account.');
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'ADMIN': return <ShieldAlert className="w-4 h-4 text-purple-600" />;
      case 'CLIENT': return <Shield className="w-4 h-4 text-blue-600" />;
      case 'DEVELOPER': return <ShieldCheck className="w-4 h-4 text-green-600" />;
      default: return <Shield className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'bg-green-100 text-green-800';
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'SUSPENDED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
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
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Account Management</h1>
        <p className="text-gray-500 mt-1">Manage user accounts and permissions</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-sm text-gray-500">Total Users</p>
              <p className="text-xl font-bold text-gray-900">{accounts.length}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <UserCheck className="w-5 h-5 text-green-600" />
            <div>
              <p className="text-sm text-gray-500">Active</p>
              <p className="text-xl font-bold text-green-600">
                {accounts.filter(a => a.status === 'ACTIVE').length}
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <ShieldAlert className="w-5 h-5 text-yellow-600" />
            <div>
              <p className="text-sm text-gray-500">Pending</p>
              <p className="text-xl font-bold text-yellow-600">
                {accounts.filter(a => a.status === 'PENDING').length}
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <UserX className="w-5 h-5 text-red-600" />
            <div>
              <p className="text-sm text-gray-500">Suspended</p>
              <p className="text-xl font-bold text-red-600">
                {accounts.filter(a => a.status === 'SUSPENDED').length}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="ALL">All Roles</option>
          <option value="CLIENT">Clients</option>
          <option value="DEVELOPER">Developers</option>
          <option value="ADMIN">Admins</option>
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="ALL">All Status</option>
          <option value="ACTIVE">Active</option>
          <option value="PENDING">Pending</option>
          <option value="SUSPENDED">Suspended</option>
        </select>
      </div>

      {/* Accounts List */}
      {filteredAccounts.length === 0 ? (
        <EmptyState
          icon={<Users className="w-12 h-12 text-gray-400" />}
          title="No accounts found"
          description="Try adjusting your search or filters"
        />
      ) : (
        <div className="space-y-4">
          {filteredAccounts.map((account) => (
            <Card key={account.id} className="p-4 hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                    {(account.name ?? 'U').charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-900">{account.name}</h3>
                      <Badge className={getStatusColor(account.status ?? "UNKNOWN")}>
                        {account.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500">{account.email}</p>
                    <div className="flex items-center gap-3 mt-1 text-sm text-gray-400">
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
                      size="sm"
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => handleApproveAccount(account.id)}
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Approve
                    </Button>
                  )}
                  {account.status === 'ACTIVE' && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-red-600 border-red-200 hover:border-red-300"
                      onClick={() => handleSuspendAccount(account.id)}
                    >
                      <XCircle className="w-4 h-4 mr-1" />
                      Suspend
                    </Button>
                  )}
                  <Button variant="outline" size="sm">
                    <Mail className="w-4 h-4 mr-1" />
                    Contact
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















