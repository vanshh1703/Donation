import React, { useState, useMemo } from 'react';
import './AllDonors.css';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import {
    Heart, Search, TrendingUp, RefreshCw, Trophy,
    Users, ArrowRight, ChevronDown, Zap, Filter
} from 'lucide-react';

/* ── Donor Data (50 entries) ─────────────────────────────────── */
const ALL_DONORS = [
    { id: 1, name: 'Rahul Sharma', amount: 50000, category: 'healthcare', time: '2 mins ago', recurring: true, featured: true, message: 'Every life saved is a victory for all of us.' },
    { id: 2, name: 'Sneha Kapur', amount: 25000, category: 'education', time: '15 mins ago', recurring: true, featured: true, message: 'Education is the greatest gift.' },
    { id: 3, name: 'Amit Patel', amount: 100000, category: 'water', time: '1 hour ago', recurring: false, featured: true, message: 'Clean water is a basic right, not a luxury.' },
    { id: 4, name: 'Priya V.', amount: 12000, category: 'animals', time: '3 hours ago', recurring: false, featured: false, message: null },
    { id: 5, name: 'Anonymous', amount: 75000, category: 'disaster', time: '5 hours ago', recurring: false, featured: false, message: null, anon: true },
    { id: 6, name: 'Kavya Reddy', amount: 5000, category: 'hunger', time: '6 hours ago', recurring: true, featured: false, message: 'No child should sleep hungry.' },
    { id: 7, name: 'Arjun Nair', amount: 200000, category: 'education', time: '8 hours ago', recurring: false, featured: true, message: 'Investing in education is investing in India\'s future.' },
    { id: 8, name: 'Meera Joshi', amount: 8000, category: 'healthcare', time: '10 hours ago', recurring: true, featured: false, message: null },
    { id: 9, name: 'Rohan Gupta', amount: 15000, category: 'water', time: '12 hours ago', recurring: false, featured: false, message: 'Water is life.' },
    { id: 10, name: 'Ananya Singh', amount: 3000, category: 'animals', time: '1 day ago', recurring: true, featured: false, message: null },
    { id: 11, name: 'Vikram Mehta', amount: 50000, category: 'disaster', time: '1 day ago', recurring: false, featured: false, message: 'Stand with those in need.' },
    { id: 12, name: 'Pooja Sharma', amount: 10000, category: 'education', time: '1 day ago', recurring: true, featured: false, message: null },
    { id: 13, name: 'Anonymous', amount: 30000, category: 'healthcare', time: '1 day ago', recurring: false, featured: false, message: null, anon: true },
    { id: 14, name: 'Suresh Kumar', amount: 7500, category: 'hunger', time: '2 days ago', recurring: true, featured: false, message: 'Feed a family, change a life.' },
    { id: 15, name: 'Lakshmi Iyer', amount: 45000, category: 'water', time: '2 days ago', recurring: false, featured: false, message: null },
    { id: 16, name: 'Dev Chopra', amount: 20000, category: 'education', time: '2 days ago', recurring: false, featured: false, message: null },
    { id: 17, name: 'Nisha Agarwal', amount: 5500, category: 'animals', time: '2 days ago', recurring: true, featured: false, message: 'Rescued pets deserve a second chance.' },
    { id: 18, name: 'Kiran Bose', amount: 35000, category: 'disaster', time: '3 days ago', recurring: false, featured: false, message: null },
    { id: 19, name: 'Sonal Tiwari', amount: 12000, category: 'healthcare', time: '3 days ago', recurring: true, featured: false, message: null },
    { id: 20, name: 'Manav Saxena', amount: 60000, category: 'education', time: '3 days ago', recurring: false, featured: true, message: 'Knowledge is the only weapon that never runs out.' },
    { id: 21, name: 'Anonymous', amount: 15000, category: 'hunger', time: '3 days ago', recurring: true, featured: false, message: null, anon: true },
    { id: 22, name: 'Ritika Verma', amount: 8000, category: 'water', time: '4 days ago', recurring: false, featured: false, message: null },
    { id: 23, name: 'Harsh Malhotra', amount: 25000, category: 'animals', time: '4 days ago', recurring: false, featured: false, message: null },
    { id: 24, name: 'Asha Pillai', amount: 4000, category: 'disaster', time: '4 days ago', recurring: true, featured: false, message: 'In crisis, we rise together.' },
    { id: 25, name: 'Tarun Chandra', amount: 90000, category: 'healthcare', time: '5 days ago', recurring: false, featured: true, message: 'Health is wealth — and everyone deserves it.' },
    { id: 26, name: 'Sangeeta Das', amount: 6000, category: 'education', time: '5 days ago', recurring: true, featured: false, message: null },
    { id: 27, name: 'Rajesh Nair', amount: 18000, category: 'hunger', time: '5 days ago', recurring: false, featured: false, message: null },
    { id: 28, name: 'Preeti Jain', amount: 22000, category: 'water', time: '6 days ago', recurring: true, featured: false, message: 'Clean water changes everything.' },
    { id: 29, name: 'Aakash Pandey', amount: 11000, category: 'animals', time: '6 days ago', recurring: false, featured: false, message: null },
    { id: 30, name: 'Divya Menon', amount: 40000, category: 'disaster', time: '6 days ago', recurring: false, featured: false, message: null },
    { id: 31, name: 'Vinod Shetty', amount: 55000, category: 'education', time: '1 week ago', recurring: true, featured: false, message: null },
    { id: 32, name: 'Anonymous', amount: 7000, category: 'healthcare', time: '1 week ago', recurring: false, featured: false, message: null, anon: true },
    { id: 33, name: 'Gita Rao', amount: 13000, category: 'hunger', time: '1 week ago', recurring: true, featured: false, message: 'Hunger is a crisis we can solve.' },
    { id: 34, name: 'Nikhil Kapoor', amount: 28000, category: 'water', time: '1 week ago', recurring: false, featured: false, message: null },
    { id: 35, name: 'Swati Kulkarni', amount: 9000, category: 'animals', time: '1 week ago', recurring: true, featured: false, message: null },
    { id: 36, name: 'Prakash Rao', amount: 70000, category: 'disaster', time: '1 week ago', recurring: false, featured: true, message: 'Communities must support each other in disaster.' },
    { id: 37, name: 'Deepa Bhatt', amount: 4500, category: 'education', time: '2 weeks ago', recurring: true, featured: false, message: null },
    { id: 38, name: 'Ajay Khanna', amount: 32000, category: 'healthcare', time: '2 weeks ago', recurring: false, featured: false, message: null },
    { id: 39, name: 'Pinky Sharma', amount: 6500, category: 'hunger', time: '2 weeks ago', recurring: true, featured: false, message: null },
    { id: 40, name: 'Sunil Verma', amount: 19000, category: 'water', time: '2 weeks ago', recurring: false, featured: false, message: null },
    { id: 41, name: 'Kamla Devi', amount: 2000, category: 'animals', time: '2 weeks ago', recurring: true, featured: false, message: 'Every rupee counts for an animal in need.' },
    { id: 42, name: 'Rohit Tandon', amount: 48000, category: 'disaster', time: '2 weeks ago', recurring: false, featured: false, message: null },
    { id: 43, name: 'Anonymous', amount: 5000, category: 'education', time: '3 weeks ago', recurring: false, featured: false, message: null, anon: true },
    { id: 44, name: 'Sunita Pillai', amount: 14000, category: 'healthcare', time: '3 weeks ago', recurring: true, featured: false, message: null },
    { id: 45, name: 'Gaurav Soni', amount: 26000, category: 'hunger', time: '3 weeks ago', recurring: false, featured: false, message: null },
    { id: 46, name: 'Rekha Bhardwaj', amount: 11500, category: 'water', time: '3 weeks ago', recurring: true, featured: false, message: null },
    { id: 47, name: 'Mahesh Iyengar', amount: 85000, category: 'education', time: '3 weeks ago', recurring: false, featured: true, message: 'A classroom built with love lasts forever.' },
    { id: 48, name: 'Usha Krishnan', amount: 3500, category: 'animals', time: '1 month ago', recurring: true, featured: false, message: null },
    { id: 49, name: 'Bijay Mohanty', amount: 60000, category: 'disaster', time: '1 month ago', recurring: false, featured: false, message: null },
    { id: 50, name: 'Shweta Dixit', amount: 17000, category: 'healthcare', time: '1 month ago', recurring: true, featured: false, message: 'Healing is a community effort.' },
];

/* ── Top donors podium (by total amount) ─────────────────────── */
const TOP_3 = [...ALL_DONORS]
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 3);

/* ── Config ──────────────────────────────────────────────────── */
const FILTERS = [
    { label: 'All', value: 'all' },
    { label: 'Education', value: 'education' },
    { label: 'Healthcare', value: 'healthcare' },
    { label: 'Hunger', value: 'hunger' },
    { label: 'Animals', value: 'animals' },
    { label: 'Clean Water', value: 'water' },
    { label: 'Disaster', value: 'disaster' },
];

const CAT_META = {
    education: { label: 'Education', cls: 'vad-cat-education' },
    healthcare: { label: 'Healthcare', cls: 'vad-cat-healthcare' },
    hunger: { label: 'Hunger', cls: 'vad-cat-hunger' },
    animals: { label: 'Animals', cls: 'vad-cat-animals' },
    water: { label: 'Clean Water', cls: 'vad-cat-water' },
    disaster: { label: 'Disaster', cls: 'vad-cat-disaster' },
};

const AV_CLASSES = ['vac-av-1', 'vac-av-2', 'vac-av-3', 'vac-av-4', 'vac-av-5', 'vac-av-6'];
const av = (id) => AV_CLASSES[id % AV_CLASSES.length];

const fmt = (n) => `₹${n.toLocaleString('en-IN')}`;

/* ── Ticker ──────────────────────────────────────────────────── */
const TICKER_ITEMS = ALL_DONORS.slice(0, 12);

/* ── Podium card ─────────────────────────────────────────────── */
function PodiumCard({ donor, rank }) {
    const tiers = { 1: 'gold', 2: 'silver', 3: 'bronze' };
    const emojis = { 1: '🥇', 2: '🥈', 3: '🥉' };
    const t = tiers[rank];
    const cat = CAT_META[donor.category];
    return (
        <div className={`vad-podium-card ${t}`}>
            <div className="vad-podium-rank">{emojis[rank]}</div>
            <div className={`vad-podium-avatar ${av(donor.id)}`}>
                {donor.anon ? '?' : donor.name[0]}
            </div>
            <div className="vad-podium-name">{donor.anon ? 'Anonymous' : donor.name}</div>
            <div className={`vad-podium-total ${t}`}>{fmt(donor.amount)}</div>
            <div className={`vad-podium-badge ${t}`}>#{rank} Top Donor</div>
            <div className="vad-podium-missions">{cat?.label}</div>
        </div>
    );
}

/* ── Donor table row ───────────────────────────────────────────── */
function DonorTableRow({ donor }) {
    const cat = CAT_META[donor.category] || { label: 'General', cls: 'vad-cat-general' };
    return (
        <tr className={`vad-table-row ${donor.featured ? 'featured' : ''}`}>
            <td>
                <div className="vad-card-top">
                    <div className={`vad-card-avatar ${av(donor.id)}`}>
                        {donor.anon ? '?' : donor.name[0]}
                    </div>
                    <div>
                        <div className="vad-card-name" style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                            {donor.anon ? 'Anonymous' : donor.name}
                            {donor.anon && <span className="vad-card-anon">Private</span>}
                            {donor.featured && <span style={{ fontSize: 10, fontWeight: 800, color: '#b45309', background: '#fef3c7', padding: '2px 6px', borderRadius: 4 }}>Featured</span>}
                        </div>
                    </div>
                </div>
            </td>
            <td className="vad-cell-time">{donor.time}</td>
            <td className="vad-cell-amount">{fmt(donor.amount)}</td>
            <td><span className={`vad-card-category ${cat.cls}`}>{cat.label}</span></td>
            <td>
                {donor.recurring ? (
                    <div className="vad-card-recurring">
                        <RefreshCw size={11} /> Monthly
                    </div>
                ) : (
                    <span style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8' }}>One-time</span>
                )}
            </td>
            <td className="vad-cell-message">
                {donor.message ? `"${donor.message}"` : <span style={{ color: '#cbd5e1' }}>—</span>}
            </td>
        </tr>
    );
}

/* ── Main Page ───────────────────────────────────────────────── */
export default function AllDonors() {
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('all');
    const [sort, setSort] = useState('recent');
    const [page, setPage] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false);
    const PER_PAGE = 12;

    const filtered = useMemo(() => {
        let list = ALL_DONORS;
        if (filter !== 'all') list = list.filter(d => d.category === filter);
        if (search.trim()) list = list.filter(d =>
            (!d.anon && d.name.toLowerCase().includes(search.toLowerCase())) ||
            d.category.toLowerCase().includes(search.toLowerCase())
        );
        if (sort === 'recent') list = [...list].sort((a, b) => a.id - b.id);
        if (sort === 'highest') list = [...list].sort((a, b) => b.amount - a.amount);
        if (sort === 'lowest') list = [...list].sort((a, b) => a.amount - b.amount);
        if (sort === 'monthly') list = [...list].filter(d => d.recurring);
        return list;
    }, [search, filter, sort]);

    const visible = filtered.slice(0, page * PER_PAGE);
    const hasMore = visible.length < filtered.length;

    const loadMore = async () => {
        setLoadingMore(true);
        await new Promise(r => setTimeout(r, 700));
        setPage(p => p + 1);
        setLoadingMore(false);
    };

    // Totals
    const totalRaised = ALL_DONORS.reduce((s, d) => s + d.amount, 0);
    const monthlyDonors = ALL_DONORS.filter(d => d.recurring).length;
    const uniqueCauses = new Set(ALL_DONORS.map(d => d.category)).size;

    return (
        <div className="vad-page">
            <Header />

            {/* ── Hero ──────────────────────────────────── */}
            <section className="vad-hero">
                <div className="vad-hero-glow vad-hero-glow-1" />
                <div className="vad-hero-glow vad-hero-glow-2" />
                <div className="vad-hero-inner">
                    <div className="vad-hero-eyebrow">
                        <Users size={12} /> Wall of Souls — Every Hero Counts
                    </div>
                    <h1 className="vad-hero-h1">
                        The People Changing <span>India</span>
                    </h1>
                    <p className="vad-hero-p">
                        Every donation below represents a real act of courage and compassion. These are the names — and the stories — behind our collective impact.
                    </p>
                    <div className="vad-hero-stats">
                        <div className="vad-hero-stat">
                            <div className="vad-hero-stat-val">{fmt(totalRaised)}</div>
                            <div className="vad-hero-stat-lab">Total Raised</div>
                        </div>
                        <div className="vad-hero-stat">
                            <div className="vad-hero-stat-val">{ALL_DONORS.length}+</div>
                            <div className="vad-hero-stat-lab">Donors</div>
                        </div>
                        <div className="vad-hero-stat">
                            <div className="vad-hero-stat-val">{monthlyDonors}</div>
                            <div className="vad-hero-stat-lab">Monthly Heroes</div>
                        </div>
                        <div className="vad-hero-stat">
                            <div className="vad-hero-stat-val">{uniqueCauses}</div>
                            <div className="vad-hero-stat-lab">Active Missions</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Live ticker ───────────────────────────── */}
            <div className="vad-ticker" aria-hidden="true">
                <div className="vad-ticker-inner">
                    {[...TICKER_ITEMS, ...TICKER_ITEMS].map((d, i) => (
                        <div key={i} className="vad-ticker-item">
                            <div className="vad-ticker-dot" />
                            <span className="vad-ticker-name">{d.anon ? 'Anonymous' : d.name}</span>
                            <span>donated</span>
                            <span className="vad-ticker-amt">{fmt(d.amount)}</span>
                            <span className="vad-ticker-sep">—</span>
                            <span>{CAT_META[d.category]?.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Top Donors Podium ─────────────────────── */}
            <div className="vad-podium-section">
                <div className="vad-podium-title">
                    <Trophy size={14} /> Top Donors of All Time
                </div>
                <div className="vad-podium">
                    <PodiumCard donor={TOP_3[1]} rank={2} />
                    <PodiumCard donor={TOP_3[0]} rank={1} />
                    <PodiumCard donor={TOP_3[2]} rank={3} />
                </div>
            </div>

            {/* ── Toolbar ───────────────────────────────── */}
            <div className="vad-toolbar">
                <div className="vad-search-wrap">
                    <Search size={16} className="vad-search-icon" />
                    <input
                        type="text"
                        className="vad-search"
                        placeholder="Search by name or category…"
                        value={search}
                        onChange={e => { setSearch(e.target.value); setPage(1); }}
                    />
                </div>
                <select
                    className="vad-sort"
                    value={sort}
                    onChange={e => { setSort(e.target.value); setPage(1); }}
                >
                    <option value="recent">Most Recent</option>
                    <option value="highest">Highest Amount</option>
                    <option value="lowest">Lowest Amount</option>
                    <option value="monthly">Monthly Donors</option>
                </select>
            </div>

            {/* Category filters */}
            <div className="vad-toolbar" style={{ paddingTop: 12 }}>
                <div className="vad-filter-pills">
                    {FILTERS.map(f => (
                        <button
                            key={f.value}
                            className={`vad-filter-pill ${filter === f.value ? 'active' : ''}`}
                            onClick={() => { setFilter(f.value); setPage(1); }}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Result count */}
            <div className="vad-results-row">
                <div className="vad-results-count">
                    Showing <strong>{visible.length}</strong> of <strong>{filtered.length}</strong> donors
                </div>
                {filter !== 'all' || search ? (
                    <button
                        onClick={() => { setFilter('all'); setSearch(''); setPage(1); }}
                        style={{ fontSize: 12, fontWeight: 700, color: '#14b8a6', background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                        Clear filters
                    </button>
                ) : null}
            </div>

            {/* ── Table ───────────────────────────────────── */}
            <div className="vad-table-section">
                {visible.length === 0 ? (
                    <div className="vad-empty" style={{ background: '#fff', borderRadius: 20, border: '1px solid #e2e8f0' }}>
                        <div className="vad-empty-icon">🔍</div>
                        <div className="vad-empty-title">No donors found</div>
                        <div className="vad-empty-sub">Try a different search term or category filter.</div>
                    </div>
                ) : (
                    <table className="vad-table">
                        <thead>
                            <tr>
                                <th>Donor</th>
                                <th>Date</th>
                                <th>Amount</th>
                                <th>Category</th>
                                <th>Type</th>
                                <th>Message</th>
                            </tr>
                        </thead>
                        <tbody>
                            {visible.map(donor => <DonorTableRow key={donor.id} donor={donor} />)}
                        </tbody>
                    </table>
                )}

                {hasMore && visible.length > 0 && (
                    <div className="vad-load-more">
                        <button className="vad-load-btn" onClick={loadMore} disabled={loadingMore}>
                            {loadingMore
                                ? <><div className="vad-load-spinner" /> Loading…</>
                                : <><ChevronDown size={18} /> Load More Donors</>
                            }
                        </button>
                    </div>
                )}
            </div>

            {/* ── CTA strip ─────────────────────────────── */}
            <div className="vad-cta-strip">
                <h2>Add your name to this wall 💙</h2>
                <p>Join thousands of donors transforming lives across India — one mission at a time.</p>
                <Link to="/categories" className="vad-cta-btn">
                    <Zap size={18} /> Start Donating <ArrowRight size={16} />
                </Link>
            </div>

            <footer className="vad-footer">
                <div className="vad-footer-inner">
                    <div className="vad-footer-brand">
                        <Heart size={22} className="vad-footer-heart" fill="currentColor" />
                        Donation Foundation
                    </div>
                    <div className="vad-footer-copy">© 2026 Transparent Philanthropy Ledger</div>
                </div>
            </footer>
        </div>
    );
}
