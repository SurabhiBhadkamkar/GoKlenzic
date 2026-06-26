import React from 'react';
import { Check, FlameKindling, ShieldCheck, HeartHandshake } from 'lucide-react';

export default function Values() {
  return (
    <section className="relative overflow-hidden bg-brand-blue-light/35 py-16 sm:py-24">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60"></div>
      
      {/* Chevron triangle graphic in top left (Mirrors Image 2 top left) */}
      <div className="absolute top-6 left-6 hidden sm:grid grid-cols-4 gap-1 opacity-20">
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} className="h-4 w-4 bg-brand-blue" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}></div>
        ))}
      </div>

      {/* Concentric rings in top right (Mirrors Image 2 top right) */}
      <div className="absolute -top-12 -right-12 h-44 w-44 rounded-full border border-brand-blue/10 flex items-center justify-center opacity-30">
        <div className="h-32 w-32 rounded-full border border-brand-blue/15 flex items-center justify-center">
          <div className="h-20 w-20 rounded-full border border-brand-blue/20"></div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-brand-blue font-bold">What we stand for</span>
          <div className="flex items-center justify-center gap-2 mt-2">
            <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl text-slate-900">
              Our Brand Values
            </h2>
            <div className="h-8 w-8 text-brand-gold">
              {/* Small detergent foam nozzle icon from Image 2 */}
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                <path d="M12 2a4 4 0 00-4 4v4H6a2 2 0 00-2 2v6a2 2 0 002 2h12a2 2 0 002-2v-6a2 2 0 00-2-2h-2V6a4 4 0 00-4-4zm-2 4a2 2 0 014 0v4h-4V6zm2 9a2 2 0 110 4 2 2 0 010-4z" />
              </svg>
            </div>
          </div>
          <p className="mt-4 text-slate-600 text-sm sm:text-base">
            GoKlenzic is more than a product—it’s an ongoing commitment to make laundry safe for your family, gentle on fabrics, and entirely neutral to our planet.
          </p>
        </div>

        {/* Central Display Container (Mirrors Image 2 layout with overlaid cards) */}
        <div className="relative mx-auto max-w-5xl rounded-3xl border border-slate-200 bg-white p-4 shadow-xl">
          
          {/* Main Visual Image (Wide, customized photo of capsules) */}
          <div className="relative overflow-hidden rounded-2xl aspect-[21/9] min-h-[220px]">
            <img
              src="/src/assets/images/laundry_pods_main_1782468360416.jpg"
              alt="Eco laundry capsules pile"
              className="h-full w-full object-cover brightness-[0.85] contrast-[1.05]"
              referrerPolicy="no-referrer"
            />
            {/* Soft Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-dark/25 to-transparent"></div>
          </div>

          {/* Overlapping Value Cards (3 Columns - Mirrors Golden-Yellow Cards of Image 2) */}
          <div className="mt-6 sm:-mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3 sm:px-6 relative z-20">
            
            {/* Card 1 */}
            <div className="flex flex-col items-center text-center rounded-2xl bg-brand-gold p-6 text-brand-blue-dark shadow-lg shadow-brand-gold/20 transition-all hover:-translate-y-1">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-brand-gold shadow-md">
                <Check className="h-6 w-6 stroke-[3px]" />
              </div>
              <h3 className="mt-4 font-display text-sm font-bold uppercase tracking-wider text-slate-950">
                100% Biodegradable
              </h3>
              <p className="mt-2 text-xs font-medium text-slate-800 max-w-[200px]">
                Formula and membrane completely dissolve leaving zero microplastics.
              </p>
            </div>

            {/* Card 2 */}
            <div className="flex flex-col items-center text-center rounded-2xl bg-brand-gold p-6 text-brand-blue-dark shadow-lg shadow-brand-gold/20 transition-all hover:-translate-y-1">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-brand-gold shadow-md">
                <Check className="h-6 w-6 stroke-[3px]" />
              </div>
              <h3 className="mt-4 font-display text-sm font-bold uppercase tracking-wider text-slate-950">
                Cruelty-Free & Toxin-Free
              </h3>
              <p className="mt-2 text-xs font-medium text-slate-800 max-w-[200px]">
                No harsh petrochemicals, synthetic dyes, or animal testing. Ever.
              </p>
            </div>

            {/* Card 3 */}
            <div className="flex flex-col items-center text-center rounded-2xl bg-brand-gold p-6 text-brand-blue-dark shadow-lg shadow-brand-gold/20 transition-all hover:-translate-y-1">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-brand-gold shadow-md">
                <Check className="h-6 w-6 stroke-[3px]" />
              </div>
              <h3 className="mt-4 font-display text-sm font-bold uppercase tracking-wider text-slate-950">
                Carbon-Neutral Production
              </h3>
              <p className="mt-2 text-xs font-medium text-slate-800 max-w-[200px]">
                Every shipment has offset credits verified by standard eco protocols.
              </p>
            </div>

          </div>

        </div>

        {/* Small graphic accent on bottom left (Mirrors Image 2 bottom-left grid) */}
        <div className="absolute -bottom-6 -left-6 h-20 w-20 bg-grid-pattern opacity-45 pointer-events-none"></div>

      </div>
    </section>
  );
}
