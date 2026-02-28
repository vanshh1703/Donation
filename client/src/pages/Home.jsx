import { TrendingUp, Users, Heart, Shield, Globe, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, ExternalLink, CheckCircle2 } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { Link } from 'react-router-dom';
import Header from "../components/Header";
import banner from "../assets/banner.png";
import impactBanner from "../assets/impact_banner.png";

const IMPACT_DATA = [
    { month: 'Jan', donations: 4000, lives: 240 },
    { month: 'Feb', donations: 3000, lives: 198 },
    { month: 'Mar', donations: 2000, lives: 150 },
    { month: 'Apr', donations: 2780, lives: 210 },
    { month: 'May', donations: 1890, lives: 130 },
    { month: 'Jun', donations: 2390, lives: 180 },
    { month: 'Jul', donations: 3490, lives: 250 },
];

const RECENT_DONORS = [
    { id: 1, name: "Rahul Sharma", amount: "₹5,000", time: "2 mins ago", category: "Hospital" },
    { id: 2, name: "Sneha Kapur", amount: "₹2,500", time: "15 mins ago", category: "School" },
    { id: 3, name: "Amit Patel", amount: "₹10,000", time: "1 hour ago", category: "Orphanage" },
    { id: 4, name: "Priya V.", amount: "₹1,200", time: "3 hours ago", category: "Animal Shelter" },
];

export default function Home() {
    return (
        <div className="bg-gray-50 min-height-screen flex flex-col">
            <Header />

            <main className="grow">
                <div className="flex flex-col md:flex-row justify-evenly items-center bg-linear-to-br from-amber-50 to-teal-50 py-12 px-6 md:px-20 gap-10">
                    <div className="max-w-xl w-full text-center md:text-left space-y-6">
                        <span className="bg-teal-100 text-teal-700 px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider">Trusted by 10k+ Donors</span>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-800 leading-tight">
                            Small Acts, <span className="text-teal-500">Big Impact</span>
                        </h1>
                        <p className="text-lg text-slate-600 leading-relaxed font-medium">
                            Join our community of change-makers. Your contribution provides food, education, and healthcare to those who need it most.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                            <Link to="/categories" className="bg-teal-500 text-white px-8 py-3.5 rounded-xl font-bold text-lg shadow-xl shadow-teal-200 hover:bg-teal-600 hover:-translate-y-1 transition-all inline-block text-center">
                                Donate Now
                            </Link>
                            <Link to="/learn-more" className="border-2 border-slate-200 text-slate-600 px-8 py-3.5 rounded-xl font-bold text-lg hover:border-teal-500 hover:text-teal-500 transition-all inline-block text-center">
                                Learn More
                            </Link>
                        </div>
                    </div>
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-teal-500 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                        <img src={banner} alt="banner" className="relative w-full max-w-md h-auto rounded-3xl shadow-2xl" />
                    </div>
                </div>

                <section className="py-16 px-6 md:px-20">
                    <div className="max-w-2xl mx-auto text-center mb-12 space-y-4">
                        <h2 className="text-3xl font-bold text-slate-800">Explore Causes</h2>
                       
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { title: "Feed a Homeless Person", desc: "Every meal counts. Provide nutritious food to those living on the streets.", icon: <Heart className="text-rose-500" /> },
                            { title: "Support an Orphanage", desc: "Help children find hope and a bright future with essential supplies.", icon: <Users className="text-blue-500" /> },
                            { title: "Old Age Home Care", desc: "Ensure senior citizens live with dignity and the medical care they deserve.", icon: <Shield className="text-amber-500" /> },
                            { title: "Emergency Hospital Fund", desc: "Support critical surgeries and life-saving treatments for the needy.", icon: <TrendingUp className="text-emerald-500" /> },
                            { title: "Education for All", desc: "Provide books, uniforms, and scholarships for underprivileged students.", icon: <Heart className="text-violet-500" /> },
                            { title: "Animal Shelter Relief", desc: "Help us rescue and rehabilitate abandoned and injured animals.", icon: <Heart className="text-teal-500" /> }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-white border border-slate-100 rounded-3xl p-8 hover:shadow-2xl hover:shadow-teal-100 transition-all duration-300 group flex flex-col">
                                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 hover:bg-teal-500 transition-colors">
                                    {/* Using Lucide icon dynamically would be better but keeping it simple for now */}
                                    <div className="group-hover:text-white transition-colors">{item.icon}</div>
                                </div>
                                <h3 className="text-2xl font-bold text-slate-800 mb-3">{item.title}</h3>
                                <p className="text-slate-500 leading-relaxed mb-6">{item.desc}</p>
                                <Link to="/categories" className="w-full py-4 bg-teal-50 text-teal-600 rounded-2xl font-bold hover:bg-teal-500 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 mt-auto">
                                    Donate Now <ExternalLink size={16} />
                                </Link>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="bg-slate-900 py-20 px-6 md:px-20 text-white overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" /></pattern></defs><rect width="100%" height="100%" fill="url(#grid)" /></svg>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <h2 className="text-4xl md:text-5xl font-black leading-tight italic">Platform <span className="text-teal-400">Momentum</span></h2>
                            <p className="text-slate-400 text-lg max-w-lg">
                                Real-time analytical overview of our collective progress. Every pixel reflects a life changed and a future secured.
                            </p>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="bg-white/5 backdrop-blur-md p-6 rounded-3xl border border-white/10">
                                    <div className="text-3xl font-black text-teal-400">₹8.4Cr</div>
                                    <div className="text-sm font-bold text-slate-500 uppercase mt-1">Total Raised</div>
                                </div>
                                <div className="bg-white/5 backdrop-blur-md p-6 rounded-3xl border border-white/10">
                                    <div className="text-3xl font-black text-emerald-400">12,400+</div>
                                    <div className="text-sm font-bold text-slate-500 uppercase mt-1">Lives Touched</div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/5 backdrop-blur-xl p-8 rounded-[40px] border border-white/10 shadow-2xl">
                            <div className="flex justify-between items-center mb-10">
                                <div className="font-bold text-slate-300">Monthly Performance</div>
                                <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold">
                                    <TrendingUp size={16} /> +24% Growth
                                </div>
                            </div>
                            <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={IMPACT_DATA}>
                                        <defs>
                                            <linearGradient id="colorDonations" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.8} />
                                                <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                        <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" axisLine={false} tickLine={false} style={{ fontSize: '12px', fontWeight: 700 }} />
                                        <YAxis hide />
                                        <Tooltip
                                            contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px' }}
                                            itemStyle={{ color: '#14b8a6', fontWeight: 800 }}
                                        />
                                        <Area type="monotone" dataKey="donations" stroke="#14b8a6" fillOpacity={1} fill="url(#colorDonations)" strokeWidth={4} />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-10 md:py-20 px-6 md:px-20">
                    <div className="relative h-[250px] sm:h-[350px] md:h-[450px] rounded-[32px] md:rounded-[50px] overflow-hidden group shadow-2xl">
                        <img src={impactBanner} alt="Impact" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-linear-to-r from-teal-900/80 to-transparent flex items-center px-8 md:px-24">
                            <div className="max-w-xl text-white space-y-4 md:space-y-6">
                                <h2 className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tight leading-tight">Your legacy starts with a single <span className="text-teal-400 underline decoration-white/30">contribution.</span></h2>
                                <p className="text-teal-100 text-sm md:text-lg font-medium hidden sm:block">Join 500+ corporate partners and thousands of individuals making the world a kinder place.</p>
                                <button className="bg-white text-teal-900 px-6 md:px-10 py-3 md:py-4 rounded-2xl font-black text-base md:text-lg hover:bg-teal-50 hover:shadow-xl transition-all">
                                    Become a Partner
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-amber-50/50 py-20 px-6 md:px-20">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 text-center md:text-left">
                        <div className="space-y-2">
                            <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tighter">Wall of Souls</h2>
                            <p className="text-slate-500 font-bold uppercase text-xs tracking-[0.3em]">Latest contributions to humanity</p>
                        </div>
                        <Link to="/donors" className="text-teal-600 font-black flex items-center gap-2 hover:gap-4 transition-all">
                            View All Donors <TrendingUp size={18} />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {RECENT_DONORS.map((donor) => (
                            <div key={donor.id} className="bg-white p-6 rounded-[32px] shadow-sm hover:shadow-xl transition-all border border-slate-100 group">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 bg-teal-500 rounded-2xl flex items-center justify-center text-white font-black text-xl">
                                        {donor.name[0]}
                                    </div>
                                    <div>
                                        <div className="font-extrabold text-slate-800">{donor.name}</div>
                                        <div className="text-xs font-bold text-slate-400">{donor.time}</div>
                                    </div>
                                </div>
                                <div className="flex justify-between items-end">
                                    <div className="text-2xl font-black text-teal-600">{donor.amount}</div>
                                    <div className="bg-slate-50 text-[10px] font-black uppercase text-slate-500 px-3 py-1 rounded-full group-hover:bg-teal-50 group-hover:text-teal-600 transition-colors">
                                        {donor.category}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            <footer className="bg-slate-900 text-slate-300 py-20 px-6 md:px-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
                    <div className="space-y-6">
                        <div className="flex items-center gap-2">
                            <Heart className="text-teal-400 fill-teal-400" size={28} />
                            <div className="text-3xl font-black text-white tracking-tight">Donation</div>
                        </div>
                        <p className="text-slate-400 font-medium leading-relaxed">
                            Empowering communities through transparent and impactful giving. Every donation makes a measurable difference.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center text-white hover:bg-teal-500 transition-colors"><Facebook size={18} /></a>
                            <a href="#" className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center text-white hover:bg-teal-500 transition-colors"><Twitter size={18} /></a>
                            <a href="#" className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center text-white hover:bg-teal-500 transition-colors"><Instagram size={18} /></a>
                            <a href="#" className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center text-white hover:bg-teal-500 transition-colors"><Linkedin size={18} /></a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white font-black uppercase text-sm tracking-widest mb-8">Quick Links</h4>
                        <ul className="space-y-4 font-bold">
                            <li><Link to="/learn-more" className="hover:text-teal-400 transition-colors">About our Mission</Link></li>
                            <li><Link to="/impact" className="hover:text-teal-400 transition-colors">Impact Reports 2025</Link></li>
                            <li><Link to="/suggest-cause" className="hover:text-teal-400 transition-colors">Suggest a Cause</Link></li>
                            <li><Link to="/fundraiser" className="hover:text-teal-400 transition-colors">Start a Fundraiser</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-black uppercase text-sm tracking-widest mb-8">Support</h4>
                        <ul className="space-y-4 font-bold">
                            <li><a href="#" className="hover:text-teal-400 transition-colors">Donor Help Center</a></li>
                            <li><a href="#" className="hover:text-teal-400 transition-colors">Transparency Policy</a></li>
                            <li><a href="#" className="hover:text-teal-400 transition-colors">Privacy & Security</a></li>
                            <li><a href="#" className="hover:text-teal-400 transition-colors">Tax Benefits</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-black uppercase text-sm tracking-widest mb-8">Contact</h4>
                        <ul className="space-y-4 font-bold">
                            <li className="flex items-center gap-3"><MapPin size={18} className="text-teal-400" /> Dehradun, Uttarakhand, IN</li>
                            <li className="flex items-center gap-3"><Phone size={18} className="text-teal-400" /> +91 98765 43210</li>
                            <li className="flex items-center gap-3"><Mail size={18} className="text-teal-400" /> help@donation.org</li>
                        </ul>
                    </div>
                </div>

                <div className="pt-10 border-top border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-sm font-bold text-slate-500">
                    <div>© 2026 Donation Foundation. All rights reserved.</div>
                    <div className="flex gap-8 italic">
                        <span>Built for Impact</span>
                        <span>Privacy Policy</span>
                        <span>Terms of Service</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
