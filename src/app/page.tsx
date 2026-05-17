import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import BrandsGrid from '@/components/BrandsGrid';
import Services from '@/components/Services';
import RecentRepairs from '@/components/RecentRepairs';
import WhyUs from '@/components/WhyUs';
import Discounts from '@/components/Discounts';
import Coverage from '@/components/Coverage';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import BookingModal from '@/components/BookingModal';
import ContactForm from '@/components/ContactForm';
import JoinUs from '@/components/JoinUs';
import HiringModal from '@/components/HiringModal';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Appliance Repair Connecticut | Same-Day Service | MyAppliance Repair LLC',
  description:
    'Fast, reliable appliance repair across Connecticut. Refrigerators, washers, dryers, dishwashers & more. Licensed techs, 90-day warranty, veteran & senior discounts. Book online!',
  alternates: { canonical: 'https://myappliance.us' },
  openGraph: {
    type: 'website',
    url: 'https://myappliance.us',
    title: 'Appliance Repair Connecticut | Same-Day Service | MyAppliance Repair LLC',
    description:
      'Fast, reliable appliance repair across Connecticut. Refrigerators, washers, dryers, dishwashers & more. Licensed techs, 90-day warranty, veteran & senior discounts. Book online!',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'MyAppliance Repair LLC - Connecticut Appliance Repair Services',
      },
    ],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How much does appliance repair cost in Connecticut?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most appliance repairs in CT range from $120–$400 depending on the appliance and the part needed. We provide a full written estimate before any work begins — no hidden fees, ever. The diagnostic fee is waived when you proceed with the repair.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you offer same-day appliance repair?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Call before noon and we can usually dispatch a technician to your Connecticut home the same day. We offer morning (8am–12pm), afternoon (12pm–4pm), and evening (4pm–7pm) slots. Emergency service is available 24/7.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does a typical repair take?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most repairs are completed in 1–2 hours on the first visit. Our vans carry thousands of OEM parts for all major brands, which means we rarely need to schedule a second visit to wait for a part.',
      },
    },
    {
      '@type': 'Question',
      name: 'What warranty do you provide on repairs?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Every repair comes with a 90-day parts and labor warranty. If the same issue returns within 90 days, we come back and fix it at no additional charge. We only use OEM (original manufacturer) parts.',
      },
    },
    {
      '@type': 'Question',
      name: "My washing machine won't spin — what's wrong?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "A washer that won't spin is usually caused by a worn drive belt, a faulty lid switch or door latch, a broken motor coupling, or an overloaded drum. Less commonly it's the control board or motor. Our technician will diagnose the exact cause before recommending any repair.",
      },
    },
    {
      '@type': 'Question',
      name: 'Why is my washer leaking water?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Leaks typically come from a torn door gasket/boot seal (very common on front-loaders), a cracked water inlet valve, a damaged drain hose, or a worn tub bearing seal. The location of the leak (door, bottom, back) helps narrow it down quickly.',
      },
    },
    {
      '@type': 'Question',
      name: 'My dryer runs but produces no heat — is it the heating element?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Possibly, but not always. On electric dryers, no-heat issues are most commonly a blown thermal fuse, a failed heating element, or a bad thermistor/thermostat. On gas dryers, the igniter or gas valve coils are the usual culprits. We test all components before replacing anything.',
      },
    },
    {
      '@type': 'Question',
      name: "My dryer makes a loud squeaking or thumping noise — what's causing it?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Squeaking is almost always the drum glides, drum bearing, or idler pulley wearing out. Thumping usually means a broken or stretched drum drive belt. Both are straightforward repairs that are typically completed in one visit.',
      },
    },
    {
      '@type': 'Question',
      name: 'My refrigerator is not cooling but the freezer works fine — why?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "This is a very common symptom of a failed evaporator fan motor or a defrost system problem (defrost heater, defrost thermostat, or defrost timer). The freezer keeps cooling because the compressor still works, but cold air isn't circulating to the refrigerator section.",
      },
    },
    {
      '@type': 'Question',
      name: 'My ice maker stopped working — is this a major repair?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Usually not. The most common causes are a failed ice maker assembly, a blocked or frozen water supply line, a faulty water inlet valve, or a stuck ice level arm. In most cases we can replace the failed component and restore ice production within a single visit.',
      },
    },
    {
      '@type': 'Question',
      name: 'My refrigerator is making a loud buzzing or clicking noise — should I be worried?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A clicking noise often indicates a failing start relay or compressor having trouble starting — this needs prompt attention to avoid compressor failure. Buzzing is often the evaporator or condenser fan motor going bad. Neither should be ignored as they can escalate quickly.',
      },
    },
    {
      '@type': 'Question',
      name: "There's water pooling under my vegetable drawers — what causes that?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Water under the crisper drawers is almost always a clogged defrost drain. As ice melts during the defrost cycle, it flows through a drain tube that can become blocked with food debris or ice. We clear the drain and verify the defrost system is working properly.',
      },
    },
    {
      '@type': 'Question',
      name: "My dishwasher isn't cleaning dishes properly — what's wrong?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Poor cleaning performance is typically caused by clogged spray arms, a worn wash pump motor, a failed detergent dispenser, low water temperature, or a dirty filter assembly. We check all components — sometimes it's simply a clogged filter that homeowners can clean themselves, and we'll show you how.",
      },
    },
    {
      '@type': 'Question',
      name: 'My dishwasher has standing water at the bottom after a cycle — is the pump broken?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Not necessarily — it's often the drain pump, but it could also be a clogged drain hose, a stuck check valve, or a garbage disposal connection issue. We diagnose the full drain system before replacing components.",
      },
    },
    {
      '@type': 'Question',
      name: "My gas oven won't ignite — is this dangerous?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "A gas oven that clicks but won't light, or shows a gas smell without igniting, needs prompt professional attention. The most common causes are a failed igniter, a faulty spark module, or dirty/misaligned burner caps. If you smell a strong gas odor, leave the home and call your gas provider first, then contact us.",
      },
    },
    {
      '@type': 'Question',
      name: 'My oven heats unevenly — some areas burn while others are undercooked?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Uneven oven heating is usually caused by a failing bake element (electric) or a temperature sensor giving inaccurate readings. It can also be a control board issue. We test oven temperature across multiple zones to pinpoint the cause.',
      },
    },
  ],
};

function jsonLd(data: object): string {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026');
}

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema) }}
      />
      <Navbar />
      <Hero />
      <BrandsGrid />
      <Services />
      <RecentRepairs />
      <WhyUs />
      <Discounts />
      <Coverage />
      <Testimonials />
      <FAQ />
      <BookingModal />
      <ContactForm />
      <JoinUs />
      <HiringModal />
      <Footer />
    </main>
  );
}
