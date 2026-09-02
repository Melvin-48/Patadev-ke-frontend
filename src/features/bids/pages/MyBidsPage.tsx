import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowUpRight, FileCheck2, MoreHorizontal, Plus } from 'lucide-react';
import PageHeader from '../../../components/dashboard/PageHeader';
import { useToast, Toast } from '../../../components/dashboard/useToast';
import { selectedBidId, mockBids } from '../../../data/mock';

type BidStatusColor = 'pending' | 'matched' | 'declined';

// Developer's own bids + the place-a-bid form. Opening the form is triggered
// from the browse page (via location.state) or the "Place a bid" button.
// TODO: replace mockBids with bidsService.listMine and wire submit to
// bidsService.create(projectId, proposedAmount, message).
export default function MyBidsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast, notify } = useToast();

  const [showForm, setShowForm] = useState(
    Boolean((location.state as { openBidForm?: boolean } | null)?.openBidForm),
  );
  const [amount, setAmount] = useState('');
  const [timeline, setTimeline] = useState('10â€“12 weeks');
  const [message, setMessage] = useState('');

  function toggleForm() {
    setShowForm((open) => !open);
    setAmount('');
    setMessage('');
  }

  function submitBid() {
    setShowForm(false);
    notify('Bid submitted successfully');
  }

  function openBid(bid: (typeof mockBids)[number]) {
    if (bid.color === 'matched') return navigate(`/dashboard/engagements/${selectedBidId}`);
    notify(`${bid.title} - bid status: ${bid.statusLabel}`);
  }

  const statusClass: Record<BidStatusColor, string> = {
    pending: 'pending',
    matched: 'matched',
    declined: 'declined',
  };

  return (
    <>
      <PageHeader
        eyebrow="DEVELOPER WORKSPACE"
        title="My bids"
        description="Track proposals, conversations, and the work thatâ€™s moving forward."
        action={
          <button className="button button-primary" onClick={toggleForm}>
            <Plus size={17} /> {showForm ? 'Close form' : 'Place a bid'}
          </button>
        }
      />

      {showForm && (
        <div className="panel bid-form">
          <div>
            <span className="eyebrow">NEW PROPOSAL</span>
            <h2>Bid on a project</h2>
          </div>
          <div className="form-two-col">
            <label>
              Your proposed amount (KES)
              <input value={amount} onChange={(event) => setAmount(event.target.value)} placeholder="e.g. 630,000" />
            </label>
            <label>
              Estimated timeline
              <select value={timeline} onChange={(event) => setTimeline(event.target.value)}>
                <option>10â€“12 weeks</option>
                <option>12â€“16 weeks</option>
                <option>16â€“20 weeks</option>
              </select>
            </label>
          </div>
          <label>
            Message to the client
            <textarea
              rows={4}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Tell the client why youâ€™re a strong fit..."
            />
          </label>
          <div className="form-footer">
            <button className="button button-quiet" onClick={toggleForm}>Cancel</button>
            <button className="button button-primary" onClick={submitBid}>
              Submit bid <ArrowUpRight size={15} />
            </button>
          </div>
        </div>
      )}

      <div className="bids-table panel">
        <div className="table-head">
          <span>PROJECT</span>
          <span>YOUR BID</span>
          <span>STATUS</span>
          <span>LAST ACTIVITY</span>
          <span />
        </div>
        {mockBids.map((bid) => (
          <div className="table-row" key={bid.id} onClick={() => openBid(bid)}>
            <div className="table-project">
              <span className="project-symbol sky"><MoreHorizontal size={17} style={{ visibility: 'hidden' }} /></span>
              <span>
                <strong>{bid.title}</strong>
                <small>{bid.category}</small>
              </span>
            </div>
            <strong style={{ color: '#3f4e66', fontSize: 11 }}>{bid.amount}</strong>
            <span className={`status-text ${statusClass[bid.color]}`}>
              <span />{bid.statusLabel}
            </span>
            <span>{bid.time}</span>
            <button
              className="row-action"
              onClick={(event) => { event.stopPropagation(); openBid(bid); }}
              aria-label={`Open ${bid.title}`}
            >
              <MoreHorizontal size={18} />
            </button>
          </div>
        ))}
        {mockBids.length === 0 && (
          <div className="empty-state">
            <FileCheck2 size={25} />
            <strong>No bids submitted yet</strong>
            <span>Browse open projects and place your first bid.</span>
          </div>
        )}
      </div>

      <Toast message={toast} />
    </>
  );
}
