'use client';

import 'leaflet/dist/leaflet.css';
import { useEffect, useRef } from 'react';
import type { Map, GeoJSON, Layer, LeafletMouseEvent } from 'leaflet';

const CT_COUNTIES_GEOJSON = {
  type: 'FeatureCollection' as const,
  features: [
    {
      type: 'Feature' as const,
      properties: { name: 'Fairfield' },
      geometry: {
        type: 'Polygon' as const,
        coordinates: [
          [
            [-73.9812, 41.3268],
            [-73.6554, 41.3433],
            [-73.5442, 41.3668],
            [-73.4829, 41.2124],
            [-73.4303, 41.156],
            [-73.3448, 41.1027],
            [-73.2318, 41.1571],
            [-73.1564, 41.1457],
            [-73.1004, 41.1682],
            [-73.0618, 41.1322],
            [-73.0451, 41.0565],
            [-73.1285, 40.9874],
            [-73.6567, 40.9853],
            [-73.6621, 41.0],
            [-73.8136, 41.157],
            [-73.9602, 41.2113],
            [-73.9812, 41.3268],
          ],
        ],
      },
    },
    {
      type: 'Feature' as const,
      properties: { name: 'New Haven' },
      geometry: {
        type: 'Polygon' as const,
        coordinates: [
          [
            [-73.0618, 41.1322],
            [-73.1004, 41.1682],
            [-73.1564, 41.1457],
            [-73.2318, 41.1571],
            [-73.3448, 41.1027],
            [-73.4303, 41.156],
            [-73.4829, 41.2124],
            [-73.5442, 41.3668],
            [-73.072, 41.5234],
            [-72.95, 41.5468],
            [-72.87, 41.49],
            [-72.82, 41.43],
            [-72.865, 41.32],
            [-72.91, 41.27],
            [-72.95, 41.21],
            [-73.01, 41.18],
            [-73.0618, 41.1322],
          ],
        ],
      },
    },
    {
      type: 'Feature' as const,
      properties: { name: 'Hartford' },
      geometry: {
        type: 'Polygon' as const,
        coordinates: [
          [
            [-73.072, 41.5234],
            [-73.5442, 41.3668],
            [-73.559, 41.644],
            [-73.53, 41.77],
            [-73.51, 41.87],
            [-73.49, 42.05],
            [-72.999, 42.0387],
            [-72.87, 42.0387],
            [-72.81, 41.92],
            [-72.74, 41.86],
            [-72.74, 41.76],
            [-72.78, 41.67],
            [-72.87, 41.49],
            [-72.95, 41.5468],
            [-73.072, 41.5234],
          ],
        ],
      },
    },
    {
      type: 'Feature' as const,
      properties: { name: 'Litchfield' },
      geometry: {
        type: 'Polygon' as const,
        coordinates: [
          [
            [-73.9812, 41.3268],
            [-73.9602, 41.2113],
            [-73.8136, 41.157],
            [-73.6621, 41.0],
            [-73.6554, 41.3433],
            [-73.559, 41.644],
            [-73.5442, 41.3668],
            [-73.53, 41.77],
            [-73.51, 41.87],
            [-73.49, 42.05],
            [-73.487, 42.05],
            [-73.728, 42.05],
            [-73.9283, 42.05],
            [-73.953, 41.87],
            [-73.9812, 41.3268],
          ],
        ],
      },
    },
    {
      type: 'Feature' as const,
      properties: { name: 'Middlesex' },
      geometry: {
        type: 'Polygon' as const,
        coordinates: [
          [
            [-72.87, 41.49],
            [-72.78, 41.67],
            [-72.74, 41.76],
            [-72.64, 41.64],
            [-72.52, 41.62],
            [-72.44, 41.58],
            [-72.39, 41.47],
            [-72.43, 41.37],
            [-72.51, 41.29],
            [-72.63, 41.27],
            [-72.73, 41.3],
            [-72.82, 41.43],
            [-72.87, 41.49],
          ],
        ],
      },
    },
    {
      type: 'Feature' as const,
      properties: { name: 'New London' },
      geometry: {
        type: 'Polygon' as const,
        coordinates: [
          [
            [-72.39, 41.47],
            [-72.44, 41.58],
            [-72.52, 41.62],
            [-72.64, 41.64],
            [-72.74, 41.76],
            [-72.74, 41.86],
            [-72.52, 41.93],
            [-72.36, 41.97],
            [-72.09, 41.97],
            [-71.98, 41.87],
            [-71.907, 41.671],
            [-72.0, 41.58],
            [-72.11, 41.49],
            [-72.22, 41.44],
            [-72.3, 41.38],
            [-72.39, 41.47],
          ],
        ],
      },
    },
    {
      type: 'Feature' as const,
      properties: { name: 'Tolland' },
      geometry: {
        type: 'Polygon' as const,
        coordinates: [
          [
            [-72.74, 41.86],
            [-72.81, 41.92],
            [-72.87, 42.0387],
            [-72.52, 42.0387],
            [-72.36, 41.97],
            [-72.52, 41.93],
            [-72.74, 41.86],
          ],
        ],
      },
    },
    {
      type: 'Feature' as const,
      properties: { name: 'Windham' },
      geometry: {
        type: 'Polygon' as const,
        coordinates: [
          [
            [-72.36, 41.97],
            [-72.52, 42.0387],
            [-72.1, 42.0387],
            [-71.98, 42.017],
            [-71.98, 41.87],
            [-72.09, 41.97],
            [-72.36, 41.97],
          ],
        ],
      },
    },
  ],
};

const MUNICIPALITIES = [
  { name: 'New Haven', lat: 41.3083, lng: -72.9279 },
  { name: 'Hamden', lat: 41.3959, lng: -72.8967 },
  { name: 'West Haven', lat: 41.2709, lng: -72.9471 },
  { name: 'East Haven', lat: 41.2759, lng: -72.8687 },
  { name: 'North Haven', lat: 41.3915, lng: -72.859 },
  { name: 'Woodbridge', lat: 41.3565, lng: -73.0071 },
  { name: 'Orange', lat: 41.2784, lng: -73.0285 },
  { name: 'Bethany', lat: 41.4398, lng: -72.9979 },
  { name: 'Branford', lat: 41.2793, lng: -72.8154 },
  { name: 'Milford', lat: 41.2223, lng: -73.0568 },
  { name: 'Shelton', lat: 41.3165, lng: -73.0929 },
  { name: 'Derby', lat: 41.322, lng: -73.0879 },
  { name: 'Ansonia', lat: 41.3445, lng: -73.0779 },
  { name: 'Naugatuck', lat: 41.4851, lng: -73.0504 },
  { name: 'Cheshire', lat: 41.499, lng: -72.9015 },
  { name: 'Meriden', lat: 41.5382, lng: -72.807 },
  { name: 'Wallingford', lat: 41.4571, lng: -72.8232 },
];

const DEFAULT_STYLE = {
  fillColor: '#1e3a5f',
  fillOpacity: 0.15,
  color: '#3b82f6',
  weight: 1.5,
  opacity: 0.4,
};

const HIGHLIGHT_STYLE = {
  fillColor: '#22c55e',
  fillOpacity: 0.35,
  color: '#22c55e',
  weight: 2,
  opacity: 0.9,
};

export default function ServiceAreaMapInner() {
  const mapRef = useRef<Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedLayerRef = useRef<Layer | null>(null);
  const selectedNameRef = useRef<string | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    let L: typeof import('leaflet');
    let destroyed = false;

    const init = async () => {
      L = (await import('leaflet')).default;

      if (destroyed) return;

      // Fix default icon path issue with webpack
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
      });

      const map = L.map(containerRef.current!, {
        center: [41.38, -72.95],
        zoom: 11,
        zoomControl: true,
        scrollWheelZoom: false,
      });

      mapRef.current = map;

      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19,
      }).addTo(map);

      // County GeoJSON layer (added first, below markers)
      const countyLayer = L.geoJSON(CT_COUNTIES_GEOJSON as GeoJSON.FeatureCollection, {
        style: () => DEFAULT_STYLE,
        onEachFeature(feature, layer) {
          layer.on('click', (e: LeafletMouseEvent) => {
            const countyName = feature.properties?.name as string;

            // Reset previously selected county
            if (selectedLayerRef.current && selectedLayerRef.current !== layer) {
              (countyLayer as GeoJSON).resetStyle(selectedLayerRef.current);
              selectedLayerRef.current = null;
              selectedNameRef.current = null;
            }

            if (selectedNameRef.current === countyName) {
              // Toggle off: same county clicked again
              (countyLayer as GeoJSON).resetStyle(layer);
              map.closePopup();
              selectedLayerRef.current = null;
              selectedNameRef.current = null;
            } else {
              // Highlight clicked county
              (layer as L.Path).setStyle(HIGHLIGHT_STYLE);
              (layer as L.Path).bringToFront();
              selectedLayerRef.current = layer;
              selectedNameRef.current = countyName;

              L.popup({ closeButton: true, className: 'county-popup' })
                .setLatLng(e.latlng)
                .setContent(
                  `<div style="font-family:sans-serif;padding:4px 2px">
 <strong style="font-size:14px">${countyName} County, CT</strong><br/>
 <span style="font-size:12px;color:#555">MyAppliance Repair LLC serves ${countyName} County, CT</span>
 </div>`,
                )
                .openOn(map);
            }
          });

          layer.on('mouseover', () => {
            if (selectedNameRef.current !== feature.properties?.name) {
              (layer as L.Path).setStyle({ fillOpacity: 0.28, opacity: 0.7 });
            }
          });

          layer.on('mouseout', () => {
            if (selectedNameRef.current !== feature.properties?.name) {
              (countyLayer as GeoJSON).resetStyle(layer);
            }
          });
        },
      }).addTo(map);

      // Municipality dot markers (added after counties so they render on top)
      MUNICIPALITIES.forEach(({ name, lat, lng }) => {
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

        L.marker([lat, lng], { icon: dotIcon, zIndexOffset: 1000 })
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
 .county-popup .leaflet-popup-content-wrapper {
 background: rgba(15,23,42,0.95);
 border: 1px solid #22c55e;
 border-radius: 8px;
 color: #e2e8f0;
 }
 .county-popup .leaflet-popup-tip { background: rgba(15,23,42,0.95); }
`}</style>
      <div
        ref={containerRef}
        style={{ width: '100%', height: '100%', minHeight: '400px' }}
        aria-label="Interactive map of Connecticut showing service area by county"
      />
    </>
  );
}
