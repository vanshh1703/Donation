import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import { Heart, Star, Zap, CheckCircle2, Clock, MapPin, Share2, ArrowLeft, ShieldCheck, TrendingUp, Users } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import medical from '../assets/medical.jpg'
import animal from '../assets/animal.jpg'
import water from '../assets/water.jpg'

const CATEGORIES = [
    {
        id: 1,
        title: "Education for All",
        description: "Empowering young minds with quality education, books, and scholarship programs to build a brighter future.",
        longDescription: "Our education initiative goes beyond providing basic literacy. We set up high-tech learning centers in rural clusters, provide physical textbooks, and facilitate digital learning through tablet distribution. Our mission is to ensure that no child's future is limited by their zip code. We also provide vocational training for elder students to ensure they are job-ready after their secondary education.",
        stats: "4,200+ Students Helped",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800",
        color: "bg-teal-500",
        accent: "text-teal-600",
        goal: "₹50,00,000",
        raised: "₹32,45,000",
        pct: 65
    },
    {
        id: 2,
        title: "Medical & Healthcare",
        description: "Providing life-saving surgeries, medicine, and critical healthcare support to underprivileged communities.",
        longDescription: "Healing is a human right, not a luxury. Our healthcare mission focuses on funding critical surgeries, heart transplants, and cancer treatments for those who cannot afford it. We operate mobile clinics that reach the deepest parts of the country, providing basic checkups and medicine. Every donation goes directly into our 'Surgery Fund' which is monitored by a board of senior medical professionals.",
        stats: "12,000+ Treatments Funded",
        rating: 4.8,
        image: medical,
        color: "bg-rose-500",
        accent: "text-rose-600",
        goal: "₹80,00,000",
        raised: "₹58,90,000",
        pct: 73
    },
    {
        id: 3,
        title: "Hunger Relief",
        description: "Eliminating hunger through community kitchens and daily meal distribution programs for the homeless.",
        longDescription: "No one should go to bed hungry. Our 'Zero Hunger' program operates community kitchens that serve over 5,000 nutritious meals daily. We focus on low-income urban areas where food security is a major issue. We also partner with local grocery stores to rescue surplus food and distribute it to shelters and orphanages. Your support helps us expand our kitchen capacity and reach more districts.",
        stats: "50,000+ Meals Served",
        rating: 5.0,
        image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800",
        color: "bg-amber-500",
        accent: "text-amber-600",
        goal: "₹40,00,000",
        raised: "₹38,00,000",
        pct: 95
    },
    {
        id: 4,
        title: "Animal Welfare",
        description: "Rescue, rehabilitation, and medical care for abandoned animals and wildlife preservation.",
        longDescription: "Giving a voice to the voiceless. Our animal welfare program rescues abandoned pets and injured wildlife. We operate a multi-specialty animal hospital and a sanctuary for long-term recovery. We also run awareness campaigns on animal rights and provide free vaccinations for community dogs. Your contribution helps us provide food, medicine, and surgeries for animals in desperate need.",
        stats: "850+ Animals Rescued",
        rating: 4.7,
        image: animal,
        color: "bg-emerald-500",
        accent: "text-emerald-600",
        goal: "₹30,00,000",
        raised: "₹12,40,000",
        pct: 41
    },
    {
        id: 5,
        title: "Clean Water",
        description: "Installing water filtration systems and building wells in remote villages to ensure safe drinking water.",
        longDescription: "Clean water is the foundation of health. We identify villages plagued by waterborne diseases and install community-scale UF-RO filtration systems. We also dig deep borewells in drought-prone regions. Our maintenance team trains local 'Water Committees' to manage the systems sustainably. Your donation ensures a child doesn't have to walk 5 miles for a bucket of contaminated water.",
        stats: "150+ Wells Dug",
        rating: 4.9,
        image: water,
        color: "bg-blue-500",
        accent: "text-blue-600",
        goal: "₹60,00,000",
        raised: "₹45,60,000",
        pct: 76
    },
    {
        id: 6,
        title: "Disaster Relief",
        description: "Rapid response and emergency aid for communities affected by natural calamities and crises.",
        longDescription: "When disaster strikes, every second counts. Our 'Rapid Force' team is equipped with survival kits, temporary shelters, and emergency food supplies to be deployed within 24 hours of a natural calamity. We also assist in long-term rehabilitation by helping families rebuild their homes and livelihoods. Your support keeps our 'Crisis Fund' ready for the next emergency.",
        stats: "Rapid 24h Response",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&q=80&w=800",
        color: "bg-violet-500",
        accent: "text-violet-600",
        goal: "₹75,00,000",
        raised: "₹21,00,000",
        pct: 28
    }
];

const IMPACT_CHART = [
    { day: 'Mon', impact: 400 },
    { day: 'Tue', impact: 600 },
    { day: 'Wed', impact: 500 },
    { day: 'Thu', impact: 900 },
    { day: 'Fri', impact: 700 },
    { day: 'Sat', impact: 1100 },
    { day: 'Sun', impact: 1300 },
];

export default function MissionDetails() {
    const { id } = useParams();
    const mission = CATEGORIES.find(c => c.id === parseInt(id));

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!mission) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-black text-slate-900">Mission Not Found</h1>
                    <Link to="/categories" className="text-teal-600 font-bold hover:underline flex items-center justify-center gap-2">
                        <ArrowLeft size={18} /> Back to Categories
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen flex flex-col font-sans selection:bg-teal-100 selection:text-teal-900">
            <Header />

            <main className="grow pb-24">
                {/* Full Width Hero */}
                <div className="relative h-[45vh] min-h-[280px] md:h-[600px] overflow-hidden">
                    <img src={mission.image} alt={mission.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-slate-900/40 to-transparent"></div>

                    <div className="absolute bottom-6 md:bottom-20 left-4 md:left-20 right-4 max-w-4xl text-white space-y-3 md:space-y-6">
                        <Link to="/categories" className="inline-flex items-center gap-2 text-teal-400 font-bold hover:text-white transition-colors mb-2 group">
                            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to All Missions
                        </Link>
                        <div className="flex items-center gap-3">
                            <div className={`w-2 md:w-3 h-8 md:h-12 ${mission.color} rounded-full shrink-0`}></div>
                            <h1 className="text-3xl sm:text-5xl md:text-7xl font-black tracking-tighter italic leading-tight">{mission.title}</h1>
                        </div>
                        <p className="text-base md:text-xl text-slate-300 font-medium max-w-2xl leading-relaxed line-clamp-3 md:line-clamp-none">
                            {mission.description}
                        </p>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 md:px-20 -mt-6 md:-mt-10 relative z-20">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                        {/* Main Content Area */}
                        <div className="lg:col-span-2 space-y-12">
                            {/* Mission Description Card */}
                            <div className="bg-white rounded-[40px] p-10 shadow-2xl shadow-slate-200 border border-slate-50 space-y-8">
                                <div className="flex flex-wrap gap-6 border-b border-slate-100 pb-8">
                                    <div className="flex flex-col">
                                        <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Verified by</span>
                                        <span className="text-base font-bold text-slate-900 flex items-center gap-2 italic">Donation Transparency Committee <CheckCircle2 size={16} className="text-emerald-500" /></span>
                                    </div>
                                    <div className="w-px h-10 bg-slate-100 hidden md:block"></div>
                                    <div className="flex flex-col">
                                        <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Global Ranking</span>
                                        <span className="text-base font-bold text-slate-900 flex items-center gap-2">Top 1% Impactful Causes <Star size={16} className="text-amber-500 fill-amber-500" /></span>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">The Vision & Strategy</h2>
                                    <p className="text-slate-600 text-lg leading-relaxed font-medium">
                                        {mission.longDescription}
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {[
                                        { label: "Lives Touched", val: "24,000+", icon: <Users className="text-teal-500" /> },
                                        { label: "Districts", val: "18+", icon: <MapPin className="text-blue-500" /> },
                                        { label: "Efficiency", val: "94%", icon: <TrendingUp className="text-violet-500" /> }
                                    ].map((stat, i) => (
                                        <div key={i} className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                                            <div className="mb-4">{stat.icon}</div>
                                            <div className="text-2xl font-black text-slate-900">{stat.val}</div>
                                            <div className="text-xs font-black text-slate-400 uppercase mt-1">{stat.label}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Impact Graph Section */}
                            <div className="bg-slate-900 rounded-[40px] p-10 text-white overflow-hidden relative">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 blur-[80px]"></div>
                                <div className="flex justify-between items-center mb-10 relative z-10">
                                    <div>
                                        <h3 className="text-xl font-black uppercase tracking-tight">Real-time Impact Momentum</h3>
                                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1 italic">Contribution vs Outreach Velocity</p>
                                    </div>
                                </div>
                                <div className="h-[300px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={IMPACT_CHART}>
                                            <defs>
                                                <linearGradient id="colorImpact" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3} />
                                                    <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                                            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 900, fill: '#475569' }} />
                                            <YAxis hide />
                                            <Tooltip
                                                contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '12px' }}
                                                itemStyle={{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }}
                                            />
                                            <Area type="monotone" dataKey="impact" stroke="#14b8a6" strokeWidth={4} fillOpacity={1} fill="url(#colorImpact)" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar / Donation Card */}
                        <div className="space-y-8">
                            <div className="bg-white rounded-[40px] p-8 shadow-2xl shadow-slate-200 border-t-8 border-teal-500 lg:sticky lg:top-32">
                                <div className="space-y-6">
                                    <div className="flex justify-between items-end">
                                        <span className="text-sm font-black text-slate-400 uppercase">Mission Progress</span>
                                        <span className="text-4xl font-black text-slate-900 tracking-tighter">{mission.pct}%</span>
                                    </div>
                                    <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-teal-500 rounded-full" style={{ width: `${mission.pct}%` }}></div>
                                    </div>
                                    <div className="flex justify-between text-base font-bold">
                                        <div className="flex flex-col">
                                            <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Raised</span>
                                            <span className="text-teal-600 font-black">{mission.raised}</span>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Goal</span>
                                            <span className="text-slate-900 font-black">{mission.goal}</span>
                                        </div>
                                    </div>

                                    <div className="pt-6 space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            {["₹500", "₹1,000", "₹2,500", "₹5,000"].map((amt, i) => (
                                                <button key={i} className="py-4 border-2 border-slate-100 rounded-2xl font-black text-slate-600 hover:border-teal-500 hover:text-teal-600 transition-all active:scale-95">
                                                    {amt}
                                                </button>
                                            ))}
                                        </div>
                                        <div className="relative">
                                            <input type="text" placeholder="Enter Custom Amount" className="w-full bg-slate-50 border border-slate-100 py-4 px-6 rounded-2xl font-bold placeholder:text-slate-400 focus:outline-none focus:border-teal-500/50" />
                                        </div>
                                        <button className="w-full bg-slate-900 text-white py-5 rounded-[24px] font-black text-xl shadow-xl hover:bg-slate-800 transition-all hover:-translate-y-1 active:scale-95">
                                            Support This Mission
                                        </button>
                                    </div>

                                    <div className="pt-6 border-t border-slate-100 flex flex-col gap-4">
                                        <div className="flex items-center gap-3 text-slate-500">
                                            <ShieldCheck size={20} className="text-emerald-500" />
                                            <span className="text-xs font-bold uppercase tracking-widest leading-none">Tax-Deductible Donation</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-slate-500">
                                            <Clock size={20} className="text-blue-500" />
                                            <span className="text-xs font-bold uppercase tracking-widest leading-none">Instant e-Receipt Generation</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-slate-50 rounded-[40px] p-8 border border-slate-200">
                                <h4 className="text-lg font-black text-slate-900 uppercase tracking-tight mb-6">Spread the Message</h4>
                                <div className="flex gap-4">
                                    <button className="grow bg-white border border-slate-200 py-4 rounded-2xl flex items-center justify-center gap-2 font-bold hover:bg-teal-500 hover:text-white transition-all group">
                                        <Share2 size={18} className="group-hover:scale-110" /> Share
                                    </button>
                                    <button className="w-16 bg-white border border-slate-200 py-4 rounded-2xl flex items-center justify-center text-slate-600 hover:bg-rose-500 hover:text-white transition-all">
                                        <Heart size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Reused Footer from pattern */}
            <footer className="bg-slate-900 text-slate-300 py-24 px-6 md:px-20">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-2">
                        <Heart className="text-teal-400 fill-teal-400" size={32} />
                        <div className="text-2xl font-black text-white tracking-tight uppercase">Donation Foundation</div>
                    </div>
                    <div className="text-xs font-black text-slate-600 uppercase tracking-[0.3em]">
                        © 2026 Transparent Philanthropy Ledger.
                    </div>
                </div>
            </footer>
        </div>
    );
}
