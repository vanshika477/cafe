/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ShoppingCart, Menu as MenuIcon, X, ChefHat, CalendarDays, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
  onInquiryClick: () => void;
  activeSection: string;
}

export default function Navbar({ cartCount, onCartClick, onInquiryClick, activeSection }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'Our Specialities', href: '#specialities', id: 'specialities' },
    { label: 'Interactive Menu', href: '#menu', id: 'menu' },
    { label: 'Our Story', href: '#story', id: 'story' },
    { label: 'Reviews', href: '#reviews', id: 'reviews' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 h-20 bg-brand-cream/95 backdrop-blur-md border-b border-brand-stone z-40 transition-all duration-300">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="p-2 bg-primary rounded-xs text-white group-hover:bg-primary-dark transition-colors">
              <ChefHat className="w-5.5 h-5.5" />
            </div>
            <div>
              <span className="block font-serif text-lg sm:text-xl font-bold text-brand-clay tracking-tight leading-tight">
                Maa Ka Hath Ka Khana
              </span>
              <span className="block text-[10px] text-primary font-bold tracking-widest uppercase font-sans">
                • Cafe Gohana •
              </span>
            </div>
          </a>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8">
            <ul className="flex items-center gap-6">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <li key={link.id}>
                    <a
                      href={link.href}
                      className={`relative font-sans text-xs uppercase tracking-widest font-semibold transition-colors py-2 ${
                        isActive ? 'text-primary' : 'text-brand-clay/70 hover:text-primary'
                      }`}
                    >
                      {link.label}
                      {isActive && (
                        <motion.span
                          layoutId="activeNavIndicator"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="h-6 w-[1px] bg-brand-stone" />

            {/* Actions */}
            <div className="flex items-center gap-4">
              {/* Cart Button */}
              <button
                onClick={onCartClick}
                className="relative p-2.5 text-brand-clay/80 hover:text-primary bg-brand-stone/40 hover:bg-brand-stone/80 rounded-xs transition-all border border-stone-200/50 flex items-center justify-center cursor-pointer"
                title="Open Cart"
              >
                <ShoppingCart className="w-5 h-5" />
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-1.5 -right-1.5 bg-primary text-white text-[10px] font-bold h-4.5 w-4.5 rounded-full flex items-center justify-center border-2 border-brand-cream shadow-sm"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              {/* Inquiry Button */}
              <button
                onClick={onInquiryClick}
                className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-bold text-xs uppercase tracking-wider rounded-xs hover:bg-primary-dark transition-all cursor-pointer"
              >
                <CalendarDays className="w-4 h-4" />
                <span>Catering & Booking</span>
              </button>
            </div>
          </div>

          {/* Mobile Right Buttons */}
          <div className="flex lg:hidden items-center gap-3">
            {/* Mobile Cart Button */}
            <button
              onClick={onCartClick}
              className="relative p-2.5 text-brand-clay/80 hover:text-primary bg-brand-stone/40 rounded-xs border border-stone-200/50 flex items-center justify-center cursor-pointer"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-[9px] font-bold h-4 w-4 rounded-full flex items-center justify-center border-2 border-brand-cream">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 text-brand-clay/80 hover:text-primary bg-brand-stone/40 rounded-xs border border-stone-200/50 flex items-center justify-center cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-stone-900/40 backdrop-blur-xs z-30 lg:hidden"
            />

            {/* Menu */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-20 right-0 bottom-0 w-72 bg-brand-cream border-l border-brand-stone z-30 lg:hidden flex flex-col p-6 overflow-y-auto justify-between"
            >
              <div className="space-y-6">
                <div className="text-xs font-bold text-primary uppercase tracking-widest flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Navigation
                </div>
                <ul className="space-y-4">
                  {navLinks.map((link) => (
                    <li key={link.id}>
                      <a
                        href={link.href}
                        onClick={handleLinkClick}
                        className={`block text-xs uppercase tracking-widest font-bold py-2 transition-colors ${
                          activeSection === link.id ? 'text-primary pl-2 border-l-2 border-primary' : 'text-brand-clay/80 hover:text-primary'
                        }`}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4 pt-6 border-t border-brand-stone">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onInquiryClick();
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-white font-bold text-xs uppercase tracking-widest rounded-xs hover:bg-primary-dark transition-all"
                >
                  <CalendarDays className="w-4 h-4" />
                  <span>Catering & Booking</span>
                </button>
                <div className="text-center text-[11px] font-mono text-stone-500 uppercase">
                  📍 Near Baroda Road, Gohana
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
