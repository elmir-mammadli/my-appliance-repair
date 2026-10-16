import { BERGEN_MUNICIPALITIES } from '@/lib/bergen';

export default function MunicipalitySelect({
  id,
  value,
  onChange,
  error,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-blue-950">
        Bergen County municipality <span className="text-red-500">*</span>
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-required="true"
        aria-describedby={`${id}-help`}
        className="w-full border border-slate-200 bg-white px-4 py-3 text-blue-950 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select your municipality</option>
        {BERGEN_MUNICIPALITIES.map((name) => (
          <option key={name}>{name}</option>
        ))}
      </select>
      <p
        id={`${id}-help`}
        className={`mt-1 text-xs ${error ? 'text-red-500' : 'text-slate-500'}`}
        role={error ? 'alert' : undefined}
      >
        {error ||
          'Select the municipality of the service address. We’ll confirm coverage and availability before scheduling.'}
      </p>
    </div>
  );
}
