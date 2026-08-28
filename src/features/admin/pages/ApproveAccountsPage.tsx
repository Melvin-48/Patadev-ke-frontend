import EmptyState from '../../../components/common/EmptyState';
// TODO: list unverified users, each with an "Approve" button ->
// adminService.approveAccount(userId).

export default function ApproveAccountsPage() {
  return (
    <div>
      <h1 className="text-2xl mb-6">Approve accounts</h1>
      <EmptyState title="No accounts pending approval" />
    </div>
  );
}
