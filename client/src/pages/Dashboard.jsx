import React, { useState, useEffect } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, AreaChart, Area, ComposedChart, Line, Legend,
    Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
    ScatterChart, Scatter, ZAxis, Treemap, Funnel, FunnelChart,
    LabelList, RadialBar, RadialBarChart
} from 'recharts';
import {
    Search, Bell, Filter, Download as ExportIcon,
    ChevronRight, ArrowLeft, RefreshCw,
    LayoutDashboard, FileText, Briefcase,
    CreditCard, Users, Settings, LogOut,
    AlertCircle, Clock, Database, CheckCircle2,
    TrendingUp, TrendingDown, Layers, MapPin,
    ArrowUpRight, AlertTriangle, ShieldCheck,
    Zap, MoreVertical, Layers3, Globe, Cpu,
    BarChart3, Activity, Calendar, ExternalLink, X,
    Command, Menu, UserCircle2, ArrowRightLeft,
    ShieldAlert, Workflow
} from 'lucide-react';
import './Dashboard.css';
import '../App.css';

// --- CINEMATIC DESIGN CONFIG ---
const THEME = {
    primary: '#FF5C00',
    secondary: '#0F172A',
    success: '#10B981',
    warning: '#F59E0B',
    danger: '#EF4444',
    info: '#3B82F6',
    indigo: '#6366F1',
    slate: '#64748B',
    border: 'rgba(15, 23, 42, 0.05)',
    palette: ['#FF5C00', '#6366F1', '#10B981', '#F59E0B', '#F43F5E', '#3B82F6', '#22D3EE', '#8B5CF6']
};

// --- DATASETS (SOPHISTICATED MODELS) ---
const TENDER_FLOW = [
    { name: 'Public Notice', val: 184, fill: '#E2E8F0' },
    { name: 'Tech Eval', val: 142, fill: '#CBD5E1' },
    { name: 'Fin Eval', val: 86, fill: '#8B5CF6' },
    { name: 'AOC Issued', val: 54, fill: '#6366F1' },
    { name: 'Agreement', val: 45, fill: '#FF5C00' },
    { name: 'Completed', val: 28, fill: '#0F172A' },
];

const DISBURSEMENT_SERIES = [
    { m: 'Oct 23', raised: 2.8, paid: 1.9, benchmark: 2.5 },
    { m: 'Nov 23', raised: 3.4, paid: 2.8, benchmark: 3.0 },
    { m: 'Dec 23', raised: 5.2, paid: 3.5, benchmark: 4.5 },
    { m: 'Jan 24', raised: 3.1, paid: 2.4, benchmark: 3.5 },
    { m: 'Feb 24', raised: 5.8, paid: 5.1, benchmark: 5.0 },
    { m: 'Mar 24', raised: 6.5, paid: 5.8, benchmark: 6.0 },
];

const SLA_MESH = [
    { subject: 'Tendering', score: 120, total: 150 },
    { subject: 'Audit', score: 98, total: 150 },
    { subject: 'Billing', score: 115, total: 150 },
    { subject: 'Execution', score: 130, total: 150 },
    { subject: 'Personnel', score: 85, total: 150 },
];

const AGING_CHART = [
    { range: '0-3d', count: 184, color: '#F1F5F9' },
    { range: '4-7d', count: 92, color: '#E2E8F0' },
    { range: '8-15d', count: 54, color: '#94A3B8' },
    { range: '15d+', count: 32, color: '#FF5C00' },
];

const RECENT_ALERTS_LOG = [
    { type: 'SLA_VIOLATION', title: '7 Tenders stuck > 30d', detail: 'Financial vetting pending at HQ Office', status: 'danger', time: '14m ago' },
    { type: 'IFMS_ERROR', title: '4 Sync Failures', detail: 'Reference mismatch at Payer treasury', status: 'warning', time: '1h ago' },
    { type: 'WORKFLOW_MSG', title: '12 Bills pending SE Sign', detail: 'Due for payment cycle in next 24h', status: 'info', time: '3h ago' },
];

// --- NESTED ANALYTICS DATA (FOR INNOVATIVE HOVER) ---
const NESTED_STAGES = {
    'Public Notice': [
        { name: 'Portal Upload', value: 84 },
        { name: 'Paper Advt', value: 100 }
    ],
    'Tech Eval': [
        { name: 'Committee Review', value: 42 },
        { name: 'Technical Demo', value: 30 },
        { name: 'Doc Verification', value: 70 }
    ],
    'Fin Eval': [
        { name: 'Rate Analysis', value: 36 },
        { name: 'Comparative Map', value: 50 }
    ],
    'AOC Issued': [
        { name: 'Final Approval', value: 24 },
        { name: 'Vendor Notification', value: 30 }
    ],
    'Agreement': [
        { name: 'Legal Signing', value: 20 },
        { name: 'Stamp Duty', value: 25 }
    ],
    'Completed': [
        { name: 'Final Handover', value: 15 },
        { name: 'Release Performance', value: 13 }
    ]
};

const NESTED_DISBURSEMENT = {
    'Oct 23': [{ p: 'W1', v: 40 }, { p: 'W2', v: 70 }, { p: 'W3', v: 45 }, { p: 'W4', v: 35 }],
    'Nov 23': [{ p: 'W1', v: 55 }, { p: 'W2', v: 45 }, { p: 'W3', v: 80 }, { p: 'W4', v: 60 }],
    'Dec 23': [{ p: 'W1', v: 85 }, { p: 'W2', v: 95 }, { p: 'W3', v: 70 }, { p: 'W4', v: 100 }],
    'Jan 24': [{ p: 'W1', v: 45 }, { p: 'W2', v: 65 }, { p: 'W3', v: 55 }, { p: 'W4', v: 50 }],
    'Feb 24': [{ p: 'W1', v: 110 }, { p: 'W2', v: 140 }, { p: 'W3', v: 120 }, { p: 'W4', v: 110 }],
    'Mar 24': [{ p: 'W1', v: 130 }, { p: 'W2', v: 160 }, { p: 'W3', v: 180 }, { p: 'W4', v: 180 }]
};

const NESTED_RADAR = {
    'Tendering': [{ n: 'Speed', v: 85 }, { n: 'Volume', v: 60 }, { n: 'Quality', v: 90 }],
    'Audit': [{ n: 'Compliance', v: 95 }, { n: 'Speed', v: 70 }, { n: 'Precision', v: 80 }],
    'Billing': [{ n: 'Accuracy', v: 90 }, { n: 'Velocity', v: 85 }, { n: 'Error Rate', v: 10 }],
    'Execution': [{ n: 'Timeline', v: 80 }, { n: 'Safety', v: 100 }, { n: 'Efficiency', v: 75 }],
    'Personnel': [{ n: 'Activity', v: 65 }, { n: 'Output', v: 70 }, { n: 'Retention', v: 90 }],
};

const NESTED_AGING = {
    '0-3d': [{ name: 'Critical', value: 40 }, { name: 'Normal', value: 144 }],
    '4-7d': [{ name: 'Critical', value: 30 }, { name: 'Normal', value: 62 }],
    '8-15d': [{ name: 'Critical', value: 24 }, { name: 'Normal', value: 30 }],
    '15d+': [{ name: 'Critical', value: 20 }, { name: 'Normal', value: 12 }],
};

const MASTER_REGISTRY = [
    { id: 'TN-2024-88', context: 'Phase 2 Smart Road Corridor', stage: 'Financial Vetting', aging: 14, risk: 'High', owner: 'Executive Engineer' },
    { id: 'BL-9350-V', context: 'Urban Water Filtration Network', stage: 'GST Record Verify', aging: 4, risk: 'Low', owner: 'JE Office' },
    { id: 'PR-1150-Q', context: 'Strategic Energy Hub - NW3', stage: 'Adm Approval Pending', aging: 11, risk: 'Critical', owner: 'SE Branch' },
    { id: 'BL-9321-A', context: 'Civil Secretariat Renovation', stage: 'IFMS Submission', aging: 1, risk: 'Normal', owner: 'Audit Branch' },
];

// --- CINEMATIC COMPONENT LAYERS ---

// --- HIGH-OCTANE HOVER STAGE ---
const HighOctaneTooltip = ({ active, payload, label, context }) => {
    if (active && payload && payload.length) {
        const primaryVal = payload[0].value;
        const color = payload[0].fill || payload[0].color || THEME.primary;
        const name = payload[0].name || label;

        const nestedData = context === 'stages' ? NESTED_STAGES[label] :
            context === 'disbursement' ? NESTED_DISBURSEMENT[label] :
                context === 'radar' ? NESTED_RADAR[label] :
                    context === 'aging' ? NESTED_AGING[label] : null;

        return (
            <div className="innovative-tooltip-v2">
                <div className="tooltip-header">
                    <div className="header-left">
                        <span className="tooltip-meta">ANALYTICS SEGMENT</span>
                        <h4 className="tooltip-title">{label || name}</h4>
                    </div>
                    <div className="tooltip-data">
                        <span className="tooltip-value" style={{ color: color }}>
                            {typeof primaryVal === 'number' && primaryVal > 100 ? `₹${(primaryVal / 10).toFixed(1)}k Cr` :
                                typeof primaryVal === 'number' && primaryVal > 10 ? `₹${primaryVal}Cr` : primaryVal}
                        </span>
                    </div>
                </div>

                {nestedData && (
                    <div className="nested-context-box">
                        <div className="nested-header">
                            <Activity size={10} className="pulse-icon" />
                            <span>SYSTEM BREAKDOWN</span>
                        </div>
                        <div className="nested-visual-stage">
                            <ResponsiveContainer width="100%" height="100%">
                                {context === 'stages' || context === 'radar' ? (
                                    <BarChart data={nestedData}>
                                        <Bar dataKey={context === 'radar' ? 'v' : 'value'} fill={color} radius={[2, 2, 0, 0]} barSize={16} />
                                    </BarChart>
                                ) : context === 'aging' ? (
                                    <PieChart>
                                        <Pie data={nestedData} innerRadius={18} outerRadius={30} paddingAngle={2} dataKey="value">
                                            {nestedData.map((e, i) => <Cell key={i} fill={i === 0 ? THEME.danger : color} />)}
                                        </Pie>
                                    </PieChart>
                                ) : (
                                    <AreaChart data={nestedData}>
                                        <defs>
                                            <linearGradient id={`grad-${label}`} x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor={color} stopOpacity={0.4} />
                                                <stop offset="95%" stopColor={color} stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <Area type="monotone" dataKey="v" stroke={color} fill={`url(#grad-${label})`} strokeWidth={2} />
                                    </AreaChart>
                                )}
                            </ResponsiveContainer>
                        </div>
                    </div>
                )}

                <div className="tooltip-footer">
                    <div className="footer-status">
                        <CheckCircle2 size={14} style={{ color: THEME.success }} />
                        <span>VERIFIED DATA</span>
                    </div>
                    <div className="impact-badge">+14.2%</div>
                </div>
            </div>
        );
    }
    return null;
};

const HighOctaneKpi = ({ label, val, sub, trend, isUp, color, icon: Icon, onClick }) => (
    <div className="kpi-pill" onClick={onClick}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ fontSize: '12px', fontWeight: 800, color: THEME.slate, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{label}</div>
            <div style={{ color: color, background: `${color}10`, width: 44, height: 44, borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={22} />
            </div>
        </div>
        <div className="kpi-val-fx" style={{ margin: '14px 0' }}>{val}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', fontWeight: 800 }}>
            <span style={{ color: isUp ? THEME.success : THEME.danger, background: isUp ? '#ECFDF5' : '#FEF2F2', padding: '4px 8px', borderRadius: '100px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                {isUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />} {trend}
            </span>
            <span style={{ color: THEME.textMuted }}>{sub}</span>
        </div>
        <div style={{ height: '40px', marginTop: '20px' }}>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={[{ v: 10 }, { v: 22 }, { v: 30 }, { v: 25 }, { v: 20 }, { v: 45 }]}>
                    <Area type="monotone" dataKey="v" stroke={color} fill={color} fillOpacity={0.05} strokeWidth={3} />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    </div>
);

const CinematicAuditLedger = ({ config, onBack }) => (
    <div className="audit-overlay">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '60px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
                <button onClick={onBack} style={{ width: 56, height: 56, borderRadius: '20px', border: '1px solid #E2E8F0', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: 'var(--shadow-sm)' }}>
                    <ArrowLeft size={28} />
                </button>
                <div>
                    <div style={{ fontSize: '12px', fontWeight: 800, color: THEME.textMuted, textTransform: 'uppercase', letterSpacing: '0.2em' }}>Unified Gov Analytics</div>
                    <h2 style={{ fontSize: '42px', fontWeight: 800, letterSpacing: '-0.06em' }}>{config.title}</h2>
                </div>
            </div>
            <div style={{ display: 'flex', gap: '24px' }}>
                <div style={{ background: 'white', border: '1px solid #E2E8F0', padding: '16px 30px', borderRadius: '100px', display: 'flex', alignItems: 'center', gap: '14px', width: '450px', boxShadow: 'var(--shadow-sm)' }}>
                    <Search size={22} color="#94A3B8" />
                    <input type="text" placeholder="Global audit database search..." style={{ border: 'none', outline: 'none', background: 'none', fontWeight: 600, fontSize: '16px', width: '100%' }} />
                </div>
                <button style={{ background: THEME.primary, color: 'white', padding: '0 40px', borderRadius: '100px', fontWeight: 800, fontSize: '15px', display: 'flex', alignItems: 'center', gap: '12px', border: 'none', cursor: 'pointer', boxShadow: 'var(--shadow-glow)' }}>
                    <ExportIcon size={20} /> SYNC AS CSV
                </button>
            </div>
        </div>

        <div style={{ display: 'flex', gap: '14px', marginBottom: '40px' }}>
            {config.criteria.map(c => (
                <div key={c} style={{ background: 'white', padding: '12px 24px', borderRadius: '100px', border: '1px solid #E2E8F0', fontSize: '13px', fontWeight: 700, color: THEME.slate, display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {c} <X size={16} className="cursor-pointer" />
                </div>
            ))}
            <div style={{ background: '#F1F5F9', border: '1px dashed #CBD5E1', padding: '12px 24px', borderRadius: '100px', fontSize: '13px', fontWeight: 700, color: '#94A3B8', cursor: 'pointer' }}>+ ADD SEARCH CATEGORY</div>
        </div>

        <div className="ledger-container" style={{ animation: 'fadeInUp 0.8s ease' }}>
            <table className="ledger-table">
                <thead>
                    <tr> {config.columns.map(c => <th key={c}>{c}</th>)} <th>Action Step</th> </tr>
                </thead>
                <tbody>
                    {config.data.map((r, i) => (
                        <tr key={i}> {config.columns.map(c => <td key={c}>{r[c]}</td>)} <td><button style={{ color: THEME.primary, border: 'none', background: 'none', cursor: 'pointer', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px' }}>VIEW AUDIT <ArrowUpRight size={16} /></button></td> </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

const Dashboard = () => {
    const [drilldown, setDrilldown] = useState(null);
    const [session] = useState({
        login: 'SU-CMD-NW99',
        office: 'District Strategic Command',
        updateTime: 'Feb 26, 2024 • 17:10:00',
        type: 'department'
    });

    const triggerAuditRegistry = (type, title, crit = []) => {
        setDrilldown({
            title: title || `${type} Analytical Ledger`,
            criteria: crit.length ? crit : ['Scope: National District Hub'],
            columns: type === 'Project' ? ['Asset ID', 'Governance Profile', 'Strategic Valuation', 'Workflow Status', 'Last Activity'] :
                type === 'Tender' ? ['Tender ID', 'Project Context', 'Owner Step', 'SLA Status', 'Risk Factor'] :
                    ['Entry ID', 'Contractor Authority', 'Disbursement Amt', 'IFMS Reality', 'System Aging'],
            data: [
                type === 'Project' ? { 'Asset ID': 'PR-101-NW', 'Governance Profile': 'Regional Highway Maintenance Corridor', 'Strategic Valuation': '₹14.2Cr', 'Workflow Status': 'EXECUTION', 'Last Activity': '2h Ago' } :
                    type === 'Tender' ? { 'Tender ID': 'TN-8152', 'Project Context': 'Urban Drainage Expansion Ph 4', 'Owner Step': 'TECHNICAL BID VETTING', 'SLA Status': 'CRITICAL', 'Risk Factor': 'HIGH' } :
                        { 'Entry ID': 'BL-201-B', 'Contractor Authority': 'L&T Infrastructure Ltd', 'Disbursement Amt': '₹1.8Cr', 'IFMS Reality': 'PENDING SYNC', 'System Aging': '5 Days' }
            ]
        });
    };

    if (drilldown) return <CinematicAuditLedger config={drilldown} onBack={() => setDrilldown(null)} />;

    return (
        <div className="dashboard-engine">
            {/* 🧭 COMMAND SIDEBAR */}
            <aside className="app-sidebar">
                <div className="brand-section">
                    <div className="brand-icon"><ShieldCheck size={32} /></div>
                    <span className="brand-name">CIVIC COMMAND</span>
                </div>

                <nav style={{ flex: 1 }}>
                    <div className="nav-link active"><LayoutDashboard size={22} /> Dashboard Context</div>
                    <div className="nav-link"><Layers3 size={22} /> Project Portfolio</div>
                    <div className="nav-link"><FileText size={22} /> Tender Registry</div>
                    <div className="nav-link"><CreditCard size={22} /> Financial Analytics</div>
                    <div className="nav-link"><Database size={22} /> IFMS Controller</div>
                    <div className="nav-link" style={{ marginTop: '24px' }}><Users size={22} /> Personnel Matrix</div>
                    <div className="nav-link"><Activity size={22} /> Live Network Audit</div>
                    <div className="nav-link"><Settings size={22} /> Control Protocol</div>
                </nav>

                <div style={{ marginTop: 'auto', background: '#F8FAFC', padding: '26px', borderRadius: '24px', border: '1px solid #F1F5F9' }}>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '24px' }}>
                        <div style={{ width: 44, height: 44, borderRadius: '15px', background: THEME.primary, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>HQ</div>
                        <div>
                            <div style={{ fontSize: '14px', fontWeight: 800 }}>V. Mehta (SE)</div>
                            <div style={{ fontSize: '11px', color: THEME.slate, fontWeight: 700 }}>EXECUTIVE OFFICE</div>
                        </div>
                    </div>
                    <div style={{ fontSize: '12px', color: THEME.textMuted, fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <LogOut size={16} /> DISCONNECT TERMINAL
                    </div>
                </div>
            </aside>

            {/* 💻 ANALYTICAL STAGE */}
            <main className="dashboard-stage">
                <header className="stage-header">
                    <div className="header-meta">
                        <h1 className="header-title-fx">Decision Command Interface</h1>
                        <p className="header-sub-fx">{session.office} • <span style={{ color: THEME.success, display: 'inline-flex', alignItems: 'center', gap: '8px' }}><div className="pulse-green" /> DATA SYNCHRONIZED</span> • {session.updateTime}</p>
                    </div>
                    <div className="header-controls">
                        <div className="search-field">
                            <Search size={22} color="#94A3B8" />
                            <input type="text" placeholder="Lookup operational metadata..." />
                        </div>
                        <div style={{ position: 'relative', width: 56, height: 56, borderRadius: '18px', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'white', cursor: 'pointer' }}>
                            <Bell size={26} color={THEME.slate} />
                            <div style={{ position: 'absolute', top: 12, right: 12, width: 9, height: 9, background: THEME.danger, borderRadius: '50%', border: '2px solid white' }}></div>
                        </div>
                    </div>
                </header>

                {/* 🧧 CINEMATIC KPI GRID */}
                <div className="kpi-row">
                    <HighOctaneKpi label="Active Portfolio" val="1,428" trend="+14% MoM" isUp={true} color={THEME.primary} sub="₹4.2k Cr Asset Value" icon={Layers3} onClick={() => triggerAuditRegistry('Project', 'Consolidated Project Assets')} />
                    <HighOctaneKpi label="Live Tenders" val="185" trend="+8% WoW" isUp={true} color={THEME.indigo} sub="42 Finalizing in 48h" icon={Briefcase} onClick={() => triggerAuditRegistry('Tender', 'Circle Tender Management')} />
                    <HighOctaneKpi label="Alert Protocol" val="32" trend="-4 Reduced" isUp={false} color={THEME.danger} sub="8 Critical Breaches" icon={AlertCircle} onClick={() => triggerAuditRegistry('Tender', 'High-Risk Asset Audit', ['Risk: High'])} />
                    <HighOctaneKpi label="Financial Payouts" val="₹18.4Cr" trend="+22% Q3" isUp={true} color={THEME.success} sub="94.2% Audit Compliance" icon={CreditCard} onClick={() => triggerAuditRegistry('Bill', 'Finance & Disbursement Audit')} />
                </div>

                {/* 🧬 ANALYTICAL BENTO MESH */}
                <div className="bento-mesh">

                    {/* Section 1: Multi-Dimensional Process Analytics */}
                    <div className="mesh-card span-4">
                        <span className="card-title-fx">Operational Process Funnel</span>
                        <div style={{ height: 280, marginTop: '20px' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <FunnelChart margin={{ right: 80, bottom: 20 }}>
                                    <Tooltip content={<HighOctaneTooltip context="stages" />} />
                                    <Funnel dataKey="val" data={TENDER_FLOW} isAnimationActive>
                                        <LabelList position="right" fill="#64748B" stroke="none" dataKey="name" fontSize={10} fontWeight={800} />
                                    </Funnel>
                                </FunnelChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="mesh-card span-8">
                        <span className="card-title-fx">Strategic Phase Distribution</span>
                        <div style={{ display: 'flex', height: '100%', gap: '30px' }}>
                            <div style={{ width: '40%', position: 'relative' }}>
                                <ResponsiveContainer width="100%" height={280}>
                                    <PieChart>
                                        <Pie data={TENDER_FLOW} cx="50%" cy="50%" innerRadius={80} outerRadius={110} paddingAngle={8} dataKey="val" stroke="none" onClick={(d) => triggerAuditRegistry('Tender', `Phase Audit: ${d.name}`)}>
                                            {TENDER_FLOW.map((e, i) => <Cell key={i} fill={e.fill} />)}
                                        </Pie>
                                        <Tooltip content={<HighOctaneTooltip context="stages" />} />
                                    </PieChart>
                                </ResponsiveContainer>
                                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                                    <div style={{ fontSize: '36px', fontWeight: 800, letterSpacing: '-0.07em' }}>845</div>
                                    <div style={{ fontSize: '11px', color: THEME.slate, fontWeight: 800 }}>TOTAL ENTRIES</div>
                                </div>
                            </div>
                            <div style={{ flex: 1 }}>
                                <ResponsiveContainer width="100%" height={280}>
                                    <BarChart data={TENDER_FLOW}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 800 }} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 800 }} />
                                        <Tooltip content={<HighOctaneTooltip context="stages" />} />
                                        <Bar dataKey="val" radius={[10, 10, 0, 0]} barSize={44} onClick={(d) => triggerAuditRegistry('Tender', `Stage Deep-Dive: ${d.name}`)}>
                                            {TENDER_FLOW.map((e, i) => <Cell key={i} fill={i === 4 ? THEME.primary : '#E2E8F0'} />)}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Temporal Financial Trends */}
                    <div className="mesh-card span-8">
                        <span className="card-title-fx">Quarterly Fiscal Dynamics (₹Cr)</span>
                        <div style={{ height: 280 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <ComposedChart data={DISBURSEMENT_SERIES}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                    <XAxis dataKey="m" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 800, fill: THEME.slate }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 800, fill: THEME.slate }} />
                                    <Tooltip content={<HighOctaneTooltip context="disbursement" />} />
                                    <Area dataKey="raised" fill={THEME.primary} fillOpacity={0.06} stroke={THEME.primary} strokeWidth={4} />
                                    <Bar dataKey="paid" fill={THEME.secondary} radius={[6, 6, 0, 0]} barSize={28} onClick={(d) => triggerAuditRegistry('Bill', `Ledger Audit: ${d.m}`)} />
                                    <Line type="monotone" dataKey="benchmark" stroke={THEME.indigo} strokeWidth={4} dot={{ r: 5, fill: 'white', strokeWidth: 2 }} />
                                </ComposedChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="mesh-card span-4">
                        <span className="card-title-fx">Organizational Compliance Radar</span>
                        <div style={{ height: 280 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={SLA_MESH}>
                                    <PolarGrid stroke="#E2E8F0" />
                                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fontWeight: 800, fill: THEME.slate }} />
                                    <Radar name="EE Performance" dataKey="score" stroke={THEME.primary} fill={THEME.primary} fillOpacity={0.15} />
                                    <Tooltip content={<HighOctaneTooltip context="radar" />} />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Section 3: Live Priority Signals & Radial Workflow Aging */}
                    <div className="mesh-card span-4">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
                            <div>
                                <span className="card-title-fx">Priority Signal Feed</span>
                                <div style={{ fontSize: '11px', color: THEME.slate, fontWeight: 600, marginTop: '4px' }}>Real-time triage of critical assets</div>
                            </div>
                            <div className="pulse-primary" />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {RECENT_ALERTS_LOG.map((alert, idx) => (
                                <div key={idx} className="signal-card"
                                    onClick={() => triggerAuditRegistry('Tender', alert.title)}
                                    style={{
                                        position: 'relative',
                                        padding: '20px',
                                        background: 'linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)',
                                        borderRadius: '24px',
                                        border: '1px solid #F1F5F9',
                                        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                                        cursor: 'pointer'
                                    }}>
                                    <div style={{ display: 'flex', gap: '16px' }}>
                                        <div style={{
                                            width: 44, height: 44, borderRadius: '15px',
                                            background: alert.status === 'danger' ? THEME.danger : alert.status === 'warning' ? THEME.warning : THEME.info,
                                            boxShadow: `0 8px 16px ${alert.status === 'danger' ? THEME.danger + '20' : alert.status === 'warning' ? THEME.warning + '20' : THEME.info + '20'}`,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white'
                                        }}>
                                            <Zap size={20} fill="white" />
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                                <span style={{ fontSize: '10px', fontWeight: 800, color: THEME.textMuted }}>{alert.time}</span>
                                                <span style={{ fontSize: '9px', fontWeight: 800, padding: '2px 8px', borderRadius: '100px', background: 'white', border: '1px solid #E2E8F0' }}>{alert.type}</span>
                                            </div>
                                            <div style={{ fontSize: '15px', fontWeight: 800, color: THEME.secondary, marginBottom: '2px' }}>{alert.title}</div>
                                            <div style={{ fontSize: '11px', color: THEME.slate, fontWeight: 600 }}>{alert.detail}</div>
                                        </div>
                                    </div>
                                    <style>{`
                                        .signal-card:hover { transform: translateY(-4px) scale(1.02); border-color: ${THEME.primary}40; box-shadow: var(--shadow-premium); }
                                    `}</style>
                                </div>
                            ))}
                            <button style={{ border: 'none', background: 'white', border: `1.5px solid ${THEME.primary}`, color: THEME.primary, fontWeight: 800, fontSize: '12px', padding: '16px', borderRadius: '100px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center', transition: 'all 0.3s' }}
                                onMouseEnter={(e) => { e.currentTarget.style.background = THEME.primary; e.currentTarget.style.color = 'white'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.background = 'white'; e.currentTarget.style.color = THEME.primary; }}>
                                OPEN TRIAGE CENTER <ArrowRightLeft size={16} />
                            </button>
                        </div>
                    </div>

                    <div className="mesh-card span-8">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                            <div>
                                <span className="card-title-fx">Radial Workflow Aging</span>
                                <div style={{ fontSize: '11px', color: THEME.slate, fontWeight: 600, marginTop: '4px' }}>Concentric distribution of lifecycle latency</div>
                            </div>
                            <div style={{ display: 'flex', gap: '20px' }}>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontSize: '20px', fontWeight: 800, color: THEME.primary }}>₹14.2 Cr</div>
                                    <div style={{ fontSize: '10px', fontWeight: 800, color: THEME.slate }}>RISK VALUATION</div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontSize: '20px', fontWeight: 800, color: THEME.danger }}>+4.2d</div>
                                    <div style={{ fontSize: '10px', fontWeight: 800, color: THEME.slate }}>AVG DEVIATION</div>
                                </div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', height: 350 }}>
                            <div style={{ flex: 1, height: '100%' }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <RadialBarChart cx="50%" cy="50%" innerRadius="25%" outerRadius="100%" barSize={24} data={AGING_CHART.map(e => ({ ...e, val: e.count }))}>
                                        <RadialBar
                                            minAngle={15}
                                            label={{ position: 'insideStart', fill: '#fff', fontSize: 10, fontWeight: 800 }}
                                            background
                                            clockWise
                                            dataKey="val"
                                            radius={20}
                                            onClick={(d) => triggerAuditRegistry('Tender', `Aging Audit: ${d.range}`)}
                                        >
                                            {AGING_CHART.map((e, i) => (
                                                <Cell key={i} fill={e.range === '15d+' ? THEME.primary : THEME.palette[i + 1]} />
                                            ))}
                                        </RadialBar>
                                        <Tooltip content={<HighOctaneTooltip context="aging" />} />
                                        <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={{ right: 0, fontSize: '12px', fontWeight: 800 }} />
                                    </RadialBarChart>
                                </ResponsiveContainer>
                            </div>
                            <div style={{ width: '220px', padding: '20px', background: '#F8FAFC', borderRadius: '32px', border: '1px solid #F1F5F9' }}>
                                <h4 style={{ fontSize: '12px', fontWeight: 800, color: THEME.secondary, marginBottom: '16px', textTransform: 'uppercase' }}>Aging Insights</h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    {AGING_CHART.map((e, i) => (
                                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span style={{ fontSize: '11px', fontWeight: 700, color: THEME.slate }}>{e.range}</span>
                                            <span style={{ fontSize: '13px', fontWeight: 800, color: THEME.secondary }}>{e.count} Assets</span>
                                        </div>
                                    ))}
                                </div>
                                <div style={{ borderTop: '1px dashed #CBD5E1', marginTop: '16px', paddingTop: '16px' }}>
                                    <div style={{ fontSize: '10px', color: THEME.slate, fontWeight: 700 }}>CRITICAL THRESHOLD</div>
                                    <div style={{ fontSize: '16px', fontWeight: 800, color: THEME.danger }}>32 Actions</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section 4: Master Execution Registry */}
                    <div className="span-12 ledger-container" style={{ animation: 'fadeInUp 1s ease' }}>
                        <div style={{ padding: '36px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <h3 style={{ fontSize: '22px', fontWeight: 800, letterSpacing: '-0.05em' }}>Operational Strategic Registry</h3>
                                <p style={{ fontSize: '13px', color: THEME.slate, fontWeight: 600 }}>Decentralized operational coordination for mission-critical command.</p>
                            </div>
                            <button style={{ color: THEME.primary, background: THEME.primarySoft, border: 'none', padding: '12px 30px', borderRadius: '100px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }} onClick={() => triggerAuditRegistry('Worklist', 'Consolidated System Catalog')}>
                                EXPLORE REPOSITORY <ArrowUpRight size={20} />
                            </button>
                        </div>
                        <table className="ledger-table">
                            <thead>
                                <tr>
                                    <th>Asset Descriptor</th>
                                    <th>Regulatory Phase</th>
                                    <th>Project Context Profile</th>
                                    <th>Audit Aging</th>
                                    <th>Escalation Risk</th>
                                    <th>Process Step Owner</th>
                                </tr>
                            </thead>
                            <tbody>
                                {MASTER_REGISTRY.map((item, i) => (
                                    <tr key={i}>
                                        <td style={{ fontWeight: 800, fontSize: '15px' }}>{item.id}</td>
                                        <td style={{ color: THEME.primary, fontWeight: 800 }}>{item.stage}</td>
                                        <td style={{ maxWidth: '350px' }}><div style={{ fontWeight: 700 }}>{item.context}</div></td>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', fontWeight: 800 }}>
                                                <div style={{ width: 10, height: 10, borderRadius: '50%', background: item.aging > 7 ? THEME.danger : THEME.success }} />
                                                {item.aging} DAY LAG
                                            </div>
                                        </td>
                                        <td><span style={{ fontSize: '11px', fontWeight: 800, padding: '5px 14px', borderRadius: '100px', background: item.risk === 'High' || item.risk === 'Critical' ? THEME.danger + '10' : '#F0F9FF', color: item.risk === 'High' || item.risk === 'Critical' ? THEME.danger : THEME.info }}>{item.risk} RISK</span></td>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                <div style={{ width: 32, height: 32, borderRadius: '50%', background: THEME.secondary, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 800 }}>{item.owner.split(' ').map(n => n[0]).join('')}</div>
                                                <span style={{ fontWeight: 600, color: THEME.slate }}>{item.owner}</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
