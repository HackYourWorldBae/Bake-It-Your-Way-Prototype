'use client';

import React from 'react';
import { useCakeStore } from '@/store/useCakeStore';
import {
  SWEETENER_OPTIONS,
  SWEETNESS_LEVELS,
  FILLING_OPTIONS,
} from '@/data/cakeData';
import { formatCurrency } from '@/lib/utils';
import { Check, Flame, Heart, Sparkles, Leaf, Crown } from 'lucide-react';

export function StepFlavor() {
  const {
    config,
    setSweetener,
    setSweetnessLevel,
    toggleFilling,
  } = useCakeStore();

  const getFillingIcon = (id: string) => {
    switch (id) {
      case 'dark-ganache':
        return <Sparkles className="w-3.5 h-3.5 text-amber-800" />;
      case 'strawberry-compote':
        return <Heart className="w-3.5 h-3.5 text-rose-500" />;
      case 'pistachio-cream':
        return <Crown className="w-3.5 h-3.5 text-emerald-700" />;
      case 'salted-caramel':
        return <Flame className="w-3.5 h-3.5 text-amber-600" />;
      case 'matcha-mousse':
        return <Leaf className="w-3.5 h-3.5 text-emerald-600" />;
      default:
        return <Sparkles className="w-3.5 h-3.5 text-honey" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* 1. Sweetener */}
      <section className="space-y-3">
        <div className="flex items-baseline justify-between">
          <h3 className="font-serif text-lg font-semibold text-roast">
            1. Sweetener
          </h3>
          <span className="text-xs text-roast/50">Glycemic Balance</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {SWEETENER_OPTIONS.map((sweetener) => {
            const isSelected = config.sweetener === sweetener.id;
            return (
              <button
                key={sweetener.id}
                type="button"
                onClick={() => setSweetener(sweetener.id)}
                className={`p-4 rounded-2xl text-left border transition-all duration-150 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-terracotta bg-terracotta/5 ring-1 ring-terracotta shadow-xs'
                    : 'border-cream-border bg-cream-card hover:border-terracotta-light/70 shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-matcha font-medium">
                      {sweetener.dietaryTag}
                    </span>
                    <span className="font-semibold text-roast/70">
                      {sweetener.price === 0 ? 'Free' : `+${formatCurrency(sweetener.price)}`}
                    </span>
                  </div>
                  <h4 className="font-serif font-bold text-sm text-roast mt-1.5">
                    {sweetener.name}
                  </h4>
                  <p className="text-xs text-roast/65 mt-1 leading-relaxed">
                    {sweetener.description}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-cream-border/60 text-[11px] text-roast/50">
                  {sweetener.glycemicNotes}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* 2. Sweetness Level (Clean Segmented Control) */}
      <section className="bg-cream-card rounded-2xl p-5 border border-cream-border shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-base font-semibold text-roast">
            2. Sweetness Level
          </h3>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-cream border border-cream-border text-terracotta">
            {config.sweetnessLevel}% Dialed
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {SWEETNESS_LEVELS.map((s) => {
            const isSelected = config.sweetnessLevel === s.level;
            return (
              <button
                key={s.level}
                type="button"
                onClick={() => setSweetnessLevel(s.level)}
                className={`py-3 px-3 rounded-xl border text-center transition-all cursor-pointer ${
                  isSelected
                    ? 'border-terracotta bg-terracotta text-white shadow-xs'
                    : 'border-cream-border bg-cream hover:border-terracotta text-roast'
                }`}
              >
                <span className="font-serif font-bold text-xs block">
                  {s.label}
                </span>
                <span
                  className={`text-[10px] mt-0.5 block ${
                    isSelected ? 'text-white/80' : 'text-roast/50'
                  }`}
                >
                  {s.desc}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. Layer Fillings */}
      <section className="space-y-3">
        <div className="flex items-baseline justify-between">
          <h3 className="font-serif text-lg font-semibold text-roast">
            3. Layer Inclusions
          </h3>
          <span className="text-xs text-roast/50">
            {config.fillings.length}/3 Selected
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {FILLING_OPTIONS.map((filling) => {
            const isSelected = config.fillings.includes(filling.id);
            return (
              <button
                key={filling.id}
                type="button"
                onClick={() => toggleFilling(filling.id)}
                className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? 'border-terracotta bg-terracotta/5 ring-1 ring-terracotta shadow-xs'
                    : 'border-cream-border bg-cream-card hover:border-terracotta-light/70 shadow-xs'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-cream flex items-center justify-center border border-cream-border shrink-0">
                    {getFillingIcon(filling.id)}
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-serif font-bold text-xs text-roast truncate">
                      {filling.name}
                    </h4>
                    <span className="text-[11px] text-terracotta font-medium">
                      +{formatCurrency(filling.price)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className="w-3 h-3 rounded-full border border-black/10"
                    style={{ backgroundColor: filling.layerHex }}
                  />
                  {isSelected && (
                    <span className="w-4 h-4 rounded-full bg-terracotta text-white flex items-center justify-center">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}
