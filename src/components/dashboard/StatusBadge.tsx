import { ProjectStatus } from '../../types';

const styles: Record<ProjectStatus, string> = {
  DRAFT: 'badge badge-draft',
  OPEN: 'badge badge-open',
  MATCHED: 'badge badge-matched',
  COMPLETED: 'badge badge-completed',
  CANCELLED: 'badge badge-draft',
};

export default function StatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <span className={styles[status]}>
      <span className="badge-dot" />
      {status}
    </span>
  );
}