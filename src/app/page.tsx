'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { CartDrawer } from '@/components/CartDrawer';
import { CakeVisualizer } from '@/components/CakeVisualizer';
import {
  PROBLEM_SOLUTION_MATRIX,
  FOUNDERS_DATA,
  FLOUR_OPTIONS,
  KITCHEN_LOCATIONS,
  FAQ_ITEMS,
  PRESET_INSPIRATIONS,
} from '@/data/cakeData';
import { useCakeStore } from '@/store/useCakeStore';
import {
  Sparkles,
  ArrowRight,
  Wheat,
  Sliders,
  Palette,
  Clock,
  ChevronRight,
  MapPin,
  Star,
} from 'lucide-react';

export default function LandingPage() {
  const { loadPreset } = useCakeStore();

  const stepTeasers = [
    {
      step: '01',
      title: 'Flour & Structure',
      description: 'Heirloom wheat, keto almond, oat, or certified celiac-safe blend in 4" to multi-tier.',
      icon: <Wheat className="w-4 h-4 text-terracotta" />,
    },
    {
      step: '02',
      title: 'Flavor & Sweetness',
      description: 'Monkfruit, raw honey, or organic cane dialed precisely from 25% to 100%.',
      icon: <Sliders className="w-4 h-4 text-honey" />,
    },
    {
      step: '03',
      title: 'Design & Plaque',
      description: 'Velvet buttercream, natural color swatches, pressed florals, and cursive inscription.',
      icon: <Palette className="w-4 h-4 text-matcha" />,
    },
    {
      step: '04',
      title: 'Fresh On-Demand',
      description: 'Baked to order and delivered in 14°C thermal packaging within 2.5 hours.',
      icon: <Clock className="w-4 h-4 text-terracotta-dark" />,
    },
  ];

  return (
    <div className="min-h-screen bg-cream text-roast flex flex-col bg-warm-pattern">
      <Navbar />
      <CartDrawer />

      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-16 sm:pt-20 sm:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cream-card border border-cream-border text-xs font-semibold text-terracotta">
                <Sparkles className="w-3.5 h-3.5 text-honey" />
                <span>Bespoke Artisanal Patisserie</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-roast tracking-tight leading-[1.15]">
                Crafted by Science, <br />
                <span className="text-terracotta italic font-normal">Designed by You.</span>
              </h1>

              <p className="text-base text-roast/70 max-w-lg leading-relaxed">
                Personalize foundation flours, tailored sweetness, and artisanal aesthetics for on-demand cakes baked fresh to order.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
                <Link
                  href="/builder"
                  className="px-6 py-3.5 rounded-xl bg-terracotta hover:bg-terracotta-dark text-white font-semibold text-sm shadow-sm flex items-center justify-center gap-2 transition-all active:scale-98 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-honey-light" />
                  <span>Launch Custom Studio</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href="#bases"
                  className="px-5 py-3.5 rounded-xl bg-cream-card hover:bg-white border border-cream-border text-roast font-medium text-sm flex items-center justify-center transition-all cursor-pointer"
                >
                  Explore Flour Bases
                </a>
              </div>

              <div className="pt-3 flex items-center gap-3 text-xs text-roast/60">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span>4.98 / 5 from 1,240+ custom bakes</span>
                <span>•</span>
                <span className="text-matcha font-medium">100% Celiac & Keto Safe</span>
              </div>
            </div>

            {/* Right Column: Visualizer Preview */}
            <div className="lg:col-span-5">
              <CakeVisualizer showControls={true} />
            </div>
          </div>
        </div>
      </section>

      {/* 2. PROBLEM VS. SOLUTION MATRIX */}
      <section id="science" className="py-16 bg-cream-card border-y border-cream-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-terracotta">
              The Standard
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-roast">
              Why Bespoke Matters
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PROBLEM_SOLUTION_MATRIX.map((item, idx) => (
              <div
                key={idx}
                className="bg-cream rounded-2xl p-6 border border-cream-border space-y-4"
              >
                <span className="text-[11px] font-bold uppercase tracking-wider text-terracotta">
                  {item.badge}
                </span>

                <div className="space-y-1">
                  <span className="text-xs text-rose-600 font-medium block">
                    Traditional Bakeries
                  </span>
                  <p className="text-xs text-roast/70">
                    {item.problemDesc}
                  </p>
                </div>

                <div className="space-y-1 pt-2 border-t border-cream-border">
                  <span className="text-xs text-matcha font-medium block">
                    Bake It Your Way
                  </span>
                  <p className="text-xs text-roast/90 font-medium">
                    {item.solutionDesc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. 4 STEPS TEASER */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-terracotta">
              Workflow
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-roast">
              4 Steps to Your Cake
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {stepTeasers.map((step) => (
              <div
                key={step.step}
                className="bg-cream-card rounded-2xl p-5 border border-cream-border space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-bold text-lg text-terracotta">
                      {step.step}
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-cream flex items-center justify-center border border-cream-border">
                      {step.icon}
                    </div>
                  </div>
                  <h3 className="font-serif font-bold text-sm text-roast">
                    {step.title}
                  </h3>
                  <p className="text-xs text-roast/65 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-cream-border/60">
                  <Link
                    href="/builder"
                    className="text-xs font-semibold text-roast hover:text-terracotta flex items-center gap-1 transition-colors"
                  >
                    <span>Configure</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FLOUR BASES SHOWCASE */}
      <section id="bases" className="py-16 bg-cream-card border-y border-cream-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-terracotta">
                Grains & Milling
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-roast mt-1">
                Foundation Flours
              </h2>
            </div>
            <Link
              href="/builder"
              className="text-xs font-semibold text-terracotta hover:underline hidden sm:inline"
            >
              Choose in Studio →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FLOUR_OPTIONS.map((flour) => (
              <div
                key={flour.id}
                className="bg-cream rounded-2xl p-5 border border-cream-border space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span
                    className="w-5 h-5 rounded-full border border-black/10"
                    style={{ backgroundColor: flour.crumbHex }}
                  />
                  <span className="text-xs font-semibold text-roast/60">
                    {flour.price === 0 ? 'Standard' : `+₱${flour.price}`}
                  </span>
                </div>

                <div>
                  <h3 className="font-serif font-bold text-sm text-roast">
                    {flour.name}
                  </h3>
                  <span className="text-xs text-terracotta font-medium">
                    {flour.subtitle}
                  </span>
                </div>

                <p className="text-xs text-roast/65 leading-relaxed">
                  {flour.description}
                </p>

                <span className="inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full bg-cream-card border border-cream-border text-roast">
                  {flour.dietaryTags[0]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CHEF PRESETS */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-terracotta">
              Inspiration
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-roast">
              Chef Presets
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PRESET_INSPIRATIONS.map((preset) => (
              <div
                key={preset.id}
                className="bg-cream-card rounded-2xl p-5 border border-cream-border space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-semibold text-matcha bg-matcha-light px-2 py-0.5 rounded-full inline-block">
                    {preset.dietaryFocus}
                  </span>
                  <h3 className="font-serif font-bold text-base text-roast">
                    {preset.title}
                  </h3>
                  <p className="text-xs text-roast/65 leading-relaxed">
                    {preset.tagline}
                  </p>
                </div>

                <div className="pt-3 border-t border-cream-border">
                  <Link
                    href="/builder"
                    onClick={() => loadPreset(preset.id)}
                    className="w-full py-2 rounded-xl bg-cream hover:bg-terracotta hover:text-white border border-cream-border text-roast text-xs font-semibold flex items-center justify-center gap-1 transition-all"
                  >
                    <span>Load Recipe</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FOUNDERS */}
      <section id="founders" className="py-16 bg-roast text-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-honey">
              Founders
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Culinary Chemistry
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FOUNDERS_DATA.map((founder) => (
              <div
                key={founder.name}
                className="bg-roast-light/60 rounded-2xl p-6 border border-white/10 space-y-3"
              >
                <div>
                  <h3 className="font-serif font-bold text-base text-white">
                    {founder.name}
                  </h3>
                  <span className="text-xs text-terracotta-light block">
                    {founder.role}
                  </span>
                  <span className="text-[11px] text-cream/50 block mt-0.5">
                    {founder.background}
                  </span>
                </div>

                <p className="text-xs text-cream/80 italic font-serif leading-relaxed pt-1">
                  &ldquo;{founder.quote}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. KITCHEN LOCATIONS */}
      <section id="locations" className="py-14 bg-cream-card border-b border-cream-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {KITCHEN_LOCATIONS.map((loc) => (
              <div
                key={loc.id}
                className="bg-cream rounded-2xl p-5 border border-cream-border space-y-2"
              >
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-terracotta" />
                  <h3 className="font-serif font-bold text-sm text-roast">
                    {loc.name}
                  </h3>
                </div>
                <p className="text-xs text-roast/65">
                  {loc.address}
                </p>
                <span className="text-[11px] text-matcha font-medium block pt-1">
                  {loc.hours} • {loc.leadTime}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FAQ */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-2 mb-10">
            <h2 className="font-serif text-2xl font-bold text-roast">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {FAQ_ITEMS.map((item, idx) => (
              <div
                key={idx}
                className="bg-cream-card rounded-xl p-4 border border-cream-border space-y-1.5"
              >
                <h3 className="font-serif font-bold text-sm text-roast">
                  {item.question}
                </h3>
                <p className="text-xs text-roast/70 leading-relaxed">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FOOTER */}
      <footer className="bg-cream-card border-t border-cream-border py-10 text-xs text-roast/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Wheat className="w-4 h-4 text-terracotta" />
            <span className="font-serif font-bold text-sm text-roast">
              Bake It Your Way
            </span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/builder" className="hover:text-terracotta">Custom Studio</Link>
            <a href="#bases" className="hover:text-terracotta">Flour Guide</a>
            <a href="#locations" className="hover:text-terracotta">Kitchens</a>
          </div>
          <p>© 2026 Bake It Your Way Inc.</p>
        </div>
      </footer>
    </div>
  );
}
