
import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Users, MapPin, Clock, CheckCircle, XCircle, 
  ChevronDown, Phone, Share2, Heart, Award, ShieldCheck
} from 'lucide-react';

import { motion } from 'framer-motion';
import { PACKAGES, DEFAULTS } from '../data';

export const PackageDetail = () => {
  const { id } = useParams();
  const pkg = PACKAGES.find(p => p.id === id);
  const [activeDay, setActiveDay] = useState<number | null>(1);
  const [showBar, setShowBar] = useState(true);
  const contentEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(()=>{
    const observer = new IntersectionObserver(
      ([entry]) => setShowBar(!entry.isIntersecting),
      { threshold: 0.1 }
    );
    if(contentEndRef.current) observer.observe(contentEndRef.current);
    return () => observer.disconnect();
  },[]);

  if (!pkg) return (
    <div className="h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center space-y-6">
        <h1 className="text-5xl font-black text-slate-800">Package Not Found</h1>
        <Link to="/packages" className="inline-block btn-primary">Back to Packages</Link>
      </div>
    </div>
  );

  return (
    <div className="bg-white pb-32">
      {/* 1. Hero Section */}
      <section className="relative h-[60vh] md:h-[75vh]">
        <div className="absolute inset-0">
          <img src={pkg.images[0]} alt={pkg.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        </div>
        
        <div className="absolute bottom-0 w-full px-4 pb-12">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-8">
            <div className="text-white space-y-4 drop-shadow-lg">
              <nav className="text-xs uppercase font-black text-white/80 flex items-center gap-2 mb-4">
                <Link to="/" className="hover:text-white transition-colors">Home</Link> / <Link to="/packages" className="hover:text-white transition-colors">Packages</Link> / <span className="text-white">{pkg.destination}</span>
              </nav>
              <h1 className="text-4xl md:text-7xl font-black leading-tight max-w-4xl">{pkg.name}</h1>
              <div className="flex flex-wrap items-center gap-8 pt-4">
                <div className="flex items-center gap-3">
                  <div className="bg-brand-orange/20 p-2 rounded-xl backdrop-blur-sm"><MapPin size={24} className="text-brand-orange" /></div>
                  <span className="font-bold text-lg">{pkg.destination}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-brand-orange/20 p-2 rounded-xl backdrop-blur-sm"><Clock size={24} className="text-brand-orange" /></div>
                  <span className="font-bold text-lg">{pkg.duration}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-brand-orange/20 p-2 rounded-xl backdrop-blur-sm"><Users size={24} className="text-brand-orange" /></div>
                  <span className="font-bold text-lg">Group Size: 2-12</span>
                </div>
              </div>
            </div>
            
            <div className="glass p-8 rounded-[32px] min-w-[320px] text-slate-900">
              <div className="text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Total Package Cost</div>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-4xl font-black text-brand-blue tracking-tight">₹{pkg.price.toLocaleString()}</span>
                <span className="text-sm font-bold text-gray-400">/ Person</span>
              </div>
              <div className="flex gap-3">
                <button className="flex-grow btn-primary">
                  Book Now
                </button>
                <button
                  className="bg-slate-100 p-3 rounded-2xl hover:bg-slate-200 transition-colors border border-slate-200 flex items-center justify-center"
                  onClick={async()=>{
                    if(navigator.share){await navigator.share({title:pkg.name,url:window.location.href});}
                    else{navigator.clipboard.writeText(window.location.href);alert('Link copied!');}
                  }}
                >
                  <Share2 size={20} className="text-slate-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Quick Info Bar */}
      <section className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-2 md:grid-cols-3 gap-8">
          <div className="text-center md:border-r border-gray-200">
            <div className="text-[10px] font-black text-gray-400 uppercase mb-1">Best Time</div>
            <div className="font-bold text-gray-800">Oct - Mar</div>
          </div>
          <div className="text-center md:border-r border-gray-200">
            <div className="text-[10px] font-black text-gray-400 uppercase mb-1">Rating</div>
            <div className="font-bold text-gray-800 flex items-center justify-center gap-1">
              <span className="text-yellow-500">★</span> {pkg.rating} ({pkg.reviewsCount} reviews)
            </div>
          </div>
          <div className="text-center">
            <div className="text-[10px] font-black text-gray-400 uppercase mb-1">Refund Policy</div>
            <div className="font-bold text-green-600">Full Refund Available</div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2 space-y-16">
          
          {/* 3. Package Highlights */}
          <section className="space-y-8">
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">Package <span className="text-brand-blue">Highlights</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pkg.highlights.map((h, i) => (
                <div key={i} className="flex items-center gap-4 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-brand-orange/10 text-brand-orange p-3 rounded-xl shrink-0">
                    <CheckCircle size={24} />
                  </div>
                  <span className="font-bold text-slate-700 text-lg leading-snug">{h}</span>
                </div>
              ))}
            </div>
          </section>

          {/* 4. Detailed Itinerary */}
          <section className="space-y-8">
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">Day-by-Day <span className="text-brand-blue">Itinerary</span></h2>
            <div className="space-y-4">
              {pkg.itinerary.map((day) => (
                <div key={day.day} className={`border-2 rounded-[24px] transition-all overflow-hidden ${activeDay === day.day ? 'border-brand-blue shadow-lg' : 'border-slate-100'}`}>
                  <button 
                    onClick={() => setActiveDay(activeDay === day.day ? null : day.day)}
                    className="w-full flex items-center justify-between p-6 bg-white hover:bg-slate-50 transition-all text-left"
                  >
                    <div className="flex items-center gap-6">
                      <div className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center font-black ${activeDay === day.day ? 'bg-brand-blue text-white shadow-md' : 'bg-slate-100 text-slate-400'}`}>
                        <span className="text-[10px] leading-none mb-0.5 uppercase tracking-widest">Day</span>
                        <span className="text-xl leading-none">{day.day}</span>
                      </div>
                      <h4 className="text-xl font-bold text-slate-900">{day.title}</h4>
                    </div>
                    <ChevronDown size={24} className={`text-slate-400 transition-transform ${activeDay === day.day ? 'rotate-180' : ''}`} />
                  </button>
                  {activeDay === day.day && (
                    <div className="p-6 bg-slate-50 border-t border-slate-100 pt-6 space-y-6">
                      <p className="text-slate-600 leading-relaxed font-medium pl-[80px] text-lg">{day.description}</p>
                      <div className="flex items-center gap-4 pl-[80px]">
                         <span className="text-xs font-black uppercase text-slate-400 tracking-widest">Meals:</span>
                         <div className="flex gap-2">
                           {day.meals.map(m => (
                             <span key={m} className="bg-white border border-slate-200 px-3 py-1.5 rounded-xl text-xs font-bold text-brand-blue shadow-sm">{m}</span>
                           ))}
                         </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* 5. Inclusions & Exclusions */}
          <section ref={contentEndRef} className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <CheckCircle className="text-green-500" size={24} /> What's Included
              </h3>
              <ul className="space-y-3">
                {pkg.inclusions.map((inc, i) => (
                  <li key={i} className="text-gray-600 text-sm font-medium flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">•</span> {inc}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-6">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <XCircle className="text-red-500" size={24} /> What's Excluded
              </h3>
              <ul className="space-y-3">
                {pkg.exclusions.map((exc, i) => (
                  <li key={i} className="text-gray-600 text-sm font-medium flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">•</span> {exc}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-8">
          {/* 7. Personal Travel Consultant Section */}
          <div className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-xl sticky top-28">
            <div className="flex flex-col items-center text-center space-y-4 mb-8">
              <div className="relative">
                <img 
                  src={DEFAULTS.FOUNDER_IMAGE} 
                  alt={DEFAULTS.OWNER} 
                  className="w-24 h-24 rounded-[28px] object-cover border-4 border-blue-50 shadow-lg" 
                />
                <div className="absolute -bottom-2 -right-2 bg-green-500 text-white p-1.5 rounded-full border-2 border-white">
                  <CheckCircle size={14} />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-black text-gray-900">{DEFAULTS.OWNER}</h3>
                <p className="text-xs font-black text-blue-800 uppercase tracking-widest">Lead Travel Consultant</p>
              </div>
              <p className="text-sm text-gray-500 font-medium">
                "I've personally curated this package for the best balance of luxury and local experience. Talk to me directly to customize this trip."
              </p>
            </div>

            <div className="space-y-3">
              <a 
                href={`tel:${DEFAULTS.PHONE}`}
                className="flex items-center justify-center gap-3 w-full bg-blue-800 text-white py-4 rounded-2xl font-black transition-all hover:bg-blue-900 shadow-lg"
              >
                <Phone size={18} /> Call Mahavir
              </a>
              <a 
                href={`https://wa.me/${DEFAULTS.WHATSAPP}?text=Hi Mahavir! I'm interested in the ${pkg.name} package.`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-3 w-full border-2 border-green-500 text-green-600 py-4 rounded-2xl font-black transition-all hover:bg-green-50"
              >
                <Share2 size={18} /> WhatsApp Chat
              </a>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-100 flex justify-center gap-8">
              <div className="text-center">
                <Award className="mx-auto text-orange-500 mb-2" size={24} />
                <span className="text-[10px] font-black uppercase text-gray-400">Certified</span>
              </div>
              <div className="text-center">
                <ShieldCheck className="mx-auto text-blue-800 mb-2" size={24} />
                <span className="text-[10px] font-black uppercase text-gray-400">Secure</span>
              </div>
              <div className="text-center">
                <Heart className="mx-auto text-pink-500 mb-2" size={24} />
                <span className="text-[10px] font-black uppercase text-gray-400">Loved</span>
              </div>
            </div>
          </div>
        </aside>
      </div>



    </div>
  );
};

