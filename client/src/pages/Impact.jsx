import React from 'react';
import { TrendingUp, Users, Heart, Globe, ArrowRight, CheckCircle2, ShieldCheck, MapPin, Mail, Phone, Facebook, Twitter, Instagram, Linkedin, BarChart3, PieChart as PieIcon, Activity } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, Legend } from 'recharts';
import { Link } from 'react-router-dom';
import Header from "../components/Header";
import impactSuccess from "../assets/impact_success.png";

const DONATION_BREAKDOWN = [
    { name: 'Direct Aid', value: 75, color: '#14b8a6' },
    { name: 'Logistics', value: 15, color: '#0f172a' },
    { name: 'Future Projects', value: 10, color: '#64748b' },
];
const GROWTH_DATA = [
    { year: '2021', amount: 1200000, lives: 4500 },
    { year: '2022', amount: 2800000, lives: 8200 },
    { year: '2023', amount: 5400000, lives: 15600 },
    { year: '2024', amount: 8400000, lives: 24000 },
];

const REGIONAL_IMPACT = [
    { region: 'North', impact: 45, color: '#14b8a6' },
    { region: 'South', impact: 30, color: '#2dd4bf' },
    { region: 'East', impact: 15, color: '#5eead4' },
    { region: 'West', impact: 10, color: '#99f6e4' },
];

export default function Impact() {
    return (
        <div className="bg-white min-h-screen flex flex-col font-sans selection:bg-teal-100 selection:text-teal-900">
            <Header />

            <main className="grow">
                {/* Hero / Vision Section */}
                <section className="py-24 px-6 md:px-20 bg-linear-to-b from-slate-50 to-white overflow-hidden relative">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className="space-y-8 relative z-10">
                            <div className="inline-flex items-center gap-2 bg-teal-50 text-teal-700 px-4 py-2 rounded-2xl text-sm font-bold uppercase tracking-widest border border-teal-100">
                                <Activity size={16} /> Live Transparency Report
                            </div>
                            <h1 className="text-6xl md:text-7xl font-black text-slate-900 leading-[1.05] tracking-tighter">
                                Where Every <span className="text-teal-500 underline decoration-slate-200">Rupee</span> Matters.
                            </h1>
                            <p className="text-xl text-slate-500 leading-relaxed font-medium max-w-lg">
                                We believe in radical transparency. Track how your contributions are transforming lives across the nation in real-time.
                            </p>
                            <div className="pt-4 flex flex-wrap gap-6">
                                <div className="flex flex-col">
                                    <span className="text-4xl font-black text-slate-900 uppercase">92%</span>
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Efficiency Rate</span>
                                </div>
                                <div className="w-px h-12 bg-slate-200"></div>
                                <div className="flex flex-col">
                                    <span className="text-4xl font-black text-slate-900 uppercase">24k+</span>
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Beneficiaries</span>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute -top-20 -right-20 w-96 h-96 bg-teal-200 rounded-full blur-[100px] opacity-20"></div>
                            <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-amber-200 rounded-full blur-[100px] opacity-20"></div>
                            <img src={impactSuccess} alt="Impact" className="relative z-10 w-full rounded-[48px] shadow-2xl border-12 border-white ring-1 ring-slate-100 object-cover aspect-4/5" />

                            <div className="absolute -bottom-10 -right-10 bg-white p-6 rounded-3xl shadow-xl z-20 border border-slate-50 animate-bounce-slow">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white">
                                        <CheckCircle2 size={24} />
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-slate-400">Verified by</div>
                                        <div className="text-base font-black text-slate-900 uppercase">Global Auditor</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Main Analytics Grid */}
                <section className="py-32 px-6 md:px-20 max-w-7xl mx-auto">
                    <div className="mb-20 text-center space-y-4">
                        <h2 className="text-4xl font-black text-slate-900 tracking-tight">The Anatomy of <span className="text-teal-500">Kindness</span></h2>
                        <p className="text-slate-500 max-w-2xl mx-auto font-medium">Deep dive into our operational metrics and distribution strategy.</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Financial Growth Chart */}
                        <div className="lg:col-span-2 bg-slate-50 rounded-[40px] p-10 border border-slate-100">
                            <div className="flex justify-between items-center mb-10">
                                <div>
                                    <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Growth Trajectory</h3>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Donations vs Lives Impacted</p>
                                </div>
                                <div className="bg-white px-4 py-2 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-2">
                                    <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                                    <span className="text-xs font-bold text-slate-600">Exponential Scaling</span>
                                </div>
                            </div>
                            <div className="h-[400px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={GROWTH_DATA}>
                                        <defs>
                                            <linearGradient id="colorLives" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                        <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 700, fill: '#64748b' }} />
                                        <YAxis hide />
                                        <Tooltip
                                            contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                                            labelStyle={{ fontWeight: 800, color: '#0f172a' }}
                                        />
                                        <Area type="monotone" dataKey="lives" stroke="#14b8a6" strokeWidth={4} fillOpacity={1} fill="url(#colorLives)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Distribution Pie Chart */}
                        <div className="bg-slate-900 rounded-[40px] p-10 text-white flex flex-col items-center">
                            <div className="w-full mb-10">
                                <h3 className="text-xl font-black uppercase tracking-tight">Fund Utilization</h3>
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Transparency Index</p>
                            </div>
                            <div className="h-[300px] w-full relative">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={DONATION_BREAKDOWN}
                                            innerRadius={80}
                                            outerRadius={110}
                                            paddingAngle={8}
                                            dataKey="value"
                                            stroke="none"
                                        >
                                            {DONATION_BREAKDOWN.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px' }}
                                            itemStyle={{ color: '#fff' }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                    <span className="text-4xl font-black tracking-tighter">75%</span>
                                    <span className="text-[10px] font-bold text-slate-500 uppercase">Direct Aid</span>
                                </div>
                            </div>
                            <div className="w-full space-y-3 mt-8">
                                {DONATION_BREAKDOWN.map((item, idx) => (
                                    <div key={idx} className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                                            <span className="text-sm font-bold text-slate-300">{item.name}</span>
                                        </div>
                                        <span className="text-sm font-black text-white">{item.value}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Impact Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">
                        {[
                            { label: "Water Projects", val: "150+", icon: <Globe className="text-blue-500" /> },
                            { label: "Education Hubs", val: "42", icon: <CheckCircle2 className="text-teal-500" /> },
                            { label: "Medical Camps", val: "800+", icon: <TrendingUp className="text-rose-500" /> },
                            { label: "Community Kitchens", val: "12", icon: <Users className="text-amber-500" /> }
                        ].map((stat, i) => (
                            <div key={i} className="bg-white border border-slate-100 p-8 rounded-[32px] hover:-translate-y-2 transition-all duration-300 group">
                                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-teal-50 transition-colors">
                                    {stat.icon}
                                </div>
                                <div className="text-3xl font-black text-slate-900">{stat.val}</div>
                                <div className="text-sm font-bold text-slate-400 mt-1 uppercase tracking-widest">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Regional Impact Heatmap Placeholder */}
                <section className="bg-slate-50 py-32 px-6 md:px-20">
                    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 items-center">
                        <div className="lg:w-1/2 space-y-8">
                            <h2 className="text-4xl font-black text-slate-900 italic tracking-tighter">Regional <span className="text-teal-500">Dominance</span></h2>
                            <p className="text-lg text-slate-600 font-medium leading-relaxed">
                                Our presence is expanding across 18 states, focusing on high-need sectors in underprivileged rural clusters.
                            </p>
                            <div className="space-y-6">
                                {REGIONAL_IMPACT.map((item, i) => (
                                    <div key={i} className="space-y-2">
                                        <div className="flex justify-between items-end">
                                            <span className="text-sm font-black text-slate-900 uppercase">{item.region} Region</span>
                                            <span className="text-sm font-black text-teal-600">{item.impact}% Coverage</span>
                                        </div>
                                        <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden">
                                            <div className="h-full bg-teal-500 rounded-full" style={{ width: `${item.impact}%` }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="lg:w-1/2 bg-white p-4 rounded-[40px] shadow-2xl border border-slate-100">
                            <div className="h-[450px] flex items-center justify-center bg-slate-50 rounded-[32px] relative overflow-hidden group">
                                <MapPin size={80} className="text-teal-200 group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-xs font-black uppercase tracking-[0.4em] text-slate-400 rotate-90 opacity-20 px-8 py-2 border-y border-slate-200">Interactive Map Logic</div>
                                </div>
                                {[...Array(8)].map((_, i) => (
                                    <div key={i} className="absolute w-3 h-3 bg-teal-400 rounded-full animate-ping" style={{ top: `${Math.random() * 80 + 10}%`, left: `${Math.random() * 80 + 10}%`, animationDelay: `${i * 0.5}s` }}></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Call To Action */}
                <section className="py-40 px-6 md:px-20 text-center max-w-4xl mx-auto space-y-12">
                    <div className="space-y-4">
                        <h2 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter">Our Work Only Works <br /><span className="text-teal-500">With You.</span></h2>
                        <p className="text-xl text-slate-500 font-medium italic">Join thousands of others in creating a legacy of impact.</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <button className="bg-teal-500 text-white px-12 py-5 rounded-[24px] font-black text-xl shadow-2xl shadow-teal-200 hover:bg-teal-600 transition-all hover:-translate-y-1">
                            Start Your Journey
                        </button>
                        <button className="bg-white border-2 border-slate-200 text-slate-600 px-12 py-5 rounded-[24px] font-black text-xl hover:border-slate-900 hover:text-slate-900 transition-all">
                            View Story Log
                        </button>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-slate-900 text-slate-300 py-24 px-6 md:px-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24 max-w-7xl mx-auto">
                    <div className="space-y-8">
                        <div className="flex items-center gap-2">
                            <Heart className="text-teal-400 fill-teal-400" size={32} />
                            <div className="text-3xl font-black text-white tracking-tight">Donation</div>
                        </div>
                        <p className="text-slate-400 font-medium leading-relaxed">
                            Pioneering a new era of transparent philanthropy through data-driven impact and radical accountability.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-white hover:bg-teal-500 transition-all"><Facebook size={20} /></a>
                            <a href="#" className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-white hover:bg-teal-500 transition-all"><Twitter size={20} /></a>
                            <a href="#" className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-white hover:bg-teal-500 transition-all"><Instagram size={20} /></a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white font-black uppercase text-sm tracking-widest mb-10">Movement</h4>
                        <ul className="space-y-4 font-bold">
                            <li><a href="#" className="hover:text-teal-400 transition-colors uppercase text-xs tracking-wider">Our History</a></li>
                            <li><a href="#" className="hover:text-teal-400 transition-colors uppercase text-xs tracking-wider">Annual Audit 2026</a></li>
                            <li><a href="#" className="hover:text-teal-400 transition-colors uppercase text-xs tracking-wider">Success Library</a></li>
                            <li><a href="#" className="hover:text-teal-400 transition-colors uppercase text-xs tracking-wider">Global Partners</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-black uppercase text-sm tracking-widest mb-10">Standards</h4>
                        <ul className="space-y-4 font-bold">
                            <li><a href="#" className="hover:text-teal-400 transition-colors uppercase text-xs tracking-wider">Ethical Giving</a></li>
                            <li><a href="#" className="hover:text-teal-400 transition-colors uppercase text-xs tracking-wider">Donor Bill of Rights</a></li>
                            <li><a href="#" className="hover:text-teal-400 transition-colors uppercase text-xs tracking-wider">Security Protocol</a></li>
                            <li><a href="#" className="hover:text-teal-400 transition-colors uppercase text-xs tracking-wider">Data Privacy</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-black uppercase text-sm tracking-widest mb-10">Inquiries</h4>
                        <ul className="space-y-6 font-bold">
                            <li className="flex items-start gap-4">
                                <MapPin size={24} className="text-teal-400 shrink-0" />
                                <span className="text-xs font-black uppercase leading-relaxed">Dehradun Headquarters, <br />Uttarakhand, IN</span>
                            </li>
                            <li className="flex items-center gap-4">
                                <Mail size={24} className="text-teal-400 shrink-0" />
                                <span className="text-xs font-black uppercase tracking-widest">impact@donation.org</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 max-w-7xl mx-auto">
                    <div>© 2026 Donation Foundation. Secured by Blockchain Transparency.</div>
                    <div className="flex gap-10">
                        <span className="flex items-center gap-2"><ShieldCheck size={14} className="text-teal-500" /> Fully Insured</span>
                        <span>Terms of Engagement</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
