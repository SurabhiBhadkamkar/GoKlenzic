import React from 'react';
import { ArrowRight, Leaf, Sparkles, Star } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  onCalculatorClick: () => void;
}

export default function Hero({ onExploreClick, onCalculatorClick }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-brand-blue text-white">
      {/* Background Grid Pattern & Geometrical Accents */}
      <div className="absolute inset-0 bg-grid-pattern-white opacity-40"></div>
      
      {/* Top Left Yellow Quarter-Circle Accent (Mirrors Image 1/3) */}
      <div className="absolute -top-12 -left-12 h-32 w-32 rounded-full bg-brand-gold opacity-95"></div>
      
      {/* Right Corner Precision Grid Accent (Mirrors Image 1) */}
      <div className="absolute top-8 right-8 hidden lg:flex flex-col space-y-1 text-white/20 font-mono text-[9px] select-none">
        <span>GOKLENZIC PROTOCOL v2.4</span>
        <span>LATITUDE: 37.7749° N</span>
        <span>ECO GRID ACTIVE</span>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24 relative z-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          
          {/* Left Text Column - 7 Columns wide on Large Screens */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-8">
            <div className="inline-flex items-center space-x-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-gold w-fit">
              <Leaf className="h-3.5 w-3.5" />
              <span>100% Sustainable Laundry System</span>
            </div>

            <div className="space-y-4">
              <span className="font-mono text-xs uppercase tracking-widest text-brand-gold font-medium">Studio GoKlenzic Presents</span>
              <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl leading-[1.1] text-white">
                Clean Clothes. <br />
                <span className="text-brand-gold">Clear Conscience.</span>
              </h1>
              <p className="max-w-xl text-base text-slate-100 sm:text-lg leading-relaxed">
                The green cleaning revolution is here. GoKlenzic couples pure, bio-enzymatic plant cleansers with zero-waste, fast-dissolving delivery. Join our direct-to-door subscription and save 15% on every shipment.
              </p>
            </div>

            {/* Quick Metrics in Bento Layout */}
            <div className="grid grid-cols-3 gap-4 border-t border-white/15 pt-8">
              <div>
                <span className="block font-display text-2xl sm:text-3xl font-bold text-white">100%</span>
                <span className="block text-[11px] font-medium tracking-wide uppercase text-slate-300 mt-1">Biodegradable</span>
              </div>
              <div>
                <span className="block font-display text-2xl sm:text-3xl font-bold text-white">1.2M+</span>
                <span className="block text-[11px] font-medium tracking-wide uppercase text-slate-300 mt-1">Jugs Saved</span>
              </div>
              <div>
                <span className="block font-display text-2xl sm:text-3xl font-bold text-white">4.9 ★</span>
                <span className="block text-[11px] font-medium tracking-wide uppercase text-slate-300 mt-1">Rating (15k+)</span>
              </div>
            </div>

            {/* CTA Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onExploreClick}
                className="group flex items-center justify-center space-x-2.5 rounded-xl bg-brand-gold px-6 py-4 text-sm font-bold text-brand-blue-dark shadow-lg shadow-brand-gold/20 transition-all hover:bg-brand-gold-hover hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Shop Eco Storefront</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              
              <button
                onClick={onCalculatorClick}
                className="flex items-center justify-center space-x-2 rounded-xl border border-white/25 bg-white/5 px-6 py-4 text-sm font-bold text-white transition-all hover:bg-white/10 hover:border-white/40"
              >
                <Sparkles className="h-4 w-4 text-brand-gold" />
                <span>Calculate My Laundry Needs</span>
              </button>
            </div>
          </div>

          {/* Right Image/Presentation Column - 5 Columns wide */}
          <div className="lg:col-span-5 relative">
            {/* The Floating Starburst/Star Accent (from Image 1 right side) */}
            <div className="absolute -top-6 -right-6 h-12 w-12 text-brand-gold animate-spin-slow">
              <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full">
                <path d="M50 0L55 35L90 15L65 45L100 50L65 55L90 85L55 65L50 100L45 65L10 85L35 55L0 50L35 45L10 15L45 35Z" />
              </svg>
            </div>

            {/* Main Presentation Container */}
            <div className="relative rounded-2xl border-4 border-white/15 bg-white/5 p-4 shadow-2xl backdrop-blur-sm">
              <div className="overflow-hidden rounded-xl aspect-[16/10] sm:aspect-[16/9] relative">
                <img
                  src="/src/assets/images/laundry_washing_machine_1782468401567.jpg"
                  alt="Modern sustainable laundry room"
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                
                {/* Micro Brand Tag on Image */}
                <div className="absolute bottom-3 left-3 flex items-center space-x-1.5 rounded-md bg-black/45 px-2 py-1 text-[10px] font-mono uppercase tracking-wider backdrop-blur-xs">
                  <Star className="h-3 w-3 text-brand-gold fill-brand-gold" />
                  <span>Verified Clean Carbon-Neutral</span>
                </div>
              </div>

              {/* Sub-Presentation Panel (Mirrors Image 3 layout) */}
              <div className="mt-4 rounded-lg bg-white p-4 text-slate-800 shadow-lg">
                <span className="font-mono text-[9px] uppercase tracking-widest text-slate-400">Launch Presentation Spec</span>
                <h3 className="font-display text-sm font-bold text-brand-blue uppercase tracking-tight mt-1">
                  NaturaWash: Eco Laundry Capsules
                </h3>
                <blockquote className="border-l-2 border-brand-gold pl-3 text-xs italic text-slate-500 my-2">
                  "Clean Clothes, Clear Conscience."
                </blockquote>
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 border-t border-slate-100 pt-2">
                  <span>Presented By: Avery Davis</span>
                  <span className="text-brand-blue-dark font-bold font-sans">GoKlenzic © 2026</span>
                </div>
              </div>
            </div>

            {/* Bottom-right grid graphic (from Image 2) */}
            <div className="absolute -bottom-8 -right-8 h-24 w-24 bg-grid-pattern opacity-30 pointer-events-none"></div>
          </div>

        </div>
      </div>
    </section>
  );
}
