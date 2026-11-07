'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCakeStore } from '@/store/useCakeStore';
import { formatCurrency } from '@/lib/utils';
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Bike,
  Store,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { KITCHEN_LOCATIONS } from '@/data/cakeData';

export function CartDrawer() {
  const {
    cartItems,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    fulfillmentMode,
    setFulfillmentMode,
    selectedKitchen,
    setSelectedKitchen,
    deliveryAddress,
    setDeliveryDetails,
  } = useCakeStore();

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [confirmedOrderId, setConfirmedOrderId] = useState('');

  const subtotal = cartItems.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const deliveryFee = fulfillmentMode === 'express-delivery' ? 180 : 0;
  const grandTotal = subtotal + deliveryFee;

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      const generatedId = `BYW-${Math.floor(100000 + Math.random() * 900000)}`;
      setConfirmedOrderId(generatedId);
      setOrderConfirmed(true);

      // Trigger celebratory confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#C87D55', '#E29E4B', '#5E8A75', '#F3D5CF', '#2C221E'],
      });
    }, 1200);
  };

  const handleFinishOrder = () => {
    setOrderConfirmed(false);
    clearCart();
    closeCart();
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="absolute inset-0 bg-roast/60 backdrop-blur-xs transition-opacity"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="w-screen max-w-md bg-cream text-roast shadow-2xl flex flex-col border-l border-cream-border"
            >
              {/* Drawer Header */}
              <div className="px-6 py-5 border-b border-cream-border flex items-center justify-between bg-cream-card">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-terracotta/10 flex items-center justify-center text-terracotta">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="font-serif text-lg font-bold text-roast leading-none">
                      Your Bespoke Bag
                    </h2>
                    <span className="text-xs text-roast/60">
                      {cartItems.length} {cartItems.length === 1 ? 'creation' : 'creations'} queued for oven
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={closeCart}
                  className="p-2 rounded-full hover:bg-cream text-roast/70 hover:text-roast transition-colors cursor-pointer"
                  aria-label="Close cart"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Order Confirmed Screen */}
              {orderConfirmed ? (
                <div className="flex-1 p-6 flex flex-col items-center justify-center text-center space-y-5 animate-in fade-in duration-300">
                  <div className="w-16 h-16 rounded-full bg-matcha-light text-matcha flex items-center justify-center shadow-inner">
                    <CheckCircle2 className="w-9 h-9 stroke-[2.2]" />
                  </div>
                  <div className="space-y-2">
                    <span className="text-xs font-semibold tracking-wider uppercase text-terracotta">
                      Order Dispatched to Pastry Lab
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-roast">
                      We&apos;re Baking Your Masterpiece!
                    </h3>
                    <p className="text-sm text-roast/70 max-w-xs mx-auto">
                      Tracking Reference: <strong className="text-roast font-mono">{confirmedOrderId}</strong>. Our chefs have reserved the convection ovens for your customized formula.
                    </p>
                  </div>

                  <div className="w-full bg-cream-card rounded-2xl p-4 border border-cream-border text-left space-y-2.5 text-xs text-roast/80">
                    <div className="flex items-center justify-between pb-2 border-b border-cream-border">
                      <span className="text-roast/60">Estimated Oven Ready</span>
                      <strong className="text-matcha font-medium">In 120 Minutes</strong>
                    </div>
                    <div className="flex items-center justify-between pb-2 border-b border-cream-border">
                      <span className="text-roast/60">Mode</span>
                      <span className="font-medium capitalize">{fulfillmentMode.replace('-', ' ')}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-roast/60">Thermal Box Temperature</span>
                      <span className="font-medium text-terracotta">14°C Controlled</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleFinishOrder}
                    className="w-full py-3.5 rounded-2xl bg-terracotta text-white font-semibold text-sm hover:bg-terracotta-dark shadow-md shadow-terracotta/20 transition-all cursor-pointer"
                  >
                    Return to Cake Studio
                  </button>
                </div>
              ) : cartItems.length === 0 ? (
                /* Empty Cart State */
                <div className="flex-1 p-6 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-3xl bg-cream-card border border-cream-border flex items-center justify-center text-roast/40 shadow-xs">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-serif text-lg font-bold text-roast">Your bag is empty</h3>
                    <p className="text-xs text-roast/60 max-w-xs">
                      No custom cakes configured yet. Step into our Studio and tailor your dream dessert!
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={closeCart}
                    className="px-6 py-2.5 rounded-full bg-terracotta text-white text-xs font-semibold hover:bg-terracotta-dark transition-colors cursor-pointer"
                  >
                    Start Customizing
                  </button>
                </div>
              ) : (
                /* Active Cart Contents */
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  {/* Items List */}
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="bg-cream-card rounded-2xl p-4 border border-cream-border shadow-xs hover:border-terracotta-light/60 transition-all space-y-3"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h4 className="font-serif font-bold text-sm text-roast leading-snug">
                              {item.customTitle}
                            </h4>
                            <p className="text-xs text-roast/60 mt-0.5">
                              {item.config.frosting.replace('-', ' ')} • {item.config.sweetnessLevel}% sweetness
                            </p>
                          </div>
                          <span className="font-serif font-bold text-sm text-terracotta whitespace-nowrap">
                            {formatCurrency(item.unitPrice * item.quantity)}
                          </span>
                        </div>

                        {/* Dietary Badges */}
                        {item.dietaryBadges.length > 0 && (
                          <div className="flex flex-wrap gap-1.5">
                            {item.dietaryBadges.map((badge) => (
                              <span
                                key={badge}
                                className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-matcha-light text-matcha"
                              >
                                {badge}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Inscription preview if any */}
                        {item.config.inscription.trim().length > 0 && (
                          <div className="text-[11px] bg-cream p-2 rounded-xl border border-cream-border text-roast/80 italic font-serif">
                            Plaque: &ldquo;{item.config.inscription}&rdquo;
                          </div>
                        )}

                        {/* Quantity and Remove Bar */}
                        <div className="flex items-center justify-between pt-2 border-t border-cream-border/60">
                          <div className="flex items-center gap-2 bg-cream rounded-full p-1 border border-cream-border">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-6 h-6 rounded-full bg-cream-card hover:bg-cream flex items-center justify-center text-roast transition-colors cursor-pointer"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold text-roast px-1.5 min-w-[16px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-6 h-6 rounded-full bg-cream-card hover:bg-cream flex items-center justify-center text-roast transition-colors cursor-pointer"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            className="text-xs text-rose-600 hover:text-rose-700 flex items-center gap-1 font-medium transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Fulfillment Method Selector */}
                  <div className="bg-cream-card rounded-2xl p-4 border border-cream-border space-y-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-roast/70">
                      Fulfillment Method
                    </span>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setFulfillmentMode('express-delivery')}
                        className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all cursor-pointer ${
                          fulfillmentMode === 'express-delivery'
                            ? 'border-terracotta bg-terracotta/5 text-terracotta font-semibold'
                            : 'border-cream-border text-roast/70 hover:border-roast/30'
                        }`}
                      >
                        <Bike className="w-4 h-4 mb-1" />
                        <span className="text-xs">Express Delivery</span>
                        <span className="text-[10px] text-roast/50">₱180 Thermal Van</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setFulfillmentMode('kitchen-pickup')}
                        className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all cursor-pointer ${
                          fulfillmentMode === 'kitchen-pickup'
                            ? 'border-terracotta bg-terracotta/5 text-terracotta font-semibold'
                            : 'border-cream-border text-roast/70 hover:border-roast/30'
                        }`}
                      >
                        <Store className="w-4 h-4 mb-1" />
                        <span className="text-xs">Kitchen Pickup</span>
                        <span className="text-[10px] text-matcha font-bold">Free (₱0)</span>
                      </button>
                    </div>

                    {fulfillmentMode === 'kitchen-pickup' ? (
                      <div className="space-y-1 pt-1">
                        <label className="text-[11px] font-medium text-roast/70">
                          Select Pickup Studio:
                        </label>
                        <select
                          value={selectedKitchen}
                          onChange={(e) => setSelectedKitchen(e.target.value)}
                          className="w-full text-xs p-2.5 rounded-xl border border-cream-border bg-cream text-roast focus:outline-hidden focus:border-terracotta"
                        >
                          {KITCHEN_LOCATIONS.map((loc) => (
                            <option key={loc.id} value={loc.id}>
                              {loc.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    ) : (
                      <div className="space-y-1.5 pt-1">
                        <label className="text-[11px] font-medium text-roast/70">
                          Delivery Destination:
                        </label>
                        <input
                          type="text"
                          value={deliveryAddress}
                          onChange={(e) => setDeliveryDetails({ deliveryAddress: e.target.value })}
                          placeholder="Building, street, and unit number"
                          className="w-full text-xs p-2.5 rounded-xl border border-cream-border bg-cream text-roast focus:outline-hidden focus:border-terracotta"
                        />
                      </div>
                    )}
                  </div>

                  {/* Quality & Cold-Chain Notice */}
                  <div className="p-3.5 rounded-2xl bg-honey-light/60 border border-honey/30 flex items-start gap-2.5 text-xs text-roast">
                    <ShieldCheck className="w-4 h-4 text-terracotta shrink-0 mt-0.5" />
                    <p className="leading-relaxed">
                      <strong>Cold-Chain Guaranteed:</strong> Hand-delivered in our custom double-walled thermal cake box with temperature sensor at 14°C.
                    </p>
                  </div>
                </div>
              )}

              {/* Drawer Footer / Checkout Bar */}
              {cartItems.length > 0 && !orderConfirmed && (
                <div className="p-6 bg-cream-card border-t border-cream-border space-y-4">
                  <div className="space-y-1.5 text-xs">
                    <div className="flex items-center justify-between text-roast/70">
                      <span>Subtotal</span>
                      <span>{formatCurrency(subtotal)}</span>
                    </div>
                    <div className="flex items-center justify-between text-roast/70">
                      <span>Thermal Packaging & Delivery</span>
                      <span>{deliveryFee === 0 ? 'FREE' : formatCurrency(deliveryFee)}</span>
                    </div>
                    <div className="flex items-center justify-between text-base font-bold text-roast pt-2 border-t border-cream-border">
                      <span className="font-serif">Grand Total</span>
                      <span className="font-serif text-terracotta">{formatCurrency(grandTotal)}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                    className="w-full py-3.5 px-4 rounded-2xl bg-terracotta hover:bg-terracotta-dark text-white font-semibold text-sm shadow-md shadow-terracotta/25 flex items-center justify-center gap-2 transition-all active:scale-98 disabled:opacity-50 cursor-pointer"
                  >
                    {isCheckingOut ? (
                      <>
                        <Clock className="w-4 h-4 animate-spin" />
                        <span>Sending Formula to Kitchen...</span>
                      </>
                    ) : (
                      <>
                        <span>Confirm Order & Bake It</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
