
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Award, Users, MapPin, Target, ShieldCheck, Heart, Clock, Phone, Zap, Lock, Code } from 'lucide-react';
import { motion } from 'framer-motion';
import { DEFAULTS } from '../data';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export const About = () => {


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen overflow-x-hidden">
      {/* 1. Hero Section */}
      <section className="bg-slate-900 text-white w-full max-w-7xl mx-auto px-4 sm:px-6 py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-40 mix-blend-overlay">
          <img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80" className="w-full h-full object-cover" alt="About Hero" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-slate-900/50"></div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative z-10 space-y-6 text-center md:text-left pt-12"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border border-white/20 mb-4 text-white">
            Discover Our Legacy
          </motion.div>
          <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight drop-shadow-2xl">
            Driven by <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-yellow-400">Passion & Trust</span>
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-slate-200 max-w-2xl text-xl md:text-2xl leading-relaxed font-medium">
            At {DEFAULTS.COMPANY_NAME}, we don't just sell tours. We craft experiences that last a lifetime, led by the vision of {DEFAULTS.OWNER}.
          </motion.p>
        </motion.div>
      </section>

      {/* 2. Story Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-24 md:py-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
      >
        <motion.div variants={fadeInUp} className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Our <span className="text-brand-blue">Story</span></h2>
            <div className="h-2 w-24 bg-brand-orange rounded-full"></div>
          </div>
          <p className="text-slate-600 leading-relaxed text-lg font-medium">
            {DEFAULTS.COMPANY_NAME} began with a simple mission: to make world-class travel accessible and transparent for every local traveler. Founded by {DEFAULTS.OWNER}, a travel enthusiast with years of industry experience, we've grown from a small local agency to a trusted name in personalized tours.
          </p>
          <p className="text-slate-600 leading-relaxed text-lg font-medium">
            We believe that every journey should be as unique as the traveler themselves. That's why we focus on customization, transparency, and human connections over automated bookings.
          </p>
          {/* Key Metrics */}
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 gap-4 md:gap-8 pt-6">
            <div className="bg-white p-4 md:p-6 rounded-3xl shadow-lg border border-slate-100 flex flex-col items-center justify-center text-center">
              <div className="text-4xl md:text-5xl font-black text-brand-blue mb-1 md:mb-2">8+</div>
              <div className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest">Years of Service</div>
            </div>
            <div className="bg-white p-4 md:p-6 rounded-3xl shadow-lg border border-slate-100 flex flex-col items-center justify-center text-center">
              <div className="text-4xl md:text-5xl font-black text-brand-blue mb-1 md:mb-2">1.5K+</div>
              <div className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest">Happy Travelers</div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={fadeInUp} className="relative group perspective-[1000px]">
          <div className="transform-gpu preserve-3d transition-transform duration-700 group-hover:rotate-y-12 group-hover:rotate-x-6">
            <img src="/owner.png" className="rounded-[40px] shadow-2xl" alt="Team" />
          </div>
          <div className="absolute -bottom-10 -left-10 lg:-left-20 bg-white/90 backdrop-blur-xl p-8 rounded-[32px] shadow-2xl border border-white hidden md:block max-w-sm animate-float group-hover:scale-105 transition-transform duration-500 z-10">
            <h4 className="font-black text-slate-900 mb-3 italic text-xl">"Your trust is our greatest asset."</h4>
            <p className="text-sm font-black text-brand-blue uppercase tracking-widest">— {DEFAULTS.OWNER}</p>
          </div>
        </motion.div>
      </motion.section>

      {/* 3. Meet the Founder */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-24"
      >
        <div className="space-y-20">
          {/* Founder Card */}
          <div className="bg-white rounded-[48px] p-8 md:p-16 lg:p-20 shadow-2xl border border-slate-100 flex flex-col lg:flex-row gap-12 lg:gap-16 items-center relative overflow-visible">
            <div className="absolute top-0 right-0 w-full h-full bg-brand-blue/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 z-0"></div>

            <div className="w-full lg:w-5/12 shrink-0 relative z-20">
              <div className="relative group mx-auto max-w-sm lg:max-w-none">
                <img
                  src="/Mahavir.jpeg"
                  className="w-full aspect-square md:aspect-[4/5] lg:h-[500px] object-cover rounded-[40px] shadow-2xl transition-transform duration-700 group-hover:scale-105 bg-slate-100"
                  alt="Mahavir Mahirrao"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80';
                  }}
                />
                <div className="absolute -bottom-6 0 left-4 md:left-8 bg-[#1f3bb3] text-white py-4 px-6 md:p-6 rounded-[20px] md:rounded-3xl shadow-2xl border border-white/20 z-30 transition-transform duration-500 group-hover:-translate-y-2">
                  <span className="block text-[10px] md:text-xs font-black uppercase text-brand-orange tracking-widest mb-1 shadow-sm">Founder & CEO</span>
                  <span className="text-xl md:text-2xl font-black tracking-tight drop-shadow-md">Mahavir Mahirrao</span>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-7/12 space-y-8 relative z-10 pt-8 lg:pt-0">
              <h2 className="text-4xl md:text-5xl lg:text-5xl font-black text-slate-900 leading-tight tracking-tight">Visionary Behind <br /><span className="text-[#1f3bb3]">Your Dream Journey</span></h2>
              <div className="bg-slate-50 p-6 md:p-8 rounded-[24px] border border-slate-100 border-l-4 border-l-brand-orange relative z-10">
                <p className="text-slate-500 leading-relaxed text-lg md:text-xl italic font-medium">
                  "I started The Travel's Guru because I saw a gap in the market — people wanted expert advice without the hidden fees and corporate bureaucracy. My commitment is to provide you with a travel experience that I would personally take my own family on."
                </p>
              </div>
              <div className="space-y-5 pt-2">
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-br from-brand-orange to-red-500 text-white p-2.5 rounded-2xl shadow-lg shadow-brand-orange/20"><Target size={20} className="md:w-6 md:h-6" /></div>
                  <span className="font-bold text-slate-800 text-base md:text-lg">Committed to 100% Price Transparency</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-[#1f3bb3] text-white p-2.5 rounded-2xl shadow-lg shadow-blue-900/20"><Award size={20} className="md:w-6 md:h-6" /></div>
                  <span className="font-bold text-slate-800 text-base md:text-lg">Certified International Travel Expert</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-pink-500 text-white p-2.5 rounded-2xl shadow-lg shadow-pink-500/20"><Heart size={20} className="md:w-6 md:h-6" /></div>
                  <span className="font-bold text-slate-800 text-base md:text-lg">Dedicated Personal Support 24/7</span>
                </div>
              </div>
            </div>
          </div>

          {/* CTO Card */}
          <div className="bg-white rounded-[48px] p-8 md:p-16 lg:p-20 shadow-2xl border border-slate-100 flex flex-col lg:flex-row-reverse gap-12 lg:gap-16 items-center relative overflow-visible">
            <div className="absolute top-0 left-0 w-full h-full bg-brand-orange/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/3 z-0"></div>

            <div className="w-full lg:w-5/12 shrink-0 relative z-20">
              <div className="relative group mx-auto max-w-sm lg:max-w-none">
                <img
                  src="/Chiranjeev.png"
                  className="w-full aspect-square md:aspect-[4/5] lg:h-[500px] object-cover object-top rounded-[40px] shadow-2xl transition-transform duration-700 group-hover:scale-105 bg-slate-100"
                  alt="Chiranjeev Parihar"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80';
                  }}
                />
                <div className="absolute -bottom-6 right-4 md:right-8 bg-[#1f3bb3] text-white py-4 px-6 md:p-6 rounded-[20px] md:rounded-3xl shadow-2xl border border-white/20 z-30 transition-transform duration-500 group-hover:-translate-y-2">
                  <span className="block text-[10px] md:text-xs font-black uppercase text-brand-orange tracking-widest mb-1 shadow-sm">Chief Technology Officer</span>
                  <span className="text-xl md:text-2xl font-black tracking-tight drop-shadow-md">Chiranjeev Parihar</span>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-7/12 space-y-8 relative z-10 pt-8 lg:pt-0">
              <h2 className="text-4xl md:text-5xl lg:text-5xl font-black text-slate-900 leading-tight tracking-tight">Architect Behind <br /><span className="text-[#1f3bb3]">Our Technology</span></h2>
              <div className="bg-slate-50 p-6 md:p-8 rounded-[24px] border border-slate-100 border-r-4 border-r-brand-orange relative z-10 text-right">
                <p className="text-slate-500 leading-relaxed text-lg md:text-xl italic font-medium">
                  "We leverage cutting-edge technology to ensure your travel planning is as seamless as the journey itself. My goal is to build secure, intuitive platforms that put the entire world at your fingertips with zero friction."
                </p>
              </div>
              <div className="space-y-5 pt-2">
                <div className="flex items-center gap-4 lg:justify-end">
                  <span className="font-bold text-slate-800 text-base md:text-lg">Seamless Digital Experience</span>
                  <div className="bg-gradient-to-br from-brand-orange to-red-500 text-white p-2.5 rounded-2xl shadow-lg shadow-brand-orange/20 order-first lg:order-last"><Zap size={20} className="md:w-6 md:h-6" /></div>
                </div>
                <div className="flex items-center gap-4 lg:justify-end">
                  <span className="font-bold text-slate-800 text-base md:text-lg">Secure Booking Platform</span>
                  <div className="bg-[#1f3bb3] text-white p-2.5 rounded-2xl shadow-lg shadow-blue-900/20 order-first lg:order-last"><Lock size={20} className="md:w-6 md:h-6" /></div>
                </div>
                <div className="flex items-center gap-4 lg:justify-end">
                  <span className="font-bold text-slate-800 text-base md:text-lg">Innovative Travel Solutions</span>
                  <div className="bg-pink-500 text-white p-2.5 rounded-2xl shadow-lg shadow-pink-500/20 order-first lg:order-last"><Code size={20} className="md:w-6 md:h-6" /></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 4. Office Location Removed */}
    </div>
  );
};
