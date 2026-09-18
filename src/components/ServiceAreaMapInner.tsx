'use client';

import 'leaflet/dist/leaflet.css';
import { useEffect, useRef } from 'react';
import type { LatLngTuple, Map } from 'leaflet';
import { SERVICE_AREAS } from '@/lib/business';

// Representative points for service towns; these are not business addresses.
// Points added to the original 17-town map use Census
// INTPTLAT/INTPTLON (January 1, 2026):
// https://tigerweb.geo.census.gov/tigerwebmain/Files/acs26/tigerweb_acs26_cousub_ct.html
const MUNICIPALITY_COORDINATES: Record<(typeof SERVICE_AREAS)[number], LatLngTuple> = {
  'New Haven': [41.3083, -72.9279],
  Hamden: [41.3959, -72.8967],
  'West Haven': [41.2709, -72.9471],
  'East Haven': [41.2759, -72.8687],
  'North Haven': [41.3915, -72.859],
  Woodbridge: [41.3565, -73.0071],
  Orange: [41.2784, -73.0285],
  Bethany: [41.4398, -72.9979],
  Branford: [41.2793, -72.8154],
  Milford: [41.2223, -73.0568],
  Shelton: [41.3165, -73.0929],
  Derby: [41.322, -73.0879],
  Ansonia: [41.3445, -73.0779],
  Naugatuck: [41.4851, -73.0504],
  Bristol: [41.6815776, -72.9407487],
  Waterbury: [41.5585001, -73.0366845],
  Cheshire: [41.499, -72.9015],
  Meriden: [41.5382, -72.807],
  Wallingford: [41.4571, -72.8232],
  Trumbull: [41.2728914, -73.2118988],
  Stratford: [41.2056875, -73.1279855],
  Madison: [41.3440028, -72.6242559],
  'Beacon Falls': [41.4436848, -73.0519257],
  Prospect: [41.4992466, -72.9756339],
  Durham: [41.4689218, -72.6845254],
  Wolcott: [41.5950295, -72.9685110],
  'North Branford': [41.3768483, -72.7706091],
  Oxford: [41.4440326, -73.1482350],
  Guilford: [41.3390910, -72.7061392],
  Seymour: [41.3854655, -73.0836408],
};

export default function ServiceAreaMapInner() {
  const mapRef = useRef<Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    let L: typeof import('leaflet');
    let destroyed = false;

    const init = async () => {
      L = (await import('leaflet')).default;

      if (destroyed) return;

      const map = L.map(containerRef.current!, {
        zoomControl: true,
        scrollWheelZoom: false,
      });

      mapRef.current = map;
      map.fitBounds(
        SERVICE_AREAS.map((name) => MUNICIPALITY_COORDINATES[name]),
        {
          padding: [24, 24],
          maxZoom: 11,
        },
      );

      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19,
      }).addTo(map);

      SERVICE_AREAS.forEach((name) => {
        const [lat, lng] = MUNICIPALITY_COORDINATES[name];
        const dotIcon = L.divIcon({
          className: '',
          html: `<div style="
 width:12px;height:12px;
 background:#22c55e;
 border-radius:50%;
 border:2px solid #fff;
 box-shadow:0 0 6px 2px rgba(34,197,94,0.6);
 animation:pulse-dot 2s ease-in-out infinite;
"></div>`,
          iconSize: [12, 12],
          iconAnchor: [6, 6],
        });

        L.marker([lat, lng], { icon: dotIcon, zIndexOffset: 1000, title: name })
          .addTo(map)
          .bindTooltip(name, {
            permanent: false,
            direction: 'top',
            offset: [0, -8],
            className: 'municipality-tooltip',
          });
      });
    };

    init();

    return () => {
      destroyed = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <>
      <style>{`
 @keyframes pulse-dot {
 0%, 100% { transform: scale(1); opacity: 1; }
 50% { transform: scale(1.3); opacity: 0.7; }
 }
 .municipality-tooltip {
 background: rgba(15,23,42,0.9) !important;
 border: 1px solid #3b82f6 !important;
 color: #e2e8f0 !important;
 font-size: 11px !important;
 font-weight: 600 !important;
 padding: 3px 7px !important;
 border-radius: 4px !important;
 box-shadow: none !important;
 }
 .municipality-tooltip::before { display: none !important; }
`}</style>
      <div
        ref={containerRef}
        style={{ width: '100%', height: '100%', minHeight: '400px' }}
        aria-label={`Interactive map of our ${SERVICE_AREAS.length} Connecticut service communities`}
      />
    </>
  );
}
