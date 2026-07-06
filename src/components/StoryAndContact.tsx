/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Heart, MapPin, Phone, Clock, ShieldCheck, Soup, Sparkles, Star } from 'lucide-react';
import { motion } from 'motion/react';

export default function StoryAndContact() {
  const storeNumber = '918765432890';

  const principles = [
    {
      icon: <Soup className="w-5 h-5 text-primary" />,
      title: 'Hand-Ground Masala',
      desc: 'No factory powders. We dry roast and stone-grind whole Indian spices for traditional depth.',
    },
    {
      icon: <Heart className="w-5 h-5 text-primary" />,
      title: 'Cooked with Love',
      desc: 'Maa is the culinary heart. We treat every visitor as an honored guest in our family kitchen.',
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-primary" />,
      title: 'Zero Preservatives',
      desc: 'No artificial coloring, MSG, or frozen premixes. Fresh daily, sold out daily.',
    },
  ];

  return (
    <>
      {/* Our Story Section */}
      <section id="story" className="py-24 px-4 sm:px-6 lg:px-8 bg-brand-cream/40 border-b border-brand-stone scroll-mt-10 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Story Text */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold text-primary uppercase tracking-widest block">
                • Our Humble Roots •
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-brand-clay tracking-tight leading-tight">
                A Mother’s Touch In The Heart Of Gohana
              </h2>
              <div className="h-[1px] w-20 bg-primary" />
              
              <p className="text-stone-600 text-sm sm:text-base font-light leading-relaxed">
                For years, the sweet aroma of bubbling cardamom tea, wood-fire baked thick rotis, and golden slow-dripping syrups filled our childhood kitchen near Gohana. Everyone who visited our home left with a full stomach and a peaceful heart.
              </p>

              <p className="text-stone-600 text-sm sm:text-base font-light leading-relaxed">
                We realized that in the fast-paced rush of restaurant meals, people were missing the lightweight, nutritious comfort of real home-cooked food. That is how <strong className="text-brand-clay font-bold">Maa Ka Hath Ka Khana (Cafe Gohana)</strong> was born. We griddle our parathas on heavy iron pans, churn our yogurt by hand for Kesar Lassi, and fry Gohana's legendary thick-loop giant Jalebis in small fresh batches using 100% pure premium Desi Ghee.
              </p>

              {/* Cooking principles checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                {principles.map((pr, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-white rounded-xs border border-brand-stone flex flex-col space-y-2 hover:shadow-xs transition-shadow"
                  >
                    <div className="p-2.5 bg-brand-stone rounded-xs w-fit">
                      {pr.icon}
                    </div>
                    <h4 className="font-sans font-bold text-sm text-brand-clay">
                      {pr.title}
                    </h4>
                    <p className="text-stone-500 text-[11px] leading-relaxed">
                      {pr.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Story Decorative Poster Frame */}
            <div className="lg:col-span-5 relative">
              {/* Backglow ornament */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-primary-dark/10 rounded-xs blur-2xl transform rotate-3" />
              
              <div className="relative bg-white rounded-xs border border-brand-stone p-6 sm:p-8 flex flex-col space-y-6">
                <div className="relative h-64 sm:h-80 rounded-xs overflow-hidden bg-stone-100 border border-brand-stone">
                  <img
                    src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=800"
                    alt="Maa Cooking traditional food"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/50 to-transparent" />
                  <span className="absolute bottom-4 left-4 font-serif text-sm text-white italic font-semibold flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 fill-white" /> "Atithi Devo Bhava"
                  </span>
                </div>

                <div className="space-y-3">
                  <h3 className="font-serif font-bold text-lg text-brand-clay">
                    Why Gohana Loves Us
                  </h3>
                  <div className="space-y-2.5">
                    {[
                      'Freshly prepared homemade white butter (safed makhan) served daily.',
                      'Legends of Gohana: The giant jalebi made with wood-fire heating.',
                      'Daily rotating special seasonal dishes (like Sarson ka Saag in winters).',
                    ].map((bullet, bidx) => (
                      <div key={bidx} className="flex items-start gap-2.5 text-xs text-stone-600 leading-relaxed">
                        <div className="p-0.5 bg-primary rounded-xs text-white mt-0.5">
                          <Star className="w-2.5 h-2.5 fill-white text-white" />
                        </div>
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Contact & Map Section */}
      <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-brand-stone scroll-mt-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            
            {/* Contact Details Board */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
              <div className="space-y-4">
                <span className="text-xs font-bold text-primary uppercase tracking-widest block">
                  • Find Us •
                </span>
                <h2 className="font-serif text-3xl sm:text-5xl font-bold text-brand-clay tracking-tight leading-tight">
                  Come Over for a Hot Meal!
                </h2>
                <p className="text-stone-500 text-sm sm:text-base font-light">
                  We are centrally located in Gohana, perfect for family dinners or picking up hot tiffins.
                </p>
              </div>

              {/* Info Boxes */}
              <div className="space-y-6">
                {/* MapPin */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-brand-stone/40 rounded-xs text-primary border border-brand-stone shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-base text-brand-clay mb-0.5">Address</h4>
                    <p className="text-stone-600 text-sm">Near Baroda Road, Gohana, Haryana - 131301</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-brand-stone/40 rounded-xs text-primary border border-brand-stone shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-base text-brand-clay mb-0.5">Call or WhatsApp</h4>
                    <p className="text-stone-600 text-sm">
                      <a href={`tel:${storeNumber}`} className="hover:text-primary hover:underline transition-all">
                        +91 8765432890
                      </a>
                    </p>
                  </div>
                </div>

                {/* Clock */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-brand-stone/40 rounded-xs text-primary border border-brand-stone shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-base text-brand-clay mb-0.5">Kitchen Timings</h4>
                    <p className="text-stone-600 text-sm">09:00 AM - 10:00 PM (Everyday Open with Warm Love)</p>
                  </div>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="p-4 bg-primary/5 rounded-xs border border-primary/20 text-xs text-stone-500 leading-relaxed">
                💡 <strong className="text-stone-700 font-bold">Quick Tip:</strong> Standard home delivery time takes 25-35 minutes depending on the rush of fresh rolling hot phulkas!
              </div>
            </div>

            {/* Embedded Google Map Frame */}
            <div className="lg:col-span-7 h-96 lg:h-auto min-h-[350px] rounded-xs overflow-hidden border border-brand-stone relative">
              <iframe
                title="Cafe Gohana Map Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13936.425140884638!2d76.69000000000001!3d29.14!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390da175da7d27e9%3A0x633d0263f684ecf9!2sGohana%2C%20Haryana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
