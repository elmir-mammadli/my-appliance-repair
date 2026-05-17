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
        coordinates: [[
          [-73.9812,41.3268],[-73.6554,41.3433],[-73.5442,41.3668],[-73.4829,41.2124],
          [-73.4303,41.1560],[-73.3448,41.1027],[-73.2318,41.1571],[-73.1564,41.1457],
          [-73.1004,41.1682],[-73.0618,41.1322],[-73.0451,41.0565],[-73.1285,40.9874],
          [-73.6567,40.9853],[-73.6621,41.0000],[-73.8136,41.1570],[-73.9602,41.2113],
          [-73.9812,41.3268],
        ]],
      },
    },
    {
      type: 'Feature' as const,
      properties: { name: 'New Haven' },
      geometry: {
        type: 'Polygon' as const,
        coordinates: [[
          [-73.0618,41.1322],[-73.1004,41.1682],[-73.1564,41.1457],[-73.2318,41.1571],
          [-73.3448,41.1027],[-73.4303,41.1560],[-73.4829,41.2124],[-73.5442,41.3668],
          [-73.0720,41.5234],[-72.9500,41.5468],[-72.8700,41.4900],[-72.8200,41.4300],
          [-72.8650,41.3200],[-72.9100,41.2700],[-72.9500,41.2100],[-73.0100,41.1800],
          [-73.0618,41.1322],
        ]],
      },
    },
    {
      type: 'Feature' as const,
      properties: { name: 'Hartford' },
      geometry: {
        type: 'Polygon' as const,
        coordinates: [[
          [-73.0720,41.5234],[-73.5442,41.3668],[-73.5590,41.6440],[-73.5300,41.7700],
          [-73.5100,41.8700],[-73.4900,42.0500],[-72.9990,42.0387],[-72.8700,42.0387],
          [-72.8100,41.9200],[-72.7400,41.8600],[-72.7400,41.7600],[-72.7800,41.6700],
          [-72.8700,41.4900],[-72.9500,41.5468],[-73.0720,41.5234],
        ]],
      },
    },
    {
      type: 'Feature' as const,
      properties: { name: 'Litchfield' },
      geometry: {
        type: 'Polygon' as const,
        coordinates: [[
          [-73.9812,41.3268],[-73.9602,41.2113],[-73.8136,41.1570],[-73.6621,41.0000],
          [-73.6554,41.3433],[-73.5590,41.6440],[-73.5442,41.3668],[-73.5300,41.7700],
          [-73.5100,41.8700],[-73.4900,42.0500],[-73.4870,42.0500],[-73.7280,42.0500],
          [-73.9283,42.0500],[-73.9530,41.8700],[-73.9812,41.3268],
        ]],
      },
    },
    {
      type: 'Feature' as const,
      properties: { name: 'Middlesex' },
      geometry: {
        type: 'Polygon' as const,
        coordinates: [[
          [-72.8700,41.4900],[-72.7800,41.6700],[-72.7400,41.7600],[-72.6400,41.6400],
          [-72.5200,41.6200],[-72.4400,41.5800],[-72.3900,41.4700],[-72.4300,41.3700],
          [-72.5100,41.2900],[-72.6300,41.2700],[-72.7300,41.3000],[-72.8200,41.4300],
          [-72.8700,41.4900],
        ]],
      },
    },
    {
      type: 'Feature' as const,
      properties: { name: 'New London' },
      geometry: {
        type: 'Polygon' as const,
        coordinates: [[
          [-72.3900,41.4700],[-72.4400,41.5800],[-72.5200,41.6200],[-72.6400,41.6400],
          [-72.7400,41.7600],[-72.7400,41.8600],[-72.5200,41.9300],[-72.3600,41.9700],
          [-72.0900,41.9700],[-71.9800,41.8700],[-71.9070,41.6710],[-72.0000,41.5800],
          [-72.1100,41.4900],[-72.2200,41.4400],[-72.3000,41.3800],[-72.3900,41.4700],
        ]],
      },
    },
    {
      type: 'Feature' as const,
      properties: { name: 'Tolland' },
      geometry: {
        type: 'Polygon' as const,
        coordinates: [[
          [-72.7400,41.8600],[-72.8100,41.9200],[-72.8700,42.0387],[-72.5200,42.0387],
          [-72.3600,41.9700],[-72.5200,41.9300],[-72.7400,41.8600],
        ]],
      },
    },
    {
      type: 'Feature' as const,
      properties: { name: 'Windham' },
      geometry: {
        type: 'Polygon' as const,
        coordinates: [[
          [-72.3600,41.9700],[-72.5200,42.0387],[-72.1000,42.0387],[-71.9800,42.0170],
          [-71.9800,41.8700],[-72.0900,41.9700],[-72.3600,41.9700],
        ]],
      },
    },
  ],
};

const MUNICIPALITIES = [
  { name: 'New Haven', lat: 41.3083, lng: -72.9279 },
  { name: 'Hamden', lat: 41.3959, lng: -72.8967 },
  { name: 'West Haven', lat: 41.2709, lng: -72.9471 },
  { name: 'East Haven', lat: 41.2759, lng: -72.8687 },
  { name: 'North Haven', lat: 41.3915, lng: -72.8590 },
  { name: 'Woodbridge', lat: 41.3565, lng: -73.0071 },
  { name: 'Orange', lat: 41.2784, lng: -73.0285 },
  { name: 'Bethany', lat: 41.4398, lng: -72.9979 },
  { name: 'Branford', lat: 41.2793, lng: -72.8154 },
  { name: 'Milford', lat: 41.2223, lng: -73.0568 },
  { name: 'Shelton', lat: 41.3165, lng: -73.0929 },
  { name: 'Derby', lat: 41.3220, lng: -73.0879 },
  { name: 'Ansonia', lat: 41.3445, lng: -73.0779 },
  { name: 'Naugatuck', lat: 41.4851, lng: -73.0504 },
  { name: 'Cheshire', lat: 41.4990, lng: -72.9015 },
  { name: 'Meriden', lat: 41.5382, lng: -72.8070 },
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
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
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
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
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
                  </div>`
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
