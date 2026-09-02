import { Check } from 'lucide-react';
import PageHeader from '../../../components/dashboard/PageHeader';
import NotificationItem from '../../../components/dashboard/NotificationItem';
import { useToast, Toast } from '../../../components/dashboard/useToast';
import { mockNotifications } from '../../../data/mock';

function unreadCount() {
  return mockNotifications.reduce(
    (total, group) => total + group.items.filter((item) => item.unread).length,
    0,
  );
}

// Inbox for all system notifications. TODO: replace mockNotifications with
// notificationsService.list and mark-as-read calls.
export default function NotificationsPage() {
  const { toast, notify } = useToast();

  return (
    <>
      <PageHeader
        eyebrow="INBOX"
        title="Notifications"
        description="Stay in the loop on your projects, bids, and conversations."
        action={
          <button className="button button-outline" onClick={() => notify('All notifications marked as read')}>
            <Check size={16} /> Mark all read
          </button>
        }
      />

      <section className="panel notifications-list">
        {mockNotifications.map((group) => (
          <div key={group.day}>
            <div className="notification-day">{group.day}</div>
            {group.items.map((item) => (
              <NotificationItem
                key={item.title}
                title={item.title}
                detail={item.detail}
                time={item.time}
                unread={item.unread}
              />
            ))}
          </div>
        ))}
        {unreadCount() === 0 && (
          <div className="empty-state">
            <Check size={25} />
            <strong>You're all caught up</strong>
            <span>New activity on your bids and projects will show up here.</span>
          </div>
        )}
      </section>

      <Toast message={toast} />
    </>
  );
}
