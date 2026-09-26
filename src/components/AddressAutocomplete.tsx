'use client';

import { useState, useRef, useEffect, useId } from 'react';

interface Prediction {
  place_id: string;
  description: string;
}

interface Props {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  onAddressSelect?: (address: { address: string; zip: string }) => void;
  error?: string;
}

export default function AddressAutocomplete({
  id,
  value,
  onChange,
  onAddressSelect,
  error,
}: Props) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const listId = `${generatedId}-suggestions`;
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('Start typing your street address, or enter it manually.');
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const requestRef = useRef<AbortController | null>(null);
  const sessionRef = useRef('');
  const revisionRef = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const cancelPending = () => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    requestRef.current?.abort();
    revisionRef.current += 1;
  };

  useEffect(
    () => () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      requestRef.current?.abort();
    },
    [],
  );

  useEffect(() => {
    if (open && activeIndex >= 0) {
      document.getElementById(`${listId}-${activeIndex}`)?.scrollIntoView({ block: 'nearest' });
    }
  }, [activeIndex, listId, open]);

  const fetchPredictions = async (query: string, revision: number) => {
    const controller = new AbortController();
    requestRef.current = controller;
    sessionRef.current ||= crypto.randomUUID();
    const params = new URLSearchParams({ input: query, sessionToken: sessionRef.current });
    try {
      const res = await fetch(`/api/places?${params}`, { signal: controller.signal });
      if (!res.ok) throw new Error('Lookup unavailable');
      const data = await res.json();
      if (revision !== revisionRef.current) return;
      const results: Prediction[] = data.predictions ?? [];
      setPredictions(results);
      setOpen(results.length > 0 && document.activeElement === inputRef.current);
      setMessage(
        results.length
          ? `${results.length} address suggestions available. Use the up and down arrows to choose.`
          : 'No matching addresses. You can enter your full address manually.',
      );
    } catch {
      if (revision !== revisionRef.current || controller.signal.aborted) return;
      setMessage('Address suggestions are unavailable. Please enter your full address manually.');
    } finally {
      if (revision === revisionRef.current) setLoading(false);
    }
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.target.value;
    cancelPending();
    onChange(nextValue);
    setPredictions([]);
    setOpen(false);
    setActiveIndex(-1);
    const query = nextValue.trim();
    setLoading(query.length >= 3);
    setMessage(
      query.length >= 3
        ? 'Searching addresses…'
        : 'Enter at least 3 characters for address suggestions.',
    );
    if (query.length < 3) return;
    const revision = revisionRef.current;
    debounceRef.current = setTimeout(() => void fetchPredictions(query, revision), 300);
  };

  const handleSelect = async (prediction: Prediction) => {
    cancelPending();
    const revision = revisionRef.current;
    const controller = new AbortController();
    requestRef.current = controller;
    const sessionToken = sessionRef.current;
    sessionRef.current = '';
    onChange(prediction.description.replace(/, USA$/, ''));
    setPredictions([]);
    setOpen(false);
    setActiveIndex(-1);
    setLoading(true);
    setMessage('Completing your address…');
    inputRef.current?.focus();
    try {
      const params = new URLSearchParams({ placeId: prediction.place_id, sessionToken });
      const res = await fetch(`/api/places?${params}`, { signal: controller.signal });
      if (!res.ok) throw new Error('Address details unavailable');
      const data: { address: string; zip: string } = await res.json();
      if (revision !== revisionRef.current) return;
      onChange(data.address);
      onAddressSelect?.(data);
      setMessage('Address selected. Check the ZIP code and add an apartment or suite if needed.');
    } catch {
      if (revision !== revisionRef.current || controller.signal.aborted) return;
      setMessage('Please check the selected address and enter or confirm your ZIP code.');
    } finally {
      if (revision === revisionRef.current) setLoading(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.nativeEvent.isComposing) return;
    if (event.key === 'Escape' && (open || loading)) {
      event.preventDefault();
      event.stopPropagation();
      cancelPending();
      setOpen(false);
      setLoading(false);
      setMessage('You can continue entering your address manually.');
    } else if ((event.key === 'ArrowDown' || event.key === 'ArrowUp') && predictions.length) {
      event.preventDefault();
      setOpen(true);
      setActiveIndex((index) =>
        event.key === 'ArrowDown'
          ? (index + 1) % predictions.length
          : index <= 0
            ? predictions.length - 1
            : index - 1,
      );
    } else if (event.key === 'Enter' && (open || loading)) {
      event.preventDefault();
      if (open && activeIndex >= 0) void handleSelect(predictions[activeIndex]);
    } else if (event.key === 'Tab') {
      setOpen(false);
    }
  };

  return (
    <div
      ref={wrapperRef}
      className="relative"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpen(false);
      }}
    >
      <div className="relative">
        <input
          ref={inputRef}
          id={inputId}
          name="address"
          type="text"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={open}
          aria-controls={open ? listId : undefined}
          aria-activedescendant={open && activeIndex >= 0 ? `${listId}-${activeIndex}` : undefined}
          aria-required="true"
          aria-invalid={!!error}
          aria-describedby={`${inputId}-help${error ? ` ${inputId}-error` : ''}`}
          autoComplete="street-address"
          maxLength={200}
          value={value}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          onFocus={() => predictions.length > 0 && setOpen(true)}
          placeholder="123 Main St, New Haven"
          className={`w-full pl-4 pr-10 py-3 border bg-white text-blue-950 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${error ? 'border-red-400' : 'border-slate-200 hover:border-blue-300'}`}
        />
        {loading && (
          <span
            aria-hidden="true"
            className="absolute right-3 top-1/2 -mt-2 h-4 w-4 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600"
          />
        )}
      </div>
      {open && predictions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-slate-200 shadow-lg overflow-hidden">
          <ul
            id={listId}
            role="listbox"
            aria-label="Address suggestions"
            className="max-h-60 overflow-y-auto"
          >
            {predictions.map((prediction, index) => (
              <li
                id={`${listId}-${index}`}
                key={prediction.place_id}
                role="option"
                aria-selected={index === activeIndex}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => void handleSelect(prediction)}
                className={`cursor-pointer px-4 py-3 text-sm text-blue-950 text-left border-b border-slate-100 last:border-0 hover:bg-blue-50 ${index === activeIndex ? 'bg-blue-50' : ''}`}
              >
                {prediction.description.replace(/, USA$/, '')}
              </li>
            ))}
          </ul>
          <div className="flex justify-end px-3 py-2 border-t border-slate-100 bg-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://maps.gstatic.com/mapfiles/api-3/images/powered-by-google-on-white3.png"
              alt="Powered by Google"
              className="h-4 w-auto"
            />
          </div>
        </div>
      )}
      <p
        id={`${inputId}-help`}
        role="status"
        aria-live="polite"
        className="text-xs text-slate-500 mt-1.5"
      >
        {message}
      </p>
      {error && (
        <p id={`${inputId}-error`} className="text-red-500 text-xs mt-1" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
