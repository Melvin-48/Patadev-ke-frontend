import React, { useState } from "react";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { Badge } from "../../../components/ui/Badge";
import { Input } from "../../../components/ui/Input";
import {
  DollarSign, Search, Filter, CheckCircle,
  XCircle, Clock, Download, Eye
} from "lucide-react";

const AdminPayouts: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("ALL");

  const payouts = [
    { id: 1, developer: "Jane Smith", amount: 4500, status: "Pending", date: "2024-01-20" },
    { id: 2, developer: "Mike Johnson", amount: 3000, status: "Completed", date: "2024-01-18" },
    { id: 3, developer: "Sarah Williams", amount: 2000, status: "Failed", date: "2024-01-15" },
    { id: 4, developer: "Tom Brown", amount: 5500, status: "Pending", date: "2024-01-14" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-800";
      case "Pending": return "bg-yellow-100 text-yellow-800";
      case "Failed": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const totalPending = payouts.filter(p => p.status === "Pending").reduce((sum, p) => sum + p.amount, 0);
  const totalCompleted = payouts.filter(p => p.status === "Completed").reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payout Management</h1>
          <p className="text-gray-500">Confirm and process developer payouts</p>
        </div>
        <Button>
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="p-4">
          <p className="text-sm text-gray-500">Total Pending</p>
          <p className="text-xl font-bold text-yellow-600">${totalPending.toLocaleString()}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-500">Total Completed</p>
          <p className="text-xl font-bold text-green-600">${totalCompleted.toLocaleString()}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-500">Pending Count</p>
          <p className="text-xl font-bold text-gray-900">{payouts.filter(p => p.status === "Pending").length}</p>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search payouts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="ALL">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
          <option value="Failed">Failed</option>
        </select>
      </div>

      {/* Payouts List */}
      <div className="space-y-4">
        {payouts.map((payout) => (
          <Card key={payout.id} className="p-4 hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-semibold text-gray-900">{payout.developer}</h3>
                  <Badge className={getStatusColor(payout.status)}>
                    {payout.status}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                  <span className="flex items-center">
                    <DollarSign className="w-4 h-4 mr-1" />
                    ${payout.amount.toLocaleString()}
                  </span>
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {new Date(payout.date).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                {payout.status === "Pending" && (
                  <>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Confirm
                    </Button>
                    <Button size="sm" variant="outline" className="text-red-600 border-red-200">
                      <XCircle className="w-4 h-4 mr-1" />
                      Reject
                    </Button>
                  </>
                )}
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminPayouts;
