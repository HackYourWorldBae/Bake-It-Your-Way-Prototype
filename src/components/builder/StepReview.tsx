'use client';

import React from 'react';
import { useCakeStore } from '@/store/useCakeStore';
import {
  CAKE_SIZES,
  FLOUR_OPTIONS,
  FAT_OPTIONS,
  SWEETENER_OPTIONS,
  FROSTING_OPTIONS,
  COLOR_OPTIONS,
  FILLING_OPTIONS,
  TOPPER_OPTIONS,
  KITCHEN_LOCATIONS,
  calculateCakePrice,
  computeDietaryBadges,
  computeNutritionProfile,
} from '@/data/cakeData';
import { formatCurrency } from '@/lib/utils';
import {
  Bike,
  Store,
  ShoppingBag,
  ShieldCheck,
  Activity,
} from 'lucide-react';

export function StepReview() {
  const {
    config,
    setStep,
    addToCart,
    fulfillmentMode,
    setFulfillmentMode,
    selectedKitchen,
    setSelectedKitchen,
    deliveryAddress,
    setDeliveryDetails,
  } = useCakeStore();

  const totalPrice = calculateCakePrice(config);
  const dietaryBadges = computeDietaryBadges(config);
  const macros = computeNutritionProfile(config);

  const currentSize = CAKE_SIZES.find((s) => s.id === config.size) || CAKE_SIZES[1];
  const currentFlour = FLOUR_OPTIONS.find((f) => f.id === config.flour) || FLOUR_OPTIONS[0];
  const currentFat = FAT_OPTIONS.find((f) => f.id === config.fat) || FAT_OPTIONS[0];
  const currentSweetener = SWEETENER_OPTIONS.find((s) => s.id === config.sweetener) || SWEETENER_OPTIONS[0];
  const currentFrosting = FROSTING_OPTIONS.find((f) => f.id === config.frosting) || FROSTING_OPTIONS[0];
  const currentColor = COLOR_OPTIONS.find((c) => c.id === config.color) || COLOR_OPTIONS[0];

  return (
    <div className="space-y-6">
      {/* 1. Dietary & Macro Summary Pills */}
      <section className="bg-cream-card rounded-2xl p-4 border border-cream-border shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-matcha">
            <ShieldCheck className="w-4 h-4" />
            <span>Dietary Profile</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-medium text-roast/60">
            <Activity className="w-3.5 h-3.5 text-honey" />
            <span>{macros.netCarbs}g Net Carbs/Slice</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {dietaryBadges.map((badge) => (
            <span
              key={badge}
              className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-matcha-light text-matcha"
            >
              ✓ {badge}
            </span>
          ))}
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-cream border border-cream-border text-roast/70">
            {macros.caloriesPerServing} kcal • {macros.protein}g protein
          </span>
        </div>
      </section>

      {/* 2. Itemized Recipe Breakdown */}
      <section className="bg-cream-card rounded-2xl p-5 border border-cream-border shadow-xs space-y-3 text-xs text-roast">
        <div className="flex items-center justify-between pb-2.5 border-b border-cream-border">
          <h4 className="font-serif font-bold text-sm text-roast">
            Formulation Receipt
          </h4>
          <button
            type="button"
            onClick={() => setStep(1)}
            className="text-xs text-terracotta hover:underline cursor-pointer"
          >
            Edit
          </button>
        </div>

        <div className="space-y-2 text-roast/80">
          <div className="flex justify-between">
            <span className="text-roast/50">Size:</span>
            <span className="font-medium text-roast">{currentSize.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-roast/50">Flour & Fat:</span>
            <span className="font-medium text-roast">{currentFlour.name} • {currentFat.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-roast/50">Sweetness:</span>
            <span className="font-medium text-roast">{currentSweetener.name} @ {config.sweetnessLevel}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-roast/50">Fillings:</span>
            <span className="font-medium text-roast">
              {config.fillings.length > 0
                ? config.fillings.map((fid) => FILLING_OPTIONS.find((f) => f.id === fid)?.name).join(', ')
                : 'None'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-roast/50">Finish & Color:</span>
            <span className="font-medium text-roast">{currentFrosting.finishStyle} • {currentColor.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-roast/50">Toppers:</span>
            <span className="font-medium text-roast">
              {config.toppers.length > 0
                ? config.toppers.map((tid) => TOPPER_OPTIONS.find((t) => t.id === tid)?.name).join(', ')
                : 'Clean'}
            </span>
          </div>
          {config.inscription.trim().length > 0 && (
            <div className="flex justify-between pt-1 border-t border-cream-border/60">
              <span className="text-roast/50">Plaque:</span>
              <span className="font-serif italic text-terracotta font-medium">
                &ldquo;{config.inscription}&rdquo;
              </span>
            </div>
          )}
        </div>

        <div className="pt-3 border-t border-cream-border flex items-center justify-between text-sm font-bold text-roast">
          <span className="font-serif">Total Item Price</span>
          <span className="font-serif text-terracotta text-base">
            {formatCurrency(totalPrice)}
          </span>
        </div>
      </section>

      {/* 3. Fulfillment Mode */}
      <section className="bg-cream-card rounded-2xl p-5 border border-cream-border shadow-xs space-y-3">
        <h4 className="font-serif font-bold text-sm text-roast">
          Fulfillment
        </h4>

        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => setFulfillmentMode('express-delivery')}
            className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
              fulfillmentMode === 'express-delivery'
                ? 'border-terracotta bg-terracotta/5 ring-1 ring-terracotta text-roast font-semibold'
                : 'border-cream-border bg-cream text-roast/70'
            }`}
          >
            <Bike className="w-4 h-4 mx-auto mb-1 text-terracotta" />
            <span className="text-xs block">Express Delivery</span>
            <span className="text-[10px] text-roast/50">₱180 Thermal Van</span>
          </button>

          <button
            type="button"
            onClick={() => setFulfillmentMode('kitchen-pickup')}
            className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
              fulfillmentMode === 'kitchen-pickup'
                ? 'border-terracotta bg-terracotta/5 ring-1 ring-terracotta text-roast font-semibold'
                : 'border-cream-border bg-cream text-roast/70'
            }`}
          >
            <Store className="w-4 h-4 mx-auto mb-1 text-matcha" />
            <span className="text-xs block">Studio Pickup</span>
            <span className="text-[10px] text-matcha font-medium">Free (₱0)</span>
          </button>
        </div>

        {fulfillmentMode === 'kitchen-pickup' ? (
          <select
            value={selectedKitchen}
            onChange={(e) => setSelectedKitchen(e.target.value)}
            className="w-full text-xs p-2.5 rounded-xl border border-cream-border bg-cream text-roast"
          >
            {KITCHEN_LOCATIONS.map((loc) => (
              <option key={loc.id} value={loc.id}>
                {loc.name}
              </option>
            ))}
          </select>
        ) : (
          <input
            type="text"
            value={deliveryAddress}
            onChange={(e) => setDeliveryDetails({ deliveryAddress: e.target.value })}
            placeholder="Delivery address in Metro Manila"
            className="w-full text-xs p-2.5 rounded-xl border border-cream-border bg-cream text-roast"
          />
        )}
      </section>

      {/* 4. Action Button */}
      <button
        type="button"
        onClick={addToCart}
        className="w-full py-3.5 rounded-2xl bg-terracotta hover:bg-terracotta-dark text-white font-bold text-sm shadow-md shadow-terracotta/20 flex items-center justify-center gap-2 transition-all active:scale-98 cursor-pointer"
      >
        <ShoppingBag className="w-4 h-4" />
        <span>Add to Bag — {formatCurrency(totalPrice)}</span>
      </button>
    </div>
  );
}
