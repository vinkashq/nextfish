import BreadcrumbHeading from "@/components/breadcrumb-heading";
import { hostname, legalBusinessAddress, legalBusinessCountry, legalBusinessName, legalContactEmail } from "@/lib/const";

export default function Page() {
  return (
    <div>
      <BreadcrumbHeading text="Privacy Policy" />
      <h1 className="text-4xl font-semibold mb-4">Privacy Policy</h1>
      <p className="text-sm text-gray-500 mb-8"><strong>Effective Date:</strong> 25-10-2025</p>
      <p className="mb-6">Welcome to <strong>{hostname}</strong>, a website operated by <strong>{legalBusinessName}</strong> (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), a company incorporated{legalBusinessCountry && (<> in {legalBusinessCountry}</>)}.</p>
      <p className="mb-6">Your privacy is important to us. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you visit our website. By accessing or using <strong>{hostname}</strong>, you agree to the terms of this Privacy Policy.</p>
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">1. Information We May Collect</h2>
        <p className="mb-4">Since our website is in its early stages and does not currently offer products, services, or interactive features, we do not actively collect personal data unless you voluntarily provide it to us (e.g., through a contact form or newsletter signup).</p>
        <p className="mb-2">Possible types of data we may collect in the future include:</p>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Personal Information:</strong> Your name, email address, and other voluntary details.</li>
          <li><strong>Technical Data:</strong> Browser type, IP address, device information, and usage data through cookies or similar technologies.</li>
        </ul>
      </div>
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
        <p className="mb-2">Information we collect, if any, may be used for purposes such as:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Responding to your inquiries or feedback.</li>
          <li>Sending updates or newsletters (if you&apos;ve opted in).</li>
          <li>Improving our website performance and user experience.</li>
        </ul>
      </div>
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">3. Sharing of Your Information</h2>
        <p className="mb-2">We do not sell, rent, or trade your personal information. We may share it only:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>With service providers who help us operate the website, under confidentiality agreements.</li>
          <li>To comply with legal obligations.</li><li>To protect our rights or the safety of others.</li>
        </ul>
      </div>
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">4. Cookies and Tracking</h2>
        <p>We may use cookies or similar tracking technologies to enhance your browsing experience. You can control your cookie preferences through your browser settings.</p>
      </div>
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">5. Data Security</h2>
        <p>We take reasonable steps to protect your information. However, no system is completely secure, and we cannot guarantee absolute data security.</p>
      </div>
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">6. Your Rights</h2>
        <p className="mb-4">If you are located in Singapore, you may have rights under the Personal Data Protection Act (PDPA), including:</p>
        <ul className="list-disc list-inside space-y-1 mb-4">
          <li>The right to access your personal data.</li>
          <li>The right to correct inaccuracies.</li>
          <li>The right to withdraw consent.</li>
        </ul>
        <p>To exercise your rights, contact us at <strong>{legalContactEmail}</strong>.</p>
      </div>
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">7. Third-Party Links</h2>
        <p>Our website may contain links to external websites. We are not responsible for the privacy practices or content of such websites.</p>
      </div>
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">8. Updates to This Policy</h2>
        <p>We may revise this Privacy Policy from time to time. Updates will be posted here with a new effective date. Continued use of the website means you accept the updated policy.</p>
      </div>
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">9. Contact Us</h2>
        <p>If you have questions or concerns about this Privacy Policy, please contact us:</p>
        <p className="mt-4"><strong>{legalBusinessName}</strong><br />{legalBusinessAddress}<br />Email: <strong>{legalContactEmail}</strong></p>
      </div>
    </div>
  )
}