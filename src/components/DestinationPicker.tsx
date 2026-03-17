import React, { useState, useRef, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { Search, ChevronDown, ChevronRight, Globe, MapPin, ArrowLeft } from 'lucide-react';

// ── Indian States & Cities ───────────────────────────────────────────────────
const INDIA_DATA: Record<string, string[]> = {
  'Andhra Pradesh': ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Tirupati', 'Nellore'],
  'Arunachal Pradesh': ['Itanagar', 'Naharlagun', 'Tawang', 'Ziro', 'Pasighat'],
  'Assam': ['Guwahati', 'Jorhat', 'Silchar', 'Dibrugarh', 'Kaziranga', 'Majuli'],
  'Bihar': ['Patna', 'Gaya', 'Bodh Gaya', 'Nalanda', 'Vaishali', 'Muzaffarpur'],
  'Chhattisgarh': ['Raipur', 'Bilaspur', 'Jagdalpur', 'Durg', 'Bhilai'],
  'Goa': ['Panaji', 'Margao', 'Vasco da Gama', 'Mapusa', 'Calangute', 'Anjuna', 'Vagator', 'Colva'],
  'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Dwarka', 'Somnath', 'Gir', 'Rann of Kutch', 'Saputara'],
  'Haryana': ['Chandigarh', 'Faridabad', 'Gurgaon', 'Ambala', 'Kurukshetra'],
  'Himachal Pradesh': ['Shimla', 'Manali', 'Dharamshala', 'McLeod Ganj', 'Kasol', 'Spiti Valley', 'Dalhousie', 'Kullu', 'Bir Billing'],
  'Jharkhand': ['Ranchi', 'Jamshedpur', 'Dhanbad', 'Deoghar'],
  'Karnataka': ['Bangalore', 'Mysore', 'Coorg', 'Hampi', 'Gokarna', 'Mangalore', 'Badami', 'Chikmagalur'],
  'Kerala': ['Kochi', 'Thiruvananthapuram', 'Kozhikode', 'Munnar', 'Alleppey', 'Kumarakom', 'Thrissur', 'Wayanad', 'Kovalam'],
  'Ladakh': ['Leh', 'Kargil', 'Nubra Valley', 'Pangong Lake', 'Zanskar'],
  'Madhya Pradesh': ['Bhopal', 'Indore', 'Gwalior', 'Khajuraho', 'Pachmarhi', 'Bandhavgarh', 'Kanha', 'Ujjain'],
  'Maharashtra': ['Mumbai', 'Pune', 'Nashik', 'Aurangabad', 'Shirdi', 'Lonavala', 'Mahabaleshwar', 'Nagpur', 'Kolhapur'],
  'Manipur': ['Imphal', 'Ukhrul', 'Loktak Lake'],
  'Meghalaya': ['Shillong', 'Cherrapunji', 'Mawsynram', 'Dawki', 'Mawlynnong'],
  'Mizoram': ['Aizawl', 'Lunglei'],
  'Nagaland': ['Kohima', 'Dimapur', 'Dzukou Valley'],
  'Odisha': ['Bhubaneswar', 'Puri', 'Konark', 'Chilika Lake', 'Cuttack'],
  'Punjab': ['Amritsar', 'Chandigarh', 'Jalandhar', 'Ludhiana', 'Anandpur Sahib'],
  'Rajasthan': ['Jaipur', 'Jodhpur', 'Udaipur', 'Jaisalmer', 'Pushkar', 'Bikaner', 'Ranthambore', 'Ajmer', 'Chittorgarh'],
  'Sikkim': ['Gangtok', 'Pelling', 'Lachung', 'Lachen', 'Namchi', 'Yuksom'],
  'Tamil Nadu': ['Chennai', 'Madurai', 'Ooty', 'Kodaikanal', 'Rameswaram', 'Mahabalipuram', 'Kanyakumari', 'Pondicherry'],
  'Telangana': ['Hyderabad', 'Warangal', 'Nagarjuna Sagar'],
  'Tripura': ['Agartala', 'Neermahal'],
  'Uttar Pradesh': ['Agra', 'Varanasi', 'Lucknow', 'Mathura', 'Vrindavan', 'Allahabad', 'Ayodhya'],
  'Uttarakhand': ['Dehradun', 'Rishikesh', 'Haridwar', 'Nainital', 'Mussoorie', 'Auli', 'Chopta', 'Jim Corbett', 'Kedarnath', 'Badrinath'],
  'West Bengal': ['Kolkata', 'Darjeeling', 'Siliguri', 'Sundarbans', 'Dooars', 'Kalimpong'],
  'Andaman & Nicobar': ['Port Blair', 'Havelock Island', 'Neil Island', 'Baratang'],
  'Lakshadweep': ['Kavaratti', 'Agatti', 'Bangaram'],
  'Puducherry': ['Pondicherry Town', 'Auroville'],
  'Daman & Diu': ['Daman', 'Diu'],
  'Dadra & Nagar Haveli': ['Silvassa'],
};

// ── International Countries & Cities (India excluded) ──────────────────────
const INTERNATIONAL_DATA: Record<string, string[]> = {
  'Thailand': ['Bangkok', 'Phuket', 'Chiang Mai', 'Pattaya', 'Krabi', 'Koh Samui', 'Hua Hin'],
  'Maldives': ['Malé', 'Maafushi', 'Baa Atoll', 'Ari Atoll', 'Rasdhoo'],
  'Dubai / UAE': ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah'],
  'Singapore': ['Singapore City', 'Sentosa', 'Marina Bay', 'Orchard Road'],
  'Malaysia': ['Kuala Lumpur', 'Penang', 'Langkawi', 'Malacca', 'Genting Highlands', 'Cameron Highlands'],
  'Indonesia (Bali)': ['Kuta', 'Seminyak', 'Ubud', 'Nusa Penida', 'Gili Islands', 'Lombok'],
  'Sri Lanka': ['Colombo', 'Kandy', 'Galle', 'Ella', 'Sigiriya', 'Nuwara Eliya', 'Trincomalee'],
  'Nepal': ['Kathmandu', 'Pokhara', 'Chitwan', 'Nagarkot', 'Lumbini', 'Everest Base Camp'],
  'Bhutan': ['Thimphu', 'Paro', 'Punakha', 'Bumthang', 'Phobjikha'],
  'Vietnam': ['Hanoi', 'Ho Chi Minh City', 'Da Nang', 'Hoi An', 'Ha Long Bay', 'Nha Trang'],
  'Cambodia': ['Siem Reap', 'Phnom Penh', 'Sihanoukville'],
  'Japan': ['Tokyo', 'Kyoto', 'Osaka', 'Hiroshima', 'Nara', 'Hokkaido', 'Okinawa'],
  'South Korea': ['Seoul', 'Busan', 'Jeju Island', 'Incheon', 'Gyeongju'],
  'China': ['Beijing', 'Shanghai', 'Guilin', 'Zhangjiajie', 'Chengdu', 'Xi\'an'],
  'Hong Kong': ['Kowloon', 'Lan Kwai Fong', 'Victoria Peak', 'Hong Kong Island'],
  'Macau': ['Macau City', 'Cotai Strip'],
  'Turkey': ['Istanbul', 'Cappadocia', 'Antalya', 'Pamukkale', 'Bodrum', 'Izmir'],
  'Egypt': ['Cairo', 'Luxor', 'Aswan', 'Hurghada', 'Sharm el-Sheikh', 'Alexandria'],
  'Kenya': ['Nairobi', 'Masai Mara', 'Amboseli', 'Diani Beach', 'Tsavo'],
  'Tanzania': ['Serengeti', 'Kilimanjaro', 'Zanzibar', 'Dar es Salaam'],
  'South Africa': ['Cape Town', 'Johannesburg', 'Durban', 'Kruger Park', 'Garden Route'],
  'Morocco': ['Marrakech', 'Fez', 'Casablanca', 'Chefchaouen', 'Sahara Desert'],
  'United Kingdom': ['London', 'Edinburgh', 'Manchester', 'Oxford', 'Lake District', 'Bath'],
  'France': ['Paris', 'Nice', 'Lyon', 'Provence', 'French Riviera', 'Bordeaux', 'Strasbourg'],
  'Italy': ['Rome', 'Venice', 'Florence', 'Milan', 'Amalfi Coast', 'Sicily', 'Cinque Terre'],
  'Spain': ['Barcelona', 'Madrid', 'Seville', 'Valencia', 'Granada', 'San Sebastián'],
  'Greece': ['Athens', 'Santorini', 'Mykonos', 'Crete', 'Rhodes', 'Corfu'],
  'Switzerland': ['Zurich', 'Geneva', 'Interlaken', 'Zermatt', 'Lucerne', 'Bern'],
  'Germany': ['Berlin', 'Munich', 'Hamburg', 'Frankfurt', 'Cologne', 'Rothenburg'],
  'Austria': ['Vienna', 'Salzburg', 'Innsbruck', 'Hallstatt'],
  'Netherlands': ['Amsterdam', 'Rotterdam', 'The Hague', 'Utrecht'],
  'Portugal': ['Lisbon', 'Porto', 'Algarve', 'Madeira', 'Azores'],
  'Czech Republic': ['Prague', 'Brno', 'Cesky Krumlov'],
  'Hungary': ['Budapest', 'Lake Balaton'],
  'Norway': ['Oslo', 'Bergen', 'Tromsø', 'Lofoten', 'Geirangerfjord'],
  'Iceland': ['Reykjavik', 'Golden Circle', 'Northern Lights', 'Jökulsárlón'],
  'Australia': ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Cairns', 'Gold Coast', 'Uluru'],
  'New Zealand': ['Auckland', 'Queenstown', 'Rotorua', 'Milford Sound', 'Wellington'],
  'Fiji': ['Nadi', 'Suva', 'Mamanuca Islands', 'Yasawa Islands'],
  'Mauritius': ['Port Louis', 'Grand Baie', 'Flic en Flac', 'Le Morne'],
  'United States': ['New York', 'Los Angeles', 'Las Vegas', 'Miami', 'San Francisco', 'Honolulu', 'Orlando'],
  'Canada': ['Toronto', 'Vancouver', 'Banff', 'Quebec City', 'Montreal', 'Niagara Falls'],
  'Mexico': ['Cancun', 'Mexico City', 'Tulum', 'Playa del Carmen', 'Los Cabos'],
  'Brazil': ['Rio de Janeiro', 'São Paulo', 'Iguazu Falls', 'Amazon', 'Salvador'],
  'Peru': ['Lima', 'Machu Picchu', 'Cusco', 'Amazon Jungle', 'Sacred Valley'],
  'Argentina': ['Buenos Aires', 'Patagonia', 'Mendoza', 'Salta'],
};

// ── Component ────────────────────────────────────────────────────────────────
interface DestinationPickerProps {
  value: string;
  onChange: (destination: string) => void;
  required?: boolean;
  inputClassName?: string;
  placeholder?: string;
  theme?: 'light' | 'dark' | 'orange';
}

export const DestinationPicker: React.FC<DestinationPickerProps> = ({
  value,
  onChange,
  required = false,
  theme = 'light',
  placeholder = 'Select Destination',
}) => {
  const [open, setOpen] = useState(false);
  const [dropStyle, setDropStyle] = useState<React.CSSProperties>({});
  const [mode, setMode] = useState<'domestic' | 'international' | null>(null);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [stateSearch, setStateSearch] = useState('');
  const [citySearch, setCitySearch] = useState('');
  const dropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const portal = document.getElementById('dp-portal');
      if (
        dropRef.current && !dropRef.current.contains(e.target as Node) &&
        (!portal || !portal.contains(e.target as Node))
      ) {
        setOpen(false);
        setStateSearch('');
        setCitySearch('');
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Compute fixed-position coords for the portal dropdown
  const handleToggle = () => {
    if (!open && dropRef.current) {
      const rect = dropRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom - 8;
      const spaceAbove = rect.top - 8;
      const goUp = spaceBelow < 200 && spaceAbove > spaceBelow;

      if (goUp) {
        setDropStyle({
          position: 'fixed',
          left: rect.left,
          width: rect.width,
          bottom: window.innerHeight - rect.top + 4,
          maxHeight: Math.min(280, spaceAbove),
          overflowY: 'auto',
          zIndex: 99999,
        });
      } else {
        setDropStyle({
          position: 'fixed',
          left: rect.left,
          top: rect.bottom + 4,
          width: rect.width,
          maxHeight: Math.min(280, spaceBelow),
          overflowY: 'auto',
          zIndex: 99999,
        });
      }
    }
    setOpen(o => !o);
  };

  const displayLabel = value || placeholder;

  const stateKeys = useMemo(() =>
    Object.keys(mode === 'domestic' ? INDIA_DATA : INTERNATIONAL_DATA)
      .filter(k => k.toLowerCase().includes(stateSearch.toLowerCase())),
    [mode, stateSearch]
  );

  const cities = useMemo(() => {
    if (!selectedState) return [];
    const source = mode === 'domestic' ? INDIA_DATA : INTERNATIONAL_DATA;
    return (source[selectedState] || []).filter(c => c.toLowerCase().includes(citySearch.toLowerCase()));
  }, [selectedState, mode, citySearch]);

  const selectCity = (city: string) => {
    const dest = `${selectedState} - ${city}`;
    onChange(dest);
    setOpen(false);
    setStateSearch('');
    setCitySearch('');
  };

  const reset = () => {
    setMode(null);
    setSelectedState(null);
    setStateSearch('');
    setCitySearch('');
  };

  const themeMap = {
    light: {
      trigger: 'bg-white border-slate-200 text-slate-800 hover:border-blue-400',
      dropdown: 'bg-white border-slate-200 shadow-xl',
      item: 'hover:bg-blue-50 text-slate-700',
      active: 'bg-blue-50 text-blue-700 font-bold',
      search: 'bg-slate-50 border-slate-200 focus:border-blue-400 text-slate-800',
      label: 'text-slate-400',
      modeBtn: 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700',
      modeActive: 'bg-blue-600 text-white border-blue-600 shadow-md',
      back: 'text-blue-600 hover:text-blue-700',
    },
    dark: {
      trigger: 'bg-white/5 border-white/10 text-white hover:border-white/30',
      dropdown: 'bg-[#0f1629] border-white/10 shadow-2xl',
      item: 'hover:bg-white/5 text-slate-300',
      active: 'bg-white/10 text-white font-bold',
      search: 'bg-white/5 border-white/10 focus:border-amber-400/40 text-white placeholder-slate-600',
      label: 'text-slate-600',
      modeBtn: 'border-white/10 bg-white/5 hover:bg-white/10 text-slate-300',
      modeActive: 'bg-amber-500 text-white border-amber-500 shadow-md',
      back: 'text-amber-400 hover:text-amber-300',
    },
    orange: {
      trigger: 'bg-white border-slate-200 text-slate-800 hover:border-orange-400',
      dropdown: 'bg-white border-slate-200 shadow-xl',
      item: 'hover:bg-orange-50 text-slate-700',
      active: 'bg-orange-50 text-orange-600 font-bold',
      search: 'bg-slate-50 border-slate-200 focus:border-orange-400 text-slate-800',
      label: 'text-slate-400',
      modeBtn: 'border-slate-200 bg-white hover:bg-orange-50 text-slate-700',
      modeActive: 'bg-gradient-to-r from-orange-500 to-rose-500 text-white border-transparent shadow-md',
      back: 'text-orange-500 hover:text-orange-600',
    },
  };
  const t = themeMap[theme];

  return (
    <div className="relative w-full" ref={dropRef}>
      {/* Trigger button */}
      <button
        type="button"
        onClick={handleToggle}
        className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl border text-sm font-medium transition-all outline-none ${t.trigger}`}
      >
        <span className={value ? 'text-inherit' : t.label}>
          {value ? (
            <span className="flex items-center gap-2">
              <MapPin size={14} />
              {value}
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Globe size={14} />
              {placeholder}
              {required && <span className="text-red-500 font-black">*</span>}
            </span>
          )}
        </span>
        <ChevronDown size={16} className={`transition-transform ${open ? 'rotate-180' : ''} opacity-50`} />
      </button>

      {/* Portal Dropdown — renders to document.body, escapes ALL stacking contexts */}
      {open && createPortal(
        <div
          id="dp-portal"
          className={`border rounded-2xl overflow-hidden ${t.dropdown}`}
          style={dropStyle}
        >

          {/* Step 1: Choose Domestic / International */}
          {!mode && (
            <div className="p-4 space-y-3">
              <p className="text-[10px] font-black uppercase tracking-widest opacity-50 px-1">Choose trip type</p>
              <div className="grid grid-cols-2 gap-3">
                <button type="button" onClick={() => setMode('domestic')}
                  className={`flex flex-col items-center gap-2 px-4 py-5 rounded-2xl border font-bold text-sm transition-all ${t.modeBtn}`}>
                  <span className="text-3xl">🇮🇳</span>
                  <span>Domestic</span>
                  <span className="text-[10px] opacity-60 font-medium">All India</span>
                </button>
                <button type="button" onClick={() => setMode('international')}
                  className={`flex flex-col items-center gap-2 px-4 py-5 rounded-2xl border font-bold text-sm transition-all ${t.modeBtn}`}>
                  <span className="text-3xl">🌍</span>
                  <span>International</span>
                  <span className="text-[10px] opacity-60 font-medium">World</span>
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Choose State / Country */}
          {mode && !selectedState && (
            <div className="flex flex-col max-h-72">
              <div className="p-3 border-b border-inherit space-y-2">
                <div className="flex items-center gap-2">
                  <button type="button" onClick={reset} className={`text-xs font-bold flex items-center gap-1 ${t.back}`}>
                    <ArrowLeft size={12} /> Back
                  </button>
                  <span className="text-xs font-black opacity-50 uppercase tracking-widest ml-1">
                    {mode === 'domestic' ? '🇮🇳 Select State / UT' : '🌍 Select Country'}
                  </span>
                </div>
                <div className="relative">
                  <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-40" />
                  <input
                    autoFocus
                    type="text"
                    placeholder={`Search ${mode === 'domestic' ? 'state' : 'country'}…`}
                    value={stateSearch}
                    onChange={e => setStateSearch(e.target.value)}
                    className={`w-full text-xs pl-8 pr-3 py-2.5 rounded-xl border outline-none ${t.search}`}
                  />
                </div>
              </div>
              <div className="overflow-y-auto flex-1">
                {stateKeys.length === 0 && <p className="text-center text-xs opacity-40 py-4">Nothing found</p>}
                {stateKeys.map(key => (
                  <button key={key} type="button"
                    onClick={() => { setSelectedState(key); setStateSearch(''); }}
                    className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors ${t.item}`}>
                    <span>{key}</span>
                    <ChevronRight size={14} className="opacity-40" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Choose City */}
          {mode && selectedState && (
            <div className="flex flex-col max-h-72">
              <div className="p-3 border-b border-inherit space-y-2">
                <div className="flex items-center gap-2">
                  <button type="button" onClick={() => setSelectedState(null)} className={`text-xs font-bold flex items-center gap-1 ${t.back}`}>
                    <ArrowLeft size={12} /> {selectedState}
                  </button>
                </div>
                <div className="relative">
                  <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-40" />
                  <input
                    autoFocus
                    type="text"
                    placeholder="Search city…"
                    value={citySearch}
                    onChange={e => setCitySearch(e.target.value)}
                    className={`w-full text-xs pl-8 pr-3 py-2.5 rounded-xl border outline-none ${t.search}`}
                  />
                </div>
              </div>
              <div className="overflow-y-auto flex-1">
                {cities.length === 0 && <p className="text-center text-xs opacity-40 py-4">No cities found</p>}
                {cities.map(city => (
                  <button key={city} type="button" onClick={() => selectCity(city)}
                    className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm transition-colors ${t.item}`}>
                    <MapPin size={12} className="opacity-40 shrink-0" />
                    {city}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      , document.body)}

      {/* Hidden input for form submission */}
      <input
        type="hidden"
        name="destination"
        value={value}
        required={required}
      />
    </div>
  );
};
