import React, { useState } from 'react';
import {
  Phone, Mail, MapPin, Send, MessageCircle,
  Users, Sparkles, Clock, CheckCircle
} from 'lucide-react';
import { DEFAULTS } from '../data';
import { generateItinerary } from '../services/gemini';
import { PhoneField, validatePhone, COUNTRIES, CountryOption } from '../components/PhoneField';
import { DestinationPicker } from '../components/DestinationPicker';

const API_URL = "https://travel-crm-backend-uljm.onrender.com";

// ── Email validator (must have @ and end with .com / .in / .net etc) ─────────
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

const inputCls = "w-full bg-gray-50 border border-gray-200 px-6 py-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all font-medium text-slate-800 placeholder-slate-400";
const errorCls = "text-xs text-red-500 font-semibold px-1 mt-0.5";

export const Contact = () => {
  const [activeTab, setActiveTab] = useState<'general' | 'group' | 'custom' | 'early'>('general');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState('');
  const [submittedForms, setSubmittedForms] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // ── Per-form phone state ────────────────────────────────────────────────
  const defaultCountry = COUNTRIES[0]; // India
  const [genPhone, setGenPhone] = useState({ full: '', raw: '', country: defaultCountry });
  const [grpPhone, setGrpPhone] = useState({ full: '', raw: '', country: defaultCountry });
  const [cusPhone, setCusPhone] = useState({ full: '', raw: '', country: defaultCountry });
  const [earPhone, setEarPhone] = useState({ full: '', raw: '', country: defaultCountry });

  // ── Per-form destination state ──────────────────────────────────────────
  const [genDest, setGenDest] = useState('');
  const [grpDest, setGrpDest] = useState('');
  const [cusDest, setCusDest] = useState('');

  // ── Per-form phone errors ───────────────────────────────────────────────
  const [genPhoneErr, setGenPhoneErr] = useState<string | null>(null);
  const [grpPhoneErr, setGrpPhoneErr] = useState<string | null>(null);
  const [cusPhoneErr, setCusPhoneErr] = useState<string | null>(null);
  const [earPhoneErr, setEarPhoneErr] = useState<string | null>(null);

  // ── Per-form email errors ───────────────────────────────────────────────
  const [genEmailErr, setGenEmailErr] = useState<string | null>(null);
  const [grpEmailErr, setGrpEmailErr] = useState<string | null>(null);
  const [cusEmailErr, setCusEmailErr] = useState<string | null>(null);
  const [earEmailErr, setEarEmailErr] = useState<string | null>(null);

  const submitLead = async (payload: Record<string, any>, formId: string) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_URL}/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error();
      setSubmittedForms(prev => ({ ...prev, [formId]: true }));
    } catch {
      setError('Something went wrong. Please try WhatsApp or call us directly.');
    } finally {
      setLoading(false);
    }
  };

  // ── General Inquiry ───────────────────────────────────────────────────────
  const handleGeneralSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fd = new FormData(e.target as HTMLFormElement);
    const phoneErr = validatePhone(genPhone.raw, genPhone.country);
    const emailErr = validateEmail(fd.get('email') as string);
    setGenPhoneErr(phoneErr);
    setGenEmailErr(emailErr);
    if (phoneErr || emailErr) return;
    await submitLead({
      name: fd.get('name'), email: fd.get('email'), phone: genPhone.full,
      destination: genDest, message: fd.get('message'), source: 'Website - General Inquiry',
    }, 'general');
  };

  // ── Group Booking ─────────────────────────────────────────────────────────
  const handleGroupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fd = new FormData(e.target as HTMLFormElement);
    const phoneErr = validatePhone(grpPhone.raw, grpPhone.country);
    const emailErr = validateEmail(fd.get('email') as string);
    setGrpPhoneErr(phoneErr);
    setGrpEmailErr(emailErr);
    if (phoneErr || emailErr) return;
    await submitLead({
      name: fd.get('contact_person'), phone: grpPhone.full, email: fd.get('email'),
      destination: grpDest, number_of_person: parseInt(fd.get('group_size') as string) || null,
      package_selected: fd.get('group_type'), message: `Company/Group: ${fd.get('group_name')}`,
      source: 'Website - Group Booking',
    }, 'group');
  };

  // ── Early Bird ────────────────────────────────────────────────────────────
  const handleEarlyBirdSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fd = new FormData(e.target as HTMLFormElement);
    const phoneErr = validatePhone(earPhone.raw, earPhone.country);
    const emailErr = validateEmail(fd.get('email') as string);
    setEarPhoneErr(phoneErr);
    setEarEmailErr(emailErr);
    if (phoneErr || emailErr) return;
    await submitLead({
      name: fd.get('name'), email: fd.get('email'), phone: earPhone.full,
      package_selected: fd.get('offer_type'), source: 'Website - Early Bird',
    }, 'early');
  };

  // ── Custom Plan ───────────────────────────────────────────────────────────
  const handleCustomPlan = async (e: React.FormEvent) => {
    e.preventDefault();
    const fd = new FormData(e.target as HTMLFormElement);
    const phoneErr = validatePhone(cusPhone.raw, cusPhone.country);
    const emailErr = validateEmail(fd.get('email') as string);
    setCusPhoneErr(phoneErr);
    setCusEmailErr(emailErr);
    if (phoneErr || emailErr) return;
    setAiLoading(true);
    const result = await generateItinerary(
      cusDest, fd.get('duration') as string,
      parseInt(fd.get('travelers') as string), ['Culture', 'Food']
    );
    setAiResult(result || '');
    setAiLoading(false);
    await submitLead({
      name: fd.get('name'), phone: cusPhone.full, email: fd.get('email'),
      destination: cusDest, number_of_person: parseInt(fd.get('travelers') as string) || null,
      message: `Duration: ${fd.get('duration')} | Style: ${fd.get('style')} | Notes: ${fd.get('notes')}`,
      source: 'Website - Custom Plan',
    }, 'custom');
  };

  const SuccessMessage = ({ title, onReset }: { title: string; onReset: () => void }) => (
    <div className="text-center space-y-6 py-12 animate-in zoom-in duration-500">
      <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
        <CheckCircle size={40} />
      </div>
      <h2 className="text-3xl font-black text-gray-900">{title} Sent!</h2>
      <p className="text-gray-600 text-lg max-w-md mx-auto">
        Thank you for reaching out. Mahavir will personally review your request and contact you shortly.
      </p>
      <button onClick={onReset} className="text-blue-800 font-bold underline">
        Submit another request
      </button>
    </div>
  );

  return (
    <div className="pb-24">
      {/* Header */}
      <section className="bg-slate-900 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto space-y-4">
          <h1 className="text-4xl md:text-5xl font-black">
            Get In <span className="text-orange-400">Touch</span>
          </h1>
          <p className="text-slate-400 max-w-2xl">
            Whether you have a specific destination in mind or need expert advice, our team is here to help.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 -mt-10 relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Info Sidebar */}
        <aside className="lg:col-span-1 space-y-8">
          <div className="bg-white p-8 rounded-[40px] shadow-xl border border-gray-100 space-y-8">
            <h3 className="text-2xl font-black text-gray-900">Contact Details</h3>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="bg-blue-100 text-blue-800 p-3 rounded-2xl h-fit"><Phone size={20} /></div>
                <div>
                  <h4 className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Call Us</h4>
                  <p className="font-bold text-gray-800">{DEFAULTS.PHONE}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-orange-100 text-orange-600 p-3 rounded-2xl h-fit"><Mail size={20} /></div>
                <div>
                  <h4 className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Email Us</h4>
                  <p className="font-bold text-gray-800">{DEFAULTS.EMAIL}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-green-100 text-green-600 p-3 rounded-2xl h-fit"><MessageCircle size={20} /></div>
                <div>
                  <h4 className="text-[10px] font-black uppercase text-gray-400 tracking-widest">WhatsApp</h4>
                  <p className="font-bold text-gray-800">{DEFAULTS.WHATSAPP}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-slate-100 text-slate-800 p-3 rounded-2xl h-fit"><MapPin size={20} /></div>
                <div>
                  <h4 className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Office</h4>
                  <p className="font-bold text-gray-800 leading-snug">{DEFAULTS.ADDRESS}</p>
                </div>
              </div>
            </div>
            <div className="pt-8 border-t border-gray-100">
              <div className="bg-blue-50 p-6 rounded-3xl flex items-center gap-4 overflow-hidden">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shrink-0">
                  <img
                    src={DEFAULTS.FOUNDER_IMAGE}
                    alt="Consultant"
                    className="w-full h-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80'; }}
                  />
                </div>
                <p className="text-xs font-bold text-blue-800 italic">
                  "I'll personally review your inquiry and get back to you within 2 hours." — Mahavir
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* Tabbed Form Interface */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-2 rounded-2xl shadow-lg border border-gray-100 flex flex-wrap gap-2">
            {[
              { id: 'general', label: 'General Inquiry', icon: Send },
              { id: 'group', label: 'Group Booking', icon: Users },
              { id: 'custom', label: 'Custom Plan', icon: Sparkles },
              { id: 'early', label: 'Early Bird', icon: Clock },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-grow flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold transition-all text-sm ${activeTab === tab.id ? 'bg-blue-800 text-white shadow-lg' : 'text-gray-500 hover:bg-gray-50'}`}
              >
                <tab.icon size={16} /> {tab.label}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-[40px] shadow-2xl border border-gray-100 p-8 md:p-12 min-h-[500px] flex flex-col justify-center overflow-hidden">
            {error && (
              <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-2xl text-sm font-bold">{error}</div>
            )}

            {/* ── GENERAL INQUIRY ── */}
            {activeTab === 'general' && (
              submittedForms.general ? (
                <SuccessMessage title="Inquiry" onReset={() => setSubmittedForms(p => ({ ...p, general: false }))} />
              ) : (
                <form onSubmit={handleGeneralSubmit} className="space-y-5 animate-in fade-in duration-500">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-black text-gray-900">General Inquiry</h2>
                    <p className="text-gray-500 text-sm">We'll get back to you within 2 hours during business hours.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <input name="name" type="text" placeholder="Full Name*" className={inputCls} required />
                    {/* Email with validation */}
                    <div className="flex flex-col gap-1">
                      <input
                        name="email" type="email" placeholder="Email Address*" required
                        className={`${inputCls} ${genEmailErr ? 'border-red-400 focus:ring-red-300' : ''}`}
                        onChange={() => setGenEmailErr(null)}
                        onBlur={e => setGenEmailErr(validateEmail(e.target.value))}
                      />
                      {genEmailErr && <p className={errorCls}>⚠ {genEmailErr}</p>}
                    </div>
                    {/* Phone with country picker */}
                    <div className="md:col-span-2">
                      <PhoneField
                        value={genPhone.raw}
                        onChange={(full, raw, country) => { setGenPhone({ full, raw, country }); setGenPhoneErr(null); }}
                        error={genPhoneErr}
                        placeholder="Mobile Number"
                      />
                    </div>
                    {/* Destination Picker */}
                    <div className="md:col-span-2">
                      <DestinationPicker
                        value={genDest}
                        onChange={setGenDest}
                        theme="light"
                        placeholder="Preferred Destination"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <textarea name="message" placeholder="Special Requirements / Message" rows={4} className={inputCls} />
                    </div>
                  </div>
                  <button type="submit" disabled={loading} className="w-full bg-blue-800 text-white py-4 rounded-2xl font-black text-lg hover:bg-blue-900 transition-all shadow-lg disabled:opacity-60">
                    {loading ? 'Submitting...' : 'Submit Inquiry'}
                  </button>
                </form>
              )
            )}

            {/* ── GROUP BOOKING ── */}
            {activeTab === 'group' && (
              submittedForms.group ? (
                <SuccessMessage title="Group Quote Request" onReset={() => setSubmittedForms(p => ({ ...p, group: false }))} />
              ) : (
                <form onSubmit={handleGroupSubmit} className="space-y-5 animate-in fade-in duration-500">
                  <div className="flex items-center justify-between gap-4">
                    <div className="space-y-2">
                      <h2 className="text-2xl font-black text-gray-900">Group Booking</h2>
                      <p className="text-gray-500 text-sm">Special discounted rates for groups of 6 or more.</p>
                    </div>
                    <div className="bg-orange-500 text-white px-4 py-2 rounded-xl text-xs font-black uppercase shadow-lg shadow-orange-200">Group Discount!</div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <input name="group_name" type="text" placeholder="Company / Group Name" className={inputCls} />
                    <input name="contact_person" type="text" placeholder="Contact Person*" className={inputCls} required />
                    {/* Phone */}
                    <PhoneField
                      value={grpPhone.raw}
                      onChange={(full, raw, country) => { setGrpPhone({ full, raw, country }); setGrpPhoneErr(null); }}
                      error={grpPhoneErr}
                      placeholder="Mobile Number"
                    />
                    {/* Email */}
                    <div className="flex flex-col gap-1">
                      <input
                        name="email" type="email" placeholder="Email Address*" required
                        className={`${inputCls} ${grpEmailErr ? 'border-red-400' : ''}`}
                        onChange={() => setGrpEmailErr(null)}
                        onBlur={e => setGrpEmailErr(validateEmail(e.target.value))}
                      />
                      {grpEmailErr && <p className={errorCls}>⚠ {grpEmailErr}</p>}
                    </div>
                    <input name="group_size" type="number" placeholder="Group Size* (Min 6)" min="6" className={inputCls} required />
                    {/* Destination */}
                    <DestinationPicker value={grpDest} onChange={setGrpDest} theme="light" placeholder="Destination" />
                    <select name="group_type" className={`${inputCls} text-gray-500`}>
                      <option>Friends &amp; Family</option>
                      <option>Corporate Team</option>
                      <option>School / College</option>
                      <option>Pilgrimage Group</option>
                    </select>
                  </div>
                  <button type="submit" disabled={loading} className="w-full bg-blue-800 text-white py-4 rounded-2xl font-black text-lg hover:bg-blue-900 transition-all shadow-lg disabled:opacity-60">
                    {loading ? 'Submitting...' : 'Get Group Quote'}
                  </button>
                </form>
              )
            )}

            {/* ── CUSTOM PLAN ── */}
            {activeTab === 'custom' && (
              submittedForms.custom && aiResult ? (
                <div className="space-y-8 animate-in fade-in duration-500">
                  <div className="bg-blue-50 p-8 rounded-3xl">
                    <h3 className="text-xl font-black text-blue-800">Suggested Itinerary</h3>
                    <p className="text-sm text-gray-700 mt-4 whitespace-pre-line">{aiResult}</p>
                  </div>
                  <div className="flex gap-4">
                    <button onClick={() => { setSubmittedForms(p => ({ ...p, custom: false })); setAiResult(''); }} className="flex-1 bg-blue-800 text-white py-3 rounded-2xl font-bold">Create Another</button>
                    <a href={`mailto:${DEFAULTS.EMAIL}?subject=Interested%20in%20Custom%20Plan`} className="flex-1 text-center bg-white border border-gray-200 py-3 rounded-2xl font-bold text-blue-800">Email Us</a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleCustomPlan} className="space-y-5 animate-in fade-in duration-500">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-black text-gray-900">Custom Plan</h2>
                    <p className="text-gray-500 text-sm">Tell us your preferences and our AI will suggest an itinerary.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <input name="name" type="text" placeholder="Your Name*" className={inputCls} required />
                    {/* Phone */}
                    <PhoneField
                      value={cusPhone.raw}
                      onChange={(full, raw, country) => { setCusPhone({ full, raw, country }); setCusPhoneErr(null); }}
                      error={cusPhoneErr}
                      placeholder="Mobile Number"
                    />
                    {/* Email */}
                    <div className="flex flex-col gap-1">
                      <input
                        name="email" type="email" placeholder="Email Address*" required
                        className={`${inputCls} ${cusEmailErr ? 'border-red-400' : ''}`}
                        onChange={() => setCusEmailErr(null)}
                        onBlur={e => setCusEmailErr(validateEmail(e.target.value))}
                      />
                      {cusEmailErr && <p className={errorCls}>⚠ {cusEmailErr}</p>}
                    </div>
                    {/* Destination */}
                    <DestinationPicker value={cusDest} onChange={setCusDest} theme="light" placeholder="Destination*" required />
                    <input name="duration" type="text" placeholder="Duration (e.g., 5 days)" className={inputCls} />
                    <input name="travelers" type="number" min="1" defaultValue={1} placeholder="Number of Travelers" className={inputCls} />
                    <select name="style" className={`${inputCls} text-gray-500`}>
                      <option>Relaxed</option>
                      <option>Adventure</option>
                      <option>Luxury</option>
                      <option>Budget</option>
                    </select>
                    <div className="md:col-span-2">
                      <textarea name="notes" placeholder="Interests / Notes" rows={4} className={inputCls} />
                    </div>
                  </div>
                  <button type="submit" disabled={aiLoading || loading} className="w-full bg-blue-800 text-white py-4 rounded-2xl font-black text-lg hover:bg-blue-900 transition-all shadow-lg disabled:opacity-60">
                    {aiLoading ? 'Generating AI Itinerary...' : loading ? 'Saving...' : 'Generate Itinerary'}
                  </button>
                </form>
              )
            )}

            {/* ── EARLY BIRD ── */}
            {activeTab === 'early' && (
              submittedForms.early ? (
                <SuccessMessage title="Early Bird" onReset={() => setSubmittedForms(p => ({ ...p, early: false }))} />
              ) : (
                <form onSubmit={handleEarlyBirdSubmit} className="space-y-5 animate-in fade-in duration-500">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-black text-gray-900">Early Bird Signup</h2>
                    <p className="text-gray-500 text-sm">Sign up to receive early-bird offers and exclusive discounts.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <input name="name" type="text" placeholder="Full Name*" className={inputCls} required />
                    {/* Email */}
                    <div className="flex flex-col gap-1">
                      <input
                        name="email" type="email" placeholder="Email Address*" required
                        className={`${inputCls} ${earEmailErr ? 'border-red-400' : ''}`}
                        onChange={() => setEarEmailErr(null)}
                        onBlur={e => setEarEmailErr(validateEmail(e.target.value))}
                      />
                      {earEmailErr && <p className={errorCls}>⚠ {earEmailErr}</p>}
                    </div>
                    {/* Phone */}
                    <PhoneField
                      value={earPhone.raw}
                      onChange={(full, raw, country) => { setEarPhone({ full, raw, country }); setEarPhoneErr(null); }}
                      error={earPhoneErr}
                      placeholder="Mobile Number"
                    />
                    <select name="offer_type" className={`${inputCls} text-gray-500`}>
                      <option>Domestic Offers</option>
                      <option>International Offers</option>
                      <option>All Offers</option>
                    </select>
                  </div>
                  <button type="submit" disabled={loading} className="w-full bg-blue-800 text-white py-4 rounded-2xl font-black text-lg hover:bg-blue-900 transition-all shadow-lg disabled:opacity-60">
                    {loading ? 'Submitting...' : 'Join Early Bird List'}
                  </button>
                </form>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
