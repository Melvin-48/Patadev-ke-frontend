import { Bell, Check, LockKeyhole, UserRound } from 'lucide-react';
import PageHeader from '../../../components/dashboard/PageHeader';
import Avatar from '../../../components/dashboard/Avatar';
import { useToast, Toast } from '../../../components/dashboard/useToast';
import { useAuth } from '../../../contexts/AuthContext';

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
          <button onClick={() => notify('Security settings')}><LockKeyhole size={16} /> Security</button>
          <button onClick={() => notify('Notification preferences')}><Bell size={16} /> Notifications</button>
        </nav>

        <section className="panel settings-form">
          <div className="profile-cover">
            <div className="profile-large"><Avatar initials="JD" /></div>
            <button className="button button-outline" onClick={() => notify('Change photo opened')}>
              Change photo
            </button>
          </div>

          <div className="settings-section">
            <span className="eyebrow">PERSONAL INFORMATION</span>
            <h2>{isClient ? 'Tell developers who you are' : 'Show clients what you can do'}</h2>
            <div className="form-two-col">
              <label>First name<input defaultValue="Jordan" /></label>
              <label>Last name<input defaultValue="Davis" /></label>
            </div>
            <label>Email address<input defaultValue={user?.email || 'jordan@buildbetter.co'} type="email" /></label>

            {!isClient ? (
              <>
                <label>Professional headline<input defaultValue="Senior full-stack developer helping teams build better software" /></label>
                <label>About you<textarea rows={5} defaultValue="I partner with ambitious teams to turn complex ideas into simple, useful products." /></label>
                <label>Skills<input defaultValue="React, TypeScript, Node.js, PostgreSQL, AWS" /></label>
                <label>Portfolio URL<input defaultValue="https://jordan.dev" /></label>
              </>
            ) : (
              <>
                <label>Company name<input defaultValue="Davis & Co." /></label>
                <label>About your company<textarea rows={5} defaultValue="We build tools that help independent businesses do their best work." /></label>
                <label>Website URL<input defaultValue="https://davisandco.co" /></label>
              </>
            )}
          </div>
        </section>
      </div>

      <Toast message={toast} />
    </>
  );
}