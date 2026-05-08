'use client';

import { useState } from 'react';

const faqs = [
  {
    category: 'Pricing & Booking',
    questions: [
      {
        q: 'How much does appliance repair cost in Connecticut?',
        a: 'Most appliance repairs in CT range from $120–$400 depending on the appliance and the part needed. We provide a full written estimate before any work begins — no hidden fees, ever. The diagnostic fee is waived when you proceed with the repair.',
      },
      {
        q: 'Do you offer same-day appliance repair?',
        a: 'Yes. Call before noon and we can usually dispatch a technician to your Connecticut home the same day. We offer morning (8am–12pm), afternoon (12pm–4pm), and evening (4pm–7pm) slots. Emergency service is available 24/7.',
      },
      {
        q: 'How long does a typical repair take?',
        a: 'Most repairs are completed in 1–2 hours on the first visit. Our vans carry thousands of OEM parts for all major brands, which means we rarely need to schedule a second visit to wait for a part.',
      },
      {
        q: 'What warranty do you provide on repairs?',
        a: 'Every repair comes with a 90-day parts and labor warranty. If the same issue returns within 90 days, we come back and fix it at no additional charge. We only use OEM (original manufacturer) parts.',
      },
    ],
  },
  {
    category: 'Washer & Dryer',
    questions: [
      {
        q: 'My washing machine won\'t spin — what\'s wrong?',
        a: 'A washer that won\'t spin is usually caused by a worn drive belt, a faulty lid switch or door latch, a broken motor coupling, or an overloaded drum. Less commonly it\'s the control board or motor. Our technician will diagnose the exact cause before recommending any repair.',
      },
      {
        q: 'Why is my washer leaking water?',
        a: 'Leaks typically come from a torn door gasket/boot seal (very common on front-loaders), a cracked water inlet valve, a damaged drain hose, or a worn tub bearing seal. The location of the leak (door, bottom, back) helps narrow it down quickly.',
      },
      {
        q: 'My dryer runs but produces no heat — is it the heating element?',
        a: 'Possibly, but not always. On electric dryers, no-heat issues are most commonly a blown thermal fuse, a failed heating element, or a bad thermistor/thermostat. On gas dryers, the igniter or gas valve coils are the usual culprits. We test all components before replacing anything.',
      },
      {
        q: 'My dryer makes a loud squeaking or thumping noise — what\'s causing it?',
        a: 'Squeaking is almost always the drum glides, drum bearing, or idler pulley wearing out. Thumping usually means a broken or stretched drum drive belt. Both are straightforward repairs that are typically completed in one visit.',
      },
    ],
  },
  {
    category: 'Refrigerator & Freezer',
    questions: [
      {
        q: 'My refrigerator is not cooling but the freezer works fine — why?',
        a: 'This is a very common symptom of a failed evaporator fan motor or a defrost system problem (defrost heater, defrost thermostat, or defrost timer). The freezer keeps cooling because the compressor still works, but cold air isn\'t circulating to the refrigerator section. We see this frequently across Samsung, LG, and Whirlpool models.',
      },
      {
        q: 'My ice maker stopped working — is this a major repair?',
        a: 'Usually not. The most common causes are a failed ice maker assembly, a blocked or frozen water supply line, a faulty water inlet valve, or a stuck ice level arm. In most cases we can replace the failed component and restore ice production within a single visit.',
      },
      {
        q: 'My refrigerator is making a loud buzzing or clicking noise — should I be worried?',
        a: 'A clicking noise often indicates a failing start relay or compressor having trouble starting — this needs prompt attention to avoid compressor failure. Buzzing is often the evaporator or condenser fan motor going bad. Neither should be ignored as they can escalate quickly.',
      },
      {
        q: 'There\'s water pooling under my vegetable drawers — what causes that?',
        a: 'Water under the crisper drawers is almost always a clogged defrost drain. As ice melts during the defrost cycle, it flows through a drain tube that can become blocked with food debris or ice. We clear the drain and verify the defrost system is working properly.',
      },
    ],
  },
  {
    category: 'Dishwasher & Oven',
    questions: [
      {
        q: 'My dishwasher isn\'t cleaning dishes properly — what\'s wrong?',
        a: 'Poor cleaning performance is typically caused by clogged spray arms, a worn wash pump motor, a failed detergent dispenser, low water temperature, or a dirty filter assembly. We check all components — sometimes it\'s simply a clogged filter that homeowners can clean themselves, and we\'ll show you how.',
      },
      {
        q: 'My dishwasher has standing water at the bottom after a cycle — is the pump broken?',
        a: 'Not necessarily — it\'s often the drain pump, but it could also be a clogged drain hose, a stuck check valve, or a garbage disposal connection issue. We diagnose the full drain system before replacing components.',
      },
      {
        q: 'My gas oven won\'t ignite — is this dangerous?',
        a: 'A gas oven that clicks but won\'t light, or shows a gas smell without igniting, needs prompt professional attention. The most common causes are a failed igniter, a faulty spark module, or dirty/misaligned burner caps. If you smell a strong gas odor, leave the home and call your gas provider first, then contact us.',
      },
      {
        q: 'My oven heats unevenly — some areas burn while others are undercooked?',
        a: 'Uneven oven heating is usually caused by a failing bake element (electric) or a temperature sensor giving inaccurate readings. It can also be a control board issue. We test oven temperature across multiple zones to pinpoint the cause.',
      },
    ],
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const id = q.replace(/\s+/g, '-').toLowerCase().slice(0, 40);

  return (
    <div className="border border-blue-100 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={id}
        className="w-full flex items-center justify-between gap-4 px-6 py-4 bg-white hover:bg-blue-50 transition-colors duration-200 cursor-pointer text-left"
      >
        <span className="font-semibold text-blue-900 text-sm sm:text-base pr-4">{q}</span>
        <span
          className={`flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full border-2 border-blue-200 text-blue-600 transition-transform duration-200 ${open ? 'rotate-45' : ''}`}
          aria-hidden="true"
        >
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
        </span>
      </button>
      <div
        id={id}
        role="region"
        className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-96' : 'max-h-0'}`}
        aria-hidden={!open}
      >
        <p className="px-6 pb-5 pt-1 text-slate-600 text-sm sm:text-base leading-relaxed bg-blue-50 border-t border-blue-100">
          {a}
        </p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <section className="py-20 lg:py-28 bg-white" aria-labelledby="faq-heading">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block text-blue-600 font-semibold text-sm tracking-widest uppercase mb-3">Got Questions?</span>
          <h2 id="faq-heading" className="text-3xl sm:text-4xl font-bold text-blue-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            Specific answers to the questions CT homeowners ask most. If yours isn&apos;t here, call us — we&apos;ll diagnose it over the phone.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-8" role="tablist" aria-label="FAQ categories">
          {faqs.map((cat, index) => (
            <button
              key={cat.category}
              onClick={() => setActiveCategory(index)}
              role="tab"
              aria-selected={activeCategory === index}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeCategory === index
                  ? 'bg-blue-700 text-white shadow-md'
                  : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
              }`}
            >
              {cat.category}
            </button>
          ))}
        </div>

        {/* Questions */}
        {faqs.map((cat, catIndex) => (
          <div
            key={cat.category}
            role="tabpanel"
            className={`space-y-3 transition-all duration-300 ${activeCategory === catIndex ? 'block' : 'hidden'}`}
          >
            {cat.questions.map((item) => (
              <FAQItem key={item.q} q={item.q} a={item.a} />
            ))}
          </div>
        ))}

        {/* Bottom CTA */}
        <div className="mt-12 text-center bg-blue-50 border border-blue-100 rounded-2xl p-8">
          <p className="text-blue-900 font-bold text-lg mb-2">Still have a question?</p>
          <p className="text-slate-500 mb-5">Our technicians can often diagnose your appliance problem over the phone — free of charge.</p>
          <a
            href="tel:+19592616736"
            className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-bold px-8 py-3.5 rounded-xl transition-all duration-200 cursor-pointer shadow-md"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Call (959) 261-6736
          </a>
        </div>
      </div>
    </section>
  );
}
