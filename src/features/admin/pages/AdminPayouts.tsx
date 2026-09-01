import React, { useState } from "react";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import { EmptyState } from "../../../components/common/EmptyState";
import { DollarSign, CheckCircle, AlertTriangle } from "lucide-react";
import { adminService } from "../services/admin.service";

const AdminPayouts: React.FC = () => {
  const [milestoneId, setMilestoneId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleConfirmPayout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!milestoneId.trim()) return;

    if (!confirm(`Are you sure you want to confirm payout for milestone ${milestoneId}?`)) return;

    try {
      setLoading(true);
      await adminService.confirmPayout(milestoneId.trim());
      alert('Payout confirmed successfully!');
      setMilestoneId("");
    } catch (err: any) {
      console.error('Failed to confirm payout:', err);
      alert(`Error: ${err.message || 'Failed to confirm payout'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-ink">Payout Management</h1>
        <p className="text-slate mt-1">Confirm and process developer payouts</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-8 border border-amber/30 bg-amber/5">
            <div className="flex flex-col items-center justify-center text-center">
              <AlertTriangle className="w-12 h-12 text-amber-dark mb-4" />
              <h2 className="text-lg font-bold text-ink mb-2">Backend Capability Missing</h2>
              <p className="text-slate max-w-md mx-auto">
                The NestJS backend does not currently expose a GET endpoint to list pending or completed payouts (e.g., <code className="bg-slate/10 px-1 py-0.5 rounded text-ink">GET /admin/payouts</code>). 
                Because we cannot fetch ledger entries or milestone statuses directly for the admin, the payout listing feature is disabled.
              </p>
            </div>
          </Card>

          <Card className="p-0 overflow-hidden">
            <div className="p-8">
              <EmptyState
                title="No payouts to display"
                description="Payout list unavailable until backend API is implemented."
              />
            </div>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="p-6">
            <h3 className="font-semibold text-ink mb-4">Manual Confirmation</h3>
            <p className="text-sm text-slate mb-6">
              Even though the list is unavailable, you can manually trigger a payout confirmation if you have the Milestone ID.
            </p>
            
            <form onSubmit={handleConfirmPayout} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-ink mb-1">Milestone ID</label>
                <Input
                  placeholder="e.g. 123e4567-e89b-12d3..."
                  value={milestoneId}
                  onChange={(e) => setMilestoneId(e.target.value)}
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-primary-600 hover:bg-primary-700 text-white"
                disabled={loading || !milestoneId.trim()}
              >
                {loading ? 'Confirming...' : (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2 inline-block" />
                    Confirm Payout
                  </>
                )}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminPayouts;


