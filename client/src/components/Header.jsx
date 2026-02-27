import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart } from 'lucide-react';

const Header = () => {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <header className="flex border-b bg-white/90 border-gray-100 py-5 px-6 md:px-20 justify-between items-center sticky top-0 z-50 backdrop-blur-md">
            <Link to="/" className="flex items-center gap-2 group">
                <Heart className="text-teal-500 fill-teal-500 group-hover:scale-110 transition-transform" size={24} />
                <div className="text-2xl font-black text-slate-900 tracking-tight">Donation</div>
            </Link>
            <nav className="hidden md:flex gap-10 items-center">
                <Link
                    to="/"
                    className={`font-bold transition-colors ${isActive('/') ? 'text-teal-600 border-b-2 border-teal-500 pb-1' : 'text-slate-600 hover:text-teal-500'}`}
                >
                    Home
                </Link>
                <Link
                    to="/impact"
                    className={`font-bold transition-colors ${isActive('/impact') ? 'text-teal-600 border-b-2 border-teal-500 pb-1' : 'text-slate-600 hover:text-teal-500'}`}
                >
                    Impact
                </Link>
                <a href="#" className="text-slate-600 font-bold hover:text-teal-500 transition-colors">Categories</a>
                <button className="bg-slate-900 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-slate-800 hover:-translate-y-0.5 transition-all active:scale-95">
                    Donate
                </button>
            </nav>
        </header>
    );
};

export default Header;
