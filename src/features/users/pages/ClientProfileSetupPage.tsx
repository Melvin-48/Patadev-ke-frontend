import Card from '../../../components/ui/Card';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

// TODO: wire to usersService.createClientProfile, redirect to
// /dashboard on success.
export default function ClientProfileSetupPage() {
  return (
    <div>
      <h1 className="text-2xl mb-1">Set up your business profile</h1>
      <p className="text-slate text-sm mb-6">This is what developers see when they review your project.</p>
      <Card className="max-w-md">
        <form className="space-y-4">
          <Input placeholder="Business name" required />
          <Input placeholder="Business type (e.g. Retail, Hospitality)" />
          <Input placeholder="Phone number" />
          <Button type="submit" className="w-full">Save and continue</Button>
        </form>
      </Card>
    </div>
  );
}
