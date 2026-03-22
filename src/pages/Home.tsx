import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search, Users, Calendar, MapPin, CheckCircle,
  ArrowRight, ShieldCheck, Heart, Headphones, Sparkles, Clock, Star, Phone
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PACKAGES, DESTINATIONS, TESTIMONIALS, DEFAULTS } from '../data';
import { BudgetBreakdown } from '../components/BudgetBreakdown';
import { PhoneField, validatePhone, COUNTRIES, CountryOption } from '../components/PhoneField';
import { DestinationPicker } from '../components/DestinationPicker';

// ✅ Live Render backend
const API_URL = "https://travel-crm-backend-uljm.onrender.com";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

export const Home = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState('');

  // ── Quick inquiry phone & destination state ─────────────────────────────
  const [quickPhone, setQuickPhone] = useState({ full: '', raw: '', country: COUNTRIES[0] });
  const [quickPhoneErr, setQuickPhoneErr] = useState<string | null>(null);
  const [quickDest, setQuickDest] = useState('');

  const handleQuickInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    const fd = new FormData(e.target as HTMLFormElement);
    const name = fd.get('name') as string;

    // Validate phone
    const phoneErr = validatePhone(quickPhone.raw, quickPhone.country);
    setQuickPhoneErr(phoneErr);
    if (phoneErr) return;

    setLoading(true);
    setFormError('');
    try {
      const res = await fetch(`${API_URL}/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone: quickPhone.full,
          destination: quickDest,
          source: 'Website - Quick Inquiry',
        }),
      });
      if (!res.ok) throw new Error('Failed');
      setFormSubmitted(true);
    } catch {
      setFormError('Something went wrong. Please call us directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-24 pb-24 overflow-hidden">

      {/* ── 1. Hero Section ── */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden pb-16 md:pb-32">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1506461883276-594a12b11cf3?auto=format&fit=crop&q=80"
            className="w-full h-full object-cover"
            alt="Hero Background"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-brand-blue/60 to-transparent"></div>
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative z-10 text-center md:text-left text-white px-4 max-w-7xl w-full pt-12 md:pt-20 lg:pl-16"
        >
          <motion.div variants={fadeInUp}
            className="inline-flex items-center gap-2 bg-brand-orange/20 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-bold border border-brand-orange/30 mb-8 animate-float">
            <Star size={16} className="text-brand-orange" fill="currentColor" />
            <span>Surat's #1 Most Trusted Travel Agency</span>
          </motion.div>

          <motion.h1 variants={fadeInUp}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight drop-shadow-2xl">
            Your Journey <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-yellow-400 italic pr-2">
              Starts With Trust
            </span>
          </motion.h1>

          <motion.p variants={fadeInUp}
            className="text-xl md:text-2xl mb-10 text-gray-200 font-light max-w-2xl">
            Experience the world through the eyes of an expert. Curated tours by {DEFAULTS.OWNER}.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 mb-12">
            <Link to="/packages" onClick={()=>window.scrollTo(0,0)} className="btn-accent w-full sm:w-auto text-center">
              Explore Packages
            </Link>
            <Link to="/contact?tab=custom"
              className="glass text-brand-blue px-10 py-4 rounded-full font-bold text-lg transition-all hover:bg-white/90 w-full sm:w-auto text-center whitespace-nowrap">
              Custom Trip Plan
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ── 2. Early Bird Discount Banner ── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
        className="max-w-7xl mx-auto px-4 mt-24 md:mt-32"
      >
        <div className="bg-gradient-to-r from-brand-orange to-red-600 rounded-[40px] p-8 md:p-14 text-white relative overflow-hidden group shadow-2xl shadow-brand-orange/20">
          <div className="absolute right-0 top-0 translate-x-1/4 -translate-y-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10 text-center md:text-left">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-white/20 px-5 py-2 rounded-full text-sm font-bold backdrop-blur-md uppercase tracking-wider">
                <Sparkles size={16} />
                <span>Summer 2026 Special</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight">
                Early Bird? <span className="underline decoration-yellow-300">Save 25%</span>
              </h2>
              <p className="text-base sm:text-lg text-white/90 font-medium max-w-xl">
                Register for upcoming tours and get locked-in early rates before prices soar.
              </p>
            </div>
            <Link to="/contact?tab=early"
              className="bg-white text-red-600 px-8 py-4 md:px-10 md:py-5 rounded-full font-black text-lg md:text-xl hover:scale-105 transition-transform shadow-2xl shrink-0 hover:shadow-white/20 w-full md:w-auto text-center mt-6 md:mt-0">
              Claim Discount
            </Link>
          </div>
        </div>
      </motion.section>

      {/* ── 3. Unique Itineraries — 3D Hover Cards ── */}
      <section className="max-w-7xl mx-auto px-4 py-24">
        <div className="text-center mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-brand-blue/10 text-brand-blue px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest"
          >
            <Sparkles size={14} /> Signature Experiences
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight">
            Unique <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-yellow-500">Itineraries</span>
          </h2>
          <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            Handcrafted journeys designed to immerse you in the world's most breathtaking destinations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-[2000px]">
          {PACKAGES.slice(0, 3).map((pkg, idx) => (
            <Link to={`/package/${pkg.id}`} key={pkg.id} onClick={()=>window.scrollTo(0,0)}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                whileHover={{ rotateX: 5, rotateY: -5, scale: 1.05, z: 50, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)" }}
                className="relative h-[350px] md:h-[450px] rounded-[2.5rem] md:rounded-[3rem] overflow-hidden group cursor-pointer border border-white/20 transform-gpu preserve-3d bg-slate-900 block"
              >
                <div className="absolute inset-0 z-0">
                  <img src={pkg.images[0]} alt={pkg.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
                </div>
                <div className="relative z-10 h-full p-6 md:p-8 flex flex-col justify-between transform-gpu translate-z-[50px]">
                  <div className="flex justify-between items-start">
                    <span className="bg-white/20 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-white/30 shadow-xl">
                      {pkg.category}
                    </span>
                    <div className="bg-white/90 text-slate-900 w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-xl">
                      <ArrowRight size={20} className="-rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                    </div>
                  </div>
                  <div className="space-y-3 transform-gpu translate-z-[30px]">
                    <h3 className="text-3xl font-black text-white leading-tight drop-shadow-lg">{pkg.name}</h3>
                    <div className="flex items-center gap-4 text-white/90 text-sm font-semibold">
                      <span className="flex items-center gap-1"><Clock size={16} className="text-brand-orange" /> {pkg.duration}</span>
                      <span className="flex items-center gap-1"><Star size={16} className="text-yellow-400" /> {pkg.rating}/5</span>
                    </div>
                    <div className="pt-4 border-t border-white/20 flex justify-between items-end">
                      <div>
                        <p className="text-xs text-white/70 uppercase font-black tracking-widest mb-1">Starting From</p>
                        <p className="text-2xl font-black text-brand-orange drop-shadow-md">₹{pkg.price.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── 4. Social Testimonials ── */}
      <section className="bg-slate-900 py-16 sm:py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-12 space-y-3">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white">Love From Our <span className="text-brand-orange">Travelers</span></h2>
            <p className="text-slate-400 text-base font-medium">Real stories from real people who travelled with us.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {name:'Romi Shah & Group',loc:'Alibaug Trip',platform:'Google',text:'We had an absolutely wonderful group trip to Alibaug! Mahavir sir personally handled every detail — from ferry bookings to the beach resort stay. The whole group of 12 was thoroughly impressed. Zero stress, 100% fun. Will definitely book again! 🌊'},
              {name:'Bhismak & Namrata Vasaikar',loc:'Kashmir 6N/7D',platform:'Google',text:'Kashmir was a dream come true! The Travel\'s Guru curated a perfect itinerary covering Dal Lake, Gulmarg, Pahalgam and Sonamarg. Every hotel was handpicked and Mahavir sir was available on WhatsApp throughout our trip whenever we needed help. Highly recommended! ❄️'},
              {name:'Priya Patel',loc:'Maldives Trip',platform:'Instagram',text:'If you want a premium luxury experience without the headache of planning, this is the agency. The Maldives overwater villa they booked for us was a dream come true! 🌊💙 @TheTravelsGuru'},
            ].map((r,i)=>(
              <div key={i} className="bg-white/5 backdrop-blur border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col gap-4 hover:-translate-y-1 transition-transform duration-300">
                <div className="text-brand-orange text-5xl font-serif leading-none">"</div>
                <p className="text-slate-200 text-sm sm:text-base leading-relaxed flex-1">{r.text}</p>
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-orange/20 flex items-center justify-center text-brand-orange font-black text-lg">{r.name[0]}</div>
                    <div><p className="text-white text-sm font-bold">{r.name}</p><p className="text-slate-500 text-xs">{r.loc}</p></div>
                  </div>
                  <span className={`text-[10px] font-black px-2 py-1 rounded-lg ${r.platform==='Google'?'bg-blue-500/20 text-blue-300':'bg-pink-500/20 text-pink-300'}`}>{r.platform}</span>
                </div>
                <div className="flex gap-0.5">{[...Array(5)].map((_,j)=><span key={j} className="text-yellow-400 text-xs">★</span>)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Quick Inquiry Form ✅ saves to Supabase ── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={fadeInUp}
        id="inquiry"
        className="max-w-4xl mx-auto px-4 mt-8 pb-16"
      >
        <div className="glass bg-white/60 p-8 md:p-12 rounded-[40px] shadow-2xl border border-white relative overflow-hidden min-h-[380px] flex flex-col justify-center">
          <div className="absolute -right-20 -top-20 opacity-5 pointer-events-none">
            <Star size={300} className="text-brand-orange" />
          </div>

          {formSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-6 relative z-10"
            >
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle size={40} />
              </div>
              <h2 className="text-3xl font-black text-slate-900">Inquiry Sent Successfully!</h2>
              <p className="text-slate-600 text-lg max-w-md mx-auto font-medium">
                Mahavir will personally review your request and contact you within 2 hours.
              </p>
              <button
                onClick={() => setFormSubmitted(false)}
                className="text-brand-blue font-bold underline hover:text-brand-orange transition-colors"
              >
                Send another inquiry
              </button>
            </motion.div>
          ) : (
            <>
              <div className="text-center mb-10 relative z-10 space-y-2">
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                  Ready for your next chapter?
                </h2>
                <p className="text-slate-600 font-medium text-lg">
                  Talk to our experts — guaranteed response within{' '}
                  <span className="text-brand-blue font-black underline">2 Hours</span>.
                </p>
              </div>

              {formError && (
                <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-2xl text-sm font-semibold text-center relative z-10">
                  {formError}
                </div>
              )}

              <form onSubmit={handleQuickInquiry} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <input
                  name="name" type="text" placeholder="Your Name *" required
                  className="bg-white/80 border border-slate-200 px-6 py-4 rounded-2xl focus:ring-2 focus:ring-brand-blue outline-none font-medium text-slate-800 placeholder-slate-400"
                />
                {/* Phone with country code */}
                <PhoneField
                  value={quickPhone.raw}
                  onChange={(full, raw, country) => { setQuickPhone({ full, raw, country }); setQuickPhoneErr(null); }}
                  error={quickPhoneErr}
                  placeholder="Mobile Number"
                  inputClassName="bg-white/80"
                />
                {/* Destination Picker */}
                <div className="md:col-span-2">
                  <DestinationPicker
                    value={quickDest}
                    onChange={setQuickDest}
                    theme="light"
                    placeholder="Where do you want to go?"
                  />
                </div>
                <button
                  type="submit" disabled={loading}
                  className="md:col-span-2 btn-primary py-4 text-lg flex items-center justify-center gap-3 shadow-xl hover:shadow-brand-blue/30 group disabled:opacity-60"
                >
                  {loading ? 'Submitting…' : (
                    <>
                      Start Planning
                      <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 text-center text-[11px] font-black uppercase text-slate-400 tracking-widest relative z-10">
                Privacy Protected • No Spam Guarantee
              </div>
            </>
          )}
        </div>
      </motion.section>

    </div>
  );
};
