/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Flame, Heart, Sparkles, MessageCircle, ArrowDown } from 'lucide-react';
import { motion } from 'motion/react';

export default function Hero() {
  const whatsappNumber = '918765432890';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Namaste%20Cafe%20Gohana!%20I%20am%20interested%20in%20ordering%20some%20delicious%20home-cooked%20meals.`;

  return (
    <section
      id="home"
      className="relative min-h-screen pt-20 flex items-center justify-center overflow-hidden bg-stone-900 text-white"
    >
      {/* Immersive background image with warm dual-gradient overlay */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1920')] bg-cover bg-center opacity-45" />
      <div className="absolute inset-0 bg-gradient-to-tr from-stone-950 via-stone-900/80 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-stone-900/20" />

      {/* Warm ambient glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Decorative Traditional Indian pattern element */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 opacity-20 pointer-events-none">
        <div className="text-amber-500 text-[100px] leading-none font-serif select-none font-light">
          ॐ
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full z-10 flex flex-col items-center text-center">
        {/* Slogan badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 border border-primary/25 text-primary font-bold text-xs rounded-xs tracking-widest uppercase mb-8 backdrop-blur-xs"
        >
          <Sparkles className="w-4 h-4 text-primary animate-pulse" />
          <span>Ghar Jaisa Swad, Ab Cafe Mein!</span>
        </motion.div>

        {/* Hero title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight max-w-4xl leading-[1.1] mb-6"
        >
          Maa Ke Hath Ka Khana
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-stone-300 text-sm sm:text-base max-w-2xl font-light leading-relaxed mb-10"
        >
          Savor the warmth and comforting taste of pure vegetarian home-style meals, freshly cooked parathas, authentic slow-churned lassi, and Gohana’s legendary giant Desi Ghee Jalebi.
        </motion.p>

        {/* Dual Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center px-4"
        >
          <a
            href="#menu"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-bold text-xs uppercase tracking-widest rounded-xs hover:bg-primary-dark transition-all shadow-lg shadow-primary/25 group cursor-pointer"
          >
            <span>Explore Menu & Order</span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </a>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 border border-white/40 hover:bg-white hover:text-brand-clay text-white font-bold text-xs uppercase tracking-widest rounded-xs transition-all cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-white text-emerald-600 border-none" />
            <span>Order via WhatsApp</span>
          </a>
        </motion.div>

        {/* Quick Highlights / Benefits Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 max-w-4xl w-full"
        >
          {[
            {
              icon: <Flame className="w-5 h-5 text-primary" />,
              title: '100% Desi Ghee',
              desc: 'Pure aromatic medium',
            },
            {
              icon: <Heart className="w-5 h-5 text-primary" />,
              title: 'Maa Ka Secret Masala',
              desc: 'Hand-ground spices',
            },
            {
              icon: <Sparkles className="w-5 h-5 text-primary" />,
              title: 'Pure Vegetarian',
              desc: '100% Hygienic prep',
            },
            {
              icon: <Sparkles className="w-5 h-5 text-primary" />,
              title: 'Famous Gohana Jalebi',
              desc: 'Golden crispy loops',
            },
          ].map((item, index) => (
            <div
              key={index}
              className="p-4 bg-stone-950/40 backdrop-blur-md rounded-xs border border-white/10 hover:border-primary/40 transition-all text-left group"
            >
              <div className="mb-2 p-2 bg-white/5 rounded-xs w-fit group-hover:bg-primary/10 transition-colors">
                {item.icon}
              </div>
              <h3 className="font-sans font-bold text-xs sm:text-sm text-stone-200 mb-0.5">
                {item.title}
              </h3>
              <p className="text-stone-400 text-[11px]">{item.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Curved Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-brand-cream rounded-t-[50px] z-10" />
    </section>
  );
}
