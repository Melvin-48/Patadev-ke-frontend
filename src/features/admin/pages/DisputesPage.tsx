import EmptyState from '../../../components/common/EmptyState';

// TODO: Implement Dispute Resolution Split-Pane UI
export default function DisputesPage() {
  return (
    <div>
      <h1 className="text-2xl mb-6">Dispute resolution</h1>
      <EmptyState
        title="No active disputes"
        description="Disputes opened on milestones or project deliverables will appear here."
      />
    </div>
  );
}