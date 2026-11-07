'use client';

import React from 'react';
import { useCakeStore } from '@/store/useCakeStore';
import { CAKE_SIZES, FLOUR_OPTIONS, FAT_OPTIONS } from '@/data/cakeData';
import { formatCurrency } from '@/lib/utils';
import { Check } from 'lucide-react';

export function StepFlour() {
  const { config, setSize, setFlour, setFat } = useCakeStore();

  return (
    <div className="space-y-8">
      {/* 1. Size & Tiers */}
      <section className="space-y-3">
        <div className="flex items-baseline justify-between">
          <h3 className="font-serif text-lg font-semibold text-roast">
            1. Scale & Geometry
          </h3>
          <span className="text-xs text-roast/50">Servings</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {CAKE_SIZES.map((size) => {
            const isSelected = config.size === size.id;
            return (
              <button
                key={size.id}
                type="button"
                onClick={() => setSize(size.id)}
                className={`p-4 rounded-2xl text-left border transition-all duration-150 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-terracotta bg-terracotta/5 ring-1 ring-terracotta shadow-xs'
                    : 'border-cream-border bg-cream-card hover:border-terracotta-light/70 shadow-xs'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[11px] font-semibold text-terracotta block">
                      {size.diameter}
                    </span>
                    <h4 className="font-serif font-bold text-sm text-roast mt-0.5">
                      {size.name}
                    </h4>
                  </div>
                  {isSelected && (
                    <span className="w-4 h-4 rounded-full bg-terracotta text-white flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </span>
                  )}
                </div>

                <div className="pt-3 mt-3 border-t border-cream-border/60 flex items-center justify-between text-xs">
                  <span className="text-roast/60">{size.servings}</span>
                  <span className="font-serif font-bold text-roast">
                    {formatCurrency(size.basePrice)}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* 2. Foundation Flour */}
      <section className="space-y-3">
        <div className="flex items-baseline justify-between">
          <h3 className="font-serif text-lg font-semibold text-roast">
            2. Foundation Flour
          </h3>
          <span className="text-xs text-roast/50">Milled Fresh</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {FLOUR_OPTIONS.map((flour) => {
            const isSelected = config.flour === flour.id;
            return (
              <button
                key={flour.id}
                type="button"
                onClick={() => setFlour(flour.id)}
                className={`p-4 rounded-2xl text-left border transition-all duration-150 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-terracotta bg-terracotta/5 ring-1 ring-terracotta shadow-xs'
                    : 'border-cream-border bg-cream-card hover:border-terracotta-light/70 shadow-xs'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-serif font-bold text-sm text-roast">
                      {flour.name}
                    </h4>
                    <span
                      className="w-4 h-4 rounded-full border border-black/10 shrink-0 mt-0.5"
                      style={{ backgroundColor: flour.crumbHex }}
                    />
                  </div>
                  <span className="text-xs text-terracotta font-medium block">
                    {flour.subtitle}
                  </span>
                  <p className="text-xs text-roast/65 leading-relaxed pt-0.5">
                    {flour.description}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-cream-border/60 flex items-center justify-between text-xs">
                  <span className="text-matcha font-medium text-[11px]">
                    {flour.dietaryTags[0]}
                  </span>
                  <span className="font-semibold text-roast">
                    {flour.price === 0 ? 'Included' : `+${formatCurrency(flour.price)}`}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. Fat Base */}
      <section className="space-y-3">
        <h3 className="font-serif text-lg font-semibold text-roast">
          3. Fat & Emulsion
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {FAT_OPTIONS.map((fat) => {
            const isSelected = config.fat === fat.id;
            return (
              <button
                key={fat.id}
                type="button"
                onClick={() => setFat(fat.id)}
                className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-terracotta bg-terracotta/5 ring-1 ring-terracotta shadow-xs'
                    : 'border-cream-border bg-cream-card hover:border-terracotta-light/70 shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-matcha font-medium">
                      {fat.dietaryTag}
                    </span>
                    <span className="font-semibold text-roast/70">
                      {fat.price === 0 ? 'Free' : `+${formatCurrency(fat.price)}`}
                    </span>
                  </div>
                  <h4 className="font-serif font-bold text-xs text-roast mt-1.5">
                    {fat.name}
                  </h4>
                  <p className="text-[11px] text-roast/60 mt-0.5 leading-snug">
                    {fat.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}
