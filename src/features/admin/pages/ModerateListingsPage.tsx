import EmptyState from '../../../components/common/EmptyState';
// TODO: list flagged/open projects with Approve/Remove actions ->
// adminService.moderateListing(projectId, action).

export default function ModerateListingsPage() {
  return (
    <div>
      <h1 className="text-2xl mb-6">Moderate listings</h1>
      <EmptyState title="Nothing to review" />
    </div>
  );
}

