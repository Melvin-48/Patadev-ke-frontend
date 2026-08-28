import PageHeader from '../../../components/dashboard/PageHeader';
import PaymentsPanel from '../../../features/engagements/components/PaymentsPanel';

// Ledger view for the active engagement. TODO: load via
// paymentsService.history(bidId) - no self-service withdrawals, by design.
export default function PaymentHistoryPage() {
  return (
    <>
      <PageHeader
        eyebrow="PAYMENTS"
        title="Payment history"
        description="Every held payment, platform fee and developer payout for this engagement."
      />
      <PaymentsPanel />
    </>
  );
}