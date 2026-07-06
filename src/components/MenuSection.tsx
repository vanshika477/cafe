/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { Search, Flame, Sparkles, Star, Plus, Check, Info, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MenuItem, CartItem } from '../types';
import { CATEGORIES } from '../data';

interface MenuSectionProps {
  menuItems: MenuItem[];
  onAddToCart: (menuId: string, quantity: number, customizations?: CartItem['customization']) => void;
  cart: CartItem[];
}

export default function MenuSection({ menuItems, onAddToCart, cart }: MenuSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [spiceFilter, setSpiceFilter] = useState<string>('all');
  const [popularOnly, setPopularOnly] = useState<boolean>(false);

  // Tracks which card is currently showing its customization drawer
  const [customizingId, setCustomizingId] = useState<string | null>(null);

  // Customization state for currently selected item
  const [selectedGhee, setSelectedGhee] = useState<'standard' | 'extra' | 'none'>('standard');
  const [selectedSpice, setSelectedSpice] = useState<'default' | 'mild' | 'spicy'>('default');

  // Filter & Search Logic
  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.hindiName && item.hindiName.includes(searchQuery)) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSpice = spiceFilter === 'all' || item.isSpicy === spiceFilter;
      const matchesPopular = !popularOnly || item.isPopular;

      return matchesCategory && matchesSearch && matchesSpice && matchesPopular;
    });
  }, [menuItems, selectedCategory, searchQuery, spiceFilter, popularOnly]);

  const handleOpenCustomization = (item: MenuItem) => {
    setSelectedGhee(item.category === 'beverages' ? 'none' : 'standard');
    setSelectedSpice('default');
    setCustomizingId(item.id);
  };

  const handleConfirmAdd = (itemId: string) => {
    onAddToCart(itemId, 1, {
      gheeOption: selectedGhee,
      spicyLevel: selectedSpice,
    });
    setCustomizingId(null);
  };

  return (
    <section id="menu" className="py-24 px-4 sm:px-6 lg:px-8 bg-brand-cream/40 border-b border-brand-stone scroll-mt-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-2">
            • Interactive Thal / Path •
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-brand-clay tracking-tight mb-4">
            Our Loving Menu
          </h2>
          <div className="h-[1px] w-20 bg-primary mx-auto mb-6" />
          <p className="text-stone-600 text-sm sm:text-base font-light">
            Every dish is cooked fresh upon order by home chefs. Zero artificial preservatives, pure ingredients, and loads of love.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white rounded-xs p-6 border border-brand-stone mb-12 space-y-6">
          {/* Top Row: Search and Quick Toggles */}
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-center">
            {/* Search */}
            <div className="relative w-full lg:max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search thali, sweets, paratha, chai..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-stone-50 border border-stone-200 focus:border-primary rounded-xs text-stone-800 text-sm focus:outline-none transition-all placeholder:text-stone-400"
              />
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
              {/* Spice Filter Dropdown */}
              <div className="flex items-center gap-2 bg-stone-50 border border-stone-200 px-3.5 py-2.5 rounded-xs w-full sm:w-auto">
                <span className="text-xs text-stone-500 font-medium font-sans">Spiciness:</span>
                <select
                  value={spiceFilter}
                  onChange={(e) => setSpiceFilter(e.target.value)}
                  className="bg-transparent border-none text-xs font-bold text-stone-800 focus:outline-none cursor-pointer font-sans"
                >
                  <option value="all">All Spice Levels</option>
                  <option value="low">Mild (Low)</option>
                  <option value="medium">Medium</option>
                  <option value="high">Spicy (High)</option>
                </select>
              </div>

              {/* Popular Checkbox Tag */}
              <button
                onClick={() => setPopularOnly(!popularOnly)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xs text-xs uppercase tracking-wider font-bold transition-all border cursor-pointer w-full sm:w-auto justify-center ${
                  popularOnly
                    ? 'bg-primary/15 border-primary/30 text-primary'
                    : 'bg-stone-50 border-stone-200 text-brand-clay/70 hover:bg-brand-stone/40'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span>Maa's Favourites Only</span>
              </button>
            </div>
          </div>

          {/* Bottom Row: Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 -mx-2 px-2 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex flex-col items-center justify-center min-w-[120px] px-4 py-3 rounded-xs transition-all border cursor-pointer ${
                    isSelected
                      ? 'bg-primary border-primary text-white shadow-none'
                      : 'bg-stone-50 border-stone-200/50 text-brand-clay/80 hover:bg-brand-stone/40 hover:border-brand-stone'
                  }`}
                >
                  <span className="text-xs uppercase tracking-wider font-bold block">{cat.name}</span>
                  <span
                    className={`text-[9px] uppercase font-bold tracking-widest mt-0.5 ${
                      isSelected ? 'text-brand-stone' : 'text-stone-400'
                    }`}
                  >
                    {cat.hindiName}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-6 flex justify-between items-center px-2">
          <p className="text-stone-500 text-xs sm:text-sm">
            Showing <strong className="text-stone-800">{filteredItems.length}</strong> fresh dishes
          </p>
          {(searchQuery || selectedCategory !== 'all' || spiceFilter !== 'all' || popularOnly) && (
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setSpiceFilter('all');
                setPopularOnly(false);
              }}
              className="text-xs font-bold text-primary hover:text-primary-dark underline cursor-pointer font-sans uppercase tracking-wider"
            >
              Reset all filters
            </button>
          )}
        </div>

        {/* Menu Grid */}
        {filteredItems.length === 0 ? (
          <div className="bg-white rounded-xs p-12 text-center border border-brand-stone max-w-md mx-auto">
            <span className="text-4xl block mb-4">🥣</span>
            <h3 className="font-serif text-lg font-bold text-stone-800 mb-2">No dishes match your choice</h3>
            <p className="text-stone-500 text-xs leading-relaxed">
              Maa says don't worry! Try adjusting your search query, selecting "All Dishes", or lowering the spice filter.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => {
                const cartQty = cart
                  .filter((c) => c.menuId === item.id)
                  .reduce((acc, c) => acc + c.quantity, 0);

                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="group bg-white rounded-xs overflow-hidden border border-brand-stone hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                  >
                    {/* Top Portion */}
                    <div>
                      {/* Image Frame */}
                      <div className="relative h-56 overflow-hidden bg-stone-100">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {/* Gradient overlay for text safety */}
                        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                        {/* Veg Badge */}
                        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-xs flex items-center gap-1.5 border border-emerald-500/20 shadow-xs">
                          <span className="h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-emerald-500/20" />
                          <span className="text-[9px] font-bold text-emerald-800 uppercase tracking-wider font-sans">
                            Pure Veg
                          </span>
                        </div>

                        {/* Popular Badge */}
                        {item.isPopular && (
                          <div className="absolute top-4 right-4 bg-primary text-white font-bold text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-xs flex items-center gap-1">
                            <Sparkles className="w-3 h-3 fill-white" />
                            <span>Maa's Special</span>
                          </div>
                        )}

                        {/* Price Tag Overlay */}
                        <div className="absolute bottom-4 right-4 bg-primary text-white font-mono font-bold text-sm px-3 py-1 rounded-xs border border-primary">
                          ₹{item.price}
                        </div>
                      </div>

                      {/* Content Card Body */}
                      <div className="p-6">
                        {/* Tags */}
                        <div className="flex items-center gap-3 mb-2.5">
                          {/* Rating */}
                          <div className="flex items-center gap-1 text-primary bg-primary/5 px-2 py-0.5 rounded-xs text-xs font-bold">
                            <Star className="w-3.5 h-3.5 fill-primary text-primary border-none" />
                            <span>{item.rating}</span>
                          </div>

                          {/* Spice Level Indicator */}
                          <div
                            className={`flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-xs uppercase tracking-wider ${
                              item.isSpicy === 'low'
                                ? 'bg-emerald-50 text-emerald-700'
                                : item.isSpicy === 'medium'
                                ? 'bg-orange-50 text-orange-700'
                                : 'bg-red-50 text-red-700'
                            }`}
                          >
                            <Flame className="w-3 h-3 fill-current" />
                            <span>{item.isSpicy} Spice</span>
                          </div>
                        </div>

                        {/* Title & Hindi Title */}
                        <h3 className="font-serif text-lg sm:text-xl font-bold text-brand-clay group-hover:text-primary transition-colors">
                          {item.name}
                        </h3>
                        {item.hindiName && (
                          <span className="block text-primary font-serif italic text-sm mb-3">
                            {item.hindiName}
                          </span>
                        )}

                        {/* Description */}
                        <p className="text-stone-500 text-xs sm:text-sm font-light leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {/* Card Actions Bottom */}
                    <div className="p-6 pt-0 border-t border-brand-stone/60 mt-4 flex items-center justify-between gap-4">
                      {/* Sub-tag indicator */}
                      <span className="text-[10px] font-mono text-stone-400 uppercase tracking-wider">
                        {item.category === 'sweets' ? 'Desi Ghee Prep' : 'Homestyle Prep'}
                      </span>

                      {/* Customize / Quick Add Drawer Area */}
                      <div className="relative w-1/2">
                        {customizingId === item.id ? (
                          <div className="absolute right-0 bottom-0 bg-white border border-brand-stone rounded-xs p-4 shadow-xl z-20 w-72 flex flex-col space-y-4">
                            <h4 className="font-serif font-bold text-xs uppercase tracking-widest text-brand-clay border-b border-brand-stone pb-2 flex justify-between items-center">
                              <span>Customize Dish</span>
                              <button
                                onClick={() => setCustomizingId(null)}
                                className="text-primary hover:text-primary-dark text-[10px] uppercase tracking-wider font-bold cursor-pointer font-sans"
                              >
                                Cancel
                              </button>
                            </h4>

                            {/* Ghee Customization */}
                            {item.category !== 'beverages' && (
                              <div className="space-y-1.5">
                                <span className="block text-xs font-semibold text-stone-600">
                                  Desi Ghee / Butter:
                                </span>
                                <div className="grid grid-cols-3 gap-1 bg-stone-50 p-0.5 rounded-xs border border-stone-100">
                                  {(['none', 'standard', 'extra'] as const).map((opt) => (
                                    <button
                                      key={opt}
                                      onClick={() => setSelectedGhee(opt)}
                                      className={`text-[10px] font-bold py-1 px-1 rounded-xs transition-all capitalize cursor-pointer ${
                                        selectedGhee === opt
                                          ? 'bg-primary text-white'
                                          : 'text-stone-500 hover:bg-stone-200'
                                      }`}
                                    >
                                      {opt}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Spice customizer */}
                            {item.category !== 'sweets' && item.category !== 'beverages' && (
                              <div className="space-y-1.5">
                                <span className="block text-xs font-semibold text-stone-600">
                                  Spiciness Level:
                                </span>
                                <div className="grid grid-cols-3 gap-1 bg-stone-50 p-0.5 rounded-xs border border-stone-100">
                                  {(['mild', 'default', 'spicy'] as const).map((opt) => (
                                    <button
                                      key={opt}
                                      onClick={() => setSelectedSpice(opt)}
                                      className={`text-[10px] font-bold py-1 px-1 rounded-xs transition-all capitalize cursor-pointer ${
                                        selectedSpice === opt
                                          ? 'bg-primary text-white'
                                          : 'text-stone-500 hover:bg-stone-200'
                                      }`}
                                    >
                                      {opt}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}

                            <button
                              onClick={() => handleConfirmAdd(item.id)}
                              className="w-full py-2.5 bg-primary hover:bg-primary-dark text-white text-xs font-bold uppercase tracking-widest rounded-xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              <span>Add to Thali</span>
                            </button>
                          </div>
                        ) : null}

                        {/* Interactive Add Button */}
                        <button
                          onClick={() => handleOpenCustomization(item)}
                          className="w-full flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xs text-xs uppercase tracking-wider font-bold transition-all cursor-pointer border bg-brand-stone/30 hover:bg-brand-stone border-brand-stone/80 text-brand-clay"
                        >
                          {cartQty > 0 ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-primary" />
                              <span>In Thali ({cartQty})</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3.5 h-3.5" />
                              <span>Add to Thali</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
}
