'use client';

import dynamic from'next/dynamic';

const ServiceAreaMapInner = dynamic(() => import('./ServiceAreaMapInner'), {
 ssr: false,
 loading: () => (
 <div
 style={{ height:'100%', width:'100%', borderRadius:'1rem' }}
 className="bg-blue-800/50 border border-blue-600/30 flex items-center justify-center"
 >
 <span className="text-blue-300 text-sm">Loading map…</span>
 </div>
),
});

export default function ServiceAreaMap() {
 return <ServiceAreaMapInner />;
}
