import { Check, LockKeyhole, UserRound } from 'lucide-react';
import PageHeader from '../../../components/dashboard/PageHeader';
import Avatar from '../../../components/dashboard/Avatar';
import { useToast, Toast } from '../../../components/dashboard/useToast';
import { useAuth } from '../../../contexts/AuthContext';

// Profile settings, role-aware: clients edit company details, developers
// edit their pitch, skills and portfolio. TODO: load current values from
// GET /users/me and persist via usersService.
export default function SettingsPage() {
  const { user } = useAuth();
  const { toast, notify } = useToast();
  const isClient = user?.role === 'CLIENT';

  return (
    <>
      <PageHeader
        eyebrow="ACCOUNT SETTINGS"
        title="Your profile"
        description="Keep your details current so the right people can find you."
        action={
          <button className="button button-primary" onClick={() => notify('Profile changes saved')}>
            <Check size={16} /> Save changes
          </button>
        }
      />

      <div className="settings-layout">
        <nav className="settings-nav">
          <button className="active"><UserRound size={16} /> Profile</button>
          <button><LockKeyhole size={16} /> Security</button>
        </nav>

        <section className="panel settings-form">
          <div className="profile-cover">
            <div className="profile-large"><Avatar initials="PD" /></div>
            <button className="button button-outline">Change photo</button>
          </div>
          <div className="settings-section">
            <span className="eyebrow">PERSONAL INFORMATION</span>
            <h2>{isClient ? 'Tell developers who you are' : 'Show clients what you can do'}</h2>
            <div className="form-two-col">
              <label>First name<input defaultValue="Peter" /></label>
              <label>Last name<input defaultValue="Kamau" /></label>
            </div>
            <label>Email address<input defaultValue={user?.email ?? ''} type="email" /></label>
            {isClient ? (
              <>
                <label>Business name<input defaultValue="Kamau Stores Ltd." /></label>
                <label>About your business<textarea rows={5} defaultValue="We run a growing retail chain and need systems to match." /></label>
                <label>Phone number<input defaultValue="+254 712 345 678" /></label>
              </>
            ) : (
              <>
                <label>Professional headline<input defaultValue="Senior full-stack developer building systems for Kenyan businesses" /></label>
                <label>About you<textarea rows={5} defaultValue="I partner with ambitious teams to turn complex ideas into simple, useful products." /></label>
                <label>Skills<input defaultValue="React, TypeScript, Node.js, PostgreSQL, AWS" /></label>
                <label>Portfolio URL<input defaultValue="https://myportfolio.dev" /></label>
              </>
            )}
          </div>
        </section>
      </div>

      <Toast message={toast} />
    </>
  );
}