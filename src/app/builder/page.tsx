'use client';

import React from 'react';
import Link from 'next/link';
import { useCakeStore } from '@/store/useCakeStore';
import { Navbar } from '@/components/Navbar';
import { CartDrawer } from '@/components/CartDrawer';
import { CakeVisualizer } from '@/components/CakeVisualizer';
import { StepFlour } from '@/components/builder/StepFlour';
import { StepFlavor } from '@/components/builder/StepFlavor';
import { StepDesign } from '@/components/builder/StepDesign';
import { StepReview } from '@/components/builder/StepReview';
import {
  PRESET_INSPIRATIONS,
  calculateCakePrice,
  computeDietaryBadges,
  CAKE_SIZES,
  FLOUR_OPTIONS,
  COLOR_OPTIONS,
} from '@/data/cakeData';
import { formatCurrency } from '@/lib/utils';
import {
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  ShoppingBag,
  Sparkles,
} from 'lucide-react';

export default function BuilderPage() {
  const {
    config,
    currentStep,
    setStep,
    nextStep,
    prevStep,
    loadPreset,
    resetBuilder,
    addToCart,
  } = useCakeStore();

  const totalPrice = calculateCakePrice(config);
  const dietaryBadges = computeDietaryBadges(config);

  const steps = [
    { number: 1, label: 'Flour & Size' },
    { number: 2, label: 'Flavor & Sugar' },
    { number: 3, label: 'Design & Plaque' },
    { number: 4, label: 'Review & Bag' },
  ];

  const currentSize = CAKE_SIZES.find((s) => s.id === config.size) || CAKE_SIZES[1];
  const currentFlour = FLOUR_OPTIONS.find((f) => f.id === config.flour) || FLOUR_OPTIONS[0];
  const currentColor = COLOR_OPTIONS.find((c) => c.id === config.color) || COLOR_OPTIONS[0];

  return (
    <div className="min-h-screen bg-cream text-roast flex flex-col">
      <Navbar />
      <CartDrawer />

      {/* Main Studio Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Top Control Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-cream-border">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-roast/50 mb-1">
              <Link href="/" className="hover:text-terracotta">Home</Link>
              <span>/</span>
              <span className="text-roast/80 font-medium">Studio</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-roast tracking-tight">
              Custom Cake Studio
            </h1>
          </div>

          {/* Quick Presets & Reset */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span className="text-xs text-roast/50 shrink-0 mr-1 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-terracotta" />
              <span>Presets:</span>
            </span>
            {PRESET_INSPIRATIONS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => loadPreset(preset.id)}
                className="px-3 py-1 rounded-full text-xs font-medium bg-cream-card hover:bg-terracotta/10 border border-cream-border text-roast whitespace-nowrap transition-all cursor-pointer"
              >
                {preset.title}
              </button>
            ))}
            <button
              type="button"
              onClick={resetBuilder}
              className="p-1.5 rounded-full bg-cream-card hover:bg-cream border border-cream-border text-roast/50 hover:text-roast transition-all shrink-0 cursor-pointer"
              title="Reset"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Minimal Step Tabs */}
        <div className="py-5">
          <div className="grid grid-cols-4 gap-2">
            {steps.map((s) => {
              const isActive = currentStep === s.number;
              const isPast = currentStep > s.number;
              return (
                <button
                  key={s.number}
                  type="button"
                  onClick={() => setStep(s.number)}
                  className={`py-2.5 px-2 rounded-xl text-center border transition-all cursor-pointer ${
                    isActive
                      ? 'border-terracotta bg-terracotta/10 text-terracotta font-semibold'
                      : isPast
                      ? 'border-cream-border bg-cream-card text-roast/80'
                      : 'border-cream-border/50 text-roast/40'
                  }`}
                >
                  <span className="text-[11px] block text-roast/50">0{s.number}</span>
                  <span className="text-xs sm:text-sm font-serif font-bold truncate block">
                    {s.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* TWO-COLUMN WORKSPACE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-2">
          {/* LEFT: STEP CONTENT */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-cream-card rounded-3xl p-5 sm:p-7 border border-cream-border shadow-xs">
              {currentStep === 1 && <StepFlour />}
              {currentStep === 2 && <StepFlavor />}
              {currentStep === 3 && <StepDesign />}
              {currentStep === 4 && <StepReview />}
            </div>

            {/* Step Wizard Action Buttons */}
            <div className="flex items-center justify-between pt-1">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="px-4 py-2.5 rounded-xl border border-cream-border bg-cream-card hover:bg-cream text-roast text-xs font-semibold disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>

              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-5 py-2.5 rounded-xl bg-terracotta hover:bg-terracotta-dark text-white text-xs font-bold shadow-xs transition-all active:scale-98 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Next: {steps[currentStep].label}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={addToCart}
                  className="px-6 py-2.5 rounded-xl bg-terracotta hover:bg-terracotta-dark text-white text-xs font-bold shadow-xs transition-all active:scale-98 flex items-center gap-1.5 cursor-pointer"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add to Bag — {formatCurrency(totalPrice)}</span>
                </button>
              )}
            </div>
          </div>

          {/* RIGHT: STICKY LIVE VISUALIZER & DYNAMIC SUMMARY */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
            <CakeVisualizer showControls={true} />

            <div className="bg-cream-card rounded-2xl p-4 sm:p-5 border border-cream-border shadow-xs space-y-3">
              <div className="flex items-baseline justify-between">
                <div>
                  <h3 className="font-serif font-bold text-base text-roast">
                    {currentSize.name}
                  </h3>
                  <p className="text-xs text-roast/60 mt-0.5">
                    {currentFlour.name} • {currentColor.name}
                  </p>
                </div>

                <span className="font-serif font-bold text-xl text-terracotta">
                  {formatCurrency(totalPrice)}
                </span>
              </div>

              {/* Dynamic Dietary Badges */}
              {dietaryBadges.length > 0 && (
                <div className="flex flex-wrap gap-1 pt-1">
                  {dietaryBadges.map((badge) => (
                    <span
                      key={badge}
                      className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-matcha-light text-matcha"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              )}

              <button
                type="button"
                onClick={addToCart}
                className="w-full py-3 rounded-xl bg-terracotta hover:bg-terracotta-dark text-white font-semibold text-xs shadow-xs flex items-center justify-center gap-2 transition-all active:scale-98 cursor-pointer"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add Creation to Bag</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
