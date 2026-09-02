import EmptyState from '../../../components/common/EmptyState';
// TODO: list accepted bids for the current user (client or developer) as
// conversation threads - each links to /messages/:bidId.

export default function ConversationsPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="text-2xl mb-6">Messages</h1>
      <EmptyState
        title="No conversations yet"
        description="Messaging opens once a bid is accepted."
      />
    </div>
  );
}

