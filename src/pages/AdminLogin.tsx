import React, { useState } from 'react';
import { Lock, Eye, EyeOff, Compass } from 'lucide-react';

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
        <div className="min-h-screen bg-[#090e1a] flex items-center justify-center px-4"
            style={{ fontFamily: "'DM Sans', sans-serif" }}>

            {/* Background grid */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-0"
                    style={{
                        backgroundImage: 'linear-gradient(rgba(255,170,50,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,170,50,0.04) 1px, transparent 1px)',
                        backgroundSize: '60px 60px',
                    }} />
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-800/10 rounded-full blur-3xl" />
            </div>

            <div className={`relative w-full max-w-sm ${shaking ? 'animate-shake' : ''}`}
                style={{ animation: shaking ? 'shake 0.5s ease' : undefined }}>

                <style>{`
          @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Playfair+Display:wght@700&display=swap');
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            20%, 60% { transform: translateX(-8px); }
            40%, 80% { transform: translateX(8px); }
          }
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(20px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          .fade-up { animation: fadeUp 0.5s ease forwards; }
          .fade-up-2 { animation: fadeUp 0.5s 0.1s ease both; }
          .fade-up-3 { animation: fadeUp 0.5s 0.2s ease both; }
        `}</style>

                {/* Logo */}
                <div className="fade-up text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 mb-4">
                        <Compass size={28} className="text-amber-400" />
                    </div>
                    <h1 className="text-white text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                        TheTravelGuru
                    </h1>
                    <p className="text-slate-500 text-sm mt-1 tracking-widest uppercase text-xs">Admin Portal</p>
                </div>

                {/* Card */}
                <div className="fade-up-2 bg-white/[0.03] border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-2xl">
                    <h2 className="text-white text-lg font-semibold mb-1">Welcome back</h2>
                    <p className="text-slate-500 text-sm mb-8">Enter your admin password to continue</p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="relative">
                            <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                            <input
                                type={showPw ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                                placeholder="Password"
                                className={`w-full bg-white/5 border ${error ? 'border-red-500/50' : 'border-white/10'} 
                  text-white placeholder-slate-600 rounded-2xl pl-10 pr-10 py-4 text-sm 
                  focus:outline-none focus:border-amber-500/50 focus:bg-white/8 transition-all`}
                                autoFocus
                            />
                            <button type="button" onClick={() => setShowPw(!showPw)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors">
                                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>

                        {error && (
                            <p className="text-red-400 text-xs pl-1">{error}</p>
                        )}

                        <button type="submit"
                            className="w-full bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold py-4 rounded-2xl 
                transition-all text-sm tracking-wide shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30">
                            Enter Dashboard →
                        </button>
                    </form>
                </div>

                <p className="fade-up-3 text-center text-slate-700 text-xs mt-6">
                    This area is not publicly accessible
                </p>
            </div>
        </div>
    );
};
