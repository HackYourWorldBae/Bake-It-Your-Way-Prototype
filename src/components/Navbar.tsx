'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCakeStore } from '@/store/useCakeStore';
import { ShoppingBag, Sparkles, Menu, X, Wheat } from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const { cartItems, openCart } = useCakeStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks = [
    { name: 'Our Science', href: '/#science' },
    { name: 'Artisan Bases', href: '/#bases' },
    { name: 'Custom Studio', href: '/builder' },
    { name: 'Kitchen Locations', href: '/#locations' },
    { name: 'Founders', href: '/#founders' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-cream/90 backdrop-blur-md border-b border-cream-border/70 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo with Minimal Wheat Icon */}
        <Link
          href="/"
          className="flex items-center gap-3 group focus:outline-hidden focus-visible:ring-2 focus-visible:ring-terracotta rounded-lg"
        >
          <div className="w-10 h-10 rounded-2xl bg-terracotta flex items-center justify-center text-white shadow-sm shadow-terracotta/30 group-hover:bg-terracotta-dark transition-colors">
            <Wheat className="w-5 h-5 text-honey-light stroke-[2.2]" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-roast leading-none">
              Bake It Your Way
            </span>
            <span className="text-[10px] sm:text-xs tracking-widest uppercase text-terracotta font-semibold mt-1">
              Bespoke Patisserie Lab
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-roast/80">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`transition-colors hover:text-terracotta relative py-1 ${
                  isActive ? 'text-terracotta font-semibold' : ''
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-terracotta rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            href="/builder"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-terracotta hover:bg-terracotta-dark text-white shadow-sm shadow-terracotta/20 transition-all active:scale-98 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-honey-light" />
            <span>Launch Studio</span>
          </Link>

          {/* Cart Trigger with Live Count Pill */}
          <button
            type="button"
            onClick={openCart}
            aria-label="View Cart"
            className="relative p-2.5 rounded-full bg-cream-card hover:bg-cream border border-cream-border text-roast transition-all hover:border-terracotta-light focus:outline-hidden focus-visible:ring-2 focus-visible:ring-terracotta cursor-pointer"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalItemsCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1.5 rounded-full bg-terracotta text-white text-[11px] font-bold flex items-center justify-center shadow-xs animate-in zoom-in-50 duration-200">
                {totalItemsCount}
              </span>
            )}
          </button>

          {/* Mobile menu hamburger toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-xl border border-cream-border text-roast focus:outline-hidden"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-cream-border bg-cream px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top duration-200">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl text-base font-medium text-roast hover:bg-cream-border/40"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-2">
            <Link
              href="/builder"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-terracotta text-white font-semibold text-sm shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-honey-light" />
              <span>Launch Custom Cake Studio</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

