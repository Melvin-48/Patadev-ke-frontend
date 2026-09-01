import EmptyState from '../../../components/common/EmptyState';
// TODO: list APPROVED milestones awaiting payout, each with a "Confirm
// payout" button -> adminService.confirmPayout(milestoneId). This is the
// manual trigger the whole admin-as-payment-intermediary model depends on.

export default function ConfirmPayoutsPage() {
  return (
    <div>
      <h1 className="text-2xl mb-6">Confirm payouts</h1>
      <EmptyState title="No payouts pending confirmation" />
    </div>
  );
}
