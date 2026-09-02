import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ArrowUpRight, CalendarDays, Check, CircleDollarSign, WalletCards } from 'lucide-react';
import PageHeader from '../../../components/dashboard/PageHeader';
import Avatar from '../../../components/dashboard/Avatar';
import { useToast, Toast } from '../../../components/dashboard/useToast';
import { mockBids, mockChatMessages, mockMilestones, mockProjects } from '../../../data/mock';
import MilestonesPanel from '../components/MilestonesPanel';
import PaymentsPanel from '../components/PaymentsPanel';
import ChatPanel from '../components/ChatPanel';

type Tab = 'Overview' | 'Milestones' | 'Chat' | 'Payments';

// Shared workspace for an accepted bid: overview, milestones, chat and
// payment history arranged as tabs, exactly like the mock dashboard.
// TODO: replace mock lookups with bidsService data for the :bidId route and
// wire updates (milestone status, chat) to the services.
export default function EngagementDetailPage() {
  const { bidId } = useParams<{ bidId: string }>();
  const { toast, notify } = useToast();
  const [tab, setTab] = useState<Tab>('Overview');

  const bid = mockBids.find((item) => item.id === bidId) ?? mockBids[1];
  const project = mockProjects.find((item) => item.id === bid.projectId) ?? mockProjects[1];

  return (
    <>
      <PageHeader
        eyebrow="ACTIVE ENGAGEMENT"
        title={project.title}
        description="A shared space for you and Alex Morgan to build great work together."
        action={
          <button className="button button-outline" onClick={() => setTab('Payments')}>
            <WalletCards size={16} /> Payment history
          </button>
        }
      />

      <div className="engagement-banner">
        <div className="engagement-client">
          <Avatar initials="AM" color="blue" />
          <div>
            <strong>Alex Morgan</strong>
            <span>Senior full-stack engineer Â· Matched May 18, 2024</span>
          </div>
          <span className="online-dot" /> Online
        </div>
        <div className="engagement-meta">
          <span><CircleDollarSign size={15} />{bid.amount} agreed</span>
          <span><CalendarDays size={15} />12 weeks</span>
        </div>
      </div>

      <div className="tabs">
        {(['Overview', 'Milestones', 'Chat', 'Payments'] as Tab[]).map((item) => (
          <button key={item} className={tab === item ? 'active' : ''} onClick={() => setTab(item)}>
            {item}
            {item === 'Chat' && <span className="tab-dot" />}
          </button>
        ))}
      </div>

      {tab === 'Overview' && (
        <div className="engagement-grid">
          <section className="panel timeline-panel">
            <div className="panel-header">
              <div>
                <span className="eyebrow">PROJECT PLAN</span>
                <h2>Milestones</h2>
              </div>
              <button className="text-button" onClick={() => setTab('Milestones')}>
                Manage <ArrowUpRight size={14} />
              </button>
            </div>
            <div className="timeline">
              {mockMilestones.map((item, index) => (
                <div
                  className={`timeline-item ${item.stage === 'complete' ? 'done' : item.stage === 'current' ? 'current' : ''}`}
                  key={item.title}
                >
                  <span className="timeline-marker">
                    {item.stage === 'complete' ? <Check size={13} /> : index + 1}
                  </span>
                  <div>
                    <strong>{item.title}</strong>
                    <span>{item.detail}</span>
                  </div>
                  <span className="timeline-status">
                    {item.stage === 'complete' ? 'Approved' : item.stage === 'current' ? 'In progress' : 'Upcoming'}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="panel conversation-panel">
            <div className="panel-header">
              <div>
                <span className="eyebrow">CONVERSATION</span>
                <h2>Recent messages</h2>
              </div>
              <button className="text-button" onClick={() => setTab('Chat')}>
                Open chat <ArrowUpRight size={14} />
              </button>
            </div>
            <div className="conversation">
              {mockChatMessages.slice(-2).map((message) => (
                <div className={`message ${message.sent ? 'sent' : ''}`} key={message.id}>
                  {!message.sent && <Avatar initials={message.initials} color={message.color} small />}
                  <div>
                    <p>{message.text}</p>
                    <time>{message.time}</time>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {tab === 'Milestones' && <MilestonesPanel notify={notify} />}
      {tab === 'Chat' && <ChatPanel notify={notify} />}
      {tab === 'Payments' && <PaymentsPanel />}

      <Toast message={toast} />
    </>
  );
}
