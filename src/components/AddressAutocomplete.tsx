'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

interface Prediction {
  place_id: string;
  description: string;
}

interface Props {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export default function AddressAutocomplete({ id, value, onChange, error }: Props) {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const fetchPredictions = useCallback(async (query: string) => {
    if (query.length < 1) {
      setPredictions([]);
      setOpen(false);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/places?input=${encodeURIComponent(query)}`);
      const data = await res.json();
      const results: Prediction[] = data.predictions ?? [];
      setPredictions(results);
      setOpen(results.length > 0);
    } catch {
      setPredictions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    onChange(v);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchPredictions(v), 300);
  };

  const handleSelect = (p: Prediction) => {
    // Strip trailing ", USA" that Google appends
    const address = p.description.replace(/, USA$/, '');
    onChange(address);
    setPredictions([]);
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
          onFocus={() => predictions.length > 0 && setOpen(true)}
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

      {open && predictions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-slate-200 shadow-lg overflow-hidden">
          <ul>
            {predictions.map((p) => (
              <li key={p.place_id}>
                <button
                  type="button"
                  onMouseDown={() => handleSelect(p)}
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
                  <span className="text-sm text-blue-950 truncate">
                    {p.description.replace(/, USA$/, '')}
                  </span>
                </button>
              </li>
            ))}
          </ul>
          <div className="flex justify-end items-center px-3 py-1.5 border-t border-slate-100 bg-white">
            {/* Required by Google Places API ToS */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://maps.gstatic.com/mapfiles/api-3/images/powered-by-google-on-white3.png"
              alt="Powered by Google"
              className="h-4 w-auto"
            />
          </div>
        </div>
      )}
    </div>
  );
}
