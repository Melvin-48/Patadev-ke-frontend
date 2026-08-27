import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, LockKeyhole, Sparkles } from 'lucide-react';
import PageHeader from '../../../components/dashboard/PageHeader';
import { useToast, Toast } from '../../../components/dashboard/useToast';

const budgetOptions = [
  'KES 150,000 – KES 300,000',
  'KES 300,000 – KES 500,000',
  'KES 500,000 – KES 800,000',
  'KES 800,000 – KES 1,200,000',
  'KES 1,200,000 – KES 2,000,000',
  'KES 2,000,000+',
];

// Post / draft a new project (CRM or POS) as a client. Saves as DRAFT -
// the client publishes later, matching the draft/publish flow on the backend.
// TODO: wire to projectsService.create on submit, keep the success toast.
export default function PostProjectPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [systemType, setSystemType] = useState<'CRM' | 'POS'>('CRM');
  const [budget, setBudget] = useState(budgetOptions[0]);
  const navigate = useNavigate();
  const { toast, notify } = useToast();

  const canSubmit = title.trim().length > 3 && description.trim().length > 20;

  function handleSubmit() {
    notify('Project saved as draft');
    navigate('/dashboard/projects');
  }

  return (
    <>
      <PageHeader
        eyebrow="NEW PROJECT"
        title="Tell us what you’re building"
        description="Give great developers the context they need to bring your idea to life."
        action={<button className="button button-quiet" onClick={() => navigate('/dashboard/projects')}>Cancel</button>}
      />

      <div className="form-layout">
        <section className="panel project-form">
          <div className="form-step">
            <span className="step-number active">01</span>
            <div>
              <span className="eyebrow">PROJECT BASICS</span>
              <h2>Start with the big picture</h2>
              <p>Keep it clear and specific. You can always add more detail later.</p>
            </div>
          </div>

          <label>
            Project title <span>Required</span>
            <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="e.g. Build a customer management platform" />
          </label>

          <label>
            What are you looking to build? <span>Required</span>
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Share the problem you want to solve, the key features, and what success looks like..."
              rows={6}
            />
            <small className="field-helper">{description.length}/500 characters</small>
          </label>

          <div className="form-two-col">
            <label>
              System type
              <select value={systemType} onChange={(event) => setSystemType(event.target.value as 'CRM' | 'POS')}>
                <option value="CRM">CRM - customer management</option>
                <option value="POS">POS - point of sale</option>
              </select>
            </label>
            <label>
              Estimated budget (KES)
              <select value={budget} onChange={(event) => setBudget(event.target.value)}>
                {budgetOptions.map((option) => <option key={option}>{option}</option>)}
              </select>
            </label>
          </div>

          <div className="form-footer">
            <span><LockKeyhole size={14} />Your project is private until you publish it.</span>
            <button className="button button-primary" disabled={!canSubmit} onClick={handleSubmit}>
              <CheckCircle2 size={16} /> Save as draft
            </button>
          </div>
        </section>

        <aside className="panel form-aside">
          <div className="eyebrow">QUICK TIPS</div>
          <h2>A brief that wins</h2>
          <p>The clearest briefs attract the strongest proposals. Three things matter most:</p>
          <ul className="tips-list">
            <li>Name the outcome, not just the features.</li>
            <li>Be honest about budget - ranges help developers price well.</li>
            <li>Pick the system type (CRM or POS) that fits your workflow.</li>
          </ul>
        </aside>
      </div>

      <Toast message={toast} />
    </>
  );
}