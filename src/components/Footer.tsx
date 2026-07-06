/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChefHat, ArrowUp, Mail, Heart, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1E1B18] text-stone-300 border-t border-brand-stone">
      {/* Upper footer board */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary rounded-xs text-white">
                <ChefHat className="w-5 h-5" />
              </div>
              <span className="font-serif text-lg font-bold text-white tracking-tight">
                Maa Ka Hath Ka Khana
              </span>
            </div>
            <p className="text-stone-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              We bring the nostalgic taste of direct family recipe curries, wood-fired rotis, and the crisp, golden loops of Gohana’s classic Jalebi straight to your hearts.
            </p>
            <div className="text-[11px] text-primary font-bold tracking-widest uppercase">
              • Pure Vegetarian • Desi Ghee Prep •
            </div>
          </div>

          {/* Timings */}
          <div className="space-y-3">
            <h4 className="font-sans font-bold text-sm text-white tracking-wider uppercase">
              Working Hours
            </h4>
            <ul className="space-y-2 text-xs text-stone-400 font-sans">
              <li>
                <strong className="text-stone-300">All Days:</strong> 09:00 AM - 10:00 PM
              </li>
              <li>
                <strong className="text-stone-300">Breakfast (Parathas):</strong> 09:00 AM - 12:00 PM
              </li>
              <li>
                <strong className="text-stone-300">Dinner Thali:</strong> 07:00 PM - 10:00 PM
              </li>
            </ul>
          </div>

          {/* Quick Contact info */}
          <div className="space-y-3">
            <h4 className="font-sans font-bold text-sm text-white tracking-wider uppercase">
              Cafe Gohana
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400 font-sans">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>Near Baroda Road, Gohana, Haryana - 131301</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <a href="tel:8765432890" className="hover:text-primary transition-all">
                  +91 8765432890
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <a href="mailto:gohana.cafe@gmail.com" className="hover:text-primary transition-all">
                  gohana.cafe@gmail.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Separator line */}
        <div className="h-[1px] bg-stone-800/80 my-10" />

        {/* Bottom footer credit & scroll back */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p className="flex items-center gap-1 font-sans">
            <span>&copy; {new Date().getFullYear()} Maa Ka Hath Ka Khana. All Rights Reserved.</span>
            <span className="text-stone-600">|</span>
            <span className="flex items-center gap-0.5">
              Made with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> in Gohana, Haryana
            </span>
          </p>

          <button
            onClick={handleScrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-transparent border border-stone-800 rounded-xs hover:border-primary hover:text-white transition-all text-stone-400 cursor-pointer text-[10px] font-bold uppercase tracking-wider"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
