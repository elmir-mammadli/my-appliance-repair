'use client';

import { useState } from'react';

interface FAQ {
 q: string;
 a: string;
}

function FAQItem({ q, a }: FAQ) {
 const [open, setOpen] = useState(false);
 const id = q.replace(/\s+/g,'-').toLowerCase().slice(0, 40);

 return (
 <div className="border border-blue-100 overflow-hidden">
 <button
 onClick={() => setOpen(!open)}
 aria-expanded={open}
 aria-controls={id}
 className="w-full flex items-center justify-between gap-4 px-6 py-4 bg-white hover:bg-blue-50 transition-colors duration-200 cursor-pointer text-left"
 >
 <span className="font-semibold text-blue-900 text-sm sm:text-base pr-4">{q}</span>
 <span
 className={`flex-shrink-0 w-6 h-6 flex items-center justify-center border-2 border-blue-200 text-blue-600 transition-transform duration-200 ${open ?'rotate-45' :''}`}
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
 className={`overflow-hidden transition-all duration-300 ${open ?'max-h-96' :'max-h-0'}`}
 aria-hidden={!open}
 >
 <p className="px-6 pb-5 pt-1 text-slate-600 text-sm sm:text-base leading-relaxed bg-blue-50 border-t border-blue-100">
 {a}
 </p>
 </div>
 </div>
);
}

export default function ServiceFAQ({ faqs }: { faqs: FAQ[] }) {
 return (
 <div className="space-y-3">
 {faqs.map((item) => (
 <FAQItem key={item.q} q={item.q} a={item.a} />
))}
 </div>
);
}
