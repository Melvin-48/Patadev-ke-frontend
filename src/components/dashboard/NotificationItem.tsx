import { Bell } from 'lucide-react';

interface NotificationItemProps {
  title: string;
  detail: string;
  time: string;
  unread?: boolean;
}

export default function NotificationItem({ title, detail, time, unread = false }: NotificationItemProps) {
  return (
    <div className={`notification-item ${unread ? 'unread' : ''}`}>
      <div className="notification-icon">
        <Bell size={16} />
      </div>
      <div>
        <strong>{title}</strong>
        <span>{detail}</span>
      </div>
      <time>{time}</time>
      {unread && <span className="unread-dot" />}
    </div>
  );
}