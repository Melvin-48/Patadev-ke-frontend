import LegalPageLayout, { TOCItem } from '../../../components/layout/LegalPageLayout';

const TOC: TOCItem[] = [
  { id: 'introduction', title: '1. Introduction' },
  { id: 'definitions', title: '2. Definitions' },
  { id: 'eligibility', title: '3. Eligibility' },
  { id: 'user-accounts', title: '4. User Accounts' },
  { id: 'client-responsibilities', title: '5. Client Responsibilities' },
  { id: 'developer-responsibilities', title: '6. Developer Responsibilities' },
  { id: 'projects-and-proposals', title: '7. Projects and Proposals' },
  { id: 'milestones', title: '8. Milestones and Deliverables' },
  { id: 'payments', title: '9. Payments and Platform Fees' },
  { id: 'messaging', title: '10. Messaging and Communication' },
  { id: 'intellectual-property', title: '11. Intellectual Property' },
  { id: 'prohibited-activities', title: '12. Prohibited Activities' },
  { id: 'disputes', title: '13. Disputes and Resolution' },
  { id: 'termination', title: '14. Account Suspension and Termination' },
  { id: 'availability', title: '15. Platform Availability' },
  { id: 'liability', title: '16. Limitation of Liability' },
  { id: 'changes', title: '17. Changes to These Terms' },
  { id: 'contact', title: '18. Contact' },
];

export default function TermsPage() {
  return (
    <LegalPageLayout
      title="Terms of Service"
      subtitle="Please read these terms carefully before using PataDev Ke."
      lastUpdated="August 28, 2026"
      toc={TOC}
    >
      <section id="introduction">
        <h2 className="text-2xl font-bold text-[#0F172A] mb-4">1. Introduction</h2>
        <p className="text-slate-600 mb-4 text-base">
          Welcome to PataDev Ke. These Terms of Service ("Terms") govern your access to and use of the PataDev Ke platform, including our website, matching services, and any related software applications (collectively, the "Platform").
        </p>
        <p className="text-slate-600 mb-4 text-base">
          By accessing or using the Platform, you agree to be bound by these Terms. If you do not agree to these Terms, you may not access or use the Platform.
        </p>
      </section>

      <section id="definitions">
        <h2 className="text-2xl font-bold text-[#0F172A] mb-4">2. Definitions</h2>
        <ul className="list-disc pl-5 space-y-2 text-slate-600 mb-4 text-base">
          <li><strong>"Platform"</strong> refers to the PataDev Ke marketplace connecting clients and developers.</li>
          <li><strong>"Client"</strong> refers to any user seeking developer services, posting projects, or offering engagements on the Platform.</li>
          <li><strong>"Developer"</strong> refers to any user offering software development services, submitting proposals, or delivering work through the Platform.</li>
          <li><strong>"Project"</strong> refers to a specific piece of work or engagement posted by a Client.</li>
          <li><strong>"Milestone"</strong> refers to a designated stage of a Project, as agreed upon by the Client and Developer, which may trigger payment release.</li>
        </ul>
      </section>

      <section id="eligibility">
        <h2 className="text-2xl font-bold text-[#0F172A] mb-4">3. Eligibility</h2>
        <p className="text-slate-600 mb-4 text-base">
          You must be at least 18 years old and capable of forming a binding contract to use PataDev Ke. By registering an account, you represent and warrant that you meet these requirements and that all information provided is accurate and truthful.
        </p>
      </section>

      <section id="user-accounts">
        <h2 className="text-2xl font-bold text-[#0F172A] mb-4">4. User Accounts</h2>
        <p className="text-slate-600 mb-4 text-base">
          To use certain features of the Platform, you must register for an account and select a role (Client or Developer). You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
        </p>
      </section>

      <section id="client-responsibilities">
        <h2 className="text-2xl font-bold text-[#0F172A] mb-4">5. Client Responsibilities</h2>
        <p className="text-slate-600 mb-4 text-base">
          When acting as a Client, you agree to:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-slate-600 mb-4 text-base">
          <li>Provide accurate, clear, and complete information when posting Projects.</li>
          <li>Review Developer proposals fairly and communicate expectations clearly.</li>
          <li>Review and approve completed Milestones in a timely manner.</li>
          <li>Release payments for approved Milestones according to the Platform's rules.</li>
        </ul>
      </section>

      <section id="developer-responsibilities">
        <h2 className="text-2xl font-bold text-[#0F172A] mb-4">6. Developer Responsibilities</h2>
        <p className="text-slate-600 mb-4 text-base">
          When acting as a Developer, you agree to:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-slate-600 mb-4 text-base">
          <li>Maintain an accurate profile, including truthful representations of your skills, experience, and portfolio.</li>
          <li>Submit proposals only for Projects you are qualified to perform and intend to complete.</li>
          <li>Deliver agreed-upon work on time and to the standard specified in the Project agreement.</li>
          <li>Update Milestones appropriately and respond constructively to Client feedback.</li>
        </ul>
      </section>

      <section id="projects-and-proposals">
        <h2 className="text-2xl font-bold text-[#0F172A] mb-4">7. Projects and Proposals</h2>
        <p className="text-slate-600 mb-4 text-base">
          Clients may post Projects specifying budgets, timelines, and technical requirements. Developers may submit Proposals detailing their approach, pricing, and estimated delivery dates. A binding agreement between the Client and Developer is formed when a Client accepts a Proposal. PataDev Ke is not a party to these agreements but facilitates the matching and payment processes.
        </p>
      </section>

      <section id="milestones">
        <h2 className="text-2xl font-bold text-[#0F172A] mb-4">8. Milestones and Deliverables</h2>
        <p className="text-slate-600 mb-4 text-base">
          Projects may be structured around Milestones. Developers are responsible for submitting completed work for each Milestone. Clients are responsible for reviewing the work and approving the Milestone if the work meets the agreed specifications. Dispute resolution mechanisms are available if parties cannot agree on Milestone completion.
        </p>
      </section>

      <section id="payments">
        <h2 className="text-2xl font-bold text-[#0F172A] mb-4">9. Payments and Platform Fees</h2>
        <p className="text-slate-600 mb-4 text-base">
          PataDev Ke facilitates payments between Clients and Developers.
        </p>
        <ul className="list-disc pl-5 space-y-2 text-slate-600 mb-4 text-base">
          <li>Clients must fund Projects or Milestones appropriately prior to work commencement.</li>
          <li>Approved Milestones trigger the release of funds to the Developer.</li>
          <li>PataDev Ke charges a <strong>6% platform fee</strong> on all processed payments, which is deducted before the final payout to the Developer, unless otherwise specified.</li>
          <li>Any attempts to bypass the Platform's payment mechanisms to transact directly are strictly prohibited and will result in account termination.</li>
        </ul>
      </section>

      <section id="messaging">
        <h2 className="text-2xl font-bold text-[#0F172A] mb-4">10. Messaging and Communication</h2>
        <p className="text-slate-600 mb-4 text-base">
          The Platform provides a messaging system for communication between Clients and Developers. You agree to use this system professionally and respectfully. PataDev Ke reserves the right to monitor messages for compliance with these Terms, including preventing fraud or off-platform payment arrangements.
        </p>
      </section>

      <section id="intellectual-property">
        <h2 className="text-2xl font-bold text-[#0F172A] mb-4">11. Intellectual Property</h2>
        <p className="text-slate-600 mb-4 text-base">
          Unless otherwise agreed in writing between the Client and Developer, intellectual property rights for delivered and fully paid work transfer to the Client. You retain all rights to any content (such as profile information or portfolio items) you upload to the Platform, but grant PataDev Ke a license to display this content to operate and promote the Platform.
        </p>
      </section>

      <section id="prohibited-activities">
        <h2 className="text-2xl font-bold text-[#0F172A] mb-4">12. Prohibited Activities</h2>
        <p className="text-slate-600 mb-4 text-base">
          You agree not to engage in any of the following prohibited activities:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-slate-600 mb-4 text-base">
          <li>Fraud, misrepresentation, or creating fake accounts.</li>
          <li>Harassment, abuse, or sending spam.</li>
          <li>Attempting to bypass PataDev Ke's payment mechanisms.</li>
          <li>Distributing malware, viruses, or attempting to compromise Platform security.</li>
          <li>Using the Platform for any illegal or unauthorized purpose.</li>
        </ul>
      </section>

      <section id="disputes">
        <h2 className="text-2xl font-bold text-[#0F172A] mb-4">13. Disputes and Resolution</h2>
        <p className="text-slate-600 mb-4 text-base">
          In the event of a dispute regarding a Project or Milestone, Clients and Developers are encouraged to communicate directly to reach an amicable resolution. If a resolution cannot be reached, either party may escalate the dispute to PataDev Ke support. We will review the provided evidence and make a binding determination regarding the release of funds.
        </p>
      </section>

      <section id="termination">
        <h2 className="text-2xl font-bold text-[#0F172A] mb-4">14. Account Suspension and Termination</h2>
        <p className="text-slate-600 mb-4 text-base">
          We reserve the right to suspend or terminate your account at any time, without notice or liability, if we determine that you have violated these Terms, engaged in prohibited activities, or if your continued use poses a risk to the Platform or other users.
        </p>
      </section>

      <section id="availability">
        <h2 className="text-2xl font-bold text-[#0F172A] mb-4">15. Platform Availability</h2>
        <p className="text-slate-600 mb-4 text-base">
          While we strive to ensure the Platform is available continuously, we do not guarantee uninterrupted access. The Platform may be temporarily unavailable for maintenance, updates, or technical issues beyond our control.
        </p>
      </section>

      <section id="liability">
        <h2 className="text-2xl font-bold text-[#0F172A] mb-4">16. Limitation of Liability</h2>
        <p className="text-slate-600 mb-4 text-base">
          To the maximum extent permitted by applicable law, PataDev Ke shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the Platform, or the conduct of any other user on the Platform.
        </p>
      </section>

      <section id="changes">
        <h2 className="text-2xl font-bold text-[#0F172A] mb-4">17. Changes to These Terms</h2>
        <p className="text-slate-600 mb-4 text-base">
          We may update these Terms from time to time. We will notify you of any material changes by posting the updated Terms on the Platform or via email. Your continued use of the Platform after the effective date of the updated Terms constitutes your acceptance of the changes.
        </p>
      </section>

      <section id="contact">
        <h2 className="text-2xl font-bold text-[#0F172A] mb-4">18. Contact</h2>
        <p className="text-slate-600 mb-4 text-base">
          Questions about these Terms? Please reach out to us at:
        </p>
        <p className="font-semibold text-[#2563EB] mb-4 text-base">
          <a href="mailto:support@patadev.ke">Contact PataDev Ke</a>
        </p>
      </section>
    </LegalPageLayout>
  );
}
