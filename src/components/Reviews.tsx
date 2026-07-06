/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Star, MessageSquare, Sparkles, User, Calendar, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Review, MenuItem } from '../types';

interface ReviewsProps {
  initialReviews: Review[];
  menuItems: MenuItem[];
}

export default function Reviews({ initialReviews, menuItems }: ReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [selectedDish, setSelectedDish] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Load reviews from LocalStorage + merge with initial ones
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('cafe_gohana_reviews');
      if (stored) {
        try {
          setReviews(JSON.parse(stored));
        } catch (e) {
          console.error(e);
          setReviews(initialReviews);
        }
      } else {
        setReviews(initialReviews);
        localStorage.setItem('cafe_gohana_reviews', JSON.stringify(initialReviews));
      }
    }
  }, []);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !comment.trim()) {
      alert('Please fill in your name and comment.');
      return;
    }

    const newReview: Review = {
      id: 'rev-' + Date.now(),
      author,
      rating,
      comment,
      dishName: selectedDish || undefined,
      date: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
    };

    const updated = [newReview, ...reviews];
    setReviews(updated);
    localStorage.setItem('cafe_gohana_reviews', JSON.stringify(updated));

    // Reset Form
    setAuthor('');
    setRating(5);
    setComment('');
    setSelectedDish('');
    setIsFormOpen(false);
  };

  const handleDeleteReview = (id: string) => {
    // Only allow deletion of user-created reviews
    if (id.startsWith('rev-1') || id.startsWith('rev-2') || id.startsWith('rev-3')) {
      alert("Only freshly submitted community reviews can be deleted in this session demo.");
      return;
    }
    const filtered = reviews.filter((r) => r.id !== id);
    setReviews(filtered);
    localStorage.setItem('cafe_gohana_reviews', JSON.stringify(filtered));
  };

  // Stats calculation
  const totalReviewsCount = reviews.length;
  const averageRating = (
    reviews.reduce((sum, r) => sum + r.rating, 0) / (totalReviewsCount || 1)
  ).toFixed(1);

  // Star breakdown counts
  const starBreakdown = [5, 4, 3, 2, 1].map((stars) => {
    const count = reviews.filter((r) => r.rating === stars).length;
    const percentage = ((count / (totalReviewsCount || 1)) * 100).toFixed(0);
    return { stars, count, percentage };
  });

  return (
    <section id="reviews" className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-b border-brand-stone scroll-mt-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-2">
            • Community Blessings •
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-brand-clay tracking-tight mb-4">
            Loved By Families
          </h2>
          <div className="h-[1px] w-20 bg-primary mx-auto mb-6" />
          <p className="text-stone-600 text-sm sm:text-base font-light">
            Read stories of sweet memories and warm dining experiences shared by our beloved guests.
          </p>
        </div>

        {/* Review Dashboard Statistics & Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center bg-brand-cream/40 rounded-xs p-6 sm:p-8 border border-brand-stone mb-12">
          {/* Main Average Card */}
          <div className="text-center py-6 border-b lg:border-b-0 lg:border-r border-brand-stone">
            <span className="block text-6xl font-serif font-black text-brand-clay">
              {averageRating}
            </span>
            <div className="flex items-center justify-center gap-1 my-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className={`w-5 h-5 ${
                    s <= Math.round(parseFloat(averageRating))
                      ? 'text-primary fill-primary'
                      : 'text-stone-300'
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-stone-500 font-sans">
              Average score from <strong className="text-stone-800">{totalReviewsCount} reviews</strong>
            </p>
          </div>

          {/* Progress Bars */}
          <div className="space-y-2 px-2 sm:px-6">
            {starBreakdown.map((row) => (
              <div key={row.stars} className="flex items-center gap-3 text-xs sm:text-sm text-stone-600">
                <span className="w-10 text-right font-bold flex items-center justify-end gap-0.5">
                  {row.stars} <Star className="w-3.5 h-3.5 fill-primary text-primary border-none" />
                </span>
                <div className="flex-1 h-2 bg-stone-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${row.percentage}%` }}
                  />
                </div>
                <span className="w-12 text-stone-400 text-right">{row.percentage}%</span>
              </div>
            ))}
          </div>

          {/* Action Trigger Card */}
          <div className="text-center lg:text-left flex flex-col items-center lg:items-start lg:pl-10 space-y-4">
            <h4 className="font-serif font-bold text-lg text-brand-clay">
              Loved our ghar ka khana?
            </h4>
            <p className="text-stone-500 text-xs sm:text-sm leading-relaxed">
              Maa is always excited to hear your feedback! Share your genuine review of the taste, hospitality, and sweets.
            </p>
            <button
              onClick={() => setIsFormOpen(!isFormOpen)}
              className="px-6 py-3 bg-primary hover:bg-primary-dark text-white font-bold text-xs uppercase tracking-widest rounded-xs transition-colors shadow-sm cursor-pointer flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{isFormOpen ? 'Close Form' : 'Write a Review'}</span>
            </button>
          </div>
        </div>

        {/* Expandable Write review form */}
        <AnimatePresence>
          {isFormOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden bg-brand-stone/30 rounded-xs border border-brand-stone p-6 sm:p-8 mb-12"
            >
              <form onSubmit={handleSubmitReview} className="space-y-4 max-w-xl mx-auto">
                <h4 className="font-serif font-bold text-lg text-brand-clay border-b border-brand-stone pb-2 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <span>Share Your Experience</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-600 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-stone-200 focus:border-primary rounded-xs text-stone-800 text-sm focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-600 mb-1">
                      Which dish did you try? (Optional)
                    </label>
                    <select
                      value={selectedDish}
                      onChange={(e) => setSelectedDish(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-stone-200 focus:border-primary rounded-xs text-stone-800 text-xs focus:outline-none cursor-pointer"
                    >
                      <option value="">-- Choose a Dish --</option>
                      {menuItems.map((item) => (
                        <option key={item.id} value={item.name}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Stars Selection */}
                <div>
                  <span className="block text-xs font-semibold text-stone-600 mb-1.5">
                    Your Rating *
                  </span>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((stars) => (
                      <button
                        key={stars}
                        type="button"
                        onClick={() => setRating(stars)}
                        className="p-1 text-primary hover:scale-110 transition-transform cursor-pointer"
                      >
                        <Star
                          className={`w-8 h-8 ${
                            stars <= rating ? 'fill-primary text-primary' : 'text-stone-300'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-stone-500 ml-2">
                      ({rating} out of 5 stars)
                    </span>
                  </div>
                </div>

                {/* Comment area */}
                <div>
                  <label className="block text-xs font-semibold text-stone-600 mb-1">
                    Your Cooking Blessing / Comment *
                  </label>
                  <textarea
                    required
                    placeholder="Tell us what you liked about the food, the service, or the giant jalebi!"
                    rows={3}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full px-3.5 py-2 bg-white border border-stone-200 focus:border-primary rounded-xs text-stone-800 text-sm focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-primary hover:bg-primary-dark text-white font-bold text-xs uppercase tracking-widest rounded-xs transition-colors shadow-none cursor-pointer"
                >
                  Submit Blessings to Maa
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Reviews List Masonry-styled Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {reviews.map((rev) => (
              <motion.div
                key={rev.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-stone-50 rounded-xs p-6 border border-brand-stone/60 relative flex flex-col justify-between hover:shadow-xs transition-shadow group"
              >
                <div>
                  {/* Top line with Avatar and Ratings */}
                  <div className="flex justify-between items-start gap-2 mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 bg-brand-stone rounded-xs flex items-center justify-center text-primary font-bold font-sans text-sm border border-brand-stone shrink-0">
                        <User className="w-4 h-4" />
                      </div>
                      <div>
                        <h5 className="font-sans font-bold text-xs sm:text-sm text-brand-clay truncate">
                          {rev.author}
                        </h5>
                        <span className="text-[10px] text-stone-400 flex items-center gap-1 font-medium font-sans">
                          <Calendar className="w-3 h-3" />
                          <span>{rev.date}</span>
                        </span>
                      </div>
                    </div>

                    {/* Stars */}
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`w-3.5 h-3.5 ${
                            s <= rev.rating ? 'text-primary fill-primary' : 'text-stone-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Favorite Dish Badge */}
                  {rev.dishName && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-primary/5 text-[9px] font-bold text-primary rounded-xs border border-brand-stone/50 mb-3 uppercase tracking-wider font-sans">
                      🥗 Fav: {rev.dishName}
                    </span>
                  )}

                  {/* Comment */}
                  <p className="text-stone-600 text-xs sm:text-sm font-light leading-relaxed italic mb-4">
                    "{rev.comment}"
                  </p>
                </div>

                {/* Conditionally reveal trash button for user review mock items */}
                {!rev.id.startsWith('rev-1') && !rev.id.startsWith('rev-2') && !rev.id.startsWith('rev-3') && (
                  <div className="pt-2 border-t border-stone-200/50 flex justify-end">
                    <button
                      onClick={() => handleDeleteReview(rev.id)}
                      className="text-stone-400 hover:text-red-500 p-1 rounded-md transition-colors cursor-pointer"
                      title="Delete My Review"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
