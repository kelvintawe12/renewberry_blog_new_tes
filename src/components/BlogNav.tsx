import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Menu, X } from 'lucide-react';
import { CATEGORIES } from '../data/mockData';
import { SearchModal } from './SearchModal';
import { SubscribeModal } from './SubscribeModal';
export function BlogNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);
  // Handle Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  const Logo = () =>
  <Link to="/" className="flex items-center gap-3 group">
      {/* Inline SVG for RenewBerry Logo */}
      <svg
      width="36"
      height="36"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="group-hover:scale-105 transition-transform flex-shrink-0">

        <defs>
          <linearGradient id="berryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0891B2" />
            <stop offset="100%" stopColor="#134E4A" />
          </linearGradient>
        </defs>
        <circle cx="50" cy="55" r="35" fill="url(#berryGrad)" />
        <path d="M50 20 C40 10, 30 20, 50 35" fill="#4ADE80" />
        <path d="M50 20 C60 10, 70 20, 50 35" fill="#22C55E" />
        <path d="M50 20 C50 5, 65 5, 50 35" fill="#16A34A" />
      </svg>
      <div className="flex flex-col justify-center">
        <span className="font-heading text-[0.65rem] leading-none tracking-[0.2em] uppercase text-text-secondary font-bold">
          GoodMorningDewPub
        </span>
        <span className="font-heading font-bold text-xl leading-none text-secondary tracking-tight mt-0.5">
          RenewBerry
        </span>
      </div>
    </Link>;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 bg-white/95 backdrop-blur-md ${isScrolled ? 'shadow-sm border-b border-gray-100 py-3' : 'py-5'}`}>

        <div className="max-w-blog mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Logo />

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-6">
              <NavLink
                to="/"
                className={({ isActive }) =>
                `text-sm font-semibold transition-colors ${isActive ? 'text-primary border-b-2 border-primary pb-1' : 'text-text-secondary hover:text-primary'}`
                }
                end>

                Home
              </NavLink>
              <NavLink
                to="/videos"
                className={({ isActive }) =>
                `text-sm font-semibold transition-colors ${isActive ? 'text-primary border-b-2 border-primary pb-1' : 'text-text-secondary hover:text-primary'}`
                }>

                Videos
              </NavLink>
              <NavLink
                to="/gallery"
                className={({ isActive }) =>
                `text-sm font-semibold transition-colors ${isActive ? 'text-primary border-b-2 border-primary pb-1' : 'text-text-secondary hover:text-primary'}`
                }>

                Gallery
              </NavLink>
              {CATEGORIES.slice(0, 3).map((cat) =>
              <NavLink
                key={cat.id}
                to={`/category/${cat.slug}`}
                className={({ isActive }) =>
                `text-sm font-semibold transition-colors ${isActive ? 'text-primary border-b-2 border-primary pb-1' : 'text-text-secondary hover:text-primary'}`
                }>

                  {cat.name}
                </NavLink>
              )}
              <div className="relative group">
                <button className="text-sm font-semibold text-text-secondary hover:text-primary transition-colors flex items-center gap-1">
                  More{' '}
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">

                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7" />

                  </svg>
                </button>
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2">
                  {CATEGORIES.slice(3).map((cat) =>
                  <NavLink
                    key={cat.id}
                    to={`/category/${cat.slug}`}
                    className="block px-4 py-2 text-sm text-text-secondary hover:bg-gray-50 hover:text-primary">

                      {cat.name}
                    </NavLink>
                  )}
                  <div className="border-t border-gray-100 my-1"></div>
                  <NavLink
                    to="/about"
                    className="block px-4 py-2 text-sm text-text-secondary hover:bg-gray-50 hover:text-primary">

                    About
                  </NavLink>
                  <NavLink
                    to="/team"
                    className="block px-4 py-2 text-sm text-text-secondary hover:bg-gray-50 hover:text-primary">

                    Team
                  </NavLink>
                  <NavLink
                    to="/partners"
                    className="block px-4 py-2 text-sm text-text-secondary hover:bg-gray-50 hover:text-primary">

                    Partners
                  </NavLink>
                  <NavLink
                    to="/contact"
                    className="block px-4 py-2 text-sm text-text-secondary hover:bg-gray-50 hover:text-primary">

                    Contact
                  </NavLink>
                </div>
              </div>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="hidden md:flex items-center gap-2 text-text-secondary hover:text-primary bg-gray-50 hover:bg-gray-100 px-3 py-2 rounded-lg transition-colors text-sm font-medium">

              <Search className="w-4 h-4" />
              <span>Search</span>
              <kbd className="hidden lg:inline-block bg-white border border-gray-200 rounded px-1.5 text-xs text-gray-400 font-sans">
                ⌘K
              </kbd>
            </button>

            <button
              onClick={() => setIsSearchOpen(true)}
              className="md:hidden text-text-secondary hover:text-primary p-2">

              <Search className="w-5 h-5" />
            </button>

            <button
              onClick={() => setIsSubscribeOpen(true)}
              className="hidden sm:block bg-primary hover:bg-primary-hover text-white font-bold py-2 px-5 rounded-lg transition-colors text-sm shadow-md hover:shadow-lg">

              Subscribe
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden text-text-secondary hover:text-primary p-2">

              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen &&
        <>
            <motion.div
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: 1
            }}
            exit={{
              opacity: 0
            }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-secondary/80 backdrop-blur-sm z-50 lg:hidden" />

            <motion.div
            initial={{
              x: '100%'
            }}
            animate={{
              x: 0
            }}
            exit={{
              x: '100%'
            }}
            transition={{
              type: 'spring',
              damping: 25,
              stiffness: 200
            }}
            className="fixed top-0 right-0 bottom-0 w-[80%] max-w-sm bg-white z-50 shadow-2xl flex flex-col lg:hidden">

              <div className="p-5 flex items-center justify-between border-b border-gray-100">
                <Logo />
                <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-600 bg-gray-50 rounded-full">

                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto py-6 px-5 flex flex-col gap-4">
                <NavLink
                to="/"
                className={({ isActive }) =>
                `text-lg font-heading font-bold ${isActive ? 'text-primary' : 'text-text-primary'}`
                }
                end>

                  Home
                </NavLink>
                <NavLink
                to="/videos"
                className={({ isActive }) =>
                `text-lg font-heading font-bold ${isActive ? 'text-primary' : 'text-text-primary'}`
                }>

                  Videos
                </NavLink>
                <NavLink
                to="/gallery"
                className={({ isActive }) =>
                `text-lg font-heading font-bold ${isActive ? 'text-primary' : 'text-text-primary'}`
                }>

                  Gallery
                </NavLink>
                <div className="border-t border-gray-100 my-2"></div>
                {CATEGORIES.map((cat) =>
              <NavLink
                key={cat.id}
                to={`/category/${cat.slug}`}
                className={({ isActive }) =>
                `text-lg font-heading font-bold ${isActive ? 'text-primary' : 'text-text-primary'}`
                }>

                    {cat.name}
                  </NavLink>
              )}
                <div className="border-t border-gray-100 my-2"></div>
                <NavLink
                to="/about"
                className={({ isActive }) =>
                `text-lg font-heading font-bold ${isActive ? 'text-primary' : 'text-text-primary'}`
                }>

                  About
                </NavLink>
                <NavLink
                to="/team"
                className={({ isActive }) =>
                `text-lg font-heading font-bold ${isActive ? 'text-primary' : 'text-text-primary'}`
                }>

                  Team
                </NavLink>
                <NavLink
                to="/partners"
                className={({ isActive }) =>
                `text-lg font-heading font-bold ${isActive ? 'text-primary' : 'text-text-primary'}`
                }>

                  Partners
                </NavLink>
                <NavLink
                to="/contact"
                className={({ isActive }) =>
                `text-lg font-heading font-bold ${isActive ? 'text-primary' : 'text-text-primary'}`
                }>

                  Contact
                </NavLink>
              </div>

              <div className="p-5 border-t border-gray-100">
                <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsSubscribeOpen(true);
                }}
                className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-3 rounded-lg transition-colors shadow-md">

                  Subscribe to Newsletter
                </button>
              </div>
            </motion.div>
          </>
        }
      </AnimatePresence>

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)} />

      <SubscribeModal
        isOpen={isSubscribeOpen}
        onClose={() => setIsSubscribeOpen(false)} />


      {/* Spacer to prevent content from hiding behind fixed header */}
      <div className="h-20"></div>
    </>);

}