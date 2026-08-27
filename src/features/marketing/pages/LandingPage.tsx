import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';

// Signature moment for the app: the hero states the actual thesis (local
// developers, local businesses, one structured channel) rather than a
// generic "welcome to our platform" - per the project's own positioning
// against Upwork/Fiverr and generic CRM/ERP tools.
export default function LandingPage() {
  return (
    <div>
      <section className="max-w-4xl mx-auto px-6 pt-24 pb-20 text-center">
        <p className="text-amber-dark font-medium text-sm tracking-wide uppercase mb-4">
          Built for the Kenyan developer-client market
        </p>
        <h1 className="text-5xl leading-tight mb-6">
          Your business needs a system.<br />A developer here can build it.
        </h1>
        <p className="text-slate text-lg max-w-xl mx-auto mb-8">
          PataDev Ke connects businesses that need a custom CRM or POS system
          with developers who can build one - matched, tracked through
          milestones, and paid securely, start to finish.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link to="/register"><Button>Post a project</Button></Link>
          <Link to="/projects"><Button variant="secondary">Browse open projects</Button></Link>
        </div>
      </section>

      <section className="border-t border-line bg-white">
        <div className="max-w-4xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-display font-semibold mb-2">Post what you need</h3>
            <p className="text-slate text-sm">Describe the CRM or POS system your business needs - budget, timeline, the details that matter.</p>
          </div>
          <div>
            <h3 className="font-display font-semibold mb-2">Get matched</h3>
            <p className="text-slate text-sm">Developers bid with their approach and price. You pick who builds it.</p>
          </div>
          <div>
            <h3 className="font-display font-semibold mb-2">Pay through milestones</h3>
            <p className="text-slate text-sm">Funds are held and released as work is approved - not paid upfront, not paid blind.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
