'use client';

import React from 'react';
import { useCakeStore } from '@/store/useCakeStore';
import {
  CAKE_SIZES,
  FLOUR_OPTIONS,
  COLOR_OPTIONS,
  FILLING_OPTIONS,
} from '@/data/cakeData';
import { FillingId, TopperId } from '@/types/cake';
import { Eye, Layers, Sun, Moon } from 'lucide-react';

interface CakeVisualizerProps {
  className?: string;
  showControls?: boolean;
}

export function CakeVisualizer({ className = '', showControls = true }: CakeVisualizerProps) {
  const {
    config,
    visualizerMode,
    lightingMode,
    toggleVisualizerMode,
    toggleLightingMode,
  } = useCakeStore();

  const currentSize = CAKE_SIZES.find((s) => s.id === config.size) || CAKE_SIZES[1];
  const currentFlour = FLOUR_OPTIONS.find((f) => f.id === config.flour) || FLOUR_OPTIONS[0];
  const currentColor = COLOR_OPTIONS.find((c) => c.id === config.color) || COLOR_OPTIONS[0];

  const hasFilling = (id: FillingId) => config.fillings.includes(id);
  const hasTopper = (id: TopperId) => config.toppers.includes(id);

  // Derive crumb color based on flour + dark ganache presence
  const hasChocolate = hasFilling('dark-ganache');
  const spongeColor = hasChocolate ? '#4A2F22' : currentFlour.crumbHex;
  const spongeSecondary = hasChocolate ? '#332017' : '#D0B484';

  const isSemiNaked = config.frosting === 'semi-naked';
  const isWhipped = config.frosting === 'whipped-coconut';
  const isCandlelight = lightingMode === 'candlelight';

  // Sizing geometry
  const isBento = config.size === 'bento';
  const isTier = config.size === 'tier';

  return (
    <div
      className={`relative w-full rounded-3xl overflow-hidden border border-cream-border transition-colors duration-500 shadow-md ${
        isCandlelight
          ? 'bg-gradient-to-b from-[#251A15] via-[#1F1511] to-[#170E0B] text-amber-100'
          : 'bg-gradient-to-b from-[#FFFDF9] via-[#FAF5EE] to-[#F3ECE0] text-roast'
      } ${className}`}
    >
      {/* Ambient Lighting Overlay */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${
          isCandlelight
            ? 'opacity-80 bg-[radial-gradient(circle_at_50%_40%,rgba(226,158,75,0.22),transparent_70%)]'
            : 'opacity-40 bg-[radial-gradient(circle_at_50%_30%,rgba(200,125,85,0.08),transparent_65%)]'
        }`}
      />

      {/* Header controls bar */}
      {showControls && (
        <div className="relative z-10 flex items-center justify-between px-5 pt-4 pb-2 border-b border-cream-border/40 backdrop-blur-xs">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold tracking-wider uppercase opacity-75">
              Live Artisanal Studio
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* View Mode Toggle: Exterior vs Cross-Section Slice */}
            <button
              type="button"
              onClick={toggleVisualizerMode}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                visualizerMode === 'cross-section'
                  ? 'bg-terracotta text-white shadow-xs'
                  : 'bg-cream-card/80 hover:bg-cream-card text-roast border border-cream-border/80'
              }`}
              title="Toggle between exterior frosting and interior sponge layers"
            >
              {visualizerMode === 'cross-section' ? (
                <>
                  <Eye className="w-3.5 h-3.5" />
                  <span>Exterior View</span>
                </>
              ) : (
                <>
                  <Layers className="w-3.5 h-3.5" />
                  <span>Slice Interior</span>
                </>
              )}
            </button>

            {/* Ambient Lighting Toggle */}
            <button
              type="button"
              onClick={toggleLightingMode}
              className={`p-1.5 rounded-full text-xs transition-colors cursor-pointer ${
                isCandlelight
                  ? 'bg-honey text-roast'
                  : 'bg-cream-card/80 hover:bg-cream-card text-roast border border-cream-border/80'
              }`}
              title="Toggle Daylight / Candlelight Ambiance"
            >
              {isCandlelight ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      )}

      {/* SVG Canvas Area */}
      <div className="relative flex items-center justify-center p-4 sm:p-8 min-h-[360px] sm:min-h-[420px] select-none">
        <svg
          viewBox="0 0 500 480"
          className="w-full max-w-[420px] h-auto drop-shadow-xl overflow-visible"
        >
          <defs>
            {/* Base Pedestal Stand Gradient */}
            <linearGradient id="pedestalGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#D9D0C3" />
              <stop offset="50%" stopColor="#F7F3EB" />
              <stop offset="100%" stopColor="#C9BFA8" />
            </linearGradient>

            <linearGradient id="pedestalRim" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#B3A591" />
              <stop offset="50%" stopColor="#E5DCB8" />
              <stop offset="100%" stopColor="#9C8D78" />
            </linearGradient>

            {/* Frosting Gradient based on selected color */}
            <linearGradient id="cakeFrostingGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={currentColor.strokeHex} />
              <stop offset="35%" stopColor={currentColor.hex} />
              <stop offset="70%" stopColor={currentColor.hex} />
              <stop offset="100%" stopColor={currentColor.strokeHex} />
            </linearGradient>

            {/* Sponge Crumb Gradient */}
            <linearGradient id="spongeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={spongeSecondary} />
              <stop offset="50%" stopColor={spongeColor} />
              <stop offset="100%" stopColor={spongeSecondary} />
            </linearGradient>

            {/* Soft Shadow for tiers */}
            <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="6" stdDeviation="6" floodOpacity="0.25" />
            </filter>

            {/* Gold leaf pattern shimmer */}
            <radialGradient id="goldShimmer" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFF2A3" />
              <stop offset="60%" stopColor="#E2A638" />
              <stop offset="100%" stopColor="#9E690B" />
            </radialGradient>
          </defs>

          {/* 1. CERAMIC CAKE PEDESTAL STAND */}
          <g id="stand" className="transition-all duration-300">
            {/* Table drop shadow */}
            <ellipse cx="250" cy="440" rx="190" ry="22" fill="#000000" opacity="0.12" />
            <ellipse cx="250" cy="438" rx="140" ry="14" fill="#000000" opacity="0.08" />

            {/* Stand Base */}
            <path
              d="M190 435 C190 430, 210 422, 230 420 L270 420 C290 422, 310 430, 310 435 C310 438, 290 440, 250 440 C210 440, 190 438, 190 435 Z"
              fill="url(#pedestalGrad)"
              stroke="#B3A591"
              strokeWidth="1.5"
            />
            {/* Stand Stem */}
            <path
              d="M236 420 C234 395, 238 375, 240 365 L260 365 C262 375, 266 395, 264 420 Z"
              fill="url(#pedestalGrad)"
              stroke="#B3A591"
              strokeWidth="1.5"
            />
            {/* Pedestal Top Platter Disc */}
            <ellipse
              cx="250"
              cy="365"
              rx="180"
              ry="26"
              fill="url(#pedestalGrad)"
              stroke="url(#pedestalRim)"
              strokeWidth="2.5"
            />
            <ellipse cx="250" cy="363" rx="174" ry="22" fill="#FAF7F2" opacity="0.6" />
          </g>

          {/* 2. CAKE TIERS RENDERING */}
          <g id="cakeTiers">
            {/* CASE A: GRAND DUO TIER (Stacked bottom 8" tier + top 6" tier) */}
            {isTier && (
              <>
                {/* BOTTOM TIER (8") */}
                <g id="bottomTier">
                  {/* Shadow under bottom tier */}
                  <ellipse cx="250" cy="358" rx="150" ry="20" fill="#000000" opacity="0.1" />

                  {/* Exterior or Cross Section */}
                  {visualizerMode === 'exterior' ? (
                    <>
                      {/* Bottom tier cylinder wall */}
                      <path
                        d="M105 270 L105 345 C105 365, 395 365, 395 345 L395 270 C395 290, 105 290, 105 270 Z"
                        fill="url(#cakeFrostingGrad)"
                        stroke={currentColor.strokeHex}
                        strokeWidth="1.5"
                      />
                      {/* Semi-naked crumb peek-through marks */}
                      {isSemiNaked && (
                        <g opacity="0.45">
                          <path
                            d="M120 290 Q250 310 380 290 Q250 325 120 315 Z"
                            fill={spongeColor}
                          />
                          <ellipse cx="160" cy="320" rx="35" ry="12" fill={spongeSecondary} />
                          <ellipse cx="330" cy="315" rx="42" ry="14" fill={spongeSecondary} />
                        </g>
                      )}
                      {/* Bottom tier top ellipse */}
                      <ellipse
                        cx="250"
                        cy="270"
                        rx="145"
                        ry="20"
                        fill={currentColor.hex}
                        stroke={currentColor.strokeHex}
                        strokeWidth="1.5"
                      />
                      {/* Rim piping beads */}
                      <ellipse
                        cx="250"
                        cy="270"
                        rx="144"
                        ry="19"
                        fill="none"
                        stroke={currentColor.strokeHex}
                        strokeWidth="2"
                        strokeDasharray="4 6"
                        opacity="0.7"
                      />
                    </>
                  ) : (
                    /* Bottom Tier Cross-section */
                    <g id="bottomSlice">
                      <path
                        d="M105 270 L105 345 C105 365, 395 365, 395 345 L395 270 C395 290, 105 290, 105 270 Z"
                        fill="url(#spongeGrad)"
                        stroke="#B59A70"
                        strokeWidth="2"
                      />
                      {/* Filling Ribbon inside bottom tier */}
                      {config.fillings.length > 0 && (
                        <path
                          d="M110 310 Q250 325 390 310 L390 318 Q250 333 110 318 Z"
                          fill={FILLING_OPTIONS.find((f) => f.id === config.fillings[0])?.layerHex || '#B23A48'}
                        />
                      )}
                      {config.fillings.length > 1 && (
                        <path
                          d="M115 290 Q250 305 385 290 L385 296 Q250 311 115 296 Z"
                          fill={FILLING_OPTIONS.find((f) => f.id === config.fillings[1])?.layerHex || '#93A87B'}
                        />
                      )}
                      <ellipse
                        cx="250"
                        cy="270"
                        rx="145"
                        ry="20"
                        fill={spongeColor}
                        stroke="#B59A70"
                        strokeWidth="1.5"
                      />
                    </g>
                  )}
                </g>

                {/* TOP TIER (6" on top of 8") */}
                <g id="topTierStacked">
                  {/* Top tier shadow on bottom tier */}
                  <ellipse cx="250" cy="270" rx="105" ry="14" fill="#000000" opacity="0.15" />

                  {visualizerMode === 'exterior' ? (
                    <>
                      <path
                        d="M150 180 L150 255 C150 270, 350 270, 350 255 L350 180 C350 195, 150 195, 150 180 Z"
                        fill="url(#cakeFrostingGrad)"
                        stroke={currentColor.strokeHex}
                        strokeWidth="1.5"
                      />
                      {isSemiNaked && (
                        <g opacity="0.5">
                          <ellipse cx="190" cy="225" rx="30" ry="10" fill={spongeSecondary} />
                          <ellipse cx="310" cy="220" rx="28" ry="9" fill={spongeColor} />
                        </g>
                      )}
                      <ellipse
                        cx="250"
                        cy="180"
                        rx="100"
                        ry="16"
                        fill={currentColor.hex}
                        stroke={currentColor.strokeHex}
                        strokeWidth="1.5"
                      />
                      {/* Crown piping rim */}
                      <ellipse
                        cx="250"
                        cy="180"
                        rx="99"
                        ry="15"
                        fill="none"
                        stroke={currentColor.strokeHex}
                        strokeWidth="2.5"
                        strokeDasharray="4 5"
                        opacity="0.8"
                      />
                    </>
                  ) : (
                    <g id="topTierSlice">
                      <path
                        d="M150 180 L150 255 C150 270, 350 270, 350 255 L350 180 C350 195, 150 195, 150 180 Z"
                        fill="url(#spongeGrad)"
                        stroke="#B59A70"
                        strokeWidth="2"
                      />
                      {config.fillings.length > 0 && (
                        <path
                          d="M155 220 Q250 232 345 220 L345 227 Q250 239 155 227 Z"
                          fill={FILLING_OPTIONS.find((f) => f.id === config.fillings[0])?.layerHex || '#B23A48'}
                        />
                      )}
                      <ellipse
                        cx="250"
                        cy="180"
                        rx="100"
                        ry="16"
                        fill={spongeColor}
                        stroke="#B59A70"
                        strokeWidth="1.5"
                      />
                    </g>
                  )}
                </g>
              </>
            )}

            {/* CASE B: STANDARD CELEBRATION (6" Stately Single Tier) */}
            {!isTier && !isBento && (
              <g id="celebrationTier">
                {/* Tier shadow on platter */}
                <ellipse cx="250" cy="358" rx="140" ry="18" fill="#000000" opacity="0.12" />

                {visualizerMode === 'exterior' ? (
                  <>
                    {/* Cylinder body */}
                    <path
                      d="M115 220 L115 340 C115 365, 385 365, 385 340 L385 220 C385 242, 115 242, 115 220 Z"
                      fill="url(#cakeFrostingGrad)"
                      stroke={currentColor.strokeHex}
                      strokeWidth="2"
                    />

                    {/* Semi-naked crumb show-through texture */}
                    {isSemiNaked && (
                      <g opacity="0.5">
                        <path
                          d="M130 255 Q250 275 370 255 Q250 290 130 275 Z"
                          fill={spongeColor}
                        />
                        <ellipse cx="170" cy="300" rx="38" ry="14" fill={spongeSecondary} />
                        <ellipse cx="325" cy="295" rx="42" ry="15" fill={spongeSecondary} />
                        <path
                          d="M140 320 Q250 338 360 320 Q250 348 140 330 Z"
                          fill={spongeColor}
                          opacity="0.6"
                        />
                      </g>
                    )}

                    {/* Whipped coconut cloud swirls */}
                    {isWhipped && (
                      <g opacity="0.6" stroke={currentColor.strokeHex} strokeWidth="1.5" fill="none">
                        <path d="M140 250 C180 260, 210 245, 250 255 C290 265, 330 250, 360 255" />
                        <path d="M135 285 C175 295, 220 280, 260 290 C300 300, 340 285, 365 290" />
                        <path d="M145 320 C185 330, 225 315, 265 325 C305 335, 345 320, 360 325" />
                      </g>
                    )}

                    {/* Top Surface Ellipse */}
                    <ellipse
                      cx="250"
                      cy="220"
                      rx="135"
                      ry="22"
                      fill={currentColor.hex}
                      stroke={currentColor.strokeHex}
                      strokeWidth="2"
                    />

                    {/* Top Rim Frosting Bead Line */}
                    <ellipse
                      cx="250"
                      cy="220"
                      rx="133"
                      ry="20"
                      fill="none"
                      stroke={currentColor.strokeHex}
                      strokeWidth="2.5"
                      strokeDasharray="5 6"
                      opacity="0.8"
                    />
                  </>
                ) : (
                  /* Cross-Section Interior Slice View */
                  <g id="celebrationSlice">
                    <path
                      d="M115 220 L115 340 C115 365, 385 365, 385 340 L385 220 C385 242, 115 242, 115 220 Z"
                      fill="url(#spongeGrad)"
                      stroke="#B59A70"
                      strokeWidth="2.5"
                    />

                    {/* Sponge Crumb Details / Texture Speckles */}
                    <g opacity="0.35" fill="#8C6E42">
                      <circle cx="160" cy="250" r="1.5" />
                      <circle cx="210" cy="270" r="1.5" />
                      <circle cx="290" cy="255" r="1.5" />
                      <circle cx="340" cy="285" r="1.5" />
                      <circle cx="180" cy="320" r="1.5" />
                      <circle cx="250" cy="330" r="1.5" />
                      <circle cx="310" cy="315" r="1.5" />
                    </g>

                    {/* Multi Filling Layers */}
                    {config.fillings.map((fid, idx) => {
                      const fillingObj = FILLING_OPTIONS.find((f) => f.id === fid);
                      const yOffset = 260 + idx * 32;
                      return (
                        <g key={fid}>
                          <path
                            d={`M120 ${yOffset} Q250 ${yOffset + 14} 380 ${yOffset} L380 ${yOffset + 10} Q250 ${yOffset + 24} 120 ${yOffset + 10} Z`}
                            fill={fillingObj?.layerHex || '#B23A48'}
                            stroke="#FFFFFF"
                            strokeWidth="0.5"
                            opacity="0.95"
                          />
                        </g>
                      );
                    })}

                    {/* Top sponge cap */}
                    <ellipse
                      cx="250"
                      cy="220"
                      rx="135"
                      ry="22"
                      fill={spongeColor}
                      stroke="#B59A70"
                      strokeWidth="2"
                    />
                  </g>
                )}
              </g>
            )}

            {/* CASE C: BENTO PETITE (4" Mini Compact Tier) */}
            {isBento && (
              <g id="bentoTier">
                {/* Shadow on stand */}
                <ellipse cx="250" cy="360" rx="100" ry="14" fill="#000000" opacity="0.12" />

                {visualizerMode === 'exterior' ? (
                  <>
                    <path
                      d="M155 250 L155 345 C155 365, 345 365, 345 345 L345 250 C345 268, 155 268, 155 250 Z"
                      fill="url(#cakeFrostingGrad)"
                      stroke={currentColor.strokeHex}
                      strokeWidth="2"
                    />
                    {isSemiNaked && (
                      <g opacity="0.45">
                        <ellipse cx="200" cy="305" rx="30" ry="12" fill={spongeSecondary} />
                        <ellipse cx="300" cy="300" rx="32" ry="12" fill={spongeColor} />
                      </g>
                    )}
                    <ellipse
                      cx="250"
                      cy="250"
                      rx="95"
                      ry="18"
                      fill={currentColor.hex}
                      stroke={currentColor.strokeHex}
                      strokeWidth="2"
                    />
                    <ellipse
                      cx="250"
                      cy="250"
                      rx="93"
                      ry="16"
                      fill="none"
                      stroke={currentColor.strokeHex}
                      strokeWidth="2"
                      strokeDasharray="4 5"
                      opacity="0.8"
                    />
                  </>
                ) : (
                  <g id="bentoSlice">
                    <path
                      d="M155 250 L155 345 C155 365, 345 365, 345 345 L345 250 C345 268, 155 268, 155 250 Z"
                      fill="url(#spongeGrad)"
                      stroke="#B59A70"
                      strokeWidth="2"
                    />
                    {config.fillings.length > 0 && (
                      <path
                        d="M160 295 Q250 307 340 295 L340 303 Q250 315 160 303 Z"
                        fill={FILLING_OPTIONS.find((f) => f.id === config.fillings[0])?.layerHex || '#B23A48'}
                      />
                    )}
                    <ellipse
                      cx="250"
                      cy="250"
                      rx="95"
                      ry="18"
                      fill={spongeColor}
                      stroke="#B59A70"
                      strokeWidth="2"
                    />
                  </g>
                )}
              </g>
            )}
          </g>

          {/* 3. DYNAMIC TOPPERS & ACCENTS RENDERING */}
          {(() => {
            const crownY = isTier ? 180 : isBento ? 250 : 220;
            const crownRx = isTier ? 100 : isBento ? 95 : 135;
            const crownRy = isTier ? 16 : isBento ? 18 : 22;

            return (
              <g id="toppersLayer" className="transition-all duration-300">
                {/* TOPPER: PIPED ROSETTES */}
                {hasTopper('piped-rosettes') && (
                  <g id="topperRosettes">
                    {[
                      { cx: 250 - crownRx * 0.85, cy: crownY },
                      { cx: 250 - crownRx * 0.5, cy: crownY + crownRy * 0.7 },
                      { cx: 250, cy: crownY + crownRy },
                      { cx: 250 + crownRx * 0.5, cy: crownY + crownRy * 0.7 },
                      { cx: 250 + crownRx * 0.85, cy: crownY },
                      { cx: 250 - crownRx * 0.6, cy: crownY - crownRy * 0.6 },
                      { cx: 250 + crownRx * 0.6, cy: crownY - crownRy * 0.6 },
                    ].map((pt, i) => (
                      <g key={i}>
                        <ellipse
                          cx={pt.cx}
                          cy={pt.cy}
                          rx="9"
                          ry="7"
                          fill={currentColor.hex}
                          stroke={currentColor.strokeHex}
                          strokeWidth="1.5"
                        />
                        <circle cx={pt.cx} cy={pt.cy} r="3" fill={currentColor.strokeHex} opacity="0.6" />
                      </g>
                    ))}
                  </g>
                )}

                {/* TOPPER: FRESH BERRY CROWN */}
                {hasTopper('berry-crown') && (
                  <g id="topperBerries">
                    {/* Mint Sprigs */}
                    <path
                      d={`M${250 - crownRx * 0.45} ${crownY - 14} C${250 - crownRx * 0.6} ${crownY - 26}, ${250 - crownRx * 0.35} ${crownY - 32}, ${250 - crownRx * 0.4} ${crownY - 18} Z`}
                      fill="#4E7C59"
                    />
                    <path
                      d={`M${250 + crownRx * 0.4} ${crownY - 12} C${250 + crownRx * 0.55} ${crownY - 24}, ${250 + crownRx * 0.3} ${crownY - 30}, ${250 + crownRx * 0.35} ${crownY - 16} Z`}
                      fill="#4E7C59"
                    />

                    {/* Raspberries */}
                    <circle cx={250 - crownRx * 0.4} cy={crownY - 8} r="10" fill="#B32438" />
                    <circle cx={250 - crownRx * 0.4 - 3} cy={crownY - 10} r="3.5" fill="#D94156" />
                    <circle cx={250 - crownRx * 0.4 + 3} cy={crownY - 7} r="3" fill="#871727" />

                    <circle cx={250 + crownRx * 0.35} cy={crownY - 6} r="11" fill="#B32438" />
                    <circle cx={250 + crownRx * 0.35 - 3} cy={crownY - 8} r="3.5" fill="#D94156" />

                    {/* Blackberries */}
                    <circle cx={250 - crownRx * 0.15} cy={crownY - 12} r="9.5" fill="#281A36" />
                    <circle cx={250 - crownRx * 0.15 - 2} cy={crownY - 14} r="3" fill="#4B3363" />

                    <circle cx={250 + crownRx * 0.15} cy={crownY - 10} r="9.5" fill="#281A36" />
                    <circle cx={250 + crownRx * 0.15 + 2} cy={crownY - 12} r="3" fill="#4B3363" />

                    {/* Blueberries */}
                    <circle cx={250 - crownRx * 0.55} cy={crownY - 2} r="7.5" fill="#313E5C" />
                    <circle cx={250 + crownRx * 0.52} cy={crownY} r="8" fill="#313E5C" />
                    <circle cx={250} cy={crownY - 14} r="7" fill="#313E5C" />
                  </g>
                )}

                {/* TOPPER: EDIBLE PRESSED FLOWERS */}
                {hasTopper('pressed-flowers') && (
                  <g id="topperFlowers">
                    {/* Viola */}
                    <g transform={`translate(${250 - crownRx * 0.3}, ${crownY - 5}) scale(0.9)`}>
                      <ellipse cx="0" cy="-8" rx="7" ry="9" fill="#5E3A75" />
                      <ellipse cx="-8" cy="-2" rx="8" ry="7" fill="#6E448A" />
                      <ellipse cx="8" cy="-2" rx="8" ry="7" fill="#6E448A" />
                      <ellipse cx="-5" cy="7" rx="7" ry="8" fill="#F4BA46" />
                      <ellipse cx="5" cy="7" rx="7" ry="8" fill="#F4BA46" />
                      <circle cx="0" cy="0" r="2.5" fill="#2B1605" />
                    </g>

                    {/* Calendula Petals */}
                    <g transform={`translate(${250 + crownRx * 0.35}, ${crownY - 8}) scale(0.85)`}>
                      <ellipse cx="0" cy="-8" rx="6" ry="8" fill="#E88338" />
                      <ellipse cx="-7" cy="-2" rx="7" ry="6" fill="#F09B53" />
                      <ellipse cx="7" cy="-2" rx="7" ry="6" fill="#F09B53" />
                      <ellipse cx="-4" cy="6" rx="6" ry="7" fill="#E88338" />
                      <ellipse cx="4" cy="6" rx="6" ry="7" fill="#E88338" />
                      <circle cx="0" cy="0" r="2.5" fill="#592A0D" />
                    </g>

                    {/* Borage Blue Star */}
                    <g transform={`translate(${250 + crownRx * 0.05}, ${crownY - 10}) scale(0.75)`}>
                      <ellipse cx="0" cy="-7" rx="4" ry="7" fill="#4B779A" />
                      <ellipse cx="-6" cy="-1" rx="6" ry="4" fill="#5888AD" />
                      <ellipse cx="6" cy="-1" rx="6" ry="4" fill="#5888AD" />
                      <ellipse cx="-4" cy="6" rx="4" ry="6" fill="#4B779A" />
                      <ellipse cx="4" cy="6" rx="4" ry="6" fill="#4B779A" />
                      <circle cx="0" cy="0" r="2" fill="#1C3549" />
                    </g>
                  </g>
                )}

                {/* TOPPER: 24K GOLD LEAF */}
                {hasTopper('gold-leaf') && (
                  <g id="topperGoldLeaf">
                    <polygon
                      points={`${250 - 25},${crownY - 6} ${250 - 15},${crownY - 14} ${250 - 8},${crownY - 4} ${250 - 18},${crownY + 2}`}
                      fill="url(#goldShimmer)"
                      filter="url(#softShadow)"
                    />
                    <polygon
                      points={`${250 + 20},${crownY - 4} ${250 + 34},${crownY - 12} ${250 + 40},${crownY - 2} ${250 + 26},${crownY + 4}`}
                      fill="url(#goldShimmer)"
                    />
                    <polygon
                      points={`${250 - crownRx * 0.5},${crownY + 4} ${250 - crownRx * 0.42},${crownY - 2} ${250 - crownRx * 0.35},${crownY + 6}`}
                      fill="url(#goldShimmer)"
                    />
                    <polygon
                      points={`${250 + crownRx * 0.45},${crownY + 6} ${250 + crownRx * 0.55},${crownY} ${250 + crownRx * 0.58},${crownY + 8}`}
                      fill="url(#goldShimmer)"
                    />
                    <circle cx={250 + 8} cy={crownY - 10} r="2.5" fill="url(#goldShimmer)" />
                    <circle cx={250 - 45} cy={crownY} r="2" fill="url(#goldShimmer)" />
                    <circle cx={250 + 50} cy={crownY + 2} r="2.5" fill="url(#goldShimmer)" />
                  </g>
                )}

                {/* TOPPER: MACARON CLUSTER */}
                {hasTopper('macaron-cluster') && (
                  <g id="topperMacarons">
                    <g transform={`translate(${250 - 28}, ${crownY - 18}) rotate(-14)`}>
                      <ellipse cx="0" cy="-4" rx="14" ry="7" fill="#7E9F89" />
                      <rect x="-13" y="-3" width="26" height="5" rx="2" fill="#FAF6EE" />
                      <ellipse cx="0" cy="4" rx="14" ry="7" fill="#7E9F89" />
                    </g>
                    <g transform={`translate(${250 + 22}, ${crownY - 18}) rotate(12)`}>
                      <ellipse cx="0" cy="-4" rx="14" ry="7" fill="#F3D5CF" stroke="#D5A79F" strokeWidth="0.5" />
                      <rect x="-13" y="-3" width="26" height="5" rx="2" fill="#B32438" />
                      <ellipse cx="0" cy="4" rx="14" ry="7" fill="#F3D5CF" stroke="#D5A79F" strokeWidth="0.5" />
                    </g>
                    <g transform={`translate(${250}, ${crownY - 24})`}>
                      <ellipse cx="0" cy="-4" rx="15" ry="7.5" fill="#E9B668" />
                      <rect x="-14" y="-3" width="28" height="5.5" rx="2" fill="#2C221E" />
                      <ellipse cx="0" cy="4" rx="15" ry="7.5" fill="#E9B668" />
                    </g>
                  </g>
                )}
              </g>
            );
          })()}

          {/* 4. CUSTOM FONDANT INSCRIPTION PLAQUE */}
          {config.inscription.trim().length > 0 && visualizerMode === 'exterior' && (
            <g id="inscriptionPlaque" className="transition-all duration-300">
              {(() => {
                const plaqueY = isTier ? 220 : isBento ? 295 : 280;
                const isChocolatePlaque = config.plaqueStyle === 'chocolate';
                const isGoldPlaque = config.plaqueStyle === 'gold';

                const plaqueBg = isChocolatePlaque
                  ? '#3D2B24'
                  : isGoldPlaque
                  ? '#E9B668'
                  : '#FAF7F0';

                const plaqueBorder = isChocolatePlaque
                  ? '#E29E4B'
                  : isGoldPlaque
                  ? '#C5913F'
                  : '#C87D55';

                const textColor = isChocolatePlaque
                  ? '#FAF7F0'
                  : isGoldPlaque
                  ? '#2C221E'
                  : '#2C221E';

                return (
                  <g>
                    <rect
                      x="160"
                      y={plaqueY}
                      width="180"
                      height="38"
                      rx="19"
                      fill="#000000"
                      opacity="0.18"
                      transform="translate(0, 3)"
                    />
                    <rect
                      x="160"
                      y={plaqueY}
                      width="180"
                      height="38"
                      rx="19"
                      fill={plaqueBg}
                      stroke={plaqueBorder}
                      strokeWidth="2"
                    />
                    <rect
                      x="164"
                      y={plaqueY + 3}
                      width="172"
                      height="32"
                      rx="16"
                      fill="none"
                      stroke={plaqueBorder}
                      strokeWidth="0.75"
                      strokeDasharray="3 3"
                      opacity="0.7"
                    />
                    <text
                      x="250"
                      y={plaqueY + 24}
                      textAnchor="middle"
                      fill={textColor}
                      style={{
                        fontFamily: 'var(--font-serif), Georgia, serif',
                        fontStyle: 'italic',
                        fontSize: config.inscription.length > 20 ? '12px' : '14px',
                        fontWeight: 600,
                        letterSpacing: '0.02em',
                      }}
                    >
                      {config.inscription}
                    </text>
                  </g>
                );
              })()}
            </g>
          )}
        </svg>

        {/* Floating Mode indicator tag */}
        <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-xs pointer-events-none">
          <div className="px-3 py-1.5 rounded-full bg-cream-card/90 backdrop-blur-md border border-cream-border/80 shadow-xs text-roast font-medium flex items-center gap-1.5">
            <span
              className="w-3 h-3 rounded-full border border-black/10 inline-block shadow-2xs"
              style={{ backgroundColor: currentColor.hex }}
            />
            <span>{currentColor.name}</span>
            <span className="opacity-40">•</span>
            <span>{currentSize.name}</span>
          </div>

          <div className="px-3 py-1.5 rounded-full bg-cream-card/90 backdrop-blur-md border border-cream-border/80 shadow-xs text-roast font-medium">
            {visualizerMode === 'cross-section' ? '🍰 Interior Layers' : '✨ Artisanal Finish'}
          </div>
        </div>
      </div>
    </div>
  );
}
