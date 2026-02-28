import React from 'react';
import Header from '../components/Header';
import { Heart, Search, Filter, ArrowRight, Star, Users, Briefcase, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import medical from '../assets/medical.jpg'
import animal from '../assets/animal.jpg'
import water from '../assets/water.jpg'
const CATEGORIES = [
    {
        id: 1,
        title: "Education for All",
        description: "Empowering young minds with quality education, books, and scholarship programs to build a brighter future.",
        stats: "4,200+ Students Helped",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800", // Placeholder if user hasn't provided yet
        color: "bg-teal-500"
    },
    {
        id: 2,
        title: "Medical & Healthcare",
        description: "Providing life-saving surgeries, medicine, and critical healthcare support to underprivileged communities.",
        stats: "12,000+ Treatments Funded",
        rating: 4.8,
        image: medical,
        color: "bg-rose-500"
    },
    {
        id: 3,
        title: "Hunger Relief",
        description: "Eliminating hunger through community kitchens and daily meal distribution programs for the homeless.",
        stats: "50,000+ Meals Served",
        rating: 5.0,
        image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800",
        color: "bg-amber-500"
    },
    {
        id: 4,
        title: "Animal Welfare",
        description: "Rescue, rehabilitation, and medical care for abandoned animals and wildlife preservation.",
        stats: "850+ Animals Rescued",
        rating: 4.7,
        image: animal,
        color: "bg-emerald-500"
    },
    {
        id: 5,
        title: "Clean Water",
        description: "Installing water filtration systems and building wells in remote villages to ensure safe drinking water.",
        stats: "150+ Wells Dug",
        rating: 4.9,
        image: water,
        color: "bg-blue-500"
    },
    {
        id: 6,
        title: "Disaster Relief",
        description: "Rapid response and emergency aid for communities affected by natural calamities and crises.",
        stats: "Rapid 24h Response",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&q=80&w=800",
        color: "bg-violet-500"
    }
];

export default function Categories() {
    return (
        <div className="bg-slate-50 min-h-screen flex flex-col font-sans">
            <Header />

            <main className="grow">
                <section className="bg-slate-900 py-20 px-6 md:px-20 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-1/3 h-full bg-teal-500/10 blur-[120px]"></div>
                    <div className="max-w-4xl space-y-6 relative z-10">
                        <span className="text-teal-400 font-bold uppercase tracking-[0.3em] text-sm">Our Vertical of Impact</span>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight italic">
                            Choose Your <span className="text-teal-400">Mission</span>
                        </h1>
                        <p className="text-slate-400 text-xl font-medium max-w-2xl leading-relaxed">
                            Every category represents a unique challenge we're tackling. Select a cause that resonates with you and start making a difference today.
                        </p>
                    </div>

                    <div className="mt-16 flex flex-col md:flex-row gap-4 max-w-5xl">
                        <div className="relative grow group">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-teal-400 transition-colors" size={20} />
                            <input
                                type="text"
                                placeholder="Search for a cause or mission..."
                                className="w-full bg-slate-800/50 border border-slate-700 py-5 pl-16 pr-6 rounded-3xl text-white placeholder:text-slate-500 focus:outline-none focus:border-teal-500/50 focus:ring-4 focus:ring-teal-500/10 transition-all text-lg"
                            />
                        </div>
                        <button className="flex items-center justify-center gap-3 bg-slate-800 border border-slate-700 px-8 py-5 rounded-3xl hover:bg-slate-750 transition-all font-bold">
                            <Filter size={20} /> Filter
                        </button>
                    </div>
                </section>

                <section className="py-24 px-6 md:px-20 max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {CATEGORIES.map((cat) => (
                            <div key={cat.id} className="group bg-white rounded-[40px] overflow-hidden border border-slate-100 hover:shadow-2xl hover:shadow-slate-200 transition-all duration-500 flex flex-col h-full">
                                <div className="relative h-64 overflow-hidden">
                                    <div className={`absolute inset-0 ${cat.color} opacity-20 z-10 mix-blend-multiply`}></div>
                                    <img
                                        src={cat.image}
                                        alt={cat.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute top-6 left-6 z-20">
                                        <div className="bg-white/90 backdrop-blur px-3 py-1 rounded-full flex items-center gap-2 shadow-sm">
                                            <Star size={14} className="text-amber-500 fill-amber-500" />
                                            <span className="text-sm font-bold text-slate-900">{cat.rating}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-8 flex flex-col grow space-y-4">
                                    <div className="flex justify-between items-start">
                                        <h3 className="text-2xl font-black text-slate-900 tracking-tight">{cat.title}</h3>
                                        <div className={`w-3 h-3 rounded-full mt-2 ${cat.color}`}></div>
                                    </div>
                                    <p className="text-slate-500 leading-relaxed font-medium">
                                        {cat.description}
                                    </p>

                                    <div className="pt-4 mt-auto">
                                        <div className="flex items-center gap-3 text-slate-400 mb-6">
                                            <Zap size={18} className="text-teal-500" />
                                            <span className="text-xs font-bold uppercase tracking-widest">{cat.stats}</span>
                                        </div>
                                        <Link to={`/mission/${cat.id}`} className="w-full bg-slate-50 text-slate-900 py-4 rounded-2xl font-black flex items-center justify-center gap-2 group-hover:bg-teal-500 group-hover:text-white transition-all duration-300">
                                            See Mission Details <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Bottom Trust Section */}
                <section className="py-20 bg-teal-500 px-6 md:px-20 text-center text-white">
                    <div className="max-w-4xl mx-auto space-y-8">
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight italic">Don't see a category that fits?</h2>
                        <p className="text-teal-50 text-xl font-medium">
                            We are constantly expanding our reach. You can also start a custom fundraiser or suggest a new category to our transparency committee.
                        </p>
                        <div className="flex flex-wrap justify-center gap-6">
                            <Link to="/suggest-cause" className="bg-slate-900 text-white px-10 py-5 rounded-3xl font-black shadow-xl hover:-translate-y-1 transition-all inline-block text-center">
                                Suggest a Cause
                            </Link>
                            <Link to="/fundraiser" className="bg-white text-teal-600 px-10 py-5 rounded-3xl font-black shadow-xl hover:-translate-y-1 transition-all inline-block text-center">
                                Custom Fundraiser
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="bg-slate-900 text-slate-300 py-16 px-6 md:px-20">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-2">
                        <Heart className="text-teal-400 fill-teal-400" size={24} />
                        <div className="text-xl font-black text-white tracking-tight uppercase">Donation Foundation</div>
                    </div>
                    <div className="text-sm font-bold text-slate-500 uppercase tracking-widest">
                        © 2026 Secured by Transparency.
                    </div>
                </div>
            </footer>
        </div>
    );
}
