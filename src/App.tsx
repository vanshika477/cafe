/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Sparkles, Utensils, Coffee, Heart, Check, Clock, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

// Import sub-components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MenuSection from './components/MenuSection';
import Cart from './components/Cart';
import CateringModal from './components/CateringModal';
import Reviews from './components/Reviews';
import StoryAndContact from './components/StoryAndContact';
import Footer from './components/Footer';

// Data & Types
import { INITIAL_MENU_ITEMS, INITIAL_REVIEWS } from './data';
import { CartItem } from './types';

export default function App() {
  // Global States
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load cart from LocalStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('cafe_gohana_cart');
      if (stored) {
        try {
          setCart(JSON.parse(stored));
        } catch (e) {
          console.error('Error loading cart:', e);
        }
      }
    }
  }, []);

  // Update Section Tracker based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'specialities', 'menu', 'story', 'reviews', 'contact'];
      const scrollPosition = window.scrollY + 120; // offset

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Custom toast notification trigger
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Helper function to stringify customizations for key comparison
  const getCustomizationKey = (cust?: CartItem['customization']) => {
    if (!cust) return '';
    return `${cust.gheeOption || 'standard'}-${cust.spicyLevel || 'default'}`;
  };

  // Cart operations
  const handleAddToCart = (
    menuId: string,
    quantity: number,
    customizations?: CartItem['customization']
  ) => {
    setCart((prevCart) => {
      const matchedIndex = prevCart.findIndex(
        (item) =>
          item.menuId === menuId &&
          getCustomizationKey(item.customization) === getCustomizationKey(customizations)
      );

      let updated: CartItem[];
      const dish = INITIAL_MENU_ITEMS.find((item) => item.id === menuId);
      const dishName = dish ? dish.name : 'Dish';

      if (matchedIndex > -1) {
        // Exists with same customization, increment qty
        updated = [...prevCart];
        updated[matchedIndex].quantity += quantity;
        triggerToast(`Added another portion of ${dishName} to your Thali!`);
      } else {
        // New item configuration
        updated = [...prevCart, { menuId, quantity, customization: customizations }];
        triggerToast(`Added ${dishName} to your Thali!`);
      }

      localStorage.setItem('cafe_gohana_cart', JSON.stringify(updated));
      return updated;
    });
  };

  const handleUpdateQuantity = (
    menuId: string,
    quantity: number,
    customizations?: CartItem['customization']
  ) => {
    setCart((prevCart) => {
      if (quantity <= 0) {
        // Filter out
        const filtered = prevCart.filter(
          (item) =>
            !(
              item.menuId === menuId &&
              getCustomizationKey(item.customization) === getCustomizationKey(customizations)
            )
        );
        localStorage.setItem('cafe_gohana_cart', JSON.stringify(filtered));
        triggerToast('Removed item from your Thali.');
        return filtered;
      }

      const updated = prevCart.map((item) => {
        if (
          item.menuId === menuId &&
          getCustomizationKey(item.customization) === getCustomizationKey(customizations)
        ) {
          return { ...item, quantity };
        }
        return item;
      });

      localStorage.setItem('cafe_gohana_cart', JSON.stringify(updated));
      return updated;
    });
  };

  const handleRemoveItem = (menuId: string, customizations?: CartItem['customization']) => {
    setCart((prevCart) => {
      const filtered = prevCart.filter(
        (item) =>
          !(
            item.menuId === menuId &&
            getCustomizationKey(item.customization) === getCustomizationKey(customizations)
          )
      );
      localStorage.setItem('cafe_gohana_cart', JSON.stringify(filtered));
      triggerToast('Removed item from your Thali.');
      return filtered;
    });
  };

  const handleClearCart = () => {
    if (confirm('Are you sure you want to empty your Thali?')) {
      setCart([]);
      localStorage.removeItem('cafe_gohana_cart');
      triggerToast('Thali cleared.');
    }
  };

  // Calculate total items in the cart
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-brand-cream relative">
      {/* Toast Notification Popups */}
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-50 bg-stone-900 border border-stone-800 text-white text-xs sm:text-sm font-semibold px-4.5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-2.5 animate-bounce">
          <div className="h-5 w-5 rounded-full bg-amber-500 flex items-center justify-center text-stone-950">
            <Check className="w-3.5 h-3.5 font-bold" />
          </div>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header / Navbar */}
      <Navbar
        cartCount={cartCount}
        onCartClick={() => setIsCartOpen(true)}
        onInquiryClick={() => setIsInquiryOpen(true)}
        activeSection={activeSection}
      />

      {/* Hero Intro */}
      <Hero />

      {/* Specialities Showcase Section */}
      <section id="specialities" className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-b border-brand-stone scroll-mt-10">
        <div className="max-w-7xl mx-auto">
          {/* Section title */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-2">
              • Special Highlights •
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-brand-clay tracking-tight mb-4">
              Our Pride & Joy
            </h2>
            <div className="h-[1px] w-20 bg-primary mx-auto mb-6" />
            <p className="text-stone-600 text-sm sm:text-base font-light">
              Crafted exactly like our mothers made in rural Haryana — dense nutrition, natural sweets, and cooked on slow medium flame.
            </p>
          </div>

          {/* Specialities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Utensils className="w-6 h-6 text-primary" />,
                title: 'Ghar Ki Special Thali',
                tagLine: 'Pure Family Feast',
                desc: 'A full brass plate containing multiple curries (Paneer & Yellow Dal), seasonal vegetables, raita, paper-thin butter roti, rice, and kheer. Styled in traditional village taste.',
                image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=800',
              },
              {
                icon: <Sparkles className="w-6 h-6 text-primary" />,
                title: 'Famous Gohana Jalebi',
                tagLine: 'Grand Single-Loop Jalebi',
                desc: 'Golden-orange crisp, heavy-hearted loops fried in direct Desi Ghee and soaked in cardamom saffron water. The ultimate legendary sweet of Gohana.',
                image: 'https://images.unsplash.com/photo-1605197584547-c93ef1a9c5bc?q=80&w=800',
              },
              {
                icon: <Coffee className="w-6 h-6 text-primary" />,
                title: 'Kulhad Ginger Tea & Lassi',
                tagLine: 'Pure Saffron Churns',
                desc: 'Our thick, hand-poured lassis are loaded with almond slivers, and our adrak tea is brewed for 15 minutes to guarantee that perfect refresh.',
                image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=800',
              },
            ].map((special, index) => (
              <div
                key={index}
                className="bg-brand-cream/40 rounded-xs overflow-hidden border border-brand-stone flex flex-col transition-all group"
              >
                <div className="h-64 overflow-hidden bg-stone-100 relative">
                  <img
                    src={special.image}
                    alt={special.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-900/10 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="text-[10px] font-bold text-white uppercase tracking-widest block mb-0.5 opacity-80">
                      {special.tagLine}
                    </span>
                    <h3 className="font-serif font-bold text-lg sm:text-xl text-white">
                      {special.title}
                    </h3>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between items-start space-y-4">
                  <div className="space-y-2">
                    <div className="p-2 bg-brand-stone text-primary rounded-xs w-fit">
                      {special.icon}
                    </div>
                    <p className="text-stone-600 text-xs sm:text-sm leading-relaxed font-light">
                      {special.desc}
                    </p>
                  </div>
                  <a
                    href="#menu"
                    className="text-xs font-bold uppercase tracking-wider text-primary hover:text-primary-dark transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <span>View items in menu</span>
                    <span>&rarr;</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Main Menu */}
      <MenuSection menuItems={INITIAL_MENU_ITEMS} onAddToCart={handleAddToCart} cart={cart} />

      {/* Our Story & Map details */}
      <StoryAndContact />

      {/* Customer Reviews Feedback */}
      <Reviews initialReviews={INITIAL_REVIEWS} menuItems={INITIAL_MENU_ITEMS} />

      {/* Master Footer */}
      <Footer />

      {/* Shopping Cart Sliding Drawer */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        menuItems={INITIAL_MENU_ITEMS}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Catering Inquiry & Table Reservation Dialog Modal */}
      <CateringModal isOpen={isInquiryOpen} onClose={() => setIsInquiryOpen(false)} />
    </div>
  );
}
