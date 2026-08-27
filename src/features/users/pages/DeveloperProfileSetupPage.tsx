import Card from '../../../components/ui/Card';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

// TODO: wire to usersService.createDeveloperProfile, redirect to
// /dashboard on success.
export default function DeveloperProfileSetupPage() {
  return (
    <div>
      <h1 className="text-2xl mb-1">Set up your developer profile</h1>
      <p className="text-slate text-sm mb-6">Clients see this when reviewing your bids.</p>
      <Card className="max-w-md">
        <form className="space-y-4">
          <Input placeholder="Display name" required />
          <Input placeholder="Tech stack (comma-separated)" required />
          <Input placeholder="Portfolio URL" />
          <textarea placeholder="Short bio" className="w-full px-3 py-2 rounded border border-line" rows={3} />
          <Button type="submit" className="w-full">Save and continue</Button>
        </form>
      </Card>
    </div>
  );
}
