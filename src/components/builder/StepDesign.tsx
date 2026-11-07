'use client';

import React from 'react';
import { useCakeStore } from '@/store/useCakeStore';
import {
  FROSTING_OPTIONS,
  COLOR_OPTIONS,
  TOPPER_OPTIONS,
} from '@/data/cakeData';
import { formatCurrency } from '@/lib/utils';
import { Check } from 'lucide-react';

export function StepDesign() {
  const {
    config,
    setFrosting,
    setColor,
    toggleTopper,
    setInscription,
    setPlaqueStyle,
  } = useCakeStore();

  return (
    <div className="space-y-8">
      {/* 1. Frosting Type */}
      <section className="space-y-3">
        <div className="flex items-baseline justify-between">
          <h3 className="font-serif text-lg font-semibold text-roast">
            1. Outer Frosting Finish
          </h3>
          <span className="text-xs text-roast/50">Texture</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {FROSTING_OPTIONS.map((frosting) => {
            const isSelected = config.frosting === frosting.id;
            return (
              <button
                key={frosting.id}
                type="button"
                onClick={() => setFrosting(frosting.id)}
                className={`p-4 rounded-2xl text-left border transition-all duration-150 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-terracotta bg-terracotta/5 ring-1 ring-terracotta shadow-xs'
                    : 'border-cream-border bg-cream-card hover:border-terracotta-light/70 shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-matcha font-medium">
                      {frosting.dietaryTag}
                    </span>
                    <span className="font-semibold text-roast/70">
                      {frosting.price === 0 ? 'Included' : `+${formatCurrency(frosting.price)}`}
                    </span>
                  </div>
                  <h4 className="font-serif font-bold text-sm text-roast mt-1.5">
                    {frosting.name}
                  </h4>
                  <p className="text-xs text-roast/65 mt-1 leading-relaxed">
                    {frosting.description}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-cream-border/60 text-[11px] text-terracotta font-medium">
                  {frosting.finishStyle}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* 2. Color Swatches */}
      <section className="bg-cream-card rounded-2xl p-5 border border-cream-border shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-base font-semibold text-roast">
            2. Color Palette
          </h3>
          <span className="text-xs text-roast/50">Natural Pigments</span>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
          {COLOR_OPTIONS.map((color) => {
            const isSelected = config.color === color.id;
            return (
              <button
                key={color.id}
                type="button"
                onClick={() => setColor(color.id)}
                className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                  isSelected
                    ? 'border-terracotta bg-terracotta/10 ring-1 ring-terracotta'
                    : 'border-cream-border bg-cream hover:border-terracotta-light'
                }`}
              >
                <div
                  className="w-8 h-8 rounded-full border border-black/10 shadow-xs flex items-center justify-center"
                  style={{ backgroundColor: color.hex }}
                >
                  {isSelected && (
                    <Check
                      className="w-3.5 h-3.5 stroke-[3]"
                      style={{
                        color:
                          color.id === 'classic-cream' || color.id === 'pastel-blush'
                            ? '#2C221E'
                            : '#FFFFFF',
                      }}
                    />
                  )}
                </div>
                <span className="font-serif font-semibold text-[11px] text-roast truncate w-full text-center">
                  {color.name}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. Toppers */}
      <section className="space-y-3">
        <div className="flex items-baseline justify-between">
          <h3 className="font-serif text-lg font-semibold text-roast">
            3. Crown Toppers
          </h3>
          <span className="text-xs text-roast/50">Multi-select</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {TOPPER_OPTIONS.map((topper) => {
            const isSelected = config.toppers.includes(topper.id);
            return (
              <button
                key={topper.id}
                type="button"
                onClick={() => toggleTopper(topper.id)}
                className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? 'border-terracotta bg-terracotta/5 ring-1 ring-terracotta shadow-xs'
                    : 'border-cream-border bg-cream-card hover:border-terracotta-light/70 shadow-xs'
                }`}
              >
                <div>
                  <h4 className="font-serif font-bold text-xs text-roast">
                    {topper.name}
                  </h4>
                  <span className="text-[11px] text-terracotta font-medium">
                    +{formatCurrency(topper.price)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-roast/50">{topper.detail}</span>
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

      {/* 4. Plaque Inscription */}
      <section className="bg-cream-card rounded-2xl p-5 border border-cream-border shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-base font-semibold text-roast">
            4. Plaque Inscription
          </h3>
          <span className="text-xs text-roast/50">Max 35 chars</span>
        </div>

        <div className="space-y-2.5">
          <div className="relative">
            <input
              type="text"
              maxLength={35}
              value={config.inscription}
              onChange={(e) => setInscription(e.target.value)}
              placeholder="e.g. Happy Birthday Elena!"
              className="w-full px-3.5 py-2.5 rounded-xl border border-cream-border bg-cream text-roast text-xs focus:outline-hidden focus:border-terracotta font-medium"
            />
            <span className="absolute right-3 top-2.5 text-[11px] text-roast/40 font-mono">
              {config.inscription.length}/35
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-roast/60 font-medium">Style:</span>
            {(
              [
                { id: 'ivory', label: 'Ivory' },
                { id: 'gold', label: 'Gold Leaf' },
                { id: 'chocolate', label: 'Dark Cocoa' },
              ] as const
            ).map((style) => (
              <button
                key={style.id}
                type="button"
                onClick={() => setPlaqueStyle(style.id)}
                className={`px-3 py-1 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                  config.plaqueStyle === style.id
                    ? 'border-terracotta bg-terracotta text-white shadow-2xs'
                    : 'border-cream-border bg-cream text-roast/70 hover:border-terracotta'
                }`}
              >
                {style.label}
              </button>
            ))}
          </div>

          {config.inscription.trim().length > 0 && (
            <p className="text-center font-serif italic text-sm text-roast/80 pt-1">
              &ldquo;{config.inscription}&rdquo;
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
