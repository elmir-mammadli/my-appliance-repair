import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Terms of Service | MyAppliance Repair LLC',
  description: 'Terms of Service for MyAppliance Repair LLC — the rules and conditions governing our appliance repair services in Connecticut.',
  alternates: { canonical: 'https://myappliance.us/terms' },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
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
            Terms of Service
          </h1>
          <p className="text-blue-300 text-sm">Last updated: March 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

          <p className="text-slate-600 leading-relaxed mb-10">
            Please read these Terms of Service carefully before using the website{' '}
            <a href="https://myappliance.us" className="text-blue-700 hover:underline">myappliance.us</a>{' '}
            or scheduling appliance repair services with MY Appliance Repair (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;). By accessing our website or booking our services, you agree to be bound by these Terms.
          </p>

          {/* Section 1 */}
          <h2 className="text-2xl font-bold text-blue-900 mb-4 mt-10">1. Acceptance of Terms</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            By accessing or using our website, submitting a service request, or engaging our repair services, you agree to these Terms of Service and our{' '}
            <Link href="/privacy" className="text-blue-700 hover:underline">Privacy Policy</Link>.
            If you do not agree with any part of these Terms, please do not use our website or services. We reserve the right to update these Terms at any time; continued use of our services after any changes constitutes your acceptance of the revised Terms.
          </p>

          {/* Section 2 */}
          <h2 className="text-2xl font-bold text-blue-900 mb-4 mt-10">2. Description of Services</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            MY Appliance Repair provides residential and light-commercial home appliance repair services throughout the State of Connecticut. Our services include, but are not limited to, repair of:
          </p>
          <ul className="list-disc list-outside pl-5 space-y-2 text-slate-600 mb-6">
            <li>Washing machines and dryers</li>
            <li>Refrigerators and freezers</li>
            <li>Dishwashers</li>
            <li>Ovens, ranges, and cooktops</li>
            <li>Microwaves and other household appliances</li>
          </ul>
          <p className="text-slate-600 leading-relaxed mb-6">
            All services are performed by trained, licensed technicians. We service most major appliance brands. Service availability may vary by location within Connecticut. We reserve the right to decline service at our discretion.
          </p>

          {/* Section 3 */}
          <h2 className="text-2xl font-bold text-blue-900 mb-4 mt-10">3. Scheduling and Cancellations</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            When you schedule a service appointment through our website, phone, or any other booking method, you agree to the following:
          </p>
          <ul className="list-disc list-outside pl-5 space-y-2 text-slate-600 mb-6">
            <li>
              <strong>Appointment Confirmation:</strong> Appointments are confirmed upon receipt of your booking submission and our written or verbal confirmation.
            </li>
            <li>
              <strong>Cancellation Notice:</strong> We require at least <strong>24 hours&apos; notice</strong> to cancel or reschedule an appointment. Cancellations made with less than 24 hours&apos; notice may be subject to a cancellation fee.
            </li>
            <li>
              <strong>No-Show Policy:</strong> If you are not present or deny access to the technician at the scheduled time without prior notice, you may be charged the service call fee.
            </li>
            <li>
              <strong>Late Arrivals:</strong> We provide arrival windows rather than exact times. Technician arrival times are estimates and may vary due to prior service calls or traffic conditions. We will make reasonable efforts to notify you of any significant delays.
            </li>
          </ul>

          {/* Section 4 */}
          <h2 className="text-2xl font-bold text-blue-900 mb-4 mt-10">4. Payment Terms</h2>
          <ul className="list-disc list-outside pl-5 space-y-2 text-slate-600 mb-6">
            <li>
              <strong>Service Call Fee:</strong> A service call (diagnostic) fee is charged for each visit. This fee covers the technician&apos;s travel, time, and diagnostic assessment of your appliance. The service call fee is applicable even if no repair is performed.
            </li>
            <li>
              <strong>Payment Upon Completion:</strong> Full payment for parts and labor is due upon completion of the repair, unless otherwise agreed in writing. We accept major credit and debit cards, cash, and other payment methods as indicated at the time of service.
            </li>
            <li>
              <strong>Estimates:</strong> Before performing any repair work beyond the initial diagnosis, our technician will provide you with a cost estimate. You must authorize the repair before work proceeds.
            </li>
            <li>
              <strong>Declined Repairs:</strong> If you decline a recommended repair after the diagnostic visit, the service call fee remains due and payable.
            </li>
            <li>
              <strong>Late Payments:</strong> Invoices not paid at the time of service may be subject to a late payment fee. We reserve the right to pursue collection of unpaid balances through lawful means.
            </li>
          </ul>

          {/* Section 5 */}
          <h2 className="text-2xl font-bold text-blue-900 mb-4 mt-10">5. Warranty on Repairs</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            We stand behind our work. All completed repairs carry the following warranty:
          </p>
          <ul className="list-disc list-outside pl-5 space-y-2 text-slate-600 mb-6">
            <li>
              <strong>Parts and Labor Warranty:</strong> We provide a <strong>90-day warranty</strong> on parts installed and labor performed. If the same issue recurs within 90 days of the original repair date, we will return and address it at no additional labor charge, subject to the exclusions below.
            </li>
            <li>
              <strong>Exclusions:</strong> The warranty does not cover new, unrelated failures; damage caused by misuse, power surges, flooding, fire, or external causes; issues resulting from repairs attempted by the customer or other parties after our service; or consumable parts such as filters and belts that are subject to normal wear.
            </li>
            <li>
              <strong>Manufacturer Parts Warranty:</strong> Where manufacturer-warranted parts are used, the manufacturer&apos;s warranty terms apply in addition to our labor warranty.
            </li>
          </ul>
          <p className="text-slate-600 leading-relaxed mb-6">
            This warranty is the sole and exclusive warranty provided. All other warranties, express or implied, including implied warranties of merchantability or fitness for a particular purpose, are expressly disclaimed to the fullest extent permitted by law.
          </p>

          {/* Section 6 */}
          <h2 className="text-2xl font-bold text-blue-900 mb-4 mt-10">6. Parts Availability</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            We make every reasonable effort to source the required parts for your appliance repair. However, we cannot guarantee the availability of specific parts for all appliance makes, models, or vintages. In cases where parts are unavailable, discontinued, or subject to extended lead times, we will notify you promptly and discuss available options. We are not liable for any delay or inability to complete a repair due to parts unavailability beyond our control.
          </p>

          {/* Section 7 */}
          <h2 className="text-2xl font-bold text-blue-900 mb-4 mt-10">7. Customer Responsibilities</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            By scheduling service with us, you agree to the following responsibilities:
          </p>
          <ul className="list-disc list-outside pl-5 space-y-2 text-slate-600 mb-6">
            <li>
              <strong>Access:</strong> You will provide our technician with safe and reasonable access to the appliance and the area where it is located at the scheduled service time.
            </li>
            <li>
              <strong>Accurate Information:</strong> You will provide accurate information about the appliance (make, model, serial number) and the nature of the problem to the best of your knowledge. Inaccurate information may result in additional diagnostic time or fees.
            </li>
            <li>
              <strong>Safe Working Environment:</strong> You will ensure a safe working environment for our technicians, free from known hazards. Our technicians reserve the right to decline service in conditions they reasonably deem unsafe.
            </li>
            <li>
              <strong>Presence During Service:</strong> An adult (18+) must be present during the entire service visit.
            </li>
          </ul>

          {/* Section 8 */}
          <h2 className="text-2xl font-bold text-blue-900 mb-4 mt-10">8. Limitation of Liability</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            To the maximum extent permitted by applicable law:
          </p>
          <ul className="list-disc list-outside pl-5 space-y-2 text-slate-600 mb-6">
            <li>
              Our total liability to you for any claim arising from or related to our services shall not exceed the amount you paid us for the specific service giving rise to the claim.
            </li>
            <li>
              We are not liable for any indirect, incidental, consequential, special, or punitive damages, including but not limited to lost profits, loss of data, food spoilage, property damage not directly caused by our technician&apos;s negligence, or any other economic loss.
            </li>
            <li>
              We are not responsible for pre-existing conditions or damage to an appliance that existed prior to our service visit.
            </li>
            <li>
              We are not liable for damage resulting from appliances that were not in a reasonably serviceable condition prior to our visit.
            </li>
          </ul>
          <p className="text-slate-600 leading-relaxed mb-6">
            Nothing in these Terms limits or excludes any liability that cannot be limited or excluded by applicable law, including liability for gross negligence or willful misconduct.
          </p>

          {/* Section 9 */}
          <h2 className="text-2xl font-bold text-blue-900 mb-4 mt-10">9. Intellectual Property</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            All content on the myappliance.us website — including text, graphics, logos, images, and software — is the property of MY Appliance Repair or its content suppliers and is protected by applicable copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, modify, or create derivative works from any content on this website without our express written permission. You are granted a limited, non-exclusive, non-transferable license to access and use this website for personal, non-commercial purposes only.
          </p>

          {/* Section 10 */}
          <h2 className="text-2xl font-bold text-blue-900 mb-4 mt-10">10. Website Use</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            You agree to use our website only for lawful purposes. You may not use our website to transmit any material that is unlawful, harmful, threatening, defamatory, or otherwise objectionable. We reserve the right to suspend or terminate access to the website for any user who violates these Terms.
          </p>

          {/* Section 11 */}
          <h2 className="text-2xl font-bold text-blue-900 mb-4 mt-10">11. Governing Law</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            These Terms of Service shall be governed by and construed in accordance with the laws of the <strong>State of Connecticut</strong>, without regard to its conflict of law provisions. Any legal action or proceeding arising from these Terms or our services shall be brought exclusively in the state or federal courts located in Connecticut, and you consent to the personal jurisdiction of such courts.
          </p>

          {/* Section 12 */}
          <h2 className="text-2xl font-bold text-blue-900 mb-4 mt-10">12. Dispute Resolution</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            Before filing any formal legal action, we encourage you to contact us directly at{' '}
            <a href="mailto:service@myappliance.us" className="text-blue-700 hover:underline">service@myappliance.us</a>{' '}
            to attempt to resolve the dispute informally. Most concerns can be resolved quickly and to your satisfaction. If informal resolution is unsuccessful, disputes shall be resolved in the state or federal courts of Connecticut as provided in Section 11. You agree to waive any right to a jury trial to the fullest extent permitted by Connecticut law.
          </p>

          {/* Section 13 */}
          <h2 className="text-2xl font-bold text-blue-900 mb-4 mt-10">13. Changes to These Terms</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            We reserve the right to modify these Terms of Service at any time. Changes will be effective upon posting to our website with a revised &ldquo;Last updated&rdquo; date. Your continued use of our services after any changes constitutes your acceptance of the new Terms. We encourage you to review these Terms periodically.
          </p>

          {/* Section 14 */}
          <h2 className="text-2xl font-bold text-blue-900 mb-4 mt-10">14. Severability</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            If any provision of these Terms is found to be invalid, illegal, or unenforceable under applicable law, the remaining provisions will continue in full force and effect. The invalid provision will be modified to the minimum extent necessary to make it enforceable.
          </p>

          {/* Section 15 */}
          <h2 className="text-2xl font-bold text-blue-900 mb-4 mt-10">15. Contact Us</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            If you have questions about these Terms of Service, please contact us:
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
              <Link href="/privacy" className="text-blue-700 hover:underline font-medium">
                Privacy Policy
              </Link>
              {' '}for information on how we collect and use your personal data.
            </p>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
