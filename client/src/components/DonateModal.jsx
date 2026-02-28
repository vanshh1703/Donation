import React, { useState, useEffect, useRef } from 'react';
import './DonateModal.css';
import {
    X, ChevronRight, ChevronLeft, Heart, ShieldCheck, Zap,
    User, Mail, Phone, CreditCard, Smartphone, Building2,
    CheckCircle2, Lock, Gift, Star, Sparkles, RefreshCw,
    Award, Copy, Download, Share2, ArrowRight
} from 'lucide-react';

/* ─── helpers ────────────────────────────────────────────────── */
const PRESET_AMOUNTS = ['₹500', '₹1,000', '₹2,500', '₹5,000', '₹10,000'];

const PAYMENT_METHODS = [
    { id: 'card', icon: <CreditCard size={18} />, label: 'Card' },
    { id: 'upi', icon: <Smartphone size={18} />, label: 'UPI' },
    { id: 'netbank', icon: <Building2 size={18} />, label: 'Net Banking' },
];

const STEPS = ['Amount', 'Details', 'Payment', 'Done'];

function StepIndicator({ current }) {
    return (
        <div className="donate-steps">
            {STEPS.map((label, i) => {
                const done = i < current;
                const active = i === current;
                return (
                    <React.Fragment key={i}>
                        <div className="donate-step-item">
                            <div className={`donate-step-circle ${done ? 'done' : active ? 'active' : ''}`}>
                                {done ? <CheckCircle2 size={14} /> : <span>{i + 1}</span>}
                            </div>
                            <span className={`donate-step-label ${active ? 'active' : done ? 'done' : ''}`}>{label}</span>
                        </div>
                        {i < STEPS.length - 1 && (
                            <div className={`donate-step-line ${done ? 'done' : ''}`} />
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );
}

/* ─── Step 1 — Amount ────────────────────────────────────────── */
function StepAmount({ data, setData, mission }) {
    const [recurring, setRecurring] = useState(data.recurring || false);
    const [selected, setSelected] = useState(data.selectedPreset || null);
    const [custom, setCustom] = useState(data.customAmount || '');

    const pick = (amt) => {
        setSelected(amt);
        setCustom('');
        setData(d => ({ ...d, selectedPreset: amt, customAmount: '', amount: amt, recurring }));
    };
    const onCustom = (e) => {
        const v = e.target.value.replace(/[^0-9]/g, '');
        setCustom(v);
        setSelected(null);
        setData(d => ({ ...d, customAmount: v, selectedPreset: null, amount: v ? `₹${Number(v).toLocaleString('en-IN')}` : '', recurring }));
    };
    const toggle = () => {
        setRecurring(r => {
            setData(d => ({ ...d, recurring: !r }));
            return !r;
        });
    };

    const finalAmount = selected || (custom ? `₹${Number(custom).toLocaleString('en-IN')}` : '');

    return (
        <div className="donate-step-body">
            {/* Mission badge */}
            <div className="donate-mission-badge">
                <img src={mission.image} alt={mission.title} className="donate-mission-img" />
                <div>
                    <div className="donate-mission-name">{mission.title}</div>
                    <div className="donate-mission-progress">
                        <div className="donate-mission-bar">
                            <div className="donate-mission-fill" style={{ width: `${mission.pct}%` }} />
                        </div>
                        <span>{mission.pct}% funded</span>
                    </div>
                </div>
            </div>

            {/* Recurring toggle */}
            <div className="donate-recurring-row">
                <div>
                    <div className="donate-recurring-title"><RefreshCw size={14} /> Monthly Giving</div>
                    <div className="donate-recurring-sub">Make a lasting impact every month</div>
                </div>
                <button
                    onClick={toggle}
                    className={`donate-toggle ${recurring ? 'on' : ''}`}
                    aria-label="Toggle monthly recurring"
                >
                    <span className="donate-toggle-knob" />
                </button>
            </div>

            {/* Preset amounts */}
            <div className="donate-amount-grid">
                {PRESET_AMOUNTS.map(amt => (
                    <button
                        key={amt}
                        onClick={() => pick(amt)}
                        className={`donate-amt-btn ${selected === amt ? 'selected' : ''}`}
                    >
                        {amt}
                        {selected === amt && <span className="donate-amt-check"><CheckCircle2 size={12} /></span>}
                    </button>
                ))}
            </div>

            {/* Custom input */}
            <div className="donate-custom-wrap">
                <span className="donate-custom-prefix">₹</span>
                <input
                    type="text"
                    inputMode="numeric"
                    placeholder="Enter custom amount"
                    value={custom}
                    onChange={onCustom}
                    className="donate-custom-input"
                />
            </div>

            {/* Impact preview */}
            {finalAmount && (
                <div className="donate-impact-preview">
                    <Sparkles size={16} className="donate-impact-icon" />
                    <span>
                        <strong>{finalAmount}{recurring ? '/mo' : ''}</strong> can fund{' '}
                        {mission.id === 1 ? 'school supplies for 3 students' :
                            mission.id === 2 ? 'a critical surgery consultation' :
                                mission.id === 3 ? '50 nutritious meals' :
                                    mission.id === 4 ? 'medical care for 2 animals' :
                                        mission.id === 5 ? '1 litre of clean water daily for a family' :
                                            'emergency relief for 2 families'}
                    </span>
                </div>
            )}
        </div>
    );
}

/* ─── Step 2 — Personal Details ──────────────────────────────── */
function StepDetails({ data, setData }) {
    const fields = [
        { key: 'name', label: 'Full Name', icon: <User size={16} />, type: 'text', placeholder: 'e.g. Aanya Sharma' },
        { key: 'email', label: 'Email Address', icon: <Mail size={16} />, type: 'email', placeholder: 'e.g. aanya@email.com' },
        { key: 'phone', label: 'Phone Number', icon: <Phone size={16} />, type: 'tel', placeholder: '10-digit mobile number' },
        { key: 'pan', label: 'PAN (for 80G)', icon: <Award size={16} />, type: 'text', placeholder: 'ABCDE1234F (optional)' },
    ];

    return (
        <div className="donate-step-body">
            <div className="donate-section-title">Your Information</div>
            <p className="donate-section-sub">Required to generate your tax receipt & send confirmation.</p>

            <div className="donate-fields">
                {fields.map(f => (
                    <div key={f.key} className="donate-field">
                        <label className="donate-label">
                            {f.icon} {f.label}
                        </label>
                        <input
                            type={f.type}
                            placeholder={f.placeholder}
                            value={data[f.key] || ''}
                            onChange={e => setData(d => ({ ...d, [f.key]: e.target.value }))}
                            className="donate-input"
                        />
                    </div>
                ))}
            </div>

            <div className="donate-anon-row">
                <input
                    type="checkbox"
                    id="anon"
                    checked={data.anonymous || false}
                    onChange={e => setData(d => ({ ...d, anonymous: e.target.checked }))}
                    className="donate-checkbox"
                />
                <label htmlFor="anon" className="donate-anon-label">
                    <Gift size={14} /> Donate anonymously (your name won't appear publicly)
                </label>
            </div>

            <div className="donate-trust-row">
                <div className="donate-trust-item"><ShieldCheck size={14} className="green" /> 256-bit SSL Encrypted</div>
                <div className="donate-trust-item"><Lock size={14} className="blue" /> Data never shared</div>
                <div className="donate-trust-item"><Star size={14} className="amber" /> 80G Tax Certified</div>
            </div>
        </div>
    );
}

/* ─── Step 3 — Payment ───────────────────────────────────────── */
function StepPayment({ data, setData, processing }) {
    const [method, setMethod] = useState(data.payMethod || 'card');
    const [cardNum, setCardNum] = useState(data.cardNum || '');
    const [expiry, setExpiry] = useState(data.expiry || '');
    const [cvv, setCvv] = useState(data.cvv || '');
    const [cardName, setCardName] = useState(data.cardName || '');
    const [upiId, setUpiId] = useState(data.upiId || '');
    const [bank, setBank] = useState(data.bank || '');

    const fmtCard = (v) => v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
    const fmtExp = (v) => { const d = v.replace(/\D/g, '').slice(0, 4); return d.length > 2 ? d.slice(0, 2) + '/' + d.slice(2) : d; };

    const pick = (m) => { setMethod(m); setData(d => ({ ...d, payMethod: m })); };

    const update = (key, val) => setData(d => ({ ...d, [key]: val }));

    const BANKS = ['State Bank of India', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Kotak Mahindra Bank', 'Punjab National Bank'];

    return (
        <div className="donate-step-body">
            {/* Summary chip */}
            <div className="donate-pay-summary">
                <div>
                    <div className="donate-pay-label">Donating</div>
                    <div className="donate-pay-amount">{data.amount}{data.recurring ? ' / month' : ''}</div>
                </div>
                <div className="donate-pay-mission">{data.anonymous ? 'Anonymous' : data.name || 'You'}</div>
            </div>

            {/* Method tabs */}
            <div className="donate-pay-tabs">
                {PAYMENT_METHODS.map(m => (
                    <button
                        key={m.id}
                        onClick={() => pick(m.id)}
                        className={`donate-pay-tab ${method === m.id ? 'active' : ''}`}
                    >
                        {m.icon} {m.label}
                    </button>
                ))}
            </div>

            {/* Card form */}
            {method === 'card' && (
                <div className="donate-card-form">
                    <div className="donate-card-logos">
                        <div className="donate-card-logo visa">VISA</div>
                        <div className="donate-card-logo mc">MC</div>
                        <div className="donate-card-logo rupay">RuPay</div>
                    </div>
                    <div className="donate-field">
                        <label className="donate-label"><CreditCard size={14} /> Card Number</label>
                        <input className="donate-input mono" placeholder="1234 5678 9012 3456" maxLength={19}
                            value={cardNum} onChange={e => { const v = fmtCard(e.target.value); setCardNum(v); update('cardNum', v); }} />
                    </div>
                    <div className="donate-field">
                        <label className="donate-label"><User size={14} /> Name on Card</label>
                        <input className="donate-input" placeholder="Full name as on card"
                            value={cardName} onChange={e => { setCardName(e.target.value); update('cardName', e.target.value); }} />
                    </div>
                    <div className="donate-row-2">
                        <div className="donate-field">
                            <label className="donate-label">Expiry</label>
                            <input className="donate-input mono" placeholder="MM/YY" maxLength={5}
                                value={expiry} onChange={e => { const v = fmtExp(e.target.value); setExpiry(v); update('expiry', v); }} />
                        </div>
                        <div className="donate-field">
                            <label className="donate-label">CVV</label>
                            <input className="donate-input mono" placeholder="•••" maxLength={4} type="password"
                                value={cvv} onChange={e => { const v = e.target.value.replace(/\D/g, '').slice(0, 4); setCvv(v); update('cvv', v); }} />
                        </div>
                    </div>
                </div>
            )}

            {/* UPI form */}
            {method === 'upi' && (
                <div className="donate-upi-form">
                    <div className="donate-upi-apps">
                        {['GPay', 'PhonePe', 'Paytm', 'BHIM'].map(app => (
                            <button key={app} className={`donate-upi-app ${upiId === app ? 'selected' : ''}`} onClick={() => { setUpiId(app); update('upiId', app); }}>
                                <div className="donate-upi-icon">{app[0]}</div>
                                <span>{app}</span>
                            </button>
                        ))}
                    </div>
                    <div className="donate-or"><span>or enter UPI ID</span></div>
                    <div className="donate-field">
                        <label className="donate-label"><Smartphone size={14} /> UPI ID</label>
                        <input className="donate-input mono" placeholder="yourname@okaxis"
                            value={typeof upiId === 'string' && !['GPay', 'PhonePe', 'Paytm', 'BHIM'].includes(upiId) ? upiId : ''}
                            onChange={e => { setUpiId(e.target.value); update('upiId', e.target.value); }} />
                    </div>
                </div>
            )}

            {/* Net banking */}
            {method === 'netbank' && (
                <div className="donate-netbank-form">
                    <div className="donate-field">
                        <label className="donate-label"><Building2 size={14} /> Select Bank</label>
                        <select className="donate-input donate-select" value={bank} onChange={e => { setBank(e.target.value); update('bank', e.target.value); }}>
                            <option value="">-- Choose your bank --</option>
                            {BANKS.map(b => <option key={b} value={b}>{b}</option>)}
                        </select>
                    </div>
                    {bank && (
                        <div className="donate-netbank-note">
                            <Lock size={14} /> You'll be redirected to <strong>{bank}</strong>'s secure portal to complete the transaction.
                        </div>
                    )}
                </div>
            )}

            {processing && (
                <div className="donate-processing">
                    <div className="donate-spinner" />
                    <span>Securing your transaction…</span>
                </div>
            )}
        </div>
    );
}

/* ─── Step 4 — Success ───────────────────────────────────────── */
function StepSuccess({ data, mission, onClose }) {
    const ref = useRef(null);
    const [copied, setCopied] = useState(false);
    const receiptId = `DNF-${Date.now().toString(36).toUpperCase()}`;

    useEffect(() => {
        // Confetti burst (pure CSS keyframe approach via class toggle)
        if (ref.current) {
            ref.current.classList.add('burst');
        }
    }, []);

    const copy = () => {
        navigator.clipboard.writeText(receiptId);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="donate-success" ref={ref}>
            {/* Animated ring */}
            <div className="donate-success-ring">
                <div className="donate-success-ring2" />
                <div className="donate-success-icon-wrap">
                    <Heart size={40} className="donate-success-heart" fill="white" />
                </div>
            </div>

            <h2 className="donate-success-h2">Thank You, {data.name?.split(' ')[0] || 'Hero'}! 🎉</h2>
            <p className="donate-success-p">
                Your donation of <strong>{data.amount}{data.recurring ? '/mo' : ''}</strong> to{' '}
                <strong>{mission.title}</strong> has been received.
            </p>

            {/* Receipt card */}
            <div className="donate-receipt">
                <div className="donate-receipt-row">
                    <span>Receipt ID</span>
                    <span className="donate-receipt-val mono">
                        {receiptId}
                        <button onClick={copy} className="copy-btn" title="Copy">
                            {copied ? <CheckCircle2 size={12} /> : <Copy size={12} />}
                        </button>
                    </span>
                </div>
                <div className="donate-receipt-row">
                    <span>Mission</span>
                    <span className="donate-receipt-val">{mission.title}</span>
                </div>
                <div className="donate-receipt-row">
                    <span>Amount</span>
                    <span className="donate-receipt-val green">{data.amount}{data.recurring ? '/mo' : ''}</span>
                </div>
                <div className="donate-receipt-row">
                    <span>Donor</span>
                    <span className="donate-receipt-val">{data.anonymous ? 'Anonymous' : data.name}</span>
                </div>
                <div className="donate-receipt-row">
                    <span>Date</span>
                    <span className="donate-receipt-val">{new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                </div>
                <div className="donate-receipt-row">
                    <span>Tax Cert</span>
                    <span className="donate-receipt-val"><CheckCircle2 size={12} className="green-inline" /> 80G Eligible</span>
                </div>
            </div>

            {/* Impact line */}
            <div className="donate-impact-line">
                <Sparkles size={16} />
                Your contribution joins <strong>24,000+ lives touched</strong> by this mission.
            </div>

            {/* Action buttons */}
            <div className="donate-success-actions">
                <button className="donate-success-btn primary" onClick={() => window.print()}>
                    <Download size={16} /> Download Receipt
                </button>
                <button className="donate-success-btn secondary" onClick={() => navigator.share?.({ title: 'I just donated!', text: `I donated ${data.amount} to ${mission.title}. Join me!`, url: window.location.href }).catch(() => { })}>
                    <Share2 size={16} /> Share
                </button>
            </div>

            <button className="donate-success-close" onClick={onClose}>
                Close <ArrowRight size={14} />
            </button>
        </div>
    );
}

/* ─── Main Modal ─────────────────────────────────────────────── */
export default function DonateModal({ open, onClose, mission }) {
    const [step, setStep] = useState(0);
    const [data, setData] = useState({});
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState('');
    const bodyRef = useRef(null);

    // Reset when opened
    useEffect(() => {
        if (open) { setStep(0); setData({}); setError(''); setProcessing(false); }
    }, [open]);

    // Lock scroll
    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [open]);

    // Scroll modal body to top on step change
    useEffect(() => {
        bodyRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }, [step]);

    if (!open || !mission) return null;

    const validate = () => {
        if (step === 0) {
            if (!data.amount) return 'Please select or enter an amount.';
        }
        if (step === 1) {
            if (!data.name?.trim()) return 'Full name is required.';
            if (!data.email?.trim()) return 'Email address is required.';
            if (!/\S+@\S+\.\S+/.test(data.email)) return 'Please enter a valid email.';
            if (!data.phone?.trim()) return 'Phone number is required.';
            if (!/^[6-9]\d{9}$/.test(data.phone.replace(/\s/g, ''))) return 'Enter a valid 10-digit Indian mobile number.';
        }
        if (step === 2) {
            if (data.payMethod === 'card' || !data.payMethod) {
                if (!data.cardNum || data.cardNum.replace(/\s/g, '').length < 16) return 'Enter a valid 16-digit card number.';
                if (!data.expiry || data.expiry.length < 5) return 'Enter a valid expiry date (MM/YY).';
                if (!data.cvv || data.cvv.length < 3) return 'Enter a valid CVV.';
                if (!data.cardName?.trim()) return 'Enter the name on card.';
            }
            if (data.payMethod === 'netbank' && !data.bank) return 'Please select your bank.';
        }
        return '';
    };

    const next = async () => {
        const err = validate();
        if (err) { setError(err); return; }
        setError('');
        if (step === 2) {
            setProcessing(true);
            await new Promise(r => setTimeout(r, 2200)); // simulate API
            setProcessing(false);
            setStep(3);
        } else {
            setStep(s => s + 1);
        }
    };

    const prev = () => { setError(''); setStep(s => s - 1); };

    const canGoBack = step > 0 && step < 3;
    const isLastStep = step === 2;
    const isDone = step === 3;

    return (
        <div className="donate-overlay" onClick={e => { if (e.target === e.currentTarget && !processing) onClose(); }}>
            <div className="donate-modal">
                {/* Header */}
                {!isDone && (
                    <div className="donate-modal-header">
                        <div className="donate-modal-title">
                            <Heart size={20} className="teal" fill="currentColor" />
                            Donate Now
                        </div>
                        <button onClick={onClose} disabled={processing} className="donate-close-btn" aria-label="Close">
                            <X size={20} />
                        </button>
                    </div>
                )}

                {/* Step indicator */}
                {!isDone && (
                    <div className="donate-modal-steps">
                        <StepIndicator current={step} />
                    </div>
                )}

                {/* Body */}
                <div className="donate-modal-body" ref={bodyRef}>
                    {step === 0 && <StepAmount data={data} setData={setData} mission={mission} />}
                    {step === 1 && <StepDetails data={data} setData={setData} />}
                    {step === 2 && <StepPayment data={data} setData={setData} processing={processing} />}
                    {step === 3 && <StepSuccess data={data} mission={mission} onClose={onClose} />}
                </div>

                {/* Error */}
                {error && !isDone && (
                    <div className="donate-error">
                        <Zap size={14} /> {error}
                    </div>
                )}

                {/* Footer nav */}
                {!isDone && (
                    <div className="donate-modal-footer">
                        {canGoBack && (
                            <button onClick={prev} disabled={processing} className="donate-nav-btn back">
                                <ChevronLeft size={18} /> Back
                            </button>
                        )}
                        <button onClick={next} disabled={processing} className="donate-nav-btn next">
                            {processing ? (
                                <><div className="btn-spinner" /> Processing…</>
                            ) : isLastStep ? (
                                <><Lock size={16} /> Confirm & Pay</>
                            ) : (
                                <>Continue <ChevronRight size={18} /></>
                            )}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
