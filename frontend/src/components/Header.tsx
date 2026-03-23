import React, { useState } from 'react';
import { Menu, X, Trophy } from 'lucide-react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = !!localStorage.getItem("token");

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Events', href: '/categories' },
    { name: 'Schedule', href: '/schedule' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="bg-slate-950 text-white shadow-2xl sticky top-0 z-50 border-b border-amber-500/30">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">

          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="absolute -inset-1 bg-amber-500 rounded-full blur opacity-25"></div>
              <div className="relative bg-slate-900 p-2 rounded-full border border-amber-500/50">
                <Trophy className="text-amber-500" size={24} />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tighter uppercase italic">
                Grand <span className="text-amber-500 font-bold not-italic">Competition</span>
              </h1>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">
                Excellence • Culture • Sports
              </p>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-semibold text-slate-300 hover:text-amber-500 transition-all duration-300 uppercase tracking-widest"
              >
                {item.name}
              </a>
            ))}

            {isLoggedIn ? (
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("student_name");
                  localStorage.removeItem("student_id");
                  window.location.reload();
                }}
                className="bg-red-500 px-5 py-2 rounded-full text-sm font-bold"
              >
                LOGOUT
              </button>
            ) : (
              <a href="/register" className="bg-amber-500 px-5 py-2 rounded-full">
                REGISTER NOW
              </a>
            )}
          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-amber-500"
          >
            {isOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden mt-6 bg-slate-900 rounded-2xl p-4 border border-slate-800">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block py-3 px-4 text-slate-300 hover:text-amber-500 font-bold border-b border-slate-800 last:border-0"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}

            {isLoggedIn ? (
              <button
                onClick={() => {
                  localStorage.clear();
                  window.location.reload();
                }}
                className="block mt-4 bg-red-500 text-white px-5 py-2 rounded-full font-bold text-sm w-full"
              >
                LOGOUT
              </button>
            ) : (
              <a
                href="/register"
                className="block mt-4 bg-amber-500 text-slate-950 px-5 py-2 rounded-full font-bold text-sm text-center hover:bg-amber-400"
                onClick={() => setIsOpen(false)}
              >
                REGISTER NOW
              </a>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;