'use client';

import { useEffect, useState } from'react';

export default function ViewCounter({ slug }: { slug: string }) {
 const [count, setCount] = useState<number | null>(null);

 useEffect(() => {
 fetch(`/api/views/${slug}`, { method:'POST' })
 .then((r) => r.json())
 .then((data) => setCount(data.count))
 .catch(() => {});
 }, [slug]);

 return (
 <span className="flex items-center gap-1.5">
 <svg
 className="w-4 h-4"
 fill="none"
 viewBox="0 0 24 24"
 stroke="currentColor"
 strokeWidth={2}
 aria-hidden="true"
 >
 <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
 <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
 </svg>
 {count === null ? (
 <span className="w-6 h-3 bg-white/20 animate-pulse inline-block" />
) : (
 <span>{count.toLocaleString()} {count === 1 ?'view' :'views'}</span>
)}
 </span>
);
}
