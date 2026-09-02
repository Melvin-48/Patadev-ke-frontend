import React, { useState, useEffect } from "react";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { Badge } from "../../../components/ui/Badge";
import { Input } from "../../../components/ui/Input";
import { LoadingSpinner } from "../../../components/common/LoadingSpinner";
import { EmptyState } from "../../../components/common/EmptyState";
import { adminService } from "../services/admin.service";
import { AlertCircle, Calendar, User, Search, CheckCircle, XCircle, RotateCcw, ArrowRight } from "lucide-react";

const DisputesPage: React.FC = () => {
  const [disputes, setDisputes] = useState<any[]>([]);
  const [totalDisputes, setTotalDisputes] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [resolutionNote, setResolutionNote] = useState<Record<string, string>>({});
  const [processing, setProcessing] = useState<string | null>(null);

  useEffect(() => {
    fetchDisputes();
  }, [filterStatus]);

  const fetchDisputes = async () => {
    try {
      setLoading(true);
      const params: any = {};
      if (filterStatus !== 'ALL') params.status = filterStatus;
      
      const res = await adminService.getDisputes(params);
      setDisputes(res.items || []);
      setTotalDisputes(res.total || 0);
    } catch (error) {
      console.error('Error fetching disputes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleResolve = async (disputeId: string, decision: string) => {
    const note = resolutionNote[disputeId];
    if (!note?.trim()) {
      alert("A resolution note is required before resolving a dispute.");
      return;
    }
    
    if (!confirm(`Are you sure you want to resolve this dispute with action: ${decision}?`)) return;

    try {
      setProcessing(disputeId);
      await adminService.resolveDispute(disputeId, decision, note);
      alert(`Dispute successfully updated (${decision})`);
      await fetchDisputes();
    } catch (error: any) {
      console.error('Error resolving dispute:', error);
      alert(`Failed to resolve dispute: ${error.message || 'Unknown error'}`);
    } finally {
      setProcessing(null);
    }
  };

  const getBadgeTone = (status: string) => {
    switch (status) {
      case 'OPEN': return 'amber';
      case 'UNDER_REVIEW': return 'neutral';
      case 'RESOLVED': return 'success';
      case 'REJECTED': return 'danger';
      default: return 'neutral';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-ink">Dispute Management</h1>
        <p className="text-slate mt-1">Review and resolve platform disputes between clients and developers</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border border-line rounded bg-white text-ink focus:outline-none focus:ring-2 focus:ring-primary w-full md:w-64"
        >
          <option value="ALL">All Statuses</option>
          <option value="OPEN">Open</option>
          <option value="UNDER_REVIEW">Under Review</option>
          <option value="RESOLVED">Resolved</option>
          <option value="REJECTED">Rejected</option>
        </select>
      </div>

      {loading ? (
        <div className="flex items-center justify-center min-h-[40vh]">
          <LoadingSpinner />
        </div>
      ) : disputes.length === 0 ? (
        <Card className="p-8">
          <EmptyState
            title="No disputes found"
            description={filterStatus === 'ALL' ? "Great! There are no disputes on the platform." : "No disputes match your current filter."}
          />
        </Card>
      ) : (
        <div className="space-y-4">
          <p className="text-sm text-slate mb-4">Showing {disputes.length} of {totalDisputes} disputes</p>
          {disputes.map((dispute) => (
            <Card key={dispute.id} className="p-0 overflow-hidden border border-line flex flex-col md:flex-row">
              <div className="p-6 flex-1 border-b md:border-b-0 md:border-r border-line">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-lg font-semibold text-ink">
                    {dispute.reason || "No Reason Provided"}
                  </h3>
                  <Badge tone={getBadgeTone(dispute.status)}>
                    {dispute.status}
                  </Badge>
                </div>
                
                <p className="text-slate text-sm mb-4">
                  {dispute.description || "No description provided by the raiser."}
                </p>

                <div className="flex flex-wrap gap-4 mt-3 text-sm text-slate bg-slate/5 p-3 rounded">
                  <span className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    Raised By: <strong className="ml-1 text-ink">{dispute.raisedBy?.email || 'Unknown'}</strong>
                  </span>
                  <span className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    Against: <strong className="ml-1 text-ink">{dispute.against?.email || 'Unknown'}</strong>
                  </span>
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(dispute.createdAt).toLocaleDateString()}
                  </span>
                </div>
                
                {(dispute.status === 'RESOLVED' || dispute.status === 'REJECTED') && (
                  <div className="mt-4 p-3 bg-success/5 border border-success/20 rounded">
                    <p className="text-sm font-semibold text-ink">Resolution Note:</p>
                    <p className="text-sm text-slate mt-1">{dispute.resolutionNote || 'No resolution note provided.'}</p>
                  </div>
                )}
              </div>

              {(dispute.status === 'OPEN' || dispute.status === 'UNDER_REVIEW') && (
                <div className="p-6 w-full md:w-80 bg-slate/5 flex flex-col gap-4">
                  <h4 className="font-semibold text-ink text-sm">Resolve Dispute</h4>
                  
                  <div>
                    <label className="block text-xs font-medium text-slate mb-1">Resolution Note (Required)</label>
                    <textarea 
                      className="w-full px-3 py-2 border border-line rounded bg-white text-ink text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                      rows={3}
                      placeholder="Explain the resolution decision..."
                      value={resolutionNote[dispute.id] || ""}
                      onChange={(e) => setResolutionNote({...resolutionNote, [dispute.id]: e.target.value})}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-2">
                    <Button 
                      variant="primary"
                      className="bg-primary-600 hover:bg-primary-700 text-white w-full justify-start px-3 py-1.5 text-sm"
                      disabled={processing === dispute.id}
                      onClick={() => handleResolve(dispute.id, 'RESOLVED')}
                    >
                      <CheckCircle className="w-4 h-4 mr-2" /> Mark Resolved
                    </Button>
                    <Button 
                      variant="primary"
                      className="bg-success text-white hover:bg-success-dark w-full justify-start px-3 py-1.5 text-sm"
                      disabled={processing === dispute.id}
                      onClick={() => handleResolve(dispute.id, 'PAYOUT_DEVELOPER')}
                    >
                      <ArrowRight className="w-4 h-4 mr-2" /> Payout Developer
                    </Button>
                    <Button 
                      variant="secondary" 
                      className="border-primary-200 text-primary-700 hover:bg-primary-50 w-full justify-start px-3 py-1.5 text-sm"
                      disabled={processing === dispute.id}
                      onClick={() => handleResolve(dispute.id, 'REFUND_CLIENT')}
                    >
                      <RotateCcw className="w-4 h-4 mr-2" /> Refund Client
                    </Button>
                    <Button 
                      variant="secondary" 
                      className="border-danger/30 text-danger hover:bg-danger/10 w-full justify-start px-3 py-1.5 text-sm"
                      disabled={processing === dispute.id}
                      onClick={() => handleResolve(dispute.id, 'REJECTED')}
                    >
                      <XCircle className="w-4 h-4 mr-2" /> Reject Dispute
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default DisputesPage;

