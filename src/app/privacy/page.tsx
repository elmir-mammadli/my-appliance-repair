import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy | MyAppliance Repair LLC',
  description: 'Privacy Policy for MyAppliance Repair LLC — how we collect, use, and protect your personal information.',
  alternates: { canonical: 'https://myappliance.us/privacy' },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <main>
      <Navbar />

      {/* Hero */}
      <section className="bg-blue-950 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 50%, #ffffff 1px, transparent 1px), radial-gradient(circle at 80% 20%, #ffffff 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
          aria-hidden="true"
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 lg:pt-36 lg:pb-24">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[#ffb81c] mb-4">
            Legal
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-blue-300 text-sm">Last updated: March 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

          <p className="text-slate-600 leading-relaxed mb-10">
            MY Appliance Repair (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) operates the website{' '}
            <a href="https://myappliance.us" className="text-blue-700 hover:underline">myappliance.us</a>{' '}
            and provides home appliance repair services throughout Connecticut. This Privacy Policy explains what
            personal information we collect, how we use it, and your rights regarding that information.
          </p>

          {/* Section 1 */}
          <h2 className="text-2xl font-bold text-blue-900 mb-4 mt-10">1. Information We Collect</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            We collect information you provide directly to us and information collected automatically when you use our website.
          </p>

          <h3 className="text-lg font-semibold text-blue-800 mb-2">Information You Provide</h3>
          <ul className="list-disc list-outside pl-5 space-y-2 text-slate-600 mb-6">
            <li>
              <strong>Booking and Service Requests:</strong> When you submit a service request or booking form, we collect your name, phone number, email address, and service address.
            </li>
            <li>
              <strong>Contact Form:</strong> When you contact us through our website, we collect your name, email address, phone number, and the content of your message.
            </li>
            <li>
              <strong>Job Applications:</strong> When you apply for a position through our hiring form, we collect your name, email address, phone number, work experience, and any CV or resume file you choose to upload. Uploaded files are stored securely and used solely for employment consideration.
            </li>
          </ul>

          <h3 className="text-lg font-semibold text-blue-800 mb-2">Information Collected Automatically</h3>
          <ul className="list-disc list-outside pl-5 space-y-2 text-slate-600 mb-6">
            <li>
              <strong>Usage Data:</strong> We may collect information about how you access and use our website, including your IP address, browser type, operating system, referring URLs, pages viewed, and the date and time of your visit.
            </li>
            <li>
              <strong>Cookies and Similar Technologies:</strong> We use cookies and similar tracking technologies to collect and store certain information. See Section 7 (Cookie Policy) for more details.
            </li>
          </ul>

          {/* Section 2 */}
          <h2 className="text-2xl font-bold text-blue-900 mb-4 mt-10">2. How We Use Your Information</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            We use the information we collect for the following purposes:
          </p>
          <ul className="list-disc list-outside pl-5 space-y-2 text-slate-600 mb-6">
            <li>To schedule and fulfill appliance repair service requests.</li>
            <li>To contact you regarding your appointment, service status, or follow-up questions.</li>
            <li>To respond to inquiries submitted through our contact form.</li>
            <li>To review and process employment applications.</li>
            <li>To send service reminders, confirmations, and updates related to your request.</li>
            <li>To improve and optimize our website and user experience.</li>
            <li>To comply with applicable legal obligations.</li>
            <li>To detect and prevent fraud or unauthorized activity.</li>
          </ul>
          <p className="text-slate-600 leading-relaxed mb-6">
            We do not sell your personal information to third parties for their own marketing purposes.
          </p>

          {/* Section 3 */}
          <h2 className="text-2xl font-bold text-blue-900 mb-4 mt-10">3. Data Storage and Security</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            We take reasonable technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
          </p>
          <ul className="list-disc list-outside pl-5 space-y-2 text-slate-600 mb-6">
            <li>Transmission of data over encrypted HTTPS connections.</li>
            <li>Limiting access to personal information to personnel who need it to perform their job functions.</li>
            <li>Using reputable third-party services with their own security practices for data storage and communications.</li>
          </ul>
          <p className="text-slate-600 leading-relaxed mb-6">
            No method of internet transmission or electronic storage is 100% secure. While we strive to protect your personal information, we cannot guarantee absolute security.
          </p>

          {/* Section 4 */}
          <h2 className="text-2xl font-bold text-blue-900 mb-4 mt-10">4. Third-Party Services</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            We may share your information with trusted third-party service providers who assist us in operating our business. These may include:
          </p>
          <ul className="list-disc list-outside pl-5 space-y-2 text-slate-600 mb-6">
            <li>
              <strong>Email Service Providers:</strong> We use third-party email platforms to send appointment confirmations, service updates, and communications.
            </li>
            <li>
              <strong>Payment Processors:</strong> If you pay online, your payment information is processed by a third-party payment processor. We do not store credit card or payment details on our servers.
            </li>
            <li>
              <strong>Analytics Providers:</strong> We may use analytics tools (such as Google Analytics) to understand how visitors use our website. These services may collect information about your use of the site using cookies and similar technologies.
            </li>
            <li>
              <strong>Cloud Storage and Form Processing:</strong> Submitted form data may be stored in third-party cloud platforms (such as Google Sheets or similar services) used for internal operations.
            </li>
          </ul>
          <p className="text-slate-600 leading-relaxed mb-6">
            These third parties are contractually obligated to handle your information in a manner consistent with this Privacy Policy and applicable law. We do not authorize them to use your personal information for their own independent purposes.
          </p>

          {/* Section 5 */}
          <h2 className="text-2xl font-bold text-blue-900 mb-4 mt-10">5. Your Rights</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            You have the following rights with respect to your personal information:
          </p>
          <ul className="list-disc list-outside pl-5 space-y-2 text-slate-600 mb-6">
            <li>
              <strong>Access:</strong> You may request a copy of the personal information we hold about you.
            </li>
            <li>
              <strong>Correction:</strong> You may request that we correct inaccurate or incomplete information.
            </li>
            <li>
              <strong>Deletion:</strong> You may request that we delete your personal information, subject to certain legal exceptions (e.g., information we are required to retain).
            </li>
            <li>
              <strong>Opt-Out of Marketing:</strong> If we send you marketing communications, you may opt out at any time by following the unsubscribe instructions in those emails or by contacting us.
            </li>
          </ul>
          <p className="text-slate-600 leading-relaxed mb-6">
            To exercise any of these rights, please contact us at{' '}
            <a href="mailto:service@myappliance.us" className="text-blue-700 hover:underline">service@myappliance.us</a>.
            We will respond to your request within a reasonable timeframe.
          </p>

          {/* Section 6 */}
          <h2 className="text-2xl font-bold text-blue-900 mb-4 mt-10">6. Connecticut Residents — CTDPA Rights</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            If you are a Connecticut resident, you have additional rights under the Connecticut Data Privacy Act (CTDPA), Conn. Gen. Stat. &sect; 42-515 et seq., effective January 1, 2023. These rights include:
          </p>
          <ul className="list-disc list-outside pl-5 space-y-2 text-slate-600 mb-6">
            <li>
              <strong>Right to Access:</strong> You have the right to confirm whether we are processing your personal data and to access that data.
            </li>
            <li>
              <strong>Right to Correct:</strong> You have the right to correct inaccuracies in your personal data.
            </li>
            <li>
              <strong>Right to Delete:</strong> You have the right to request deletion of personal data you have provided to us.
            </li>
            <li>
              <strong>Right to Data Portability:</strong> You have the right to obtain a copy of your personal data in a portable and readily usable format.
            </li>
            <li>
              <strong>Right to Opt Out:</strong> You have the right to opt out of the processing of personal data for purposes of targeted advertising or the sale of personal data. We do not sell personal data or use it for targeted advertising.
            </li>
            <li>
              <strong>Right to Appeal:</strong> If we decline to act on your rights request, you have the right to appeal that decision by contacting us.
            </li>
          </ul>
          <p className="text-slate-600 leading-relaxed mb-6">
            To submit a CTDPA rights request, email us at{' '}
            <a href="mailto:service@myappliance.us" className="text-blue-700 hover:underline">service@myappliance.us</a>{' '}
            with the subject line &ldquo;CTDPA Rights Request.&rdquo; We will respond within 45 days as required by law, with an option to extend for an additional 45 days when reasonably necessary.
          </p>

          {/* Section 7 */}
          <h2 className="text-2xl font-bold text-blue-900 mb-4 mt-10">7. Cookie Policy</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            Our website uses cookies — small text files stored on your device — to improve your browsing experience. We use the following types of cookies:
          </p>
          <ul className="list-disc list-outside pl-5 space-y-2 text-slate-600 mb-6">
            <li>
              <strong>Functional Cookies:</strong> These are necessary for the website to function properly. They enable core features such as page navigation and form submissions. These cookies do not collect personal information and cannot be disabled.
            </li>
            <li>
              <strong>Analytics Cookies:</strong> These cookies collect anonymous information about how visitors use our website, such as which pages are visited most often. This helps us improve the site experience. We may use services like Google Analytics for this purpose.
            </li>
          </ul>
          <p className="text-slate-600 leading-relaxed mb-6">
            Most web browsers allow you to control cookies through their settings. You can set your browser to refuse cookies or to alert you when cookies are being sent. However, disabling cookies may affect the functionality of certain features on our site.
          </p>

          {/* Section 8 */}
          <h2 className="text-2xl font-bold text-blue-900 mb-4 mt-10">8. Children&apos;s Privacy</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            Our website and services are not directed to children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe that we have inadvertently collected information from a child under 13, please contact us immediately at{' '}
            <a href="mailto:service@myappliance.us" className="text-blue-700 hover:underline">service@myappliance.us</a>{' '}
            and we will take steps to delete that information as promptly as possible.
          </p>

          {/* Section 9 */}
          <h2 className="text-2xl font-bold text-blue-900 mb-4 mt-10">9. Data Retention</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            We retain personal information for as long as necessary to fulfill the purposes described in this Privacy Policy, unless a longer retention period is required or permitted by law. Service and booking records may be retained for up to five years for business and legal purposes. Job application data is retained for up to one year after the position is filled, after which it is securely deleted.
          </p>

          {/* Section 10 */}
          <h2 className="text-2xl font-bold text-blue-900 mb-4 mt-10">10. Links to Other Websites</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            Our website may contain links to third-party websites. We are not responsible for the privacy practices of those sites. We encourage you to review the privacy policies of any third-party sites you visit.
          </p>

          {/* Section 11 */}
          <h2 className="text-2xl font-bold text-blue-900 mb-4 mt-10">11. Changes to This Privacy Policy</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            We may update this Privacy Policy from time to time to reflect changes in our practices or applicable law. When we do, we will revise the &ldquo;Last updated&rdquo; date at the top of this page. We encourage you to review this policy periodically to stay informed about how we protect your information.
          </p>

          {/* Section 12 */}
          <h2 className="text-2xl font-bold text-blue-900 mb-4 mt-10">12. Contact Us</h2>
          <p className="text-slate-600 leading-relaxed mb-2">
            If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
          </p>
          <div className="bg-blue-50 rounded-xl p-6 mt-4 mb-10">
            <p className="font-semibold text-blue-900 mb-1">MY Appliance Repair</p>
            <p className="text-slate-600 text-sm">Serving Connecticut</p>
            <p className="text-slate-600 text-sm mt-2">
              Email:{' '}
              <a href="mailto:service@myappliance.us" className="text-blue-700 hover:underline">
                service@myappliance.us
              </a>
            </p>
            <p className="text-slate-600 text-sm">
              Website:{' '}
              <a href="https://myappliance.us" className="text-blue-700 hover:underline">
                myappliance.us
              </a>
            </p>
          </div>

          {/* Cross-link */}
          <div className="border-t border-slate-200 pt-8">
            <p className="text-slate-500 text-sm">
              Also see our{' '}
              <Link href="/terms" className="text-blue-700 hover:underline font-medium">
                Terms of Service
              </Link>
              {' '}for the rules and conditions governing use of our services.
            </p>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
