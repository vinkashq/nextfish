import BreadcrumbHeading from "@/components/breadcrumb-heading";
import { hostname, legalBusinessAddress, legalBusinessCountry, legalBusinessName, legalContactEmail } from "@/config";

export default function Page() {
  return (
    <div>
      <BreadcrumbHeading text="Terms of Service" />
      <h1 className="text-4xl font-semibold mb-4">Terms of Service</h1>
      <p className="text-sm text-gray-500 mb-8"><strong>Effective Date:</strong> 24-05-2025</p>
      <p className="mb-6">These Terms of Service (&quot;Terms&quot;) govern your access to and use of the website <strong>{hostname}</strong> (&quot;Site&quot;), operated by <strong>{legalBusinessName}</strong> (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), a company incorporated{legalBusinessCountry && (<> in {legalBusinessCountry}</>)}. By accessing or using this Site, you agree to be bound by these Terms.</p>
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">1. Use of the Site</h2>
        <p>You agree to use this Site only for lawful purposes and in accordance with these Terms. You may not use the Site:</p>
        <ul className="list-disc list-inside space-y-1 mt-2">
          <li>In any way that violates applicable laws or regulations.</li>
          <li>To infringe on the rights of others or post harmful or offensive content.</li>
          <li>To attempt to gain unauthorized access to our systems or data.</li>
        </ul>
      </div>
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">2. Intellectual Property</h2>
        <p>All content on this Site, including text, graphics, logos, and layout, is the property of {legalBusinessName} or its licensors, and is protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written consent.</p>
      </div>
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">3. Disclaimer of Warranties</h2>
        <p>This Site is provided on an &quot;as-is&quot; and &quot;as-available&quot; basis. We make no warranties or representations, express or implied, about the availability, accuracy, or reliability of the Site. Your use of the Site is at your own risk.</p>
      </div>
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">4. Limitation of Liability</h2>
        <p>To the maximum extent permitted by law, {legalBusinessName} shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the Site.</p>
      </div>
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">5. Links to Third-Party Sites</h2>
        <p>Our Site may contain links to third-party websites or services that are not owned or controlled by us. We are not responsible for the content, policies, or practices of any third-party websites.</p>
      </div>
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">6. Changes to These Terms</h2>
        <p>We may update these Terms from time to time. We will post the revised Terms on this page with a new effective date. By continuing to use the Site after changes are posted, you accept the updated Terms.</p>
      </div>
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">7. Governing Law</h2>
        <p>These Terms are governed by the laws of {legalBusinessCountry}. Any disputes arising out of or relating to these Terms or your use of the Site will be resolved in the courts of {legalBusinessCountry}.</p>
      </div>
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">8. Contact Us</h2>
        <p>If you have any questions about these Terms, please contact us:</p>
        <p className="mt-4"><strong>{legalBusinessName}</strong><br />{legalBusinessAddress}<br />Email: <strong>{legalContactEmail}</strong></p>
      </div>
    </div>
  )
}