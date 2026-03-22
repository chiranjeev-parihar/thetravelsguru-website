import React, { useState } from 'react';
import { CheckCircle, Send, Users, Sparkles, Clock, Phone, Mail, MapPin } from 'lucide-react';
import { PhoneField, validatePhone, COUNTRIES, CountryOption } from '../components/PhoneField';
import { DestinationPicker } from '../components/DestinationPicker';

const API_URL = "https://travel-crm-backend-uljm.onrender.com";

type TabId = 'general' | 'group' | 'custom' | 'early';

const TABS = [
    { id: 'general' as TabId, label: 'General Inquiry', emoji: '✉️', sub: 'Ask us anything' },
    { id: 'group' as TabId, label: 'Group Booking', emoji: '👥', sub: 'Groups of 6+' },
    { id: 'custom' as TabId, label: 'Custom Plan', emoji: '✨', sub: 'Build your dream trip' },
    { id: 'early' as TabId, label: 'Early Bird', emoji: '🐦', sub: 'Lock in early discounts' },
];

// ── Email validator ──────────────────────────────────────────────────────────
const validateEmail = (email: string): string | null => {
    if (!email) return 'Email is required.';
    if (!email.includes('@')) return 'Email must contain @.';
    const parts = email.split('@');
    if (parts.length !== 2 || !parts[1]) return 'Email must have a domain after @.';
    const domain = parts[1];
    if (!domain.includes('.')) return 'Email domain must contain a dot (e.g. gmail.com).';
    const ext = domain.split('.').pop() || '';
    if (ext.length < 2) return 'Email must have a valid extension (e.g. .com).';
    return null;
};

export const InquiryForm = () => {
    const [activeTab, setActiveTab] = useState<TabId>('general');
    const [submitted, setSubmitted] = useState<Partial<Record<TabId, boolean>>>({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const defaultCountry = COUNTRIES[0];

    // ── Phone states ──────────────────────────────────────────────────────────
    const [genPhone, setGenPhone] = useState({ full: '', raw: '', country: defaultCountry });
    const [grpPhone, setGrpPhone] = useState({ full: '', raw: '', country: defaultCountry });
    const [cusPhone, setCusPhone] = useState({ full: '', raw: '', country: defaultCountry });
    const [earPhone, setEarPhone] = useState({ full: '', raw: '', country: defaultCountry });

    // ── Phone errors ──────────────────────────────────────────────────────────
    const [genPhoneErr, setGenPhoneErr] = useState<string | null>(null);
    const [grpPhoneErr, setGrpPhoneErr] = useState<string | null>(null);
    const [cusPhoneErr, setCusPhoneErr] = useState<string | null>(null);
    const [earPhoneErr, setEarPhoneErr] = useState<string | null>(null);

    // ── Email errors ──────────────────────────────────────────────────────────
    const [genEmailErr, setGenEmailErr] = useState<string | null>(null);
    const [grpEmailErr, setGrpEmailErr] = useState<string | null>(null);
    const [cusEmailErr, setCusEmailErr] = useState<string | null>(null);
    const [earEmailErr, setEarEmailErr] = useState<string | null>(null);

    // ── Destination states ────────────────────────────────────────────────────
    const [genDest, setGenDest] = useState('');
    const [grpDest, setGrpDest] = useState('');
    const [cusDest, setCusDest] = useState('');

    const submitLead = async (payload: Record<string, any>, formId: TabId) => {
        setLoading(true);
        setError('');
        try {
            const res = await fetch(`${API_URL}/leads`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            if (!res.ok) throw new Error();
            setSubmitted(p => ({ ...p, [formId]: true }));
        } catch {
            setError('Something went wrong. Please call us directly at 9099965751.');
        } finally {
            setLoading(false);
        }
    };

    const handleGeneral = async (e: React.FormEvent) => {
        e.preventDefault();
        const fd = new FormData(e.target as HTMLFormElement);
        const phoneErr = validatePhone(genPhone.raw, genPhone.country);
        const emailErr = validateEmail(fd.get('email') as string);
        setGenPhoneErr(phoneErr);
        setGenEmailErr(emailErr);
        if (phoneErr || emailErr) return;
        await submitLead({
            name: fd.get('name'), email: fd.get('email'),
            phone: genPhone.full, destination: genDest,
            message: fd.get('message'), source: 'Website - General Inquiry',
        }, 'general');
    };

    const handleGroup = async (e: React.FormEvent) => {
        e.preventDefault();
        const fd = new FormData(e.target as HTMLFormElement);
        const phoneErr = validatePhone(grpPhone.raw, grpPhone.country);
        const emailErr = validateEmail(fd.get('email') as string);
        setGrpPhoneErr(phoneErr);
        setGrpEmailErr(emailErr);
        if (phoneErr || emailErr) return;
        await submitLead({
            name: fd.get('contact'), phone: grpPhone.full, email: fd.get('email'),
            destination: grpDest,
            number_of_person: parseInt(fd.get('size') as string) || null,
            package_selected: fd.get('group_type') as string,
            message: `Group: ${fd.get('group_name')} | Travel: ${fd.get('travel_date')}`,
            source: 'Website - Group Booking',
        }, 'group');
    };

    const handleCustom = async (e: React.FormEvent) => {
        e.preventDefault();
        const fd = new FormData(e.target as HTMLFormElement);
        const phoneErr = validatePhone(cusPhone.raw, cusPhone.country);
        const emailErr = validateEmail(fd.get('email') as string);
        setCusPhoneErr(phoneErr);
        setCusEmailErr(emailErr);
        if (phoneErr || emailErr) return;
        await submitLead({
            name: fd.get('name'), phone: cusPhone.full, email: fd.get('email'),
            destination: cusDest,
            number_of_person: parseInt(fd.get('travelers') as string) || null,
            message: `Duration: ${fd.get('duration')} | Budget: ${fd.get('budget')} | Style: ${fd.get('style')} | Notes: ${fd.get('notes')}`,
            source: 'Website - Custom Plan',
        }, 'custom');
    };

    const handleEarly = async (e: React.FormEvent) => {
        e.preventDefault();
        const fd = new FormData(e.target as HTMLFormElement);
        const phoneErr = validatePhone(earPhone.raw, earPhone.country);
        const emailErr = validateEmail(fd.get('email') as string);
        setEarPhoneErr(phoneErr);
        setEarEmailErr(emailErr);
        if (phoneErr || emailErr) return;
        await submitLead({
            name: fd.get('name'), email: fd.get('email'), phone: earPhone.full,
            package_selected: fd.get('offer_type') as string,
            source: 'Website - Early Bird',
        }, 'early');
    };

    const inputCls = `w-full bg-white border border-slate-200 text-slate-800 placeholder-slate-400
    rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-orange-400 focus:ring-2
    focus:ring-orange-100 transition-all font-medium`;

    const selectCls = `w-full bg-white border border-slate-200 text-slate-600
    rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-orange-400 focus:ring-2
    focus:ring-orange-100 transition-all font-medium appearance-none`;

    const btnCls = `w-full bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-400 hover:to-rose-400
    text-white font-black py-4 rounded-2xl transition-all text-sm tracking-wide shadow-lg
    shadow-orange-200 hover:shadow-orange-300 hover:scale-[1.01] disabled:opacity-60 disabled:scale-100
    flex items-center justify-center gap-2`;

    const errCls = "text-xs text-red-500 font-semibold px-1 mt-0.5";

    return (
        <div className="min-h-screen bg-[#fdf8f3]" style={{ fontFamily: "'Outfit', sans-serif" }}>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Cormorant+Garamond:ital,wght@0,600;1,600&display=swap');
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; } 50% { opacity: 0.4; }
        }
        .slide-up { animation: slideUp 0.4s ease both; }
        .slide-up-1 { animation: slideUp 0.4s 0.05s ease both; }
        .slide-up-2 { animation: slideUp 0.4s 0.1s ease both; }
        .slide-up-3 { animation: slideUp 0.4s 0.15s ease both; }
        .tab-active { box-shadow: 0 4px 20px rgba(249,115,22,0.25); }
      `}</style>

            {/* ── Header ── */}
            <header className="bg-white border-b border-slate-100 px-6 py-5 flex items-center justify-between sticky top-0 z-20 shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-orange-500 to-rose-500 flex items-center justify-center shadow-md shadow-orange-200">
                        <span className="text-white text-lg">✈</span>
                    </div>
                    <div>
                        <p className="font-black text-slate-800 text-sm leading-none">The Travel's Guru</p>
                        <p className="text-[10px] text-slate-400 font-medium mt-0.5">Travel Enquiry Form</p>
                    </div>
                </div>
                <a href="tel:9099965751"
                    className="flex items-center gap-2 bg-orange-50 text-orange-600 px-4 py-2 rounded-xl text-xs font-bold border border-orange-100 hover:bg-orange-100 transition-colors">
                    <Phone size={13} /> 9099965751
                </a>
            </header>

            <div className="max-w-2xl mx-auto px-4 py-10" style={{ isolation: 'isolate' }}>

                {/* ── Hero text ── */}
                <div className="slide-up text-center mb-10">
                    <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-1.5 rounded-full text-xs font-bold mb-4">
                        <span className="w-1.5 h-1.5 bg-orange-500 rounded-full" style={{ animation: 'pulse-dot 1.5s infinite' }} />
                        We respond within 2 hours
                    </div>
                    <h1 className="text-4xl font-black text-slate-800 leading-tight mb-3"
                        style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic' }}>
                        Plan Your Perfect Journey
                    </h1>
                    <p className="text-slate-500 text-sm font-medium">
                        Fill in your details below and Mahavir will personally get back to you.
                    </p>
                </div>

                {/* ── Tab selector ── */}
                <div className="slide-up-1 grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
                    {TABS.map(tab => (
                        <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                            className={`flex flex-col items-center gap-1 px-3 py-3.5 rounded-2xl border font-semibold text-xs transition-all ${activeTab === tab.id
                                    ? 'bg-gradient-to-br from-orange-500 to-rose-500 text-white border-transparent tab-active'
                                    : 'bg-white border-slate-200 text-slate-600 hover:border-orange-300 hover:bg-orange-50'
                                }`}>
                            <span className="text-xl">{tab.emoji}</span>
                            <span className="font-bold text-[11px]">{tab.label}</span>
                            <span className={`text-[9px] font-medium ${activeTab === tab.id ? 'text-orange-100' : 'text-slate-400'}`}>
                                {tab.sub}
                            </span>
                        </button>
                    ))}
                </div>

                {/* ── Form card ── */}
                <div className="slide-up-2 bg-white rounded-3xl shadow-xl shadow-slate-200/80 border border-slate-100 p-8">

                    {error && (
                        <div className="mb-5 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-xs font-semibold">
                            ⚠️ {error}
                        </div>
                    )}

                    {/* ── GENERAL INQUIRY ── */}
                    {activeTab === 'general' && (
                        submitted.general ? <SuccessCard onReset={() => setSubmitted(p => ({ ...p, general: false }))} /> : (
                            <form onSubmit={handleGeneral} className="space-y-4">
                                <FormHeader emoji="✉️" title="General Inquiry" sub="Tell us about your travel plans" />
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <input name="name" className={inputCls} placeholder="Full Name *" required />
                                    {/* Email */}
                                    <div className="flex flex-col gap-1">
                                        <input name="email" type="email" placeholder="Email Address *" required
                                            className={`${inputCls} ${genEmailErr ? 'border-red-400' : ''}`}
                                            onChange={() => setGenEmailErr(null)}
                                            onBlur={e => setGenEmailErr(validateEmail(e.target.value))}
                                        />
                                        {genEmailErr && <p className={errCls}>⚠ {genEmailErr}</p>}
                                    </div>
                                    {/* Phone full-width */}
                                    <div className="sm:col-span-2">
                                        <PhoneField
                                            value={genPhone.raw}
                                            onChange={(full, raw, country) => { setGenPhone({ full, raw, country }); setGenPhoneErr(null); }}
                                            error={genPhoneErr}
                                            placeholder="Mobile Number"
                                        />
                                    </div>
                                    {/* Destination full-width */}
                                    <div className="sm:col-span-2">
                                        <DestinationPicker value={genDest} onChange={setGenDest} theme="orange" placeholder="Preferred Destination" />
                                    </div>
                                </div>
                                <textarea name="message" rows={3} className={inputCls} placeholder="Special requirements, dates, or any questions…" />
                                <button type="submit" disabled={loading} className={btnCls}>
                                    {loading ? 'Sending…' : <><Send size={15} /> Submit Inquiry</>}
                                </button>
                            </form>
                        )
                    )}

                    {/* ── GROUP BOOKING ── */}
                    {activeTab === 'group' && (
                        submitted.group ? <SuccessCard onReset={() => setSubmitted(p => ({ ...p, group: false }))} /> : (
                            <form onSubmit={handleGroup} className="space-y-4">
                                <FormHeader emoji="👥" title="Group Booking"
                                    sub="Special rates for 6+ travelers"
                                    badge="Group Discount Available" />
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <input name="group_name" className={inputCls} placeholder="Company / Group Name" />
                                    <input name="contact" className={inputCls} placeholder="Contact Person *" required />
                                    {/* Phone */}
                                    <div className="sm:col-span-2">
                                        <PhoneField
                                            value={grpPhone.raw}
                                            onChange={(full, raw, country) => { setGrpPhone({ full, raw, country }); setGrpPhoneErr(null); }}
                                            error={grpPhoneErr}
                                            placeholder="Mobile Number"
                                        />
                                    </div>
                                    {/* Email */}
                                    <div className="sm:col-span-2 flex flex-col gap-1">
                                        <input name="email" type="email" placeholder="Email Address *" required
                                            className={`${inputCls} ${grpEmailErr ? 'border-red-400' : ''}`}
                                            onChange={() => setGrpEmailErr(null)}
                                            onBlur={e => setGrpEmailErr(validateEmail(e.target.value))}
                                        />
                                        {grpEmailErr && <p className={errCls}>⚠ {grpEmailErr}</p>}
                                    </div>
                                    <input name="size" type="number" min="6" className={inputCls} placeholder="Group Size (min 6) *" required />
                                    {/* Destination */}
                                    <DestinationPicker value={grpDest} onChange={setGrpDest} theme="orange" placeholder="Destination" />
                                    <input name="travel_date" type="date" className={inputCls} />
                                    <select name="group_type" className={selectCls}>
                                        <option value="">Group Type</option>
                                        <option>Friends &amp; Family</option>
                                        <option>Corporate Team</option>
                                        <option>School / College</option>
                                        <option>Pilgrimage Group</option>
                                    </select>
                                </div>
                                <button type="submit" disabled={loading} className={btnCls}>
                                    {loading ? 'Sending…' : <><Users size={15} /> Get Group Quote</>}
                                </button>
                            </form>
                        )
                    )}

                    {/* ── CUSTOM PLAN ── */}
                    {activeTab === 'custom' && (
                        submitted.custom ? <SuccessCard onReset={() => setSubmitted(p => ({ ...p, custom: false }))} /> : (
                            <form onSubmit={handleCustom} className="space-y-4">
                                <FormHeader emoji="✨" title="Custom Trip Plan" sub="We'll design the perfect itinerary for you" />
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <input name="name" className={inputCls} placeholder="Full Name *" required />
                                    {/* Phone */}
                                    <PhoneField
                                        value={cusPhone.raw}
                                        onChange={(full, raw, country) => { setCusPhone({ full, raw, country }); setCusPhoneErr(null); }}
                                        error={cusPhoneErr}
                                        placeholder="Mobile Number"
                                    />
                                    {/* Email */}
                                    <div className="sm:col-span-2 flex flex-col gap-1">
                                        <input name="email" type="email" placeholder="Email Address *" required
                                            className={`${inputCls} ${cusEmailErr ? 'border-red-400' : ''}`}
                                            onChange={() => setCusEmailErr(null)}
                                            onBlur={e => setCusEmailErr(validateEmail(e.target.value))}
                                        />
                                        {cusEmailErr && <p className={errCls}>⚠ {cusEmailErr}</p>}
                                    </div>
                                    {/* Destination */}
                                    <div className="sm:col-span-2">
                                        <DestinationPicker value={cusDest} onChange={setCusDest} theme="orange" placeholder="Destination *" required />
                                    </div>
                                    <input name="duration" className={inputCls} placeholder="Duration (e.g. 7 days)" />
                                    <input name="travelers" type="number" min="1" defaultValue={2} className={inputCls} placeholder="No. of Travelers" />
                                    <select name="budget" className={selectCls}>
                                        <option value="">Budget per person</option>
                                        <option>Under ₹25,000</option>
                                        <option>₹25,000 – ₹50,000</option>
                                        <option>₹50,000 – ₹1,00,000</option>
                                        <option>₹1,00,000+</option>
                                        <option>Luxury (no limit)</option>
                                    </select>
                                    <select name="style" className={selectCls}>
                                        <option>Relaxed &amp; Comfortable</option>
                                        <option>Adventure &amp; Outdoor</option>
                                        <option>Luxury &amp; Premium</option>
                                        <option>Budget-Friendly</option>
                                        <option>Honeymoon / Romantic</option>
                                        <option>Family with Kids</option>
                                    </select>
                                </div>
                                <textarea name="notes" rows={3} className={inputCls}
                                    placeholder="Special interests, must-visit places, dietary needs, or anything else…" />
                                <button type="submit" disabled={loading} className={btnCls}>
                                    {loading ? 'Sending…' : <><Sparkles size={15} /> Submit Custom Request</>}
                                </button>
                            </form>
                        )
                    )}

                    {/* ── EARLY BIRD ── */}
                    {activeTab === 'early' && (
                        submitted.early ? <SuccessCard onReset={() => setSubmitted(p => ({ ...p, early: false }))} /> : (
                            <form onSubmit={handleEarly} className="space-y-4">
                                <FormHeader emoji="🐦" title="Early Bird Signup"
                                    sub="Register early and save up to 25%"
                                    badge="Summer 2026 — Save 25%" />
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <input name="name" className={inputCls} placeholder="Full Name *" required />
                                    {/* Phone */}
                                    <PhoneField
                                        value={earPhone.raw}
                                        onChange={(full, raw, country) => { setEarPhone({ full, raw, country }); setEarPhoneErr(null); }}
                                        error={earPhoneErr}
                                        placeholder="Mobile Number"
                                    />
                                    {/* Email */}
                                    <div className="sm:col-span-2 flex flex-col gap-1">
                                        <input name="email" type="email" placeholder="Email Address *" required
                                            className={`${inputCls} ${earEmailErr ? 'border-red-400' : ''}`}
                                            onChange={() => setEarEmailErr(null)}
                                            onBlur={e => setEarEmailErr(validateEmail(e.target.value))}
                                        />
                                        {earEmailErr && <p className={errCls}>⚠ {earEmailErr}</p>}
                                    </div>
                                    <select name="offer_type" className={`${selectCls} sm:col-span-1`}>
                                        <option>Domestic Offers</option>
                                        <option>International Offers</option>
                                        <option>All Offers</option>
                                    </select>
                                </div>
                                <button type="submit" disabled={loading} className={btnCls}>
                                    {loading ? 'Signing up…' : <><Clock size={15} /> Join Early Bird List</>}
                                </button>
                            </form>
                        )
                    )}
                </div>

                {/* ── Footer ── */}
                <div className="slide-up-3 mt-8 text-center space-y-3">
                    <p className="text-slate-400 text-xs font-medium">🔒 Your information is private and will never be shared</p>
                    <div className="flex items-center justify-center gap-6 text-xs text-slate-400 font-medium">
                        <a href="mailto:thetravelsguru@gmail.com" className="flex items-center gap-1 hover:text-orange-500 transition-colors">
                            <Mail size={11} /> thetravelsguru@gmail.com
                        </a>
                        <a href="tel:9099965751" className="flex items-center gap-1 hover:text-orange-500 transition-colors">
                            <Phone size={11} /> 9099965751
                        </a>
                    </div>
                    <p className="text-slate-300 text-[10px]">© The Travel's Guru · Surat, Gujarat</p>
                </div>
            </div>
        </div>
    );
};

// ── Sub-components ────────────────────────────────────────────────
function FormHeader({ emoji, title, sub, badge }: { emoji: string; title: string; sub: string; badge?: string }) {
    return (
        <div className="flex items-start justify-between mb-2 gap-4">
            <div>
                <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
                    {emoji} {title}
                </h2>
                <p className="text-slate-500 text-xs mt-1 font-medium">{sub}</p>
            </div>
            {badge && (
                <span className="shrink-0 bg-gradient-to-r from-orange-500 to-rose-500 text-white text-[10px] font-black px-3 py-1.5 rounded-xl shadow-md shadow-orange-200 whitespace-nowrap">
                    {badge}
                </span>
            )}
        </div>
    );
}

function SuccessCard({ onReset }: { onReset: () => void }) {
    return (
        <div className="text-center py-10 space-y-5 slide-up">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-200">
                <CheckCircle size={36} className="text-white" />
            </div>
            <div>
                <h3 className="text-2xl font-black text-slate-800">Request Sent! 🎉</h3>
                <p className="text-slate-500 text-sm mt-2 max-w-xs mx-auto font-medium">
                    Mahavir will personally review and get back to you within 2 hours.
                </p>
            </div>
            <div className="flex items-center justify-center gap-4 pt-2">
                <a href="https://wa.me/919099965751" target="_blank"
                    className="flex items-center gap-2 bg-green-500 text-white px-5 py-3 rounded-2xl text-xs font-bold hover:bg-green-600 transition-colors shadow-md">
                    💬 WhatsApp Us
                </a>
                <button onClick={onReset}
                    className="text-slate-500 text-xs font-semibold underline hover:text-orange-500 transition-colors">
                    Submit another
                </button>
            </div>
        </div>
    );
}
