/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ShoppingBag, X, Trash2, Plus, Minus, MessageCircle, Truck, Utensils, Armchair, HelpCircle, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem, MenuItem } from '../types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  menuItems: MenuItem[];
  onUpdateQuantity: (menuId: string, quantity: number, customizations?: CartItem['customization']) => void;
  onRemoveItem: (menuId: string, customizations?: CartItem['customization']) => void;
  onClearCart: () => void;
}

export default function Cart({
  isOpen,
  onClose,
  cart,
  menuItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartProps) {
  // Checkout Form State
  const [orderType, setOrderType] = useState<'dine_in' | 'takeaway' | 'delivery'>('delivery');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [cookingNotes, setCookingNotes] = useState('');
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  // Resolve cart item details
  const cartWithDetails = cart.map((item) => {
    const detail = menuItems.find((m) => m.id === item.menuId);
    return {
      ...item,
      detail,
    };
  });

  const cartSubtotal = cartWithDetails.reduce((sum, item) => {
    if (!item.detail) return sum;
    return sum + item.detail.price * item.quantity;
  }, 0);

  const deliveryCharge = orderType === 'delivery' ? 30 : 0;
  const grandTotal = cartSubtotal + deliveryCharge;

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    if (!customerName.trim()) errors.customerName = 'Please enter your name.';
    if (!customerPhone.trim()) errors.customerPhone = 'Please enter your phone number.';
    if (orderType === 'delivery' && !deliveryAddress.trim()) {
      errors.deliveryAddress = 'Delivery address is required for home delivery.';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleWhatsAppCheckout = () => {
    if (!validateForm()) return;

    const whatsappNumber = '918765432890'; // Cafe Gohana Store Number

    // Build items list message text
    const itemsText = cartWithDetails
      .map((item) => {
        if (!item.detail) return '';
        const customText = [];
        if (item.customization?.gheeOption && item.customization.gheeOption !== 'standard') {
          customText.push(`${item.customization.gheeOption} Ghee/Butter`);
        }
        if (item.customization?.spicyLevel && item.customization.spicyLevel !== 'default') {
          customText.push(`${item.customization.spicyLevel} Spicy`);
        }
        const customString = customText.length > 0 ? ` [${customText.join(', ')}]` : '';
        return `• ${item.quantity}x ${item.detail.name}${customString} - ₹${item.detail.price * item.quantity}`;
      })
      .filter(Boolean)
      .join('\n');

    const orderTypeLabel =
      orderType === 'dine_in' ? '🍽️ Dine-In' : orderType === 'takeaway' ? '🥡 Takeaway (Self Pickup)' : '🛵 Home Delivery';

    // Construct highly polished, authentic Indian restaurant order message template
    const message = `*🍲 Cafe Gohana - Maa Ka Hath Ka Khana 🍲*
----------------------------------------
*New Order Received via Applet:*

*Customer Details:*
• Name: ${customerName}
• Phone: ${customerPhone}
• Option: ${orderTypeLabel}
${orderType === 'delivery' ? `• Address: ${deliveryAddress}` : ''}

*Order Items:*
${itemsText}

----------------------------------------
*Subtotal:* ₹${cartSubtotal}
*Delivery Fee:* ₹${deliveryCharge}
*Grand Total:* ₹${grandTotal}

${cookingNotes.trim() ? `*Instructions for Maa (Chef):*\n_"${cookingNotes}"_` : ''}

Thank you for choosing Cafe Gohana! Please confirm receipt and let me know the estimated time of preparation. 🙏🏼`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
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
            className="fixed inset-0 bg-stone-950/50 backdrop-blur-xs z-50"
          />

          {/* Cart Sidebar Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35 }}
            className="fixed top-0 right-0 bottom-0 w-full sm:max-w-md bg-brand-cream border-l border-brand-stone shadow-2xl z-50 flex flex-col justify-between"
          >
            {/* Header */}
            <div className="p-6 border-b border-brand-stone bg-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-brand-stone rounded-xs text-primary">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-brand-clay">Your Thali</h3>
                  <span className="text-xs text-stone-500 font-medium font-sans">
                    {cart.length} unique item{cart.length !== 1 ? 's' : ''} added
                  </span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 hover:bg-stone-100 rounded-xs text-stone-500 hover:text-stone-800 transition-colors cursor-pointer animate-none"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Scrollable Content Container */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4">
                  <span className="text-5xl block mb-4">🍽️</span>
                  <h4 className="font-serif text-lg font-bold text-stone-800 mb-2">
                    Your Thali is empty
                  </h4>
                  <p className="text-stone-500 text-xs sm:text-sm leading-relaxed max-w-xs mb-6">
                    Add some delicious home-style curries, fresh hot parathas, and sweets to begin your order.
                  </p>
                  <button
                    onClick={onClose}
                    className="px-6 py-2.5 bg-primary hover:bg-primary-dark text-white font-bold text-xs uppercase tracking-widest rounded-xs transition-colors shadow-none cursor-pointer"
                  >
                    Browse Dishes
                  </button>
                </div>
              ) : (
                <>
                  {/* Cart Items List */}
                  <div className="space-y-4">
                    <div className="text-xs font-bold text-stone-400 uppercase tracking-widest border-b border-stone-100 pb-2">
                      Selected Dishes
                    </div>

                    {cartWithDetails.map((item, index) => {
                      if (!item.detail) return null;
                      return (
                        <div
                          key={`${item.menuId}-${index}`}
                          className="flex items-start gap-4 p-4 bg-white rounded-xs border border-brand-stone group"
                        >
                          <img
                            src={item.detail.image}
                            alt={item.detail.name}
                            className="w-16 h-16 rounded-xs object-cover border border-brand-stone"
                          />

                          {/* Item Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start gap-1">
                              <h5 className="font-sans font-bold text-sm text-brand-clay truncate">
                                {item.detail.name}
                              </h5>
                              <span className="font-bold text-sm text-stone-800 font-sans">
                                ₹{item.detail.price * item.quantity}
                              </span>
                            </div>

                            {/* Applied customizations */}
                            {(item.customization?.gheeOption && item.customization.gheeOption !== 'standard') ||
                            (item.customization?.spicyLevel && item.customization.spicyLevel !== 'default') ? (
                              <div className="flex flex-wrap gap-1.5 mt-1">
                                {item.customization.gheeOption && item.customization.gheeOption !== 'standard' && (
                                  <span className="text-[9px] font-bold uppercase tracking-wider bg-primary/5 text-primary px-1.5 py-0.5 rounded-xs border border-brand-stone/50 font-sans">
                                    {item.customization.gheeOption} Ghee
                                  </span>
                                )}
                                {item.customization.spicyLevel && item.customization.spicyLevel !== 'default' && (
                                  <span className="text-[9px] font-bold uppercase tracking-wider bg-red-50 text-red-800 px-1.5 py-0.5 rounded-xs border border-red-200 font-sans">
                                    {item.customization.spicyLevel} Spicy
                                  </span>
                                )}
                              </div>
                            ) : null}

                            {/* Quantity Adjusters */}
                            <div className="flex items-center justify-between mt-3">
                              <div className="flex items-center gap-1 bg-stone-50 rounded-xs p-0.5 border border-stone-200/50">
                                <button
                                  onClick={() =>
                                    onUpdateQuantity(item.menuId, item.quantity - 1, item.customization)
                                  }
                                  className="p-1 text-stone-500 hover:text-stone-800 hover:bg-stone-200 rounded-xs cursor-pointer animate-none"
                                >
                                  <Minus className="w-3.5 h-3.5" />
                                </button>
                                <span className="text-xs font-bold px-2.5 text-stone-800 select-none font-sans">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    onUpdateQuantity(item.menuId, item.quantity + 1, item.customization)
                                  }
                                  className="p-1 text-stone-500 hover:text-stone-800 hover:bg-stone-200 rounded-xs cursor-pointer animate-none"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                </button>
                              </div>

                              {/* Remove */}
                              <button
                                onClick={() => onRemoveItem(item.menuId, item.customization)}
                                className="text-stone-400 hover:text-red-500 p-1.5 rounded-xs transition-colors cursor-pointer animate-none"
                                title="Remove Dish"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Order Options */}
                  <div className="space-y-4">
                    <div className="text-xs font-bold text-stone-400 uppercase tracking-widest border-b border-stone-100 pb-2">
                      Order Fulfillment
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'delivery', label: 'Delivery', icon: <Truck className="w-4 h-4" /> },
                        { id: 'takeaway', label: 'Pickup', icon: <Utensils className="w-4 h-4" /> },
                        { id: 'dine_in', label: 'Dine-In', icon: <Armchair className="w-4 h-4" /> },
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          onClick={() => setOrderType(opt.id as any)}
                          className={`flex flex-col items-center justify-center p-3 rounded-xs border transition-all text-center cursor-pointer ${
                            orderType === opt.id
                              ? 'bg-primary border-primary text-white shadow-none'
                              : 'bg-white border-stone-200 text-stone-600 hover:bg-brand-stone/40'
                          }`}
                        >
                          {opt.icon}
                          <span className="text-[10px] font-bold uppercase tracking-wider mt-1">{opt.label}</span>
                        </button>
                      ))}
                    </div>

                    {/* Delivery Notification */}
                    {orderType === 'delivery' && (
                      <p className="text-[11px] text-primary bg-primary/5 rounded-xs p-2.5 border border-brand-stone/50 flex items-start gap-1.5 leading-relaxed font-sans">
                        <Info className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                        <span>Home delivery is active for locations near Baroda Road, Gohana (₹30 flat delivery charge applies).</span>
                      </p>
                    )}
                  </div>

                  {/* Customer Information Form */}
                  <div className="space-y-4">
                    <div className="text-xs font-bold text-stone-400 uppercase tracking-widest border-b border-stone-100 pb-2">
                      Your Details
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-semibold text-stone-600 mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          placeholder="Your Name"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          className={`w-full px-3.5 py-2.5 bg-white border rounded-xs text-stone-800 text-sm focus:outline-none focus:border-primary ${
                            formErrors.customerName ? 'border-red-400' : 'border-stone-200'
                          }`}
                        />
                        {formErrors.customerName && (
                          <span className="text-[11px] text-red-500 mt-0.5 block font-medium font-sans">
                            {formErrors.customerName}
                          </span>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-600 mb-1">
                          WhatsApp / Phone Number *
                        </label>
                        <input
                          type="tel"
                          placeholder="e.g. +91 XXXXX XXXXX"
                          value={customerPhone}
                          onChange={(e) => setCustomerPhone(e.target.value)}
                          className={`w-full px-3.5 py-2.5 bg-white border rounded-xs text-stone-800 text-sm focus:outline-none focus:border-primary ${
                            formErrors.customerPhone ? 'border-red-400' : 'border-stone-200'
                          }`}
                        />
                        {formErrors.customerPhone && (
                          <span className="text-[11px] text-red-500 mt-0.5 block font-medium font-sans">
                            {formErrors.customerPhone}
                          </span>
                        )}
                      </div>

                      {orderType === 'delivery' && (
                        <div>
                          <label className="block text-xs font-semibold text-stone-600 mb-1">
                            Delivery Address in Gohana *
                          </label>
                          <textarea
                            placeholder="Street, Landmark, Sector, Gohana, Haryana"
                            rows={2}
                            value={deliveryAddress}
                            onChange={(e) => setDeliveryAddress(e.target.value)}
                            className={`w-full px-3.5 py-2 bg-white border rounded-xs text-stone-800 text-sm focus:outline-none focus:border-primary resize-none ${
                              formErrors.deliveryAddress ? 'border-red-400' : 'border-stone-200'
                            }`}
                          />
                          {formErrors.deliveryAddress && (
                            <span className="text-[11px] text-red-500 mt-0.5 block font-medium font-sans">
                              {formErrors.deliveryAddress}
                            </span>
                          )}
                        </div>
                      )}

                      <div>
                        <label className="block text-xs font-semibold text-stone-600 mb-1 flex items-center gap-1.5">
                          <span>Cooking Notes for Maa (Optional)</span>
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Less ghee on paratha, make Dal Fry extra spicy"
                          value={cookingNotes}
                          onChange={(e) => setCookingNotes(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-white border border-stone-200 rounded-xs text-stone-800 text-sm focus:outline-none focus:border-primary"
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Footer Calculation & Checkout Button */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-brand-stone bg-white space-y-4">
                {/* Calculations */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-stone-500 font-sans">
                    <span>Dish Subtotal</span>
                    <span>₹{cartSubtotal}</span>
                  </div>
                  {orderType === 'delivery' && (
                    <div className="flex justify-between text-xs text-stone-500 font-sans">
                      <span>Home Delivery Fee</span>
                      <span>+ ₹30</span>
                    </div>
                  )}
                  <div className="h-[1px] bg-stone-100" />
                  <div className="flex justify-between items-center text-stone-900 font-bold text-base">
                    <span>Grand Total</span>
                    <span className="text-primary text-lg font-mono">₹{grandTotal}</span>
                  </div>
                </div>

                {/* Submit Action */}
                <button
                  onClick={handleWhatsAppCheckout}
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm uppercase tracking-widest rounded-xs transition-colors shadow-none cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5 fill-white text-emerald-600 shrink-0" />
                  <span>Send Order to WhatsApp</span>
                </button>

                <button
                  onClick={onClearCart}
                  className="w-full text-center text-xs text-stone-400 hover:text-red-500 font-bold uppercase tracking-wider py-1 transition-colors underline cursor-pointer"
                >
                  Clear all items from Thali
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
