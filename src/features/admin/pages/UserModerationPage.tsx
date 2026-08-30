import EmptyState from '../../../components/common/EmptyState';

// TODO: Implement User Ban/Verify management table
export default function UserModerationPage() {
  return (
    <div>
      <h1 className="text-2xl mb-6">User moderation</h1>
      <EmptyState
        title="No users flagged for moderation"
        description="Users reported or flagged will appear here for administrative action."
      />
    </div>
  );
}