import React, { useState } from 'react';
import { Copy, Check, ExternalLink, Download, Smartphone } from 'lucide-react';

// ✅ Change this to your real deployed website URL after deployment
// For now it works locally too
const DEPLOYED_URL = 'https://your-website.vercel.app'; // ← update after deploy

export const QRCodePage = () => {
    const formUrl = `${DEPLOYED_URL}/#/inquiry`;
    const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=280x280&margin=12&color=1e293b&bgcolor=ffffff&data=${encodeURIComponent(formUrl)}`;

    const [copied, setCopied] = useState(false);

    const copyLink = () => {
        navigator.clipboard.writeText(formUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const downloadQR = () => {
        const link = document.createElement('a');
        link.href = `${qrImageUrl}&format=png`;
        link.download = 'thetravelguru-inquiry-qr.png';
        link.click();
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Shareable Form Link
                </h2>
                <p className="text-slate-500 text-sm mt-0.5">
                    Share this link or QR code with customers — it opens the full inquiry form directly.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* ── QR Code card ── */}
                <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6 flex flex-col items-center gap-5">
                    <div className="bg-white p-3 rounded-2xl shadow-xl">
                        <img
                            src={qrImageUrl}
                            alt="QR Code for inquiry form"
                            className="w-48 h-48 rounded-xl"
                        />
                    </div>
                    <div className="text-center">
                        <p className="text-white text-sm font-semibold">Scan to open enquiry form</p>
                        <p className="text-slate-500 text-xs mt-1">Works on any phone camera</p>
                    </div>
                    <button onClick={downloadQR}
                        className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-xs rounded-xl transition-all shadow-lg shadow-amber-500/20">
                        <Download size={13} /> Download QR (PNG)
                    </button>
                </div>

                {/* ── Link + instructions ── */}
                <div className="space-y-4">

                    {/* Copy link */}
                    <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-5">
                        <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-3">Form Link</p>
                        <div className="flex items-center gap-2 bg-white/[0.05] border border-white/[0.08] rounded-xl px-3 py-2.5">
                            <p className="text-slate-300 text-xs flex-1 truncate font-mono">{formUrl}</p>
                            <button onClick={copyLink}
                                className={`shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${copied
                                    ? 'bg-emerald-500/20 text-emerald-400'
                                    : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                                    }`}>
                                {copied ? <><Check size={12} /> Copied!</> : <><Copy size={12} /> Copy</>}
                            </button>
                        </div>
                        <a href={formUrl} target="_blank" rel="noreferrer"
                            className="mt-3 flex items-center gap-1.5 text-amber-400 hover:text-amber-300 text-xs font-medium transition-colors">
                            <ExternalLink size={12} /> Open form in new tab
                        </a>
                    </div>

                    {/* How to share */}
                    <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-5 space-y-3">
                        <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">
                            <Smartphone size={11} className="inline mr-1" />
                            How to share with customers
                        </p>
                        {[
                            { icon: '💬', label: 'WhatsApp', text: 'Paste the link in WhatsApp — customers tap to open directly' },
                            { icon: '📸', label: 'Print QR', text: 'Download QR → print on brochures, visiting cards, standees' },
                            { icon: '📧', label: 'Email', text: 'Add the link to your email signature or newsletter' },
                            { icon: '📱', label: 'Instagram', text: 'Add link in bio → "Plan Your Trip" button' },
                        ].map(item => (
                            <div key={item.label} className="flex items-start gap-3">
                                <span className="text-base shrink-0">{item.icon}</span>
                                <div>
                                    <p className="text-white text-xs font-semibold">{item.label}</p>
                                    <p className="text-slate-500 text-[11px] mt-0.5">{item.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Deploy note */}
                    <div className="bg-amber-500/5 border border-amber-500/15 rounded-2xl p-4">
                        <p className="text-amber-400 text-xs font-bold mb-1">⚠️ Before sharing</p>
                        <p className="text-slate-500 text-[11px] leading-relaxed">
                            Update <code className="text-amber-400 text-[10px] bg-white/5 px-1 py-0.5 rounded">DEPLOYED_URL</code> in{' '}
                            <code className="text-amber-400 text-[10px] bg-white/5 px-1 py-0.5 rounded">pages/QRCodePage.tsx</code>{' '}
                            with your real Vercel URL after deployment. The QR code will auto-update.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
