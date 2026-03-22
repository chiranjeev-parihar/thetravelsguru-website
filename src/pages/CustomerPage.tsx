import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Lock, Eye, EyeOff, Compass, ArrowLeft, Map, CalendarDays, Heart, Mail } from 'lucide-react';

export const CustomerPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPw, setShowPw] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Customer Portal: Under Development');
    };

    return (
        <div className="min-h-screen flex" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Playfair+Display:wght@700&display=swap');
                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                .fade-up { animation: fadeUp 0.5s ease forwards; }
                .fade-up-2 { animation: fadeUp 0.5s 0.1s ease both; }
            `}</style>
            
            {/* Left Half - Branding (Hidden on Mobile) */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-brand-orange to-red-600 relative overflow-hidden flex-col justify-between p-12 lg:p-16">
                <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2"></div>
                
                <div className="relative z-10 flex items-start justify-between">
                     <div>
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/10 backdrop-blur border border-white/20 mb-6">
                            <Compass size={24} className="text-white" />
                        </div>
                        <h1 className="text-white text-4xl lg:text-5xl font-bold leading-tight mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                            Your Travel Dashboard
                        </h1>
                        <p className="text-red-100 text-lg max-w-md">Access your itineraries, manage bookings, and dream up your next adventure.</p>
                     </div>
                     <span className="bg-white/20 backdrop-blur border border-white/30 text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full hidden xl:block">
                        Coming Soon Q2 2026
                     </span>
                </div>

                <div className="relative z-10 space-y-4">
                    <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex items-center gap-4">
                        <div className="bg-brand-blue text-white p-3 rounded-xl"><Map size={20}/></div>
                        <div><h3 className="text-white font-bold">My Trips</h3><p className="text-red-100 text-sm">View customized itineraries</p></div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex items-center gap-4">
                        <div className="bg-blue-500 text-white p-3 rounded-xl"><CalendarDays size={20}/></div>
                        <div><h3 className="text-white font-bold">Bookings</h3><p className="text-red-100 text-sm">Manage payment and schedules</p></div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex items-center gap-4">
                        <div className="bg-pink-500 text-white p-3 rounded-xl"><Heart size={20}/></div>
                        <div><h3 className="text-white font-bold">Wishlist</h3><p className="text-red-100 text-sm">Save your dream destinations</p></div>
                    </div>
                </div>
            </div>

            {/* Right Half - Form */}
            <div className="w-full lg:w-1/2 bg-slate-50 relative flex flex-col pt-8 pb-12 px-6 lg:px-16 sm:justify-center overflow-y-auto">
                <div className="relative z-10 mb-auto sm:mb-12">
                     <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-brand-orange transition-colors text-sm font-bold w-fit">
                         <ArrowLeft size={16}/> Back to Website
                     </Link>
                </div>
                
                <div className="relative z-10 w-full max-w-sm mx-auto">
                    <div className="fade-up text-center mb-10 lg:hidden">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-orange/10 border border-brand-orange/20 mb-4">
                            <Compass size={28} className="text-brand-orange" />
                        </div>
                        <h1 className="text-slate-900 text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>The Travel's Guru</h1>
                        <p className="text-slate-500 text-xs mt-1 tracking-widest uppercase">Customer Portal</p>
                        <span className="inline-block mt-3 bg-brand-orange/10 text-brand-orange text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                           Coming Soon Q2 2026
                        </span>
                    </div>

                    <div className="fade-up-2 bg-white border border-slate-100 rounded-3xl p-8 shadow-2xl">
                        <h2 className="text-slate-900 text-xl font-bold mb-1">Customer Login</h2>
                        <p className="text-slate-500 text-sm mb-8">Enter your details to access your dashboard.</p>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="relative">
                                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email Address"
                                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 rounded-2xl pl-11 pr-4 py-4 text-sm focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all"
                                    required
                                />
                            </div>
                            <div className="relative">
                                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    type={showPw ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password"
                                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 rounded-2xl pl-11 pr-11 py-4 text-sm focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all"
                                    required
                                />
                                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                            <button type="submit" className="w-full btn-primary py-4 mt-2 font-bold text-sm">
                                Sign In →
                            </button>
                        </form>
                    </div>
                </div>
                <div className="mt-auto"></div>
            </div>
        </div>
    );
};
