import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Menu, X } from 'lucide-react';

const Header = () => {
    const location = useLocation();
    const [mobileOpen, setMobileOpen] = useState(false);

    const isActive = (path) => location.pathname === path;

    const navLinks = [
        { to: '/', label: 'Home' },
        { to: '/impact', label: 'Impact' },
        { to: '/categories', label: 'Categories' },
    ];

    return (
        <header className="border-b bg-white/95 border-gray-100 sticky top-0 z-50 backdrop-blur-md">
            <div className="flex py-4 px-6 md:px-20 justify-between items-center">
                <Link to="/" className="flex items-center gap-2 group" onClick={() => setMobileOpen(false)}>
                    <Heart className="text-teal-500 fill-teal-500 group-hover:scale-110 transition-transform" size={24} />
                    <div className="text-2xl font-black text-slate-900 tracking-tight">Donation</div>
                </Link>

                {/* Desktop nav */}
                <nav className="hidden md:flex gap-10 items-center">
                    {navLinks.map(({ to, label }) => (
                        <Link
                            key={to}
                            to={to}
                            className={`font-bold transition-colors ${isActive(to) ? 'text-teal-600 border-b-2 border-teal-500 pb-1' : 'text-slate-600 hover:text-teal-500'}`}
                        >
                            {label}
                        </Link>
                    ))}
                    <button className="bg-slate-900 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-slate-800 hover:-translate-y-0.5 transition-all active:scale-95">
                        Donate
                    </button>
                </nav>

                {/* Mobile hamburger */}
                <button
                    className="md:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
                    onClick={() => setMobileOpen(prev => !prev)}
                    aria-label="Toggle menu"
                >
                    {mobileOpen ? <X size={26} /> : <Menu size={26} />}
                </button>
            </div>

            {/* Mobile drawer */}
            <div
                className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
            >
                <nav className="flex flex-col gap-1 px-6 pb-6 pt-2 border-t border-slate-100">
                    {navLinks.map(({ to, label }) => (
                        <Link
                            key={to}
                            to={to}
                            onClick={() => setMobileOpen(false)}
                            className={`font-bold py-3 px-4 rounded-xl transition-colors ${isActive(to) ? 'text-teal-600 bg-teal-50' : 'text-slate-700 hover:bg-slate-50 hover:text-teal-500'}`}
                        >
                            {label}
                        </Link>
                    ))}
                    <button className="mt-2 bg-slate-900 text-white py-3.5 rounded-xl font-bold shadow hover:bg-slate-800 transition-all active:scale-95">
                        Donate
                    </button>
                </nav>
            </div>
        </header>
    );
};

export default Header;
