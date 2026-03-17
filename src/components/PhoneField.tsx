import React, { useState, useRef, useEffect } from 'react';

// ── Country data: code, dial, name, flag emoji, min/max digits ──────────────
export interface CountryOption {
  code: string;   // ISO alpha-2
  dial: string;   // e.g. "+91"
  name: string;
  flag: string;
  minLen: number;
  maxLen: number;
}

export const COUNTRIES: CountryOption[] = [
  { code: 'IN', dial: '+91',  name: 'India',               flag: '🇮🇳', minLen: 10, maxLen: 10 },
  { code: 'US', dial: '+1',   name: 'United States',        flag: '🇺🇸', minLen: 10, maxLen: 10 },
  { code: 'GB', dial: '+44',  name: 'United Kingdom',       flag: '🇬🇧', minLen: 10, maxLen: 10 },
  { code: 'AE', dial: '+971', name: 'UAE',                  flag: '🇦🇪', minLen:  9, maxLen:  9 },
  { code: 'SA', dial: '+966', name: 'Saudi Arabia',         flag: '🇸🇦', minLen:  9, maxLen:  9 },
  { code: 'AU', dial: '+61',  name: 'Australia',            flag: '🇦🇺', minLen:  9, maxLen:  9 },
  { code: 'CA', dial: '+1',   name: 'Canada',               flag: '🇨🇦', minLen: 10, maxLen: 10 },
  { code: 'SG', dial: '+65',  name: 'Singapore',            flag: '🇸🇬', minLen:  8, maxLen:  8 },
  { code: 'MY', dial: '+60',  name: 'Malaysia',             flag: '🇲🇾', minLen:  9, maxLen: 10 },
  { code: 'NZ', dial: '+64',  name: 'New Zealand',          flag: '🇳🇿', minLen:  8, maxLen:  9 },
  { code: 'ZA', dial: '+27',  name: 'South Africa',         flag: '🇿🇦', minLen:  9, maxLen:  9 },
  { code: 'NG', dial: '+234', name: 'Nigeria',              flag: '🇳🇬', minLen: 10, maxLen: 10 },
  { code: 'PK', dial: '+92',  name: 'Pakistan',             flag: '🇵🇰', minLen: 10, maxLen: 10 },
  { code: 'BD', dial: '+880', name: 'Bangladesh',           flag: '🇧🇩', minLen: 10, maxLen: 10 },
  { code: 'LK', dial: '+94',  name: 'Sri Lanka',            flag: '🇱🇰', minLen:  9, maxLen:  9 },
  { code: 'NP', dial: '+977', name: 'Nepal',                flag: '🇳🇵', minLen: 10, maxLen: 10 },
  { code: 'MV', dial: '+960', name: 'Maldives',             flag: '🇲🇻', minLen:  7, maxLen:  7 },
  { code: 'BT', dial: '+975', name: 'Bhutan',               flag: '🇧🇹', minLen:  8, maxLen:  8 },
  { code: 'DE', dial: '+49',  name: 'Germany',              flag: '🇩🇪', minLen: 10, maxLen: 11 },
  { code: 'FR', dial: '+33',  name: 'France',               flag: '🇫🇷', minLen:  9, maxLen:  9 },
  { code: 'IT', dial: '+39',  name: 'Italy',                flag: '🇮🇹', minLen:  9, maxLen: 11 },
  { code: 'ES', dial: '+34',  name: 'Spain',                flag: '🇪🇸', minLen:  9, maxLen:  9 },
  { code: 'NL', dial: '+31',  name: 'Netherlands',          flag: '🇳🇱', minLen:  9, maxLen:  9 },
  { code: 'SE', dial: '+46',  name: 'Sweden',               flag: '🇸🇪', minLen:  9, maxLen:  9 },
  { code: 'NO', dial: '+47',  name: 'Norway',               flag: '🇳🇴', minLen:  8, maxLen:  8 },
  { code: 'CH', dial: '+41',  name: 'Switzerland',          flag: '🇨🇭', minLen:  9, maxLen:  9 },
  { code: 'JP', dial: '+81',  name: 'Japan',                flag: '🇯🇵', minLen: 10, maxLen: 10 },
  { code: 'CN', dial: '+86',  name: 'China',                flag: '🇨🇳', minLen: 11, maxLen: 11 },
  { code: 'KR', dial: '+82',  name: 'South Korea',          flag: '🇰🇷', minLen: 10, maxLen: 10 },
  { code: 'TH', dial: '+66',  name: 'Thailand',             flag: '🇹🇭', minLen:  9, maxLen:  9 },
  { code: 'ID', dial: '+62',  name: 'Indonesia',            flag: '🇮🇩', minLen:  9, maxLen: 12 },
  { code: 'PH', dial: '+63',  name: 'Philippines',          flag: '🇵🇭', minLen: 10, maxLen: 10 },
  { code: 'VN', dial: '+84',  name: 'Vietnam',              flag: '🇻🇳', minLen:  9, maxLen:  9 },
  { code: 'TR', dial: '+90',  name: 'Turkey',               flag: '🇹🇷', minLen: 10, maxLen: 10 },
  { code: 'EG', dial: '+20',  name: 'Egypt',                flag: '🇪🇬', minLen: 10, maxLen: 10 },
  { code: 'KE', dial: '+254', name: 'Kenya',                flag: '🇰🇪', minLen:  9, maxLen:  9 },
  { code: 'BR', dial: '+55',  name: 'Brazil',               flag: '🇧🇷', minLen: 11, maxLen: 11 },
  { code: 'MX', dial: '+52',  name: 'Mexico',               flag: '🇲🇽', minLen: 10, maxLen: 10 },
  { code: 'AR', dial: '+54',  name: 'Argentina',            flag: '🇦🇷', minLen: 10, maxLen: 10 },
  { code: 'RU', dial: '+7',   name: 'Russia',               flag: '🇷🇺', minLen: 10, maxLen: 10 },
  { code: 'OM', dial: '+968', name: 'Oman',                 flag: '🇴🇲', minLen:  8, maxLen:  8 },
  { code: 'KW', dial: '+965', name: 'Kuwait',               flag: '🇰🇼', minLen:  8, maxLen:  8 },
  { code: 'QA', dial: '+974', name: 'Qatar',                flag: '🇶🇦', minLen:  8, maxLen:  8 },
  { code: 'BH', dial: '+973', name: 'Bahrain',              flag: '🇧🇭', minLen:  8, maxLen:  8 },
  { code: 'GH', dial: '+233', name: 'Ghana',                flag: '🇬🇭', minLen:  9, maxLen:  9 },
  { code: 'IL', dial: '+972', name: 'Israel',               flag: '🇮🇱', minLen:  9, maxLen:  9 },
  { code: 'PT', dial: '+351', name: 'Portugal',             flag: '🇵🇹', minLen:  9, maxLen:  9 },
  { code: 'GR', dial: '+30',  name: 'Greece',               flag: '🇬🇷', minLen: 10, maxLen: 10 },
];

// ── Validation helpers ───────────────────────────────────────────────────────
const isSequential = (n: string): boolean => {
  const ascending  = '0123456789';
  const descending = '9876543210';
  return ascending.includes(n) || descending.includes(n);
};

const isRepeated = (n: string): boolean => new Set(n).size === 1;

export const validatePhone = (number: string, country: CountryOption): string | null => {
  const digits = number.replace(/\D/g, '');
  if (!digits) return 'Phone number is required.';
  if (digits.length < country.minLen)
    return `${country.name} numbers must be at least ${country.minLen} digits.`;
  if (digits.length > country.maxLen)
    return `${country.name} numbers must be at most ${country.maxLen} digits.`;
  if (isRepeated(digits))
    return 'Phone number cannot be all the same digit (e.g. 1111111111).';
  if (isSequential(digits.slice(0, 10)))
    return 'Phone number cannot be a sequential pattern (e.g. 1234567890).';
  return null;
};

// ── Props ────────────────────────────────────────────────────────────────────
interface PhoneFieldProps {
  value: string;
  onChange: (full: string, raw: string, country: CountryOption) => void;
  error?: string | null;
  required?: boolean;
  inputClassName?: string;
  placeholder?: string;
}

// ── Component ────────────────────────────────────────────────────────────────
export const PhoneField: React.FC<PhoneFieldProps> = ({
  value,
  onChange,
  error,
  required = true,
  inputClassName = '',
  placeholder = 'Mobile Number',
}) => {
  const [country, setCountry] = useState<CountryOption>(COUNTRIES[0]); // Default India
  const [number, setNumber] = useState(value || '');
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  const filtered = COUNTRIES.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.dial.includes(search)
  );

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch('');
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, country.maxLen);
    setNumber(raw);
    onChange(`${country.dial} ${raw}`, raw, country);
  };

  const selectCountry = (c: CountryOption) => {
    setCountry(c);
    setOpen(false);
    setSearch('');
    onChange(`${c.dial} ${number}`, number, c);
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      <div className="flex items-stretch w-full">
        {/* Flag + dial code trigger */}
        <div ref={dropRef} className="relative shrink-0">
          <button
            type="button"
            onClick={() => setOpen(o => !o)}
            className={`flex items-center gap-1.5 h-full px-3 border border-r-0 rounded-l-2xl bg-slate-50 hover:bg-slate-100 transition-colors text-sm font-semibold text-slate-700 whitespace-nowrap border-slate-200 ${error ? 'border-red-400' : ''}`}
            style={{ minWidth: 90 }}
          >
            <span className="text-xl">{country.flag}</span>
            <span className="text-xs">{country.dial}</span>
            <svg className={`w-3 h-3 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
          </button>

          {open && (
            <div className="absolute left-0 top-full mt-1 z-50 w-64 bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden">
              <div className="p-2 border-b border-slate-100">
                <input
                  autoFocus
                  type="text"
                  placeholder="Search country…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full text-sm px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:border-blue-400"
                />
              </div>
              <div className="max-h-52 overflow-y-auto">
                {filtered.length === 0 && (
                  <p className="text-center text-slate-400 text-xs py-4">No countries found</p>
                )}
                {filtered.map(c => (
                  <button
                    key={c.code}
                    type="button"
                    onClick={() => selectCountry(c)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-orange-50 transition-colors text-left ${country.code === c.code ? 'bg-orange-50 text-orange-600 font-bold' : 'text-slate-700'}`}
                  >
                    <span className="text-xl shrink-0">{c.flag}</span>
                    <span className="flex-1 truncate">{c.name}</span>
                    <span className="text-xs text-slate-400 shrink-0">{c.dial}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Number input */}
        <input
          type="tel"
          inputMode="numeric"
          pattern="[0-9]*"
          value={number}
          onChange={handleNumberChange}
          placeholder={`${placeholder} *`}
          required={required}
          className={`flex-1 min-w-0 rounded-r-2xl border border-slate-200 px-4 py-4 text-sm outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all font-medium placeholder-slate-400 text-slate-800 bg-white ${error ? 'border-red-400 focus:ring-red-300' : ''} ${inputClassName}`}
        />
      </div>
      {error && <p className="text-xs text-red-500 font-semibold px-1 mt-0.5">⚠ {error}</p>}
    </div>
  );
};
