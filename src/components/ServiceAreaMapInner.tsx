'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const municipalities = [
  { name: 'Stamford', lat: 41.0534, lng: -73.5387 },
  { name: 'Greenwich', lat: 41.0262, lng: -73.6282 },
  { name: 'Norwalk', lat: 41.1176, lng: -73.4082 },
  { name: 'Bridgeport', lat: 41.1865, lng: -73.1952 },
  { name: 'New Haven', lat: 41.3082, lng: -72.9282 },
  { name: 'Waterbury', lat: 41.5582, lng: -73.0515 },
  { name: 'Hartford', lat: 41.7658, lng: -72.6851 },
  { name: 'West Hartford', lat: 41.7623, lng: -72.7418 },
  { name: 'Danbury', lat: 41.3948, lng: -73.454 },
  { name: 'Fairfield', lat: 41.1418, lng: -73.2632 },
  { name: 'Milford', lat: 41.2223, lng: -73.0573 },
  { name: 'Trumbull', lat: 41.2429, lng: -73.2007 },
  { name: 'Shelton', lat: 41.3165, lng: -73.0943 },
  { name: 'Meriden', lat: 41.5382, lng: -72.807 },
  { name: 'Stratford', lat: 41.1845, lng: -73.1332 },
  { name: 'Westport', lat: 41.1415, lng: -73.3579 },
  { name: 'Darien', lat: 41.0776, lng: -73.4693 },
  { name: 'New Canaan', lat: 41.1468, lng: -73.4957 },
  { name: 'Wilton', lat: 41.1954, lng: -73.4393 },
  { name: 'Ridgefield', lat: 41.2815, lng: -73.4982 },
];

const pingStyle = `
  @keyframes ping {
    0% { transform: scale(1); opacity: 0.6; }
    100% { transform: scale(2.5); opacity: 0; }
  }
`;

function createDotIcon() {
  return L.divIcon({
    className: '',
    iconSize: [20, 20],
    iconAnchor: [10, 10],
    popupAnchor: [0, -12],
    html: `<div style="position:relative;width:20px;height:20px;">
      <div style="position:absolute;inset:0;border-radius:50%;background:#22c55e;opacity:0.4;animation:ping 1.5s cubic-bezier(0,0,0.2,1) infinite;"></div>
      <div style="position:absolute;inset:3px;border-radius:50%;background:#22c55e;"></div>
    </div>`,
  });
}

export default function ServiceAreaMapInner() {
  useEffect(() => {
    if (document.getElementById('leaflet-ping-style')) return;
    const style = document.createElement('style');
    style.id = 'leaflet-ping-style';
    style.textContent = pingStyle;
    document.head.appendChild(style);
  }, []);

  const dotIcon = createDotIcon();

  return (
    <MapContainer
      center={[41.6032, -73.0877]}
      zoom={9}
      scrollWheelZoom={false}
      style={{ height: '100%', width: '100%', borderRadius: '1rem' }}
      className="z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />
      {municipalities.map((city) => (
        <Marker key={city.name} position={[city.lat, city.lng]} icon={dotIcon}>
          <Popup>
            <strong>{city.name}</strong>
            <br />
            MY APPLIANCE Repair serves {city.name}, CT
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
