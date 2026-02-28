import React, { useState, useEffect, useRef } from 'react';
import './LearnMore.css';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import {
    Heart, Shield, Globe, TrendingUp, Users, CheckCircle2,
    ChevronDown, ChevronUp, ArrowRight, Star, Zap, Lock,
    BarChart2, BookOpen, Handshake, Award, MapPin, RefreshCw,
    FileText, Eye, Sparkles, Quote
} from 'lucide-react';

/* ── Counter animation hook ─────────────────────────────────── */
function useCountUp(target, duration = 1800, start = false) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!start) return;
        let startTime = null;
        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [target, duration, start]);
    return count;
}

/* ── Intersection observer hook ─────────────────────────────── */
function useInView(threshold = 0.2) {
    const ref = useRef(null);
    const [inView, setInView] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, [threshold]);
    return [ref, inView];
}

/* ── Stat card with counter ──────────────────────────────────── */
function StatCard({ value, suffix, label, icon, color, inView }) {
    const num = useCountUp(value, 1800, inView);
    return (
        <div className="lm-stat-card">
            <div className={`lm-stat-icon ${color}`}>{icon}</div>
            <div className="lm-stat-value">{num.toLocaleString('en-IN')}{suffix}</div>
            <div className="lm-stat-label">{label}</div>
        </div>
    );
}

/* ── FAQ item ────────────────────────────────────────────────── */
function FAQItem({ q, a }) {
    const [open, setOpen] = useState(false);
    return (
        <div className={`lm-faq-item ${open ? 'open' : ''}`}>
            <button className="lm-faq-q" onClick={() => setOpen(o => !o)}>
                <span>{q}</span>
                {open ? <ChevronUp size={18} className="lm-faq-icon" /> : <ChevronDown size={18} className="lm-faq-icon" />}
            </button>
            <div className={`lm-faq-a-wrap ${open ? 'open' : ''}`}>
                <div className="lm-faq-a">{a}</div>
            </div>
        </div>
    );
}

/* ── Data ────────────────────────────────────────────────────── */
const STATS = [
    { value: 84000000, suffix: '', label: '₹ Total Raised', icon: <TrendingUp size={22} />, color: 'teal' },
    { value: 24000, suffix: '+', label: 'Lives Touched', icon: <Users size={22} />, color: 'blue' },
    { value: 150, suffix: '+', label: 'Wells Dug', icon: <Globe size={22} />, color: 'violet' },
    { value: 98, suffix: '%', label: 'Fund Efficiency', icon: <BarChart2 size={22} />, color: 'amber' },
];

const HOW_STEPS = [
    {
        num: '01',
        title: 'Choose a Mission',
        desc: 'Browse our verified categories — from education and healthcare to clean water and disaster relief. Every mission is vetted by our Transparency Committee.',
        icon: <BookOpen size={28} />,
        color: 'teal',
    },
    {
        num: '02',
        title: 'Set Your Amount',
        desc: 'Pick a preset amount or enter a custom value. Toggle monthly giving for a recurring impact. Even ₹100 a month makes a compounding difference.',
        icon: <Heart size={28} />,
        color: 'rose',
    },
    {
        num: '03',
        title: 'Pay Securely',
        desc: 'Complete your donation via Card, UPI, or Net Banking — all encrypted end-to-end. Your financial data is never stored on our servers.',
        icon: <Lock size={28} />,
        color: 'blue',
    },
    {
        num: '04',
        title: 'Track Impact',
        desc: 'Receive an instant 80G-eligible e-receipt. Follow your mission\'s progress in real time through our live impact dashboard.',
        icon: <BarChart2 size={28} />,
        color: 'violet',
    },
];

const PILLARS = [
    { icon: <Eye size={24} />, title: 'Full Transparency', desc: 'Every rupee is tracked and disclosed. Our public ledger shows how funds move from your wallet to beneficiaries.' },
    { icon: <Shield size={24} />, title: 'Certified & Audited', desc: 'Registered under FCRA and IT Act Section 12A. Annual third-party audits ensure zero misappropriation.' },
    { icon: <Award size={24} />, title: '80G Tax Benefits', desc: 'All donations are eligible for 80G deductions. Receipts are generated instantly and accepted by the IT department.' },
    { icon: <RefreshCw size={24} />, title: 'Real-time Reporting', desc: 'Live dashboards update as missions progress. You\'ll always know if a goal has been reached or redirected.' },
    { icon: <FileText size={24} />, title: 'Verified Causes', desc: 'Each mission passes a 7-point verification process conducted by our Scrutiny & Social Impact team.' },
    { icon: <Handshake size={24} />, title: 'Community Governed', desc: 'Our Donation Advisory Board, comprising donors and field workers, votes on major allocation decisions.' },
];

const TESTIMONIALS = [
    { name: 'Priya Mehta', role: 'Monthly Donor since 2024', text: 'I\'ve donated to many platforms but the transparency here is unmatched. I can see exactly where my ₹500/month goes each week.', rating: 5 },
    { name: 'Arjun Nair', role: 'Corporate CSR Partner', text: 'We routed our entire CSR budget through Donation Foundation. The reporting quality satisfied our board and auditors instantly.', rating: 5 },
    { name: 'Kavya Reddy', role: 'Volunteer & Donor', text: 'As someone who\'s been to the field, seeing the wells actually being dug and kids receiving books is incredibly validating.', rating: 5 },
];

const FAQS = [
    { q: 'Is my donation 100% tax deductible?', a: 'Yes. All donations qualify under Section 80G of the Income Tax Act. An e-receipt is generated instantly and sent to your email.' },
    { q: 'Can I donate anonymously?', a: 'Absolutely. You can toggle the "Donate Anonymously" option during checkout. Your name will not appear on any public donor wall.' },
    { q: 'How do I know my money reaches the cause?', a: 'We publish a real-time public ledger. Every transaction is reconciled with field reports, photos, and GPS-stamped proof of delivery within 72 hours.' },
    { q: 'Can I cancel a monthly recurring donation?', a: 'Yes, you can cancel anytime from your donor profile with no penalties or fees. Cancellations take effect from the next billing cycle.' },
    { q: 'What payment methods are accepted?', a: 'We accept all major debit/credit cards, UPI (GPay, PhonePe, Paytm, BHIM), and Net Banking from 50+ banks. International cards are also accepted.' },
    { q: 'How is Donation Foundation funded?', a: 'We take a 2% platform fee (not from your donation — from corporate grants and government schemes) to run operations. 98% of donor funds reach beneficiaries.' },
];

/* ── Main Page ───────────────────────────────────────────────── */
export default function LearnMore() {
    const [statsRef, statsInView] = useInView(0.3);

    useEffect(() => { window.scrollTo(0, 0); }, []);

    return (
        <div className="lm-page">
            <Header />
            <main>

                {/* ── Hero ──────────────────────────────────── */}
                <section className="lm-hero">
                    <div className="lm-hero-glow lm-hero-glow-1" />
                    <div className="lm-hero-glow lm-hero-glow-2" />
                    <div className="lm-hero-content">
                        <div className="lm-hero-badge">
                            <Sparkles size={14} /> Our Story &amp; Mission
                        </div>
                        <h1 className="lm-hero-h1">
                            Philanthropy,{' '}
                            <span className="lm-hero-accent">Reimagined</span>{' '}
                            for the Digital Age
                        </h1>
                        <p className="lm-hero-p">
                            We built Donation Foundation because giving should feel as effortless and trustworthy as sending a message. Every feature — from real-time ledgers to 80G receipts — is designed so donors give with confidence and beneficiaries receive with dignity.
                        </p>
                        <div className="lm-hero-ctas">
                            <Link to="/categories" className="lm-btn-primary">
                                Start Donating <ArrowRight size={18} />
                            </Link>
                            <a href="#how-it-works" className="lm-btn-ghost">
                                See How It Works
                            </a>
                        </div>
                    </div>

                    {/* Floating mission pills */}
                    <div className="lm-hero-pills" aria-hidden="true">
                        {['Education', 'Healthcare', 'Clean Water', 'Hunger Relief', 'Animal Welfare', 'Disaster Relief'].map((t, i) => (
                            <div key={i} className="lm-pill" style={{ animationDelay: `${i * 0.15}s` }}>{t}</div>
                        ))}
                    </div>
                </section>

                {/* ── Stats ─────────────────────────────────── */}
                <section className="lm-stats-section" ref={statsRef}>
                    <div className="lm-container">
                        <div className="lm-stats-grid">
                            {STATS.map((s, i) => (
                                <StatCard key={i} {...s} inView={statsInView} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Mission statement ─────────────────────── */}
                <section className="lm-mission-section">
                    <div className="lm-container lm-mission-inner">
                        <div className="lm-mission-text">
                            <div className="lm-section-eyebrow">Our Purpose</div>
                            <h2 className="lm-section-h2">
                                We exist to close the gap between <span className="lm-highlight">compassion</span> and <span className="lm-highlight">action</span>
                            </h2>
                            <p className="lm-body-text">
                                Founded in 2021 by a team of social workers, technologists, and chartered accountants, Donation Foundation was born from a simple observation: millions of Indians want to give, but lack a trustworthy channel. We fix that.
                            </p>
                            <p className="lm-body-text">
                                Our platform connects verified NGOs, hospitals, schools, and relief organisations with donors — all under a single transparent roof. No middlemen, no opacity, no delays.
                            </p>
                            <div className="lm-mission-checks">
                                {['FCRA Registered', 'ISO 27001 Secured', 'GuideStar Platinum', 'Charity Navigator 4-Star'].map((t, i) => (
                                    <div key={i} className="lm-check-item">
                                        <CheckCircle2 size={16} className="lm-check-icon" /> {t}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="lm-mission-visual">
                            <div className="lm-quote-card">
                                <Quote size={32} className="lm-quote-mark" />
                                <p className="lm-quote-text">"Every donation is a vote for the world you want to live in. We make sure every vote is counted."</p>
                                <div className="lm-quote-author">
                                    <div className="lm-quote-avatar">RP</div>
                                    <div>
                                        <div className="lm-quote-name">Rajeev Prasad</div>
                                        <div className="lm-quote-role">Co-founder &amp; CEO</div>
                                    </div>
                                </div>
                            </div>
                            <div className="lm-impact-ticker">
                                <div className="lm-ticker-dot" />
                                <span className="lm-ticker-text">Live: <strong>₹12,400</strong> donated in the last hour</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── How it works ──────────────────────────── */}
                <section className="lm-how-section" id="how-it-works">
                    <div className="lm-container">
                        <div className="lm-section-eyebrow center">Simple Process</div>
                        <h2 className="lm-section-h2 center">From desire to impact in <span className="lm-highlight">4 steps</span></h2>
                        <p className="lm-section-sub center">The entire journey — choosing a cause to confirming your receipt — takes under 3 minutes.</p>

                        <div className="lm-steps-grid">
                            {HOW_STEPS.map((step, i) => (
                                <div key={i} className={`lm-step-card lm-step-${step.color}`}>
                                    <div className="lm-step-num">{step.num}</div>
                                    <div className={`lm-step-icon-wrap lm-icon-${step.color}`}>{step.icon}</div>
                                    <h3 className="lm-step-title">{step.title}</h3>
                                    <p className="lm-step-desc">{step.desc}</p>
                                    {i < HOW_STEPS.length - 1 && <div className="lm-step-arrow"><ArrowRight size={16} /></div>}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Transparency pillars ──────────────────── */}
                <section className="lm-pillars-section">
                    <div className="lm-container">
                        <div className="lm-section-eyebrow center">Why Trust Us</div>
                        <h2 className="lm-section-h2 center">Built on <span className="lm-highlight">radical transparency</span></h2>
                        <div className="lm-pillars-grid">
                            {PILLARS.map((p, i) => (
                                <div key={i} className="lm-pillar-card">
                                    <div className="lm-pillar-icon">{p.icon}</div>
                                    <h3 className="lm-pillar-title">{p.title}</h3>
                                    <p className="lm-pillar-desc">{p.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Fund flow diagram ─────────────────────── */}
                <section className="lm-flow-section">
                    <div className="lm-container">
                        <div className="lm-section-eyebrow center">Where Does the Money Go?</div>
                        <h2 className="lm-section-h2 center">₹100 donated — <span className="lm-highlight">zero mystery</span></h2>
                        <div className="lm-flow-bars">
                            {[
                                { label: 'Direct to Beneficiary', pct: 82, color: 'teal' },
                                { label: 'NGO Operations', pct: 10, color: 'blue' },
                                { label: 'Platform & Tech', pct: 5, color: 'violet' },
                                { label: 'Compliance & Audit', pct: 3, color: 'amber' },
                            ].map((b, i) => (
                                <div key={i} className="lm-flow-row">
                                    <div className="lm-flow-label">
                                        <span>{b.label}</span>
                                        <span className={`lm-flow-pct lm-pct-${b.color}`}>{b.pct}%</span>
                                    </div>
                                    <div className="lm-flow-track">
                                        <div className={`lm-flow-fill lm-fill-${b.color}`} style={{ width: `${b.pct}%` }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <p className="lm-flow-note">
                            <Lock size={13} /> Allocation data is updated monthly and independently verified. View our public ledger →
                        </p>
                    </div>
                </section>

                {/* ── Testimonials ──────────────────────────── */}
                <section className="lm-testimonials-section">
                    <div className="lm-container">
                        <div className="lm-section-eyebrow center">Voices of Change</div>
                        <h2 className="lm-section-h2 center">What our <span className="lm-highlight">donors say</span></h2>
                        <div className="lm-testimonials-grid">
                            {TESTIMONIALS.map((t, i) => (
                                <div key={i} className="lm-testimonial-card">
                                    <div className="lm-stars">
                                        {Array.from({ length: t.rating }).map((_, j) => <Star key={j} size={14} className="lm-star" fill="currentColor" />)}
                                    </div>
                                    <p className="lm-testimonial-text">"{t.text}"</p>
                                    <div className="lm-testimonial-author">
                                        <div className="lm-testimonial-avatar">{t.name[0]}</div>
                                        <div>
                                            <div className="lm-testimonial-name">{t.name}</div>
                                            <div className="lm-testimonial-role">{t.role}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── FAQ ───────────────────────────────────── */}
                <section className="lm-faq-section">
                    <div className="lm-container lm-faq-inner">
                        <div>
                            <div className="lm-section-eyebrow">Got Questions?</div>
                            <h2 className="lm-section-h2">Frequently Asked <span className="lm-highlight">Questions</span></h2>
                            <p className="lm-body-text">Can't find your answer? Email us at <a href="mailto:help@donation.org" className="lm-link">help@donation.org</a></p>
                        </div>
                        <div className="lm-faq-list">
                            {FAQS.map((f, i) => <FAQItem key={i} {...f} />)}
                        </div>
                    </div>
                </section>

                {/* ── CTA Banner ────────────────────────────── */}
                <section className="lm-cta-section">
                    <div className="lm-cta-glow lm-cta-glow-1" />
                    <div className="lm-cta-glow lm-cta-glow-2" />
                    <div className="lm-cta-inner">
                        <div className="lm-cta-icon-ring">
                            <Heart size={36} fill="white" className="lm-cta-heart" />
                        </div>
                        <h2 className="lm-cta-h2">Ready to make your first impact?</h2>
                        <p className="lm-cta-p">Join 10,000+ donors already changing lives across India — one mission at a time.</p>
                        <div className="lm-cta-btns">
                            <Link to="/categories" className="lm-cta-btn-primary">
                                <Zap size={18} /> Donate Now
                            </Link>
                            <Link to="/impact" className="lm-cta-btn-ghost">
                                View Impact Reports
                            </Link>
                        </div>
                        <div className="lm-cta-trust">
                            <CheckCircle2 size={14} /> 80G Eligible &nbsp;·&nbsp;
                            <Lock size={14} /> SSL Secured &nbsp;·&nbsp;
                            <Shield size={14} /> FCRA Registered
                        </div>
                    </div>
                </section>

            </main>

            {/* Footer */}
            <footer className="lm-footer">
                <div className="lm-footer-inner">
                    <div className="flex items-center gap-2">
                        <Heart className="lm-footer-heart" size={28} fill="currentColor" />
                        <span className="lm-footer-brand">Donation Foundation</span>
                    </div>
                    <div className="lm-footer-copy">© 2026 Transparent Philanthropy Ledger.</div>
                </div>
            </footer>
        </div>
    );
}
