import { Check, Plus } from 'lucide-react';
import { mockMilestones } from '../../../data/mock';

// Full milestone list used both inside the engagement detail (Milestones tab)
// and as a standalone /dashboard/milestones page.
export default function MilestonesPanel({ notify }: { notify?: (message: string) => void }) {
  return (
    <section className="panel detail-panel">
      <div className="panel-header">
        <div>
          <span className="eyebrow">PROJECT PLAN</span>
          <h2>All milestones</h2>
        </div>
        <button className="button button-primary" onClick={() => notify?.('New milestone form opened')}>
          <Plus size={16} /> Add milestone
        </button>
      </div>
      {mockMilestones.map((item, index) => (
        <div className="detail-row" key={item.title}>
          <span className={`timeline-marker ${item.stage === 'complete' ? 'complete' : ''}`}>
            {item.stage === 'complete' ? <Check size={13} /> : index + 1}
          </span>
          <div>
            <strong>{item.title}</strong>
            <span>{item.detail}</span>
          </div>
          <strong>{item.amount}</strong>
          <button className="button button-outline small-button">
            {item.stage === 'current' ? 'Review' : 'Details'}
          </button>
        </div>
      ))}
    </section>
  );
}