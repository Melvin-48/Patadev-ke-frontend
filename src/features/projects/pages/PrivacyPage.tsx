import LegalPageLayout, { TOCItem } from '../../../components/layout/LegalPageLayout';

const TOC: TOCItem[] = [
  { id: 'introduction', title: '1. Introduction' },
  { id: 'information-we-collect', title: '2. Information We Collect' },
  { id: 'account-information', title: '3. Account Information' },
  { id: 'profile-information', title: '4. Profile and Professional Information' },
  { id: 'project-information', title: '5. Project and Marketplace Information' },
  { id: 'messages', title: '6. Messages and Communications' },
  { id: 'payment-information', title: '7. Payment Information' },
  { id: 'how-we-use-information', title: '8. How We Use Information' },
  { id: 'information-sharing', title: '9. Information Sharing' },
  { id: 'data-security', title: '10. Data Security' },
  { id: 'data-retention', title: '11. Data Retention' },
  { id: 'cookies', title: '12. Cookies and Similar Technologies' },
  { id: 'privacy-choices', title: '13. Your Privacy Choices' },
  { id: 'third-party-services', title: '14. Third-Party Services' },
  { id: 'childrens-privacy', title: '15. Children\'s Privacy' },
  { id: 'changes', title: '16. Changes to This Policy' },
  { id: 'contact', title: '17. Contact Us' },
];

export default function PrivacyPage() {
  return (
    <LegalPageLayout
      title="Privacy Policy"
      subtitle="Learn how PataDev Ke collects, uses, and protects information when you use the platform."
      lastUpdated="August 28, 2026"
      toc={TOC}
    >
      <section id="introduction">
        <h2 className="text-2xl font-bold text-[#0F172A] mb-4">1. Introduction</h2>
        <p className="text-slate-600 mb-4 text-base">
          This Privacy Policy explains how PataDev Ke collects, uses, shares, and protects your personal information when you access our website, applications, and matching services (collectively, the "Platform").
        </p>
        <p className="text-slate-600 mb-4 text-base">
          By using PataDev Ke, you understand and agree to the data practices described in this Privacy Policy.
        </p>
      </section>

      <section id="information-we-collect">
        <h2 className="text-2xl font-bold text-[#0F172A] mb-4">2. Information We Collect</h2>
        <p className="text-slate-600 mb-4 text-base">
          We collect information that you provide directly to us when you register for an account, create a profile, post projects, or communicate with other users on the Platform. We also collect certain technical information automatically when you use our services.
        </p>
      </section>

      <section id="account-information">
        <h2 className="text-2xl font-bold text-[#0F172A] mb-4">3. Account Information</h2>
        <p className="text-slate-600 mb-4 text-base">
          When you register for a PataDev Ke account, we collect basic identifying information, including:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-slate-600 mb-4 text-base">
          <li>Your full name.</li>
          <li>Your email address.</li>
          <li>Your authentication credentials (securely hashed passwords).</li>
          <li>Your selected account role (Client or Developer).</li>
        </ul>
      </section>

      <section id="profile-information">
        <h2 className="text-2xl font-bold text-[#0F172A] mb-4">4. Profile and Professional Information</h2>
        <p className="text-slate-600 mb-4 text-base">
          If you register as a Developer, we collect information to help Clients evaluate your expertise. This includes your professional title, bio, skills, technology stack, portfolio items, experience level, and availability. 
        </p>
        <p className="text-slate-600 mb-4 text-base">
          If you register as a Client, we collect your business or organization name, industry, and a short business description to help Developers understand your context.
        </p>
      </section>

      <section id="project-information">
        <h2 className="text-2xl font-bold text-[#0F172A] mb-4">5. Project and Marketplace Information</h2>
        <p className="text-slate-600 mb-4 text-base">
          We collect data related to your marketplace activities, including:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-slate-600 mb-4 text-base">
          <li>Project descriptions, budgets, timelines, and technical requirements posted by Clients.</li>
          <li>Proposals submitted by Developers.</li>
          <li>Milestones, deliverables, and project status updates.</li>
        </ul>
      </section>

      <section id="messages">
        <h2 className="text-2xl font-bold text-[#0F172A] mb-4">6. Messages and Communications</h2>
        <p className="text-slate-600 mb-4 text-base">
          We collect the content of in-platform messages you send and receive, as well as communication metadata. This is necessary to facilitate communication between Clients and Developers and to ensure compliance with our Terms of Service.
        </p>
      </section>

      <section id="payment-information">
        <h2 className="text-2xl font-bold text-[#0F172A] mb-4">7. Payment Information</h2>
        <p className="text-slate-600 mb-4 text-base">
          When you engage in transactions on the Platform, we collect payment-related records, transaction information, and payment statuses. Actual payment processing may be handled by secure third-party payment processors, and we do not store full credit card numbers directly on our servers.
        </p>
      </section>

      <section id="how-we-use-information">
        <h2 className="text-2xl font-bold text-[#0F172A] mb-4">8. How We Use Information</h2>
        <p className="text-slate-600 mb-4 text-base">
          We use the information we collect for legitimate platform functions, including:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-slate-600 mb-4 text-base">
          <li>Creating, maintaining, and authenticating user accounts.</li>
          <li>Managing Client and Developer profiles.</li>
          <li>Matching Developers with relevant Projects based on skills and preferences.</li>
          <li>Processing project activities and managing milestones.</li>
          <li>Facilitating in-platform messaging.</li>
          <li>Processing payments and calculating platform fees.</li>
          <li>Sending necessary platform notifications and updates.</li>
          <li>Maintaining platform security and preventing fraud.</li>
          <li>Providing customer support.</li>
        </ul>
      </section>

      <section id="information-sharing">
        <h2 className="text-2xl font-bold text-[#0F172A] mb-4">9. Information Sharing</h2>
        <p className="text-slate-600 mb-4 text-base">
          Because PataDev Ke is a marketplace, certain information is shared to facilitate connections:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-slate-600 mb-4 text-base">
          <li><strong>Developer Profiles:</strong> Your profile information, including skills and portfolio, is visible to Clients seeking talent.</li>
          <li><strong>Project Information:</strong> Projects posted by Clients are visible to Developers to encourage proposals.</li>
          <li><strong>Messages:</strong> Messages are accessible to the participants of the conversation.</li>
          <li><strong>Payment Processors:</strong> We share necessary transaction data with integrated third-party payment processors to facilitate secure payments.</li>
        </ul>
      </section>

      <section id="data-security">
        <h2 className="text-2xl font-bold text-[#0F172A] mb-4">10. Data Security</h2>
        <p className="text-slate-600 mb-4 text-base">
          We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no internet transmission is entirely secure, and we cannot guarantee absolute security.
        </p>
      </section>

      <section id="data-retention">
        <h2 className="text-2xl font-bold text-[#0F172A] mb-4">11. Data Retention</h2>
        <p className="text-slate-600 mb-4 text-base">
          We retain your information for as long as your account is active or as needed to provide you services, comply with our legal obligations, resolve disputes, and enforce our agreements.
        </p>
      </section>

      <section id="cookies">
        <h2 className="text-2xl font-bold text-[#0F172A] mb-4">12. Cookies and Similar Technologies</h2>
        <p className="text-slate-600 mb-4 text-base">
          We use cookies and similar tracking technologies to authenticate users, remember preferences, and analyze platform usage to improve our services.
        </p>
      </section>

      <section id="privacy-choices">
        <h2 className="text-2xl font-bold text-[#0F172A] mb-4">13. Your Privacy Choices</h2>
        <p className="text-slate-600 mb-4 text-base">
          You have control over your personal information on PataDev Ke:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-slate-600 mb-4 text-base">
          <li>You can update your account and profile information at any time through your dashboard.</li>
          <li>You can manage your communication and notification preferences.</li>
          <li>You can request assistance regarding your personal data or request account deletion by contacting our support team, subject to any legal retention requirements or ongoing project obligations.</li>
        </ul>
      </section>

      <section id="third-party-services">
        <h2 className="text-2xl font-bold text-[#0F172A] mb-4">14. Third-Party Services</h2>
        <p className="text-slate-600 mb-4 text-base">
          Our Platform may contain links to third-party websites or services. We are not responsible for the privacy practices or content of these third parties. We encourage you to review the privacy policies of any third-party services you interact with.
        </p>
      </section>

      <section id="childrens-privacy">
        <h2 className="text-2xl font-bold text-[#0F172A] mb-4">15. Children's Privacy</h2>
        <p className="text-slate-600 mb-4 text-base">
          PataDev Ke is intended for professional use by individuals aged 18 and older. We do not knowingly collect personal information from children under 18. If we become aware that we have inadvertently collected such information, we will take steps to delete it.
        </p>
      </section>

      <section id="changes">
        <h2 className="text-2xl font-bold text-[#0F172A] mb-4">16. Changes to This Policy</h2>
        <p className="text-slate-600 mb-4 text-base">
          We may update this Privacy Policy periodically. We will notify you of any material changes by posting the updated policy on this page and updating the "Last updated" date.
        </p>
      </section>

      <section id="contact">
        <h2 className="text-2xl font-bold text-[#0F172A] mb-4">17. Contact Us</h2>
        <p className="text-slate-600 mb-4 text-base">
          Questions about your privacy? Please reach out to us at:
        </p>
        <p className="font-semibold text-[#2563EB] mb-4 text-base">
          <a href="mailto:support@patadev.ke">Contact PataDev Ke</a>
        </p>
      </section>
    </LegalPageLayout>
  );
}
