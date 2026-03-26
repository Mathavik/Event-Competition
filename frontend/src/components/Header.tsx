import React, { useState } from 'react';
import { Menu, X, Trophy } from 'lucide-react';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = !!localStorage.getItem("token");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const schoolName = localStorage.getItem("school_name");

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
            {/* <div className="relative">
              <div className="absolute -inset-1 bg-amber-500 rounded-full blur opacity-25"></div>
              <div className="relative bg-slate-900 p-2 rounded-full border border-amber-500/50">
                <Trophy className="text-amber-500" size={24} />
              </div>
            </div> */}
            <div className="flex items-center space-x-3">
              <img
                src={logo}

                alt="Event Logo"
                className="h-18 w-auto object-contain"
              />
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
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="bg-amber-500 px-5 py-2 rounded-full text-sm font-bold text-slate-900"
                >
                  {schoolName || "Profile"}
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-slate-900 border border-slate-700 rounded-xl shadow-lg overflow-hidden">
                    <button
                      onClick={() => {
                        localStorage.clear();
                        window.location.reload();
                      }}
                      className="w-full text-left px-4 py-2 text-red-400 hover:bg-slate-800"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <a href="/login" className="bg-amber-500 px-5 py-2 rounded-full">
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
                href="/login"
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