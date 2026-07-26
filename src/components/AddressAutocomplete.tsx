'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

interface Suggestion {
  display_name: string;
  address: {
    house_number?: string;
    road?: string;
    city?: string;
    town?: string;
    village?: string;
    postcode?: string;
  };
}

interface Props {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

function formatAddress(s: Suggestion): string {
  const a = s.address;
  const street = [a.house_number, a.road].filter(Boolean).join('');
  const city = a.city || a.town || a.village || '';
  return [street, city, 'CT'].filter(Boolean).join(',');
}

export default function AddressAutocomplete({ id, value, onChange, error }: Props) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const fetchSuggestions = useCallback(async (query: string) => {
    if (query.length < 3) {
      setSuggestions([]);
      setOpen(false);
      return;
    }
    setLoading(true);
    try {
      const params = new URLSearchParams({
        q: query + ', Connecticut',
        format: 'json',
        addressdetails: '1',
        countrycodes: 'us',
        limit: '5',
        'accept-language': 'en',
      });
      const res = await fetch(`https://nominatim.openstreetmap.org/search?${params}`, {
        headers: { 'User-Agent': 'MyApplianceRepair/1.0 (myappliance.us)' },
      });
      const data: Suggestion[] = await res.json();
      const ct = data.filter(
        (s) =>
          s.display_name.toLowerCase().includes('connecticut') &&
          (s.address.road || s.address.house_number),
      );
      setSuggestions(ct);
      setOpen(ct.length > 0);
    } catch {
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    onChange(v);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchSuggestions(v), 350);
  };

  const handleSelect = (s: Suggestion) => {
    onChange(formatAddress(s));
    setSuggestions([]);
    setOpen(false);
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={wrapperRef} className="relative">
      <div className="relative">
        <input
          id={id}
          type="text"
          autoComplete="off"
          value={value}
          onChange={handleInput}
          onFocus={() => suggestions.length > 0 && setOpen(true)}
          placeholder="123 Main St, New Haven"
          className={`w-full px-4 py-3 border bg-white text-blue-950 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${
            error ? 'border-red-400' : 'border-slate-200 hover:border-blue-300'
          }`}
        />
        {loading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <svg className="w-4 h-4 animate-spin text-slate-400" fill="none" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
          </div>
        )}
      </div>

      {open && suggestions.length > 0 && (
        <ul className="absolute z-50 w-full mt-1 bg-white border border-slate-200 shadow-lg overflow-hidden">
          {suggestions.map((s, i) => {
            const formatted = formatAddress(s);
            return (
              <li key={i}>
                <button
                  type="button"
                  onMouseDown={() => handleSelect(s)}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-blue-50 transition-colors duration-150 border-b border-slate-100 last:border-0"
                >
                  <svg
                    className="w-4 h-4 text-slate-400 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="text-sm text-blue-950 truncate">{formatted}</span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
