import PageHeader from '../../../components/dashboard/PageHeader';
import MilestonesPanel from '../../../features/engagements/components/MilestonesPanel';
import { useToast, Toast } from '../../../components/dashboard/useToast';

// Full milestone list for the active engagement. TODO: load via
// milestonesService.listForBid for the selected bid.
export default function MilestonesPage() {
  const { toast, notify } = useToast();

  return (
    <>
      <PageHeader
        eyebrow="MILESTONES"
        title="Project milestones"
        description="Track delivery stages and the payments tied to each one."
      />
      <MilestonesPanel notify={notify} />
      <Toast message={toast} />
    </>
  );
}