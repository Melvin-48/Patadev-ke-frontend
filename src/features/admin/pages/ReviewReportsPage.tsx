import EmptyState from '../../../components/common/EmptyState';
// TODO: list Report records (OPEN -> IN_REVIEW -> RESOLVED) once the
// backend Report entity + /admin/reports endpoints exist - this is the
// lightweight dispute visibility feature, not a full arbitration tool.

export default function ReviewReportsPage() {
  return (
    <div>
      <h1 className="text-2xl mb-6">Review reports</h1>
      <EmptyState title="No open reports" description="Reports filed by clients or developers on an active engagement will appear here." />
    </div>
  );
}
