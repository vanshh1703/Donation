import React, { useState, useEffect, useRef } from 'react';
import './community.css';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import {
    Rocket, Heart, Users, Globe, BookOpen, Droplets,
    ShieldAlert, Leaf, ArrowRight, CheckCircle2,
    Phone, Mail, User, Sparkles, Calendar, Target,
    ChevronLeft, ChevronRight, Lock, Upload, X,
    BarChart2, Clock, Share2, Eye, Zap, Image
} from 'lucide-react';

/* ── Config ──────────────────────────────────────────────────── */
const STEPS = ['Basics', 'Story', 'Goal & Timeline', 'Review & Launch'];

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

const GOAL_PRESETS = [50000, 100000, 250000, 500000, 1000000, 2500000];

const DURATION_OPTIONS = [
    { label: '15 Days', days: 15 },
    { label: '30 Days', days: 30 },
    { label: '45 Days', days: 45 },
    { label: '60 Days', days: 60 },
    { label: '90 Days', days: 90 },
];

/* ── Impact estimator ────────────────────────────────────────── */
function getImpact(goal, category) {
    const g = Number(goal);
    if (!g || !category) return null;
    const map = {
        education: `Provide school supplies & uniforms to ~${Math.round(g / 2000)} students`,
        healthcare: `Fund ~${Math.round(g / 8000)} critical medical consultations`,
        water: `Bring clean water to ~${Math.round(g / 15000)} families`,
        environment: `Plant ~${Math.round(g / 50)} trees and restore ${Math.round(g / 200000)} acres`,
        disaster: `Deploy emergency kits for ~${Math.round(g / 3000)} families`,
        animals: `Provide medical care for ~${Math.round(g / 1500)} animals`,
        community: `Upskill ~${Math.round(g / 4000)} individuals through workshops`,
        other: `Create measurable impact for ~${Math.round(g / 5000)} beneficiaries`,
    };
    return map[category] || null;
}

/* ── Step 1 — Basics ─────────────────────────────────────────── */
function StepBasics({ form, set }) {
    return (
        <div className="cf-fields">
            <div className="cf-field">
                <label className="cf-label"><User size={13} /> Fundraiser Name <span className="req">*</span></label>
                <input className="cf-input" placeholder="e.g. Rahul Kumar" value={form.name} onChange={e => set('name', e.target.value)} />
            </div>
            <div className="cf-row-2">
                <div className="cf-field">
                    <label className="cf-label"><Mail size={13} /> Email <span className="req">*</span></label>
                    <input className="cf-input" type="email" placeholder="you@example.com" value={form.email} onChange={e => set('email', e.target.value)} />
                </div>
                <div className="cf-field">
                    <label className="cf-label"><Phone size={13} /> Phone <span className="req">*</span></label>
                    <input className="cf-input" placeholder="10-digit mobile" value={form.phone} onChange={e => set('phone', e.target.value)} />
                </div>
            </div>
            <div className="cf-field">
                <label className="cf-label"><Rocket size={13} /> Fundraiser Title <span className="req">*</span></label>
                <input className="cf-input" placeholder="e.g. Help Build a Library for Kids in Rural Himachal" value={form.title} onChange={e => set('title', e.target.value)} maxLength={90} />
                <span className="cf-hint">{form.title.length}/90 characters</span>
            </div>
            <div className="cf-field">
                <label className="cf-label">Category <span className="req">*</span></label>
                <div className="cf-pills">
                    {CATEGORIES.map(c => (
                        <button key={c.id} type="button"
                            className={`cf-pill-btn orange ${form.category === c.id ? 'active' : ''}`}
                            onClick={() => set('category', c.id)}
                        >
                            {c.icon} {c.label}
                        </button>
                    ))}
                </div>
            </div>
            <div className="cf-field">
                <label className="cf-label"><Globe size={13} /> Beneficiary Location <span className="req">*</span></label>
                <input className="cf-input" placeholder="e.g. Kullu district, Himachal Pradesh" value={form.location} onChange={e => set('location', e.target.value)} />
            </div>
        </div>
    );
}

/* ── Step 2 — Story & Media ──────────────────────────────────── */
function StepStory({ form, set }) {
    const fileRef = useRef();

    const handleFiles = (files) => {
        const validFiles = Array.from(files).filter(f => f.type.startsWith('image/')).slice(0, 5);
        const urls = validFiles.map(f => URL.createObjectURL(f));
        set('images', [...(form.images || []), ...urls].slice(0, 5));
    };

    const removeImage = (i) => {
        const next = [...(form.images || [])];
        next.splice(i, 1);
        set('images', next);
    };

    return (
        <div className="cf-fields">
            <div className="cf-field">
                <div className="cf-char-row">
                    <label className="cf-label"><Sparkles size={13} /> Your Story <span className="req">*</span></label>
                    <span className={`cf-char-count ${form.story?.length > 1800 ? 'warn' : ''}`}>{form.story?.length || 0}/2000</span>
                </div>
                <div className="cf-story-box">
                    <div className="cf-story-toolbar">
                        {['Bold', 'Italic', 'Bullet List', 'Heading'].map(t => (
                            <button key={t} type="button" className="cf-toolbar-btn">{t}</button>
                        ))}
                    </div>
                    <textarea
                        className="cf-textarea"
                        style={{ border: 'none', background: 'transparent', padding: '8px 0', boxShadow: 'none', borderRadius: 0, minHeight: 200 }}
                        placeholder={`Tell your story in detail:\n\n• Who are the beneficiaries?\n• What is the exact problem they face?\n• What will the funds be used for?\n• How will you measure success?\n• Why should a donor trust you?\n\nA compelling story raises 3x more.`}
                        value={form.story || ''}
                        onChange={e => set('story', e.target.value.slice(0, 2000))}
                    />
                </div>
            </div>

            {/* Photo upload */}
            <div className="cf-field">
                <label className="cf-label"><Image size={13} /> Cover Photos (up to 5)</label>
                <div
                    className="cf-upload-zone"
                    onClick={() => fileRef.current?.click()}
                    onDragOver={e => { e.preventDefault(); e.currentTarget.classList.add('drag-over'); }}
                    onDragLeave={e => e.currentTarget.classList.remove('drag-over')}
                    onDrop={e => { e.preventDefault(); e.currentTarget.classList.remove('drag-over'); handleFiles(e.dataTransfer.files); }}
                >
                    <div className="cf-upload-icon"><Upload size={28} /></div>
                    <div className="cf-upload-title">Drag & drop photos here</div>
                    <div className="cf-upload-sub">or <span>browse files</span> — JPG, PNG, WEBP (max 5MB each)</div>
                    {form.images?.length > 0 && (
                        <div className="cf-upload-preview" onClick={e => e.stopPropagation()}>
                            {form.images.map((src, i) => (
                                <div key={i} className="cf-preview-thumb">
                                    <img src={src} alt={`preview-${i}`} />
                                    <button className="cf-preview-del" onClick={() => removeImage(i)}><X size={10} /></button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <input ref={fileRef} type="file" multiple accept="image/*" style={{ display: 'none' }} onChange={e => handleFiles(e.target.files)} />
            </div>

            <div className="cf-callout green">
                <Sparkles size={18} className="cf-callout-icon" style={{ color: '#16a34a' }} />
                <div><strong>Pro tip:</strong> Fundraisers with at least 3 photos and a personal story of 300+ words raise 2.8× more donations on average. Be specific, be authentic.</div>
            </div>
        </div>
    );
}

/* ── Step 3 — Goal & Timeline ────────────────────────────────── */
function StepGoal({ form, set }) {
    const goal = Number(form.goal) || 100000;
    const impact = getImpact(goal, form.category);
    const deadline = form.duration ? new Date(Date.now() + form.duration * 86400000).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : null;

    return (
        <div className="cf-fields">
            <div className="cf-field">
                <label className="cf-label"><Target size={13} /> Fundraising Goal <span className="req">*</span></label>

                {/* Presets */}
                <div className="cf-pills" style={{ marginBottom: 16 }}>
                    {GOAL_PRESETS.map(p => (
                        <button key={p} type="button"
                            className={`cf-pill-btn orange ${Number(form.goal) === p ? 'active' : ''}`}
                            onClick={() => set('goal', p)}
                        >
                            ₹{(p / 1000).toFixed(0)}K
                        </button>
                    ))}
                </div>

                {/* Slider */}
                <div className="cf-slider-row">
                    <input
                        type="range" className="cf-slider"
                        min={10000} max={5000000} step={10000}
                        value={form.goal || 100000}
                        onChange={e => set('goal', Number(e.target.value))}
                    />
                    <div className="cf-slider-val">₹{(goal / 100000).toFixed(1)}L</div>
                </div>

                {/* Custom input */}
                <input
                    className="cf-input" type="number" placeholder="Or enter exact amount"
                    value={form.goal || ''} onChange={e => set('goal', Number(e.target.value))}
                    style={{ marginTop: 12 }}
                />
            </div>

            {/* Impact estimator */}
            {impact && (
                <div className="cf-impact-est">
                    <Sparkles size={18} className="cf-impact-icon" />
                    <div>
                        <div className="cf-impact-title">Estimated Impact</div>
                        <div className="cf-impact-text">{impact}</div>
                    </div>
                </div>
            )}

            {/* Duration */}
            <div className="cf-field">
                <label className="cf-label"><Clock size={13} /> Campaign Duration <span className="req">*</span></label>
                <div className="cf-pills">
                    {DURATION_OPTIONS.map(d => (
                        <button key={d.days} type="button"
                            className={`cf-pill-btn orange ${form.duration === d.days ? 'active' : ''}`}
                            onClick={() => set('duration', d.days)}
                        >
                            {d.label}
                        </button>
                    ))}
                </div>
                {deadline && <span className="cf-hint" style={{ marginTop: 10, display: 'block' }}>Campaign ends on: <strong>{deadline}</strong></span>}
            </div>

            {/* Fund usage breakdown */}
            <div className="cf-field">
                <label className="cf-label"><BarChart2 size={13} /> Fund Usage Breakdown <span className="req">*</span></label>
                <textarea className="cf-textarea" rows={4}
                    placeholder={`Be transparent about how funds will be used:\n• ₹40,000 — Books & stationery for 50 students\n• ₹30,000 — Salary for 2 volunteer teachers (3 months)\n• ₹20,000 — Infrastructure repair\n• ₹10,000 — Monitoring & evaluation`}
                    value={form.usage || ''} onChange={e => set('usage', e.target.value)}
                />
            </div>

            <div className="cf-callout yellow">
                <Zap size={18} className="cf-callout-icon" style={{ color: '#d97706' }} />
                <div>Campaigns with a clear fund usage breakdown get <strong>40% more donations</strong> and build long-term donor trust.</div>
            </div>
        </div>
    );
}

/* ── Step 4 — Review ─────────────────────────────────────────── */
function StepReview({ form }) {
    const goal = Number(form.goal) || 0;
    const impact = getImpact(goal, form.category);
    const catLabel = CATEGORIES.find(c => c.id === form.category)?.label || '—';
    const deadline = form.duration ? new Date(Date.now() + form.duration * 86400000).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : '—';

    return (
        <div className="cf-fields">
            <div className="cf-callout">
                <Eye size={18} className="cf-callout-icon" style={{ color: '#0ea5e9' }} />
                <div>Review your fundraiser before launching. Once submitted it goes for a 48h review by our team, then goes live.</div>
            </div>

            {/* Preview card */}
            <div className="cf-preview-panel" style={{ position: 'static', marginBottom: 8 }}>
                <div className="cf-preview-label"><Eye size={12} /> Live Preview</div>
                <div className="cf-preview-card">
                    <div className="cf-preview-img-wrap">
                        {form.images?.[0]
                            ? <img src={form.images[0]} alt="cover" />
                            : <Image size={40} />
                        }
                    </div>
                    <div className="cf-preview-body">
                        <div className="cf-preview-cat">{catLabel}</div>
                        <div className="cf-preview-title">{form.title || 'Your Fundraiser Title'}</div>
                        <div className="cf-preview-desc">{form.story ? form.story.slice(0, 100) + '…' : 'Your story will appear here.'}</div>
                        <div className="cf-preview-goal-row">
                            <span className="cf-preview-goal-label">Goal</span>
                            <span className="cf-preview-goal-val">₹{(goal / 100000).toFixed(1)}L</span>
                        </div>
                        <div className="cf-preview-bar-track">
                            <div className="cf-preview-bar-fill" style={{ width: '0%' }} />
                        </div>
                        <div className="cf-preview-deadline">
                            <Calendar size={11} /> Ends {deadline} &nbsp;·&nbsp; {form.location || 'Location'}
                        </div>
                    </div>
                </div>
            </div>

            {/* Summary rows */}
            {[
                { label: 'Organiser', val: form.name },
                { label: 'Email', val: form.email },
                { label: 'Category', val: catLabel },
                { label: 'Goal', val: `₹${goal.toLocaleString('en-IN')}` },
                { label: 'Duration', val: `${form.duration || '—'} days` },
                { label: 'Deadline', val: deadline },
            ].map((r, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #f0f2f5', fontSize: 14 }}>
                    <span style={{ color: '#64748b', fontWeight: 700, textTransform: 'uppercase', fontSize: 11, letterSpacing: '0.05em' }}>{r.label}</span>
                    <span style={{ fontWeight: 700, color: '#0f172a' }}>{r.val || '—'}</span>
                </div>
            ))}

            {impact && (
                <div className="cf-impact-est">
                    <Sparkles size={17} className="cf-impact-icon" />
                    <div>
                        <div className="cf-impact-title">Your campaign could:</div>
                        <div className="cf-impact-text">{impact}</div>
                    </div>
                </div>
            )}

            {/* T&C */}
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13, color: '#475569', fontWeight: 500, cursor: 'pointer' }}>
                <input type="checkbox" style={{ marginTop: 2, accentColor: '#14b8a6' }} />
                I confirm that all information provided is accurate and I agree to the <span style={{ color: '#14b8a6', fontWeight: 700, marginLeft: 4 }}>Fundraiser Terms of Service</span>, including fund-use reporting obligations.
            </label>
        </div>
    );
}

/* ── Main Fundraiser Page ────────────────────────────────────── */
export default function CustomFundraiser() {
    const [step, setStep] = useState(0);
    const [form, setForm] = useState({ name: '', email: '', phone: '', title: '', category: '', location: '', story: '', images: [], goal: 100000, duration: 30, usage: '' });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const refId = `CF-${Date.now().toString(36).toUpperCase()}`;

    const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

    useEffect(() => { window.scrollTo(0, 0); }, []);

    const validate = () => {
        if (step === 0) {
            if (!form.name.trim()) return 'Full name is required.';
            if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) return 'A valid email is required.';
            if (!form.phone.trim() || !/^[6-9]\d{9}$/.test(form.phone.replace(/\s/g, ''))) return 'Enter a valid 10-digit phone number.';
            if (!form.title.trim()) return 'Fundraiser title is required.';
            if (!form.category) return 'Please select a category.';
            if (!form.location.trim()) return 'Please enter a beneficiary location.';
        }
        if (step === 1) {
            if (!form.story || form.story.length < 100) return 'Please write a story of at least 100 characters.';
        }
        if (step === 2) {
            if (!form.goal || form.goal < 10000) return 'Goal must be at least ₹10,000.';
            if (!form.duration) return 'Please select a campaign duration.';
            if (!form.usage?.trim()) return 'Please describe how funds will be used.';
        }
        return '';
    };

    const next = async () => {
        const err = validate();
        if (err) { setError(err); return; }
        setError('');
        if (step === STEPS.length - 1) {
            setLoading(true);
            await new Promise(r => setTimeout(r, 2000));
            setLoading(false);
            setSubmitted(true);
        } else {
            setStep(s => s + 1);
        }
    };
    const back = () => { setError(''); setStep(s => s - 1); };

    return (
        <div className="cf-page">
            <Header />

            {/* Hero */}
            <section className="cf-hero fundraiser">
                <div className="cf-hero-glow cf-hero-glow-1" />
                <div className="cf-hero-glow cf-hero-glow-2" />
                <div className="cf-hero-content">
                    <div className="cf-hero-badge"><Rocket size={13} /> Custom Fundraiser</div>
                    <h1 className="cf-hero-h1">
                        Launch your own <span className="cf-hero-accent">fundraiser</span> in minutes
                    </h1>
                    <p className="cf-hero-p">
                        Create a personal or community fundraiser, share your story, set a goal, and start collecting donations with full transparency — no coding or NGO registration needed.
                    </p>
                </div>
            </section>

            {/* Step indicator */}
            <div style={{ padding: '8px 24px 0', maxWidth: 1100, margin: '0 auto' }}>
                <div className="cf-wizard-steps">
                    {STEPS.map((label, i) => {
                        const done = i < step;
                        const active = i === step;
                        return (
                            <React.Fragment key={i}>
                                <div className="cf-wizard-step">
                                    <div className={`cf-wizard-circle ${done ? 'done' : active ? 'active' : ''}`}>
                                        {done ? <CheckCircle2 size={14} /> : <span>{i + 1}</span>}
                                    </div>
                                    <span className={`cf-wizard-label ${done ? 'done' : active ? 'active' : ''}`}>{label}</span>
                                </div>
                                {i < STEPS.length - 1 && (
                                    <div className={`cf-wizard-line ${done ? 'done' : ''}`} />
                                )}
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>

            {/* Trust strip */}
            <div className="cf-trust-strip">
                <div className="cf-trust-item"><Lock size={12} className="t-blue" /> 256-bit SSL</div>
                <div className="cf-trust-item"><CheckCircle2 size={12} className="t-green" /> 80G Tax Benefits</div>
                <div className="cf-trust-item"><Share2 size={12} className="t-violet" /> Easy social sharing</div>
                <div className="cf-trust-item"><BarChart2 size={12} className="t-amber" /> Real-time tracking</div>
            </div>

            {/* Two-col layout */}
            <div className="cf-two-col">
                {/* ── Multi-step form ───────────────── */}
                <div>
                    <div className="cf-card">
                        <div className="cf-card-title">
                            {step === 0 && 'Basic Information'}
                            {step === 1 && 'Your Story & Photos'}
                            {step === 2 && 'Goal & Timeline'}
                            {step === 3 && 'Review & Launch'}
                        </div>
                        <div className="cf-card-sub">
                            {step === 0 && 'Tell us who you are and what your fundraiser is about.'}
                            {step === 1 && 'A compelling story raises 3× more. Be detailed and personal.'}
                            {step === 2 && 'Set an achievable goal and clear fund usage breakdown.'}
                            {step === 3 && 'Final review before your fundraiser goes live.'}
                        </div>

                        {step === 0 && <StepBasics form={form} set={set} />}
                        {step === 1 && <StepStory form={form} set={set} />}
                        {step === 2 && <StepGoal form={form} set={set} />}
                        {step === 3 && <StepReview form={form} />}

                        {error && (
                            <div className="cf-error" style={{ marginTop: 20 }}>
                                <Zap size={14} /> {error}
                            </div>
                        )}

                        <div className="cf-nav-row">
                            {step > 0 ? (
                                <button className="cf-btn-back" type="button" onClick={back}>
                                    <ChevronLeft size={16} /> Back
                                </button>
                            ) : (
                                <Link to="/" style={{ fontSize: 13, fontWeight: 700, color: '#94a3b8', display: 'flex', alignItems: 'center', gap: 6, textDecoration: 'none' }}>
                                    <ChevronLeft size={15} /> Home
                                </Link>
                            )}
                            <button className="cf-btn-next" type="button" onClick={next} disabled={loading}>
                                {loading ? (
                                    <><div className="cf-btn-spinner" /> Launching…</>
                                ) : step === STEPS.length - 1 ? (
                                    <><Rocket size={16} /> Launch Fundraiser</>
                                ) : (
                                    <>Continue <ChevronRight size={16} /></>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* ── Sidebar ───────────────────────── */}
                <div>
                    {/* Live preview card */}
                    <div className="cf-preview-panel" style={{ marginBottom: 20 }}>
                        <div className="cf-preview-label"><Eye size={12} /> Live Card Preview</div>
                        <div className="cf-preview-card">
                            <div className="cf-preview-img-wrap">
                                {form.images?.[0]
                                    ? <img src={form.images[0]} alt="cover" />
                                    : <Image size={36} />
                                }
                            </div>
                            <div className="cf-preview-body">
                                <div className="cf-preview-cat">{CATEGORIES.find(c => c.id === form.category)?.label || 'Category'}</div>
                                <div className="cf-preview-title">{form.title || 'Your Fundraiser Title'}</div>
                                <div className="cf-preview-desc">{form.story ? form.story.slice(0, 90) + '…' : 'Your compelling story will appear here…'}</div>
                                <div className="cf-preview-goal-row">
                                    <span className="cf-preview-goal-label">Goal</span>
                                    <span className="cf-preview-goal-val">₹{Number(form.goal).toLocaleString('en-IN')}</span>
                                </div>
                                <div className="cf-preview-bar-track">
                                    <div className="cf-preview-bar-fill" style={{ width: '0%' }} />
                                </div>
                                {form.duration && (
                                    <div className="cf-preview-deadline">
                                        <Calendar size={11} />
                                        Ends {new Date(Date.now() + form.duration * 86400000).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                                        &nbsp;·&nbsp; {form.location || 'Location'}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Why fundraise here */}
                    <div className="cf-card" style={{ padding: 24 }}>
                        <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 16, color: '#0f172a' }}>Why raise funds here?</div>
                        {[
                            { icon: <CheckCircle2 size={15} />, color: '#14b8a6', text: '0% platform fee on donors' },
                            { icon: <Lock size={15} />, color: '#3b82f6', text: 'Bank-grade 256-bit encryption' },
                            { icon: <Share2 size={15} />, color: '#8b5cf6', text: 'One-click social sharing tools' },
                            { icon: <BarChart2 size={15} />, color: '#f59e0b', text: 'Real-time donation dashboard' },
                            { icon: <CheckCircle2 size={15} />, color: '#22c55e', text: 'Auto-generated 80G receipts' },
                        ].map((it, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12, fontSize: 13, fontWeight: 600, color: '#475569' }}>
                                <span style={{ color: it.color, flexShrink: 0 }}>{it.icon}</span> {it.text}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Success modal */}
            {submitted && (
                <div className="cf-success-overlay">
                    <div className="cf-success-modal">
                        <div className="cf-success-ring">
                            <Rocket size={34} color="white" />
                        </div>
                        <h2 className="cf-success-h2">Fundraiser Submitted! 🚀</h2>
                        <p className="cf-success-p">
                            Your fundraiser <strong>"{form.title}"</strong> is under review. Our team will verify and publish it within <strong>48 hours</strong>. You'll receive a confirmation on <strong>{form.email}</strong>.
                        </p>
                        <div className="cf-success-ref">
                            Fundraiser ID
                            <span>{refId}</span>
                        </div>
                        <Link to="/categories" className="cf-success-btn">
                            <Heart size={16} /> Explore Other Missions
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
