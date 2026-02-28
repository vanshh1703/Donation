import React, { useState, useEffect } from 'react';
import './community.css';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import {
    Lightbulb, Heart, Users, Globe, BookOpen, Droplets,
    ShieldAlert, Leaf, ArrowRight, CheckCircle2, Info,
    FileText, Phone, Mail, User, Sparkles, TrendingUp,
    ChevronLeft, Send, Lock
} from 'lucide-react';

/* ── Category options ────────────────────────────────────────── */
const CATEGORIES = [
    { label: 'Education', icon: <BookOpen size={14} />, id: 'education' },
    { label: 'Healthcare', icon: <Heart size={14} />, id: 'healthcare' },
    { label: 'Clean Water', icon: <Droplets size={14} />, id: 'water' },
    { label: 'Environment', icon: <Leaf size={14} />, id: 'environment' },
    { label: 'Disaster Relief', icon: <ShieldAlert size={14} />, id: 'disaster' },
    { label: 'Animal Welfare', icon: <Globe size={14} />, id: 'animals' },
    { label: 'Community Dev', icon: <Users size={14} />, id: 'community' },
    { label: 'Other', icon: <Sparkles size={14} />, id: 'other' },
];

const URGENCY = ['Critical — Lives at immediate risk', 'High — Needs attention within weeks', 'Moderate — Ongoing issue'];

const SIDE_STATS = [
    { icon: <Lightbulb size={20} />, color: 'rgba(245,158,11,0.15)', iconColor: '#f59e0b', val: '127', label: 'Causes Suggested' },
    { icon: <CheckCircle2 size={20} />, color: 'rgba(20,184,166,0.15)', iconColor: '#14b8a6', val: '38', label: 'Approved & Live' },
    { icon: <Users size={20} />, color: 'rgba(99,102,241,0.15)', iconColor: '#8b5cf6', val: '4,200+', label: 'Lives Impacted' },
];

const APPROVED = [
    { title: 'Braille Kits for Blind Schools', category: 'Education', loc: 'Rajasthan', raised: '₹8.2L / ₹10L' },
    { title: 'Rainwater Harvesting — Tribal Villages', category: 'Clean Water', loc: 'Odisha', raised: '₹14.5L / ₹20L' },
    { title: 'Mobile Vet Clinics — Hill Districts', category: 'Animal Welfare', loc: 'Uttarakhand', raised: '₹4.8L / ₹6L' },
];

/* ── Suggest a Cause page ────────────────────────────────────── */
export default function SuggestCause() {
    const [form, setForm] = useState({ name: '', email: '', phone: '', title: '', category: '', urgency: '', location: '', desc: '', impact: '', org: '', orgLink: '' });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const refId = `SC-${Date.now().toString(36).toUpperCase()}`;

    useEffect(() => { window.scrollTo(0, 0); }, []);

    const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

    const validate = () => {
        if (!form.name.trim()) return 'Full name is required.';
        if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) return 'A valid email is required.';
        if (!form.title.trim()) return 'Cause title is required.';
        if (!form.category) return 'Please select a category.';
        if (!form.urgency) return 'Please select urgency level.';
        if (!form.location.trim()) return 'Affected location is required.';
        if (form.desc.length < 80) return 'Description must be at least 80 characters.';
        return '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const err = validate();
        if (err) { setError(err); return; }
        setError('');
        setLoading(true);
        await new Promise(r => setTimeout(r, 1800));
        setLoading(false);
        setSubmitted(true);
    };

    return (
        <div className="cf-page">
            <Header />

            {/* Hero */}
            <section className="cf-hero suggest">
                <div className="cf-hero-glow cf-hero-glow-1" />
                <div className="cf-hero-glow cf-hero-glow-2" />
                <div className="cf-hero-content">
                    <div className="cf-hero-badge"><Lightbulb size={13} /> Suggest a Cause</div>
                    <h1 className="cf-hero-h1">
                        You see the need — <span className="cf-hero-accent">we'll fund it</span>
                    </h1>
                    <p className="cf-hero-p">
                        Have you witnessed an urgent social issue that deserves attention? Submit it here. Our Scrutiny Committee reviews every suggestion and the best ones become live missions in 14 days.
                    </p>
                    <Link to="/categories" className="cf-hero-badge" style={{ textDecoration: 'none', marginBottom: 0 }}>
                        View live missions <ArrowRight size={13} />
                    </Link>
                </div>
            </section>

            {/* Trust strip */}
            <div className="cf-trust-strip">
                <div className="cf-trust-item"><CheckCircle2 size={12} className="t-green" /> All submissions reviewed within 7 days</div>
                <div className="cf-trust-item"><Lock size={12} className="t-blue" /> Your data is never shared publicly</div>
                <div className="cf-trust-item"><FileText size={12} className="t-amber" /> 38 of 127 suggestions approved so far</div>
            </div>

            {/* Body */}
            <div className="cf-two-col">
                {/* ── Form column ───────────────────────── */}
                <div>
                    <form onSubmit={handleSubmit}>

                        {/* Card 1: Your details */}
                        <div className="cf-card">
                            <div className="cf-card-title">Your Details</div>
                            <div className="cf-card-sub">So we can contact you if the cause gets shortlisted.</div>
                            <div className="cf-fields">
                                <div className="cf-row-2">
                                    <div className="cf-field">
                                        <label className="cf-label"><User size={13} /> Full Name <span className="req">*</span></label>
                                        <input className="cf-input" placeholder="e.g. Kavita Sharma" value={form.name} onChange={e => set('name', e.target.value)} />
                                    </div>
                                    <div className="cf-field">
                                        <label className="cf-label"><Phone size={13} /> Phone (optional)</label>
                                        <input className="cf-input" placeholder="10-digit mobile" value={form.phone} onChange={e => set('phone', e.target.value)} />
                                    </div>
                                </div>
                                <div className="cf-field">
                                    <label className="cf-label"><Mail size={13} /> Email Address <span className="req">*</span></label>
                                    <input className="cf-input" type="email" placeholder="you@example.com" value={form.email} onChange={e => set('email', e.target.value)} />
                                </div>
                            </div>
                        </div>

                        {/* Card 2: Cause details */}
                        <div className="cf-card">
                            <div className="cf-card-title">Cause Details</div>
                            <div className="cf-card-sub">Tell us about the issue you want to highlight.</div>
                            <div className="cf-fields">

                                <div className="cf-field">
                                    <label className="cf-label"><Lightbulb size={13} /> Cause Title <span className="req">*</span></label>
                                    <input className="cf-input" placeholder="e.g. Solar Lighting for Forest Schools in Bastar" value={form.title} onChange={e => set('title', e.target.value)} />
                                    <span className="cf-hint">Keep it specific and compelling (max 80 chars)</span>
                                </div>

                                <div className="cf-field">
                                    <label className="cf-label">Category <span className="req">*</span></label>
                                    <div className="cf-pills">
                                        {CATEGORIES.map(c => (
                                            <button key={c.id} type="button"
                                                onClick={() => set('category', c.id)}
                                                className={`cf-pill-btn ${form.category === c.id ? 'active' : ''}`}
                                            >
                                                {c.icon} {c.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="cf-field">
                                    <label className="cf-label"><Globe size={13} /> Affected Location <span className="req">*</span></label>
                                    <input className="cf-input" placeholder="e.g. Bastar district, Chhattisgarh" value={form.location} onChange={e => set('location', e.target.value)} />
                                </div>

                                <div className="cf-field">
                                    <label className="cf-label">Urgency Level <span className="req">*</span></label>
                                    <div className="cf-urgency-grid">
                                        {[{ label: 'Critical', cls: 'high' }, { label: 'High', cls: 'medium' }, { label: 'Moderate', cls: 'low' }].map(u => (
                                            <button key={u.label} type="button"
                                                onClick={() => set('urgency', u.label)}
                                                className={`cf-urgency-btn ${form.urgency === u.label ? u.cls : ''}`}
                                            >
                                                {u.label === 'Critical' && '🔴'} {u.label === 'High' && '🟡'} {u.label === 'Moderate' && '🟢'} {u.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="cf-field">
                                    <div className="cf-char-row">
                                        <label className="cf-label"><FileText size={13} /> Problem Description <span className="req">*</span></label>
                                        <span className={`cf-char-count ${form.desc.length > 900 ? 'warn' : ''}`}>{form.desc.length}/1000</span>
                                    </div>
                                    <textarea className="cf-textarea" rows={5}
                                        placeholder="Describe the problem in detail. Who is affected? Since when? What are the consequences of inaction? Our committee needs enough context to evaluate impact."
                                        value={form.desc} onChange={e => set('desc', e.target.value.slice(0, 1000))}
                                    />
                                </div>

                                <div className="cf-field">
                                    <label className="cf-label"><TrendingUp size={13} /> Expected Impact</label>
                                    <textarea className="cf-textarea" rows={3}
                                        placeholder="What would change if this cause receives ₹10 lakh? e.g. 500 students get solar-powered classrooms, reducing dropout rate by 30%."
                                        value={form.impact} onChange={e => set('impact', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Card 3: Organization */}
                        <div className="cf-card">
                            <div className="cf-card-title">Organisation (Optional)</div>
                            <div className="cf-card-sub">If you represent or know an NGO working on this issue, link them here.</div>
                            <div className="cf-fields">
                                <div className="cf-row-2">
                                    <div className="cf-field">
                                        <label className="cf-label">Organisation Name</label>
                                        <input className="cf-input" placeholder="e.g. Samarthan Foundation" value={form.org} onChange={e => set('org', e.target.value)} />
                                    </div>
                                    <div className="cf-field">
                                        <label className="cf-label">Website / Social Link</label>
                                        <input className="cf-input" placeholder="https://" value={form.orgLink} onChange={e => set('orgLink', e.target.value)} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Callout */}
                        <div className="cf-callout" style={{ marginBottom: 24 }}>
                            <Info size={18} className="cf-callout-icon" style={{ color: '#0ea5e9', flexShrink: 0 }} />
                            <div>
                                <strong>What happens next?</strong> Our Scrutiny Committee reviews submissions within 7 working days. Shortlisted causes are contacted for a brief 15-min call. Approved causes go live within 14 days and become active donation missions.
                            </div>
                        </div>

                        {/* Error */}
                        {error && (
                            <div className="cf-error" style={{ marginBottom: 16 }}>
                                <ShieldAlert size={14} /> {error}
                            </div>
                        )}

                        {/* Submit */}
                        <div className="cf-nav-row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                            <Link to="/" style={{ fontSize: 13, fontWeight: 700, color: '#94a3b8', display: 'flex', alignItems: 'center', gap: 6, textDecoration: 'none' }}>
                                <ChevronLeft size={15} /> Back to Home
                            </Link>
                            <button className="cf-btn-submit" type="submit" disabled={loading}>
                                {loading ? <><div className="cf-btn-spinner" /> Submitting…</> : <><Send size={16} /> Submit Suggestion</>}
                            </button>
                        </div>
                    </form>
                </div>

                {/* ── Sidebar ───────────────────────────── */}
                <div>
                    {/* Stats */}
                    <div className="cf-side-stats" style={{ marginBottom: 24 }}>
                        {SIDE_STATS.map((s, i) => (
                            <div key={i} className="cf-side-stat">
                                <div className="cf-side-stat-icon" style={{ background: s.color }}>
                                    <span style={{ color: s.iconColor }}>{s.icon}</span>
                                </div>
                                <div>
                                    <div className="cf-side-stat-val">{s.val}</div>
                                    <div className="cf-side-stat-label">{s.label}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Recently approved */}
                    <div className="cf-card" style={{ padding: 28 }}>
                        <div className="cf-card-title" style={{ fontSize: 16, marginBottom: 4 }}>Recently Approved</div>
                        <div className="cf-card-sub" style={{ marginBottom: 20 }}>Suggestions that became live missions</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                            {APPROVED.map((a, i) => (
                                <div key={i} style={{ borderBottom: i < APPROVED.length - 1 ? '1px solid #f0f2f5' : 'none', paddingBottom: i < APPROVED.length - 1 ? 16 : 0 }}>
                                    <div style={{ fontSize: 14, fontWeight: 800, color: '#0f172a', marginBottom: 4 }}>{a.title}</div>
                                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                                        <span style={{ fontSize: 11, fontWeight: 700, color: '#14b8a6', background: '#f0fdf9', padding: '3px 10px', borderRadius: 100 }}>{a.category}</span>
                                        <span style={{ fontSize: 11, fontWeight: 600, color: '#64748b' }}>{a.loc}</span>
                                    </div>
                                    <div style={{ fontSize: 12, fontWeight: 700, color: '#0f172a', marginTop: 6 }}>{a.raised}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Success modal */}
            {submitted && (
                <div className="cf-success-overlay">
                    <div className="cf-success-modal">
                        <div className="cf-success-ring">
                            <Lightbulb size={36} color="white" fill="white" />
                        </div>
                        <h2 className="cf-success-h2">Suggestion Received! 🎉</h2>
                        <p className="cf-success-p">
                            Thank you, <strong>{form.name.split(' ')[0]}</strong>! Your cause suggestion for <strong>"{form.title}"</strong> has been logged. Our Scrutiny Committee will review it within 7 working days.
                        </p>
                        <div className="cf-success-ref">
                            Reference ID
                            <span>{refId}</span>
                        </div>
                        <Link to="/categories" className="cf-success-btn">
                            <Heart size={16} /> Browse Live Missions
                        </Link>
                    </div>
                </div>
            )}

            <footer className="cf-footer">
                <div className="cf-footer-inner">
                    <div className="cf-footer-brand"><Heart size={22} className="cf-footer-heart" fill="currentColor" /> Donation Foundation</div>
                    <div className="cf-footer-copy">© 2026 Transparent Philanthropy Ledger</div>
                </div>
            </footer>
        </div>
    );
}
