import React, { useState, useEffect, useCallback } from 'react';
import {
    Users, TrendingUp, XCircle, Percent, RefreshCw,
    LogOut, Search, ChevronLeft, ChevronRight,
    Globe, Smartphone, CheckCircle2, Clock, Compass,
    BarChart2, Filter, QrCode
} from 'lucide-react';
import { QRCodePage } from './QRCodePage';

const API = 'https://travel-crm-backend-uljm.onrender.com';
const PAGE_SIZE = 10;

interface Lead {
    id: number;
    name: string;
    phone: string;
    email: string;
    destination: string;
    source: string;
    lead_status: string;
    assigned_sales_person: string;
    payment_status: string;
    notes: string;
    number_of_person: number;
    travel_date: string;
    created_at: string;
}

interface Analytics {
    total: number;
    closedWon: number;
    closedLost: number;
    conversion: string;
    sourceBreakdown: { source: string; count: string }[];
}

interface Props {
    onLogout: () => void;
}

// ── tiny toast ────────────────────────────────────────────────────
let toastTimer: ReturnType<typeof setTimeout>;
function useToast() {
    const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);
    const show = (msg: string, ok = true) => {
        clearTimeout(toastTimer);
        setToast({ msg, ok });
        toastTimer = setTimeout(() => setToast(null), 2500);
    };
    return { toast, show };
}

// ── status colour map ─────────────────────────────────────────────
const statusColour: Record<string, string> = {
    'New': 'bg-blue-500/15 text-blue-300 border-blue-500/20',
    'Followup': 'bg-amber-500/15 text-amber-300 border-amber-500/20',
    'Closed Won': 'bg-emerald-500/15 text-emerald-300 border-emerald-500/20',
    'Closed Lost': 'bg-red-500/15 text-red-400 border-red-500/20',
};

const sourceIcon = (s: string) =>
    s?.startsWith('Website') ? <Globe size={11} /> : <Smartphone size={11} />;

export const AdminPanel = ({ onLogout }: Props) => {
    const [tab, setTab] = useState<'dashboard' | 'leads' | 'qr'>('dashboard');
    const [analytics, setAnalytics] = useState<Analytics | null>(null);
    const [leads, setLeads] = useState<Lead[]>([]);
    const [filtered, setFiltered] = useState<Lead[]>([]);
    const [search, setSearch] = useState('');
    const [statusF, setStatusF] = useState('All');
    const [sourceF, setSourceF] = useState('All');
    const [page, setPage] = useState(1);
    const [loadingLeads, setLoadingLeads] = useState(true);
    const [savingId, setSavingId] = useState<number | null>(null);
    const { toast, show } = useToast();

    // ── fetch ─────────────────────────────────────────────────────
    const fetchAll = useCallback(async () => {
        try {
            const [aRes, lRes] = await Promise.all([
                fetch(`${API}/analytics`),
                fetch(`${API}/leads`),
            ]);
            setAnalytics(await aRes.json());
            const data: Lead[] = await lRes.json();
            setLeads(data);
            setFiltered(data);
        } catch {
            show('Failed to load data', false);
        } finally {
            setLoadingLeads(false);
        }
    }, []);

    useEffect(() => { fetchAll(); }, [fetchAll]);

    // ── filter ────────────────────────────────────────────────────
    useEffect(() => {
        let d = [...leads];
        if (search) d = d.filter(l =>
            l.name?.toLowerCase().includes(search.toLowerCase()) ||
            l.phone?.includes(search) ||
            l.destination?.toLowerCase().includes(search.toLowerCase())
        );
        if (statusF !== 'All') d = d.filter(l => l.lead_status === statusF);
        if (sourceF !== 'All') d = d.filter(l => l.source === sourceF);
        setFiltered(d);
        setPage(1);
    }, [search, statusF, sourceF, leads]);

    const uniqueSources = ['All', ...Array.from(new Set(leads.map(l => l.source).filter(Boolean)))];

    // ── inline update ─────────────────────────────────────────────
    const handleChange = (lead: Lead, field: string, value: string) => {
        const updated = { ...lead, [field]: value };
        setLeads(prev => prev.map(l => l.id === lead.id ? updated : l));
    };

    const handleBlur = async (lead: Lead) => {
        setSavingId(lead.id);
        try {
            const res = await fetch(`${API}/leads/${lead.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    lead_status: lead.lead_status,
                    notes: lead.notes,
                    assigned_sales_person: lead.assigned_sales_person,
                    payment_status: lead.payment_status,
                }),
            });
            if (!res.ok) throw new Error();
            show('Saved ✓');
        } catch {
            show('Save failed', false);
        } finally {
            setSavingId(null);
        }
    };

    // ── pagination ────────────────────────────────────────────────
    const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
    const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    // ── source breakdown for chart ────────────────────────────────
    const breakdown = analytics?.sourceBreakdown ?? [];
    const maxCount = Math.max(...breakdown.map(b => Number(b.count)), 1);

    // ── KPI cards data ────────────────────────────────────────────
    const kpis = analytics ? [
        { label: 'Total Leads', value: analytics.total, icon: Users, color: 'text-blue-400', bg: 'bg-blue-500/10' },
        { label: 'Closed Won', value: analytics.closedWon, icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
        { label: 'Closed Lost', value: analytics.closedLost, icon: XCircle, color: 'text-red-400', bg: 'bg-red-500/10' },
        { label: 'Conversion', value: `${analytics.conversion}%`, icon: Percent, color: 'text-amber-400', bg: 'bg-amber-500/10' },
    ] : [];

    // ─────────────────────────────────────────────────────────────
    return (
        <div className="min-h-screen bg-[#090e1a] text-white"
            style={{ fontFamily: "'DM Sans', sans-serif" }}>

            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Playfair+Display:wght@700&display=swap');
        .admin-scroll::-webkit-scrollbar { width: 4px; height: 4px; }
        .admin-scroll::-webkit-scrollbar-track { background: transparent; }
        .admin-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
        select option { background: #0f1629; color: white; }
        @keyframes fadeIn { from { opacity:0; transform:translateY(6px);} to { opacity:1; transform:translateY(0);} }
        .fade-in { animation: fadeIn 0.3s ease both; }
      `}</style>

            {/* ── Top bar ── */}
            <header className="sticky top-0 z-40 bg-[#090e1a]/90 backdrop-blur-xl border-b border-white/[0.06] px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                        <Compass size={16} className="text-amber-400" />
                    </div>
                    <span className="font-bold text-white text-sm" style={{ fontFamily: "'Playfair Display', serif" }}>
                        TheTravelGuru
                    </span>
                    <span className="text-slate-600 text-xs ml-1">/ Admin</span>
                </div>

                <nav className="hidden sm:flex gap-1 bg-white/[0.04] p-1 rounded-xl border border-white/[0.06]">
                    {[
                        { id: 'dashboard', label: 'Dashboard', icon: BarChart2 },
                        { id: 'leads', label: 'Leads', icon: Users },
                        { id: 'qr', label: 'Share Form', icon: QrCode },
                    ].map(t => (
                        <button key={t.id}
                            onClick={() => setTab(t.id as any)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${tab === t.id
                                ? 'bg-white/10 text-white shadow'
                                : 'text-slate-500 hover:text-slate-300'
                                }`}>
                            <t.icon size={13} /> {t.label}
                        </button>
                    ))}
                </nav>

                <button onClick={onLogout}
                    className="flex items-center gap-2 text-slate-500 hover:text-red-400 transition-colors text-xs font-medium px-3 py-2 rounded-xl hover:bg-red-500/5">
                    <LogOut size={14} /> Logout
                </button>
            </header>

            {/* ── Toast ── */}
            {toast && (
                <div className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl text-sm font-semibold shadow-2xl fade-in ${toast.ok ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'
                    }`}>
                    {toast.msg}
                </div>
            )}

            <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">

                {/* ════════════════════════════════════════
            DASHBOARD TAB
        ════════════════════════════════════════ */}
                {tab === 'dashboard' && (
                    <div className="fade-in space-y-8">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                                    Overview
                                </h2>
                                <p className="text-slate-500 text-sm mt-0.5">All leads across every channel</p>
                            </div>
                            <button onClick={fetchAll}
                                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-slate-400 hover:text-white text-xs font-medium transition-all hover:bg-white/[0.07]">
                                <RefreshCw size={13} /> Refresh
                            </button>
                        </div>

                        {/* KPI cards */}
                        {analytics ? (
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                {kpis.map((k, i) => (
                                    <div key={i}
                                        className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-5 hover:bg-white/[0.05] transition-all">
                                        <div className={`w-9 h-9 rounded-xl ${k.bg} flex items-center justify-center mb-4`}>
                                            <k.icon size={16} className={k.color} />
                                        </div>
                                        <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">{k.label}</p>
                                        <p className={`text-3xl font-bold mt-1 ${k.color}`}>{k.value}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                {[...Array(4)].map((_, i) => (
                                    <div key={i} className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-5 h-32 animate-pulse" />
                                ))}
                            </div>
                        )}

                        {/* Source Breakdown */}
                        <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6">
                            <div className="flex items-center gap-2 mb-6">
                                <Globe size={16} className="text-amber-400" />
                                <h3 className="font-semibold text-sm">Lead Sources</h3>
                                <span className="ml-auto text-slate-600 text-xs">Where your leads come from</span>
                            </div>

                            {breakdown.length === 0 ? (
                                <p className="text-slate-600 text-sm text-center py-8">No data yet</p>
                            ) : (
                                <div className="space-y-4">
                                    {breakdown.map((b, i) => {
                                        const pct = Math.round((Number(b.count) / maxCount) * 100);
                                        const isWebsite = b.source?.startsWith('Website');
                                        return (
                                            <div key={i} className="space-y-2">
                                                <div className="flex items-center justify-between text-xs">
                                                    <div className="flex items-center gap-2">
                                                        <span className={`p-1 rounded ${isWebsite ? 'bg-blue-500/15 text-blue-400' : 'bg-green-500/15 text-green-400'}`}>
                                                            {sourceIcon(b.source)}
                                                        </span>
                                                        <span className="text-slate-300 font-medium">{b.source || 'Unknown'}</span>
                                                    </div>
                                                    <span className="text-slate-400 font-bold">{b.count}</span>
                                                </div>
                                                <div className="h-2 bg-white/[0.05] rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full rounded-full transition-all duration-700 ${isWebsite ? 'bg-blue-500' : 'bg-emerald-500'}`}
                                                        style={{ width: `${pct}%` }}
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        {/* Recent leads preview */}
                        <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-semibold text-sm flex items-center gap-2">
                                    <Clock size={14} className="text-amber-400" /> Recent Leads
                                </h3>
                                <button onClick={() => setTab('leads')}
                                    className="text-amber-400 text-xs font-semibold hover:text-amber-300 transition-colors">
                                    View all →
                                </button>
                            </div>
                            <div className="space-y-2">
                                {leads.slice(0, 5).map(lead => (
                                    <div key={lead.id}
                                        className="flex items-center justify-between py-2 border-b border-white/[0.04] last:border-0">
                                        <div className="flex items-center gap-3">
                                            <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-xs font-bold text-slate-400">
                                                {(lead.name || '?')[0].toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="text-xs font-semibold text-white">{lead.name || 'Unknown'}</p>
                                                <p className="text-[10px] text-slate-600">{lead.phone}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] text-slate-500">{lead.destination || '—'}</span>
                                            <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${statusColour[lead.lead_status] || 'bg-white/5 text-slate-400 border-white/10'}`}>
                                                {lead.lead_status || 'New'}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* ════════════════════════════════════════
            LEADS TAB
        ════════════════════════════════════════ */}
                {tab === 'leads' && (
                    <div className="fade-in space-y-6">
                        <div className="flex items-center justify-between flex-wrap gap-3">
                            <div>
                                <h2 className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                                    All Leads
                                </h2>
                                <p className="text-slate-500 text-sm mt-0.5">{filtered.length} lead{filtered.length !== 1 ? 's' : ''} found</p>
                            </div>
                            <button onClick={fetchAll}
                                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-slate-400 hover:text-white text-xs font-medium transition-all">
                                <RefreshCw size={13} /> Refresh
                            </button>
                        </div>

                        {/* Filters */}
                        <div className="flex flex-wrap gap-3">
                            <div className="relative flex-1 min-w-[200px]">
                                <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                                <input
                                    type="text"
                                    placeholder="Search name, phone, destination…"
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                    className="w-full bg-white/[0.04] border border-white/[0.08] text-white placeholder-slate-600 
                    rounded-xl pl-8 pr-4 py-2.5 text-xs focus:outline-none focus:border-amber-500/40 transition-all"
                                />
                            </div>

                            <select value={statusF} onChange={e => setStatusF(e.target.value)}
                                className="bg-white/[0.04] border border-white/[0.08] text-slate-300 rounded-xl px-3 py-2.5 text-xs focus:outline-none">
                                <option>All</option>
                                <option>New</option>
                                <option>Followup</option>
                                <option>Closed Won</option>
                                <option>Closed Lost</option>
                            </select>

                            <select value={sourceF} onChange={e => setSourceF(e.target.value)}
                                className="bg-white/[0.04] border border-white/[0.08] text-slate-300 rounded-xl px-3 py-2.5 text-xs focus:outline-none">
                                {uniqueSources.map(s => <option key={s}>{s}</option>)}
                            </select>
                        </div>

                        {/* Table */}
                        {loadingLeads ? (
                            <div className="text-center py-16 text-slate-600 text-sm">Loading leads…</div>
                        ) : (
                            <div className="admin-scroll overflow-x-auto bg-white/[0.02] border border-white/[0.07] rounded-2xl">
                                <table className="min-w-full text-xs">
                                    <thead>
                                        <tr className="border-b border-white/[0.06]">
                                            {['Name / Phone', 'Destination', 'Source', 'Status', 'Sales Person', 'Payment', 'Notes'].map(h => (
                                                <th key={h} className="px-4 py-3 text-left text-[10px] uppercase tracking-wider text-slate-600 font-semibold whitespace-nowrap">
                                                    {h}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {paginated.map(lead => (
                                            <tr key={lead.id}
                                                className={`border-b border-white/[0.04] hover:bg-white/[0.03] transition-colors ${savingId === lead.id ? 'opacity-60' : ''}`}>

                                                {/* Name / Phone */}
                                                <td className="px-4 py-3">
                                                    <p className="font-semibold text-white">{lead.name || '—'}</p>
                                                    <p className="text-slate-500 mt-0.5">{lead.phone}</p>
                                                </td>

                                                {/* Destination */}
                                                <td className="px-4 py-3 text-slate-400">{lead.destination || '—'}</td>

                                                {/* Source */}
                                                <td className="px-4 py-3">
                                                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-medium border ${lead.source?.startsWith('Website')
                                                        ? 'bg-blue-500/10 text-blue-300 border-blue-500/15'
                                                        : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/15'
                                                        }`}>
                                                        {sourceIcon(lead.source)}
                                                        {lead.source || '—'}
                                                    </span>
                                                </td>

                                                {/* Status */}
                                                <td className="px-4 py-3">
                                                    <select
                                                        value={lead.lead_status || 'New'}
                                                        onChange={e => handleChange(lead, 'lead_status', e.target.value)}
                                                        onBlur={() => handleBlur(lead)}
                                                        className={`text-[11px] font-semibold px-2 py-1.5 rounded-xl border bg-transparent cursor-pointer focus:outline-none ${statusColour[lead.lead_status] || 'bg-white/5 text-slate-400 border-white/10'}`}
                                                    >
                                                        <option>New</option>
                                                        <option>Followup</option>
                                                        <option>Closed Won</option>
                                                        <option>Closed Lost</option>
                                                    </select>
                                                </td>

                                                {/* Sales Person */}
                                                <td className="px-4 py-3">
                                                    <input
                                                        type="text"
                                                        value={lead.assigned_sales_person || ''}
                                                        onChange={e => handleChange(lead, 'assigned_sales_person', e.target.value)}
                                                        onBlur={() => handleBlur(lead)}
                                                        placeholder="Assign…"
                                                        className="bg-white/[0.04] border border-white/[0.08] text-white placeholder-slate-700 
                              rounded-lg px-2 py-1.5 text-[11px] focus:outline-none focus:border-amber-500/30 w-28 transition-all"
                                                    />
                                                </td>

                                                {/* Payment */}
                                                <td className="px-4 py-3">
                                                    <select
                                                        value={lead.payment_status || ''}
                                                        onChange={e => handleChange(lead, 'payment_status', e.target.value)}
                                                        onBlur={() => handleBlur(lead)}
                                                        className="bg-white/[0.04] border border-white/[0.08] text-slate-300 rounded-lg px-2 py-1.5 text-[11px] focus:outline-none"
                                                    >
                                                        <option value="">—</option>
                                                        <option>Unpaid</option>
                                                        <option>Partial</option>
                                                        <option>Paid</option>
                                                    </select>
                                                </td>

                                                {/* Notes */}
                                                <td className="px-4 py-3">
                                                    <input
                                                        type="text"
                                                        value={lead.notes || ''}
                                                        onChange={e => handleChange(lead, 'notes', e.target.value)}
                                                        onBlur={() => handleBlur(lead)}
                                                        placeholder="Add note…"
                                                        className="bg-white/[0.04] border border-white/[0.08] text-white placeholder-slate-700 
                              rounded-lg px-2 py-1.5 text-[11px] focus:outline-none focus:border-amber-500/30 w-40 transition-all"
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                        {paginated.length === 0 && (
                                            <tr>
                                                <td colSpan={7} className="text-center py-12 text-slate-600 text-sm">
                                                    No leads match your filters.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-between">
                                <button disabled={page === 1} onClick={() => setPage(p => p - 1)}
                                    className="flex items-center gap-1 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-slate-400 hover:text-white text-xs disabled:opacity-30 transition-all">
                                    <ChevronLeft size={13} /> Prev
                                </button>
                                <span className="text-slate-600 text-xs">Page {page} of {totalPages}</span>
                                <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)}
                                    className="flex items-center gap-1 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-slate-400 hover:text-white text-xs disabled:opacity-30 transition-all">
                                    Next <ChevronRight size={13} />
                                </button>
                            </div>
                        )}
                    </div>
                )}
                {/* ════════════════════════════════════════
            QR / SHARE FORM TAB
        ════════════════════════════════════════ */}
                {tab === 'qr' && (
                    <div className="fade-in">
                        <QRCodePage />
                    </div>
                )}

            </main>
        </div>
    );
};
