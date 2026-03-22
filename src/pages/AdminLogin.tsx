import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Lock, Eye, EyeOff, Compass, BarChart, Users, CalendarDays, ArrowLeft } from 'lucide-react';

// ✅ Change this to your own password
const ADMIN_PASSWORD = 'TravelGuru@2025';

interface Props {
    onLogin: () => void;
}

export const AdminLogin = ({ onLogin }: Props) => {
    const [password, setPassword] = useState('');
    const [showPw, setShowPw] = useState(false);
    const [error, setError] = useState('');
    const [shaking, setShaking] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            sessionStorage.setItem('tg_admin', '1');
            onLogin();
        } else {
            setError('Incorrect password');
            setShaking(true);
            setTimeout(() => setShaking(false), 600);
        }
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
                .fade-up-3 { animation: fadeUp 0.5s 0.2s ease both; }
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    20%, 60% { transform: translateX(-8px); }
                    40%, 80% { transform: translateX(8px); }
                }
                .animate-shake { animation: shake 0.5s ease; }
            `}</style>

            {/* Left Half - Branding (Hidden on Mobile) */}
            <div className="hidden lg:flex lg:w-1/2 bg-brand-blue relative overflow-hidden flex-col justify-between p-12 lg:p-16">
                <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-orange/20 rounded-full blur-3xl translate-y-1/3 translate-x-1/3"></div>

                <div className="relative z-10">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/10 backdrop-blur border border-white/20 mb-6">
                        <Compass size={24} className="text-brand-orange" />
                    </div>
                    <h1 className="text-white text-4xl lg:text-5xl font-bold leading-tight mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                        Admin Control Panel
                    </h1>
                    <p className="text-blue-100 text-lg max-w-md">Oversee operations, manage leads, and drive the business forward with powerful insights.</p>
                </div>

                <div className="relative z-10 space-y-4">
                    <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex items-center gap-4">
                        <div className="bg-brand-orange text-white p-3 rounded-xl"><BarChart size={20}/></div>
                        <div><h3 className="text-white font-bold">Analytics</h3><p className="text-blue-200 text-sm">Real-time performance metrics</p></div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex items-center gap-4">
                        <div className="bg-pink-500 text-white p-3 rounded-xl"><Users size={20}/></div>
                        <div><h3 className="text-white font-bold">Leads</h3><p className="text-blue-200 text-sm">Track and convert inquiries</p></div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex items-center gap-4">
                        <div className="bg-amber-500 text-white p-3 rounded-xl"><CalendarDays size={20}/></div>
                        <div><h3 className="text-white font-bold">Bookings</h3><p className="text-blue-200 text-sm">Manage trip itineraries effortlessly</p></div>
                    </div>
                </div>
            </div>

            {/* Right Half - Form */}
            <div className="w-full lg:w-1/2 bg-[#090e1a] relative flex flex-col pt-8 pb-12 px-6 lg:px-16 sm:justify-center overflow-y-auto">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,170,50,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,170,50,0.04) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
                </div>
                
                {/* Back Link */}
                <div className="relative z-10 mb-auto sm:mb-12">
                     <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-semibold w-fit">
                         <ArrowLeft size={16}/> Back to Website
                     </Link>
                </div>

                <div className={`relative z-10 w-full max-w-sm mx-auto ${shaking ? 'animate-shake' : ''}`}>
                    <div className="fade-up text-center mb-10 lg:hidden">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-orange/10 border border-brand-orange/20 mb-4">
                            <Compass size={28} className="text-brand-orange" />
                        </div>
                        <h1 className="text-white text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>The Travel's Guru</h1>
                        <p className="text-slate-500 text-xs mt-1 tracking-widest uppercase">Admin Portal</p>
                    </div>

                    <div className="fade-up-2 bg-white/[0.03] border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-2xl">
                        <h2 className="text-white text-xl font-bold mb-1">Welcome back</h2>
                        <p className="text-slate-400 text-sm mb-8">Enter your admin password to continue</p>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="relative">
                                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                                <input
                                    type={showPw ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => { setPassword(e.target.value); setError(''); }}
                                    placeholder="Password"
                                    className={`w-full bg-white/5 border ${error ? 'border-red-500/50' : 'border-white/10'} text-white placeholder-slate-500 rounded-2xl pl-11 pr-11 py-4 text-sm focus:outline-none focus:border-brand-orange/80 focus:bg-white/10 transition-all`}
                                    autoFocus
                                />
                                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors">
                                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                            {error && <p className="text-red-400 text-xs pl-1">{error}</p>}
                            <button type="submit" className="w-full btn-primary py-4 rounded-2xl mt-4 font-bold text-sm">
                                Enter Dashboard →
                            </button>
                        </form>
                    </div>
                </div>
                <div className="mt-auto"></div>
            </div>
        </div>
    );
};
