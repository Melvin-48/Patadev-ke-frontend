import { mockLedger } from '../../../data/mock';

// Ledger view - HELD / COMMISSION / PAYOUT / REFUND entries for an accepted
// bid. Used inside the engagement detail (Payments tab) and standalone.
export default function PaymentsPanel() {
  return (
    <section className="panel detail-panel">
      <div className="panel-header">
        <div>
          <span className="eyebrow">FINANCIALS</span>
          <h2>Payment history</h2>
        </div>
        <span className="balance-label">Total paid <strong>KES 288,000</strong></span>
      </div>
      {mockLedger.map((payment) => (
        <div className="payment-row" key={payment.date + payment.label}>
          <span className="payment-date">{payment.date}</span>
          <div>
            <strong>{payment.label}</strong>
            <span>{payment.type}</span>
          </div>
          <strong className={payment.type === 'COMMISSION' ? 'negative' : ''}>{payment.amount}</strong>
        </div>
      ))}
    </section>
  );
}