/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { X, CalendarDays, Users, Phone, FileText, CheckCircle2, History, Trash2, Calendar, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CateringInquiry } from '../types';

interface CateringModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SavedBooking extends CateringInquiry {
  id: string;
  timestamp: string;
  status: 'Pending Confirmation' | 'Confirmed';
}

export default function CateringModal({ isOpen, onClose }: CateringModalProps) {
  const [inquiryType, setInquiryType] = useState<'table' | 'catering'>('table');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [guests, setGuests] = useState(4);
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [savedBookings, setSavedBookings] = useState<SavedBooking[]>([]);
  const [activeTab, setActiveTab] = useState<'form' | 'history'>('form');

  // Load history from LocalStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('cafe_gohana_bookings');
      if (stored) {
        try {
          setSavedBookings(JSON.parse(stored));
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, [isOpen, isSubmitted]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !date) {
      return;
    }

    const newBooking: SavedBooking = {
      id: 'book-' + Date.now(),
      name,
      phone,
      date,
      guests,
      eventType: inquiryType === 'table' ? 'Family Table Reservation' : 'Catering / Bulk Order',
      message,
      timestamp: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      status: 'Pending Confirmation',
    };

    const updated = [newBooking, ...savedBookings];
    localStorage.setItem('cafe_gohana_bookings', JSON.stringify(updated));
    setSavedBookings(updated);

    // Trigger WhatsApp notification for instant checkout
    const whatsappNum = '918765432890';
    const msg = `*🍽️ Cafe Gohana - Booking/Catering Inquiry*
----------------------------------------
*Type:* ${inquiryType === 'table' ? 'Family Table Reservation' : 'Catering / Bulk Order'}
*Customer Name:* ${name}
*Phone:* ${phone}
*Date / Time Required:* ${date}
*Number of Guests:* ${guests} Pax
${message.trim() ? `*Special Request/Menu:*\n"${message}"` : ''}

Please confirm availability and booking status. Thank you! 🙏🏼`;

    window.open(`https://wa.me/${whatsappNum}?text=${encodeURIComponent(msg)}`, '_blank');

    setIsSubmitted(true);
    // Reset form
    setName('');
    setPhone('');
    setDate('');
    setGuests(4);
    setMessage('');
  };

  const handleDeleteBooking = (id: string) => {
    const filtered = savedBookings.filter((b) => b.id !== id);
    localStorage.setItem('cafe_gohana_bookings', JSON.stringify(filtered));
    setSavedBookings(filtered);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-stone-950/60 backdrop-blur-xs z-50 flex items-center justify-center p-4"
          >
            {/* Modal Body Card */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-brand-cream rounded-xs border border-brand-stone shadow-2xl max-w-lg w-full overflow-hidden max-h-[90vh] flex flex-col justify-between"
            >
              {/* Header */}
              <div className="p-6 border-b border-brand-stone bg-white flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-brand-clay">
                    Catering & Table Bookings
                  </h3>
                  <p className="text-xs text-stone-500 font-sans">
                    Book a warm family dining table or custom menu for private gatherings.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 hover:bg-stone-100 rounded-xs text-stone-400 hover:text-stone-800 transition-colors cursor-pointer animate-none"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Toggle tabs (Form vs. Booking History) */}
              <div className="flex border-b border-brand-stone bg-stone-100/50">
                <button
                  onClick={() => {
                    setActiveTab('form');
                    setIsSubmitted(false);
                  }}
                  className={`flex-1 py-3 text-xs sm:text-sm font-bold border-b-2 transition-colors cursor-pointer ${
                    activeTab === 'form'
                      ? 'border-primary text-primary bg-white'
                      : 'border-transparent text-stone-500 hover:text-stone-800'
                  }`}
                >
                  Submit New Booking
                </button>
                <button
                  onClick={() => setActiveTab('history')}
                  className={`flex-1 py-3 text-xs sm:text-sm font-bold border-b-2 transition-colors relative cursor-pointer ${
                    activeTab === 'history'
                      ? 'border-primary text-primary bg-white'
                      : 'border-transparent text-stone-500 hover:text-stone-800'
                  }`}
                >
                  <div className="flex items-center justify-center gap-1.5 font-sans">
                    <History className="w-4 h-4" />
                    <span>Booking History</span>
                    {savedBookings.length > 0 && (
                      <span className="bg-primary text-white font-bold text-[10px] px-1.5 py-0.5 rounded-xs font-mono">
                        {savedBookings.length}
                      </span>
                    )}
                  </div>
                </button>
              </div>

              {/* Scrollable body content */}
              <div className="flex-1 overflow-y-auto p-6 bg-brand-cream">
                {activeTab === 'form' ? (
                  isSubmitted ? (
                    <motion.div
                      initial={{ scale: 0.95 }}
                      animate={{ scale: 1 }}
                      className="text-center py-10 px-4 space-y-4"
                    >
                      <CheckCircle2 className="w-16 h-16 text-primary mx-auto" />
                      <h4 className="font-serif text-lg font-bold text-brand-clay">
                        Inquiry Sent Successfully!
                      </h4>
                      <p className="text-stone-600 text-xs sm:text-sm leading-relaxed max-w-sm mx-auto font-sans">
                        Your table/catering booking request has been drafted to WhatsApp and saved locally in your history. We are preparing to welcome you soon!
                      </p>
                      <button
                        onClick={() => setIsSubmitted(false)}
                        className="px-6 py-2.5 bg-primary hover:bg-primary-dark text-white font-bold text-xs uppercase tracking-widest rounded-xs transition-colors cursor-pointer"
                      >
                        Book Another Table
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {/* Inquiry Type Radio Row */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold uppercase tracking-wider text-stone-500">
                          What can we help you with?
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            type="button"
                            onClick={() => setInquiryType('table')}
                            className={`p-3.5 rounded-xs border transition-all text-left cursor-pointer ${
                              inquiryType === 'table'
                                ? 'border-primary bg-primary/5 text-primary'
                                : 'border-stone-300 hover:bg-stone-50 text-stone-600'
                            }`}
                          >
                            <span className="block text-sm font-bold">Table Reservation</span>
                            <span className="block text-[10px] text-stone-400 mt-0.5">
                              Dine-in with family & friends
                            </span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setInquiryType('catering')}
                            className={`p-3.5 rounded-xs border transition-all text-left cursor-pointer ${
                              inquiryType === 'catering'
                                ? 'border-primary bg-primary/5 text-primary'
                                : 'border-stone-300 hover:bg-stone-50 text-stone-600'
                            }`}
                          >
                            <span className="block text-sm font-bold">Catering / Bulk</span>
                            <span className="block text-[10px] text-stone-400 mt-0.5">
                              Home parties, festivals
                            </span>
                          </button>
                        </div>
                      </div>

                      {/* Name & Phone */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-stone-600 mb-1">
                            Your Name *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Full name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-3.5 py-2.5 bg-white border border-stone-300 focus:border-primary rounded-xs text-stone-800 text-sm focus:outline-none transition-all"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-stone-600 mb-1">
                            WhatsApp Phone *
                          </label>
                          <input
                            type="tel"
                            required
                            placeholder="Mobile number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full px-3.5 py-2.5 bg-white border border-stone-300 focus:border-primary rounded-xs text-stone-800 text-sm focus:outline-none transition-all"
                          />
                        </div>
                      </div>

                      {/* Date & Guest Counter */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-stone-600 mb-1 flex items-center gap-1">
                            <CalendarDays className="w-3.5 h-3.5 text-stone-400" />
                            <span>Date & Time *</span>
                          </label>
                          <input
                            type="datetime-local"
                            required
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full px-3.5 py-2.5 bg-white border border-stone-300 focus:border-primary rounded-xs text-stone-800 text-xs focus:outline-none transition-all font-sans"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-stone-600 mb-1 flex items-center gap-1">
                            <Users className="w-3.5 h-3.5 text-stone-400" />
                            <span>Number of Guests ({guests})</span>
                          </label>
                          <div className="flex items-center gap-3 bg-stone-50 border border-stone-200 rounded-xs p-1.5">
                            <button
                               type="button"
                               onClick={() => setGuests(Math.max(1, guests - 1))}
                               className="w-8 h-8 flex items-center justify-center bg-white border border-stone-200 rounded-xs text-stone-600 font-bold hover:bg-stone-100 cursor-pointer animate-none"
                            >
                              -
                            </button>
                            <span className="flex-1 text-center text-sm font-bold text-stone-800 font-sans">
                              {guests} Pax
                            </span>
                            <button
                               type="button"
                               onClick={() => setGuests(Math.min(100, guests + 1))}
                               className="w-8 h-8 flex items-center justify-center bg-white border border-stone-200 rounded-xs text-stone-600 font-bold hover:bg-stone-100 cursor-pointer animate-none"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Requirements Message */}
                      <div>
                        <label className="block text-xs font-semibold text-stone-600 mb-1 flex items-center gap-1">
                          <FileText className="w-3.5 h-3.5 text-stone-400" />
                          <span>Special Requests / Custom Menu requirements</span>
                        </label>
                        <textarea
                          placeholder="e.g. Need baby high-chair, preferred sitting space, or custom desserts like special giant jalebis for guest welcome."
                          rows={3}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          className="w-full px-3.5 py-2 bg-white border border-stone-300 focus:border-primary rounded-xs text-stone-800 text-sm focus:outline-none transition-all resize-none"
                        />
                      </div>

                      {/* Submit */}
                      <button
                        type="submit"
                        className="w-full py-3.5 bg-primary hover:bg-primary-dark text-white font-bold text-xs uppercase tracking-widest rounded-xs transition-colors shadow-none cursor-pointer flex items-center justify-center gap-2"
                      >
                        <CalendarDays className="w-4 h-4" />
                        <span>Reserve Now (Send via WhatsApp)</span>
                      </button>
                    </form>
                  )
                ) : (
                  /* History Tab */
                  <div className="space-y-4 h-full">
                    {savedBookings.length === 0 ? (
                      <div className="text-center py-12 px-4 space-y-2">
                        <span className="text-3xl block">📋</span>
                        <h4 className="font-sans font-bold text-sm text-stone-700">No previous bookings found</h4>
                        <p className="text-stone-400 text-xs">Any table bookings or catering requests you send will appear here for your reference.</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {savedBookings.map((b) => (
                          <div
                            key={b.id}
                            className="p-4 bg-white rounded-xs border border-brand-stone relative group flex flex-col justify-between"
                          >
                            <button
                              onClick={() => handleDeleteBooking(b.id)}
                              className="absolute top-4 right-4 text-stone-400 hover:text-red-500 p-1 rounded-xs transition-colors cursor-pointer animate-none"
                              title="Delete Record"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>

                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <span className="bg-primary/5 text-primary border border-brand-stone/50 font-bold text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-xs font-sans">
                                  {b.eventType}
                                </span>
                                <span className="text-[10px] text-stone-400 font-medium font-sans">
                                  {b.timestamp}
                                </span>
                              </div>

                              <h5 className="font-sans font-bold text-sm text-brand-clay">
                                {b.name}
                              </h5>

                              <div className="grid grid-cols-2 gap-1 text-xs text-stone-500 font-sans">
                                <span className="flex items-center gap-1">
                                  <Users className="w-3.5 h-3.5 text-stone-400" />
                                  <strong>{b.guests} Guests</strong>
                                </span>
                                <span className="flex items-center gap-1">
                                  <Phone className="w-3.5 h-3.5 text-stone-400" />
                                  <span>{b.phone}</span>
                                </span>
                              </div>

                              {b.message.trim() && (
                                <p className="text-[11px] text-stone-600 bg-stone-50 p-2.5 rounded-xs border border-stone-200/60 italic leading-relaxed font-serif">
                                  "{b.message}"
                                </p>
                              )}

                              <div className="pt-2 border-t border-stone-200/50 flex items-center justify-between text-[11px] font-semibold font-sans">
                                <span className="text-stone-400 flex items-center gap-1">
                                  <Calendar className="w-3.5 h-3.5" />
                                  <span>Requested for: {b.date.replace('T', ' ')}</span>
                                </span>
                                <span className="text-primary flex items-center gap-1">
                                  <Clock className="w-3.5 h-3.5" />
                                  <span>{b.status}</span>
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
