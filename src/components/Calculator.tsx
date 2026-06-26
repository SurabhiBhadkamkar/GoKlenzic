import React, { useState } from 'react';
import { Sparkles, Users, RefreshCw, Layers, ShieldCheck, HeartPulse, ShoppingCart, HelpCircle } from 'lucide-react';
import { Product, CartItem } from '../types';

interface CalculatorProps {
  products: Product[];
  onAddToCartAndOpen: (item: Omit<CartItem, 'id'>) => void;
}

export default function Calculator({ products, onAddToCartAndOpen }: CalculatorProps) {
  // Calculator States
  const [familySize, setFamilySize] = useState<number>(3); // 1-2, 3-4, 5+
  const [weeklyLoads, setWeeklyLoads] = useState<number>(4); // 1-2, 3-5, 6+
  const [hasSensitivity, setHasSensitivity] = useState<boolean>(false);
  const [machineType, setMachineType] = useState<'he' | 'standard'>('he');

  // Calculation Results
  const calculateResult = () => {
    const annualLoads = weeklyLoads * 52;
    
    // Choose product
    let product: Product;
    if (hasSensitivity) {
      // NaturaLiquid is hypoallergenic-focused in descriptions
      product = products.find(p => p.id === 'goklenzic-liquid-eco') || products[0];
    } else {
      // Default to Capsules for maximum eco impact and efficiency
      product = products.find(p => p.id === 'goklenzic-pods-eco') || products[0];
    }

    // Determine quantity & subscription frequency based on loads
    // Each pod box has 64 loads, Liquid has 48 loads.
    const loadsPerPack = product.specifications.loads;
    const itemsNeededPerYear = Math.ceil(annualLoads / loadsPerPack);
    
    let recommendedFrequency: 'monthly' | 'bi-monthly' | 'tri-monthly';
    let packageQuantity = 1;

    if (itemsNeededPerYear <= 2) {
      recommendedFrequency = 'tri-monthly';
    } else if (itemsNeededPerYear <= 4) {
      recommendedFrequency = 'bi-monthly';
    } else if (itemsNeededPerYear <= 6) {
      recommendedFrequency = 'monthly';
    } else {
      recommendedFrequency = 'monthly';
      packageQuantity = 2; // need 2 packs each time
    }

    // Eco stats
    const plasticBottlesSaved = Math.round(annualLoads * 0.12); // estim: 12 bottles saved per loads ratio
    const carbonOffsetLbs = Math.round(annualLoads * 1.4);

    return {
      annualLoads,
      product,
      recommendedFrequency,
      packageQuantity,
      plasticBottlesSaved,
      carbonOffsetLbs
    };
  };

  const result = calculateResult();

  const handleApplyRecommendation = () => {
    onAddToCartAndOpen({
      product: result.product,
      quantity: result.packageQuantity,
      purchaseType: 'subscription',
      subscriptionFrequency: result.recommendedFrequency
    });
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-lg overflow-hidden bg-grid-pattern">
      
      {/* Banner Header */}
      <div className="bg-brand-blue text-white p-6 sm:p-8 relative">
        <div className="absolute top-0 right-0 h-16 w-16 bg-brand-gold rounded-bl-full opacity-10"></div>
        <div className="relative z-10 flex items-start space-x-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-brand-gold border border-white/15">
            <Sparkles className="h-6 w-6 animate-pulse" />
          </div>
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-brand-gold font-bold">GoKlenzic AI Tool</span>
            <h2 className="font-display text-2xl font-bold tracking-tight mt-1">Detergent Usage Matcher</h2>
            <p className="text-xs text-slate-100 mt-1 max-w-md">
              Input your laundry routine and find your customized, zero-waste subscription plan. No guesswork, no excess.
            </p>
          </div>
        </div>
      </div>

      {/* Grid Panel split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border-t border-slate-100">
        
        {/* Left Input Panel (7 Columns) */}
        <div className="p-6 sm:p-8 lg:col-span-7 space-y-8 border-b lg:border-b-0 lg:border-r border-slate-150">
          
          {/* Question 1: Family Size */}
          <div className="space-y-3">
            <label className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
              <Users className="h-4 w-4 text-brand-blue" />
              <span>1. Household Size</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'Single / 1-2', val: 2 },
                { label: 'Small Family / 3-4', val: 4 },
                { label: 'Large Family / 5+', val: 6 }
              ].map((opt) => (
                <button
                  key={opt.val}
                  type="button"
                  onClick={() => setFamilySize(opt.val)}
                  className={`rounded-xl py-3 text-xs font-semibold border transition-all text-center flex flex-col items-center justify-center space-y-1 ${
                    familySize === opt.val
                      ? 'border-brand-blue bg-brand-blue-light/50 text-brand-blue ring-1 ring-brand-blue'
                      : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-white'
                  }`}
                >
                  <span className="text-xs font-bold">{opt.label.split('/')[1]}</span>
                  <span className="text-[10px] text-slate-400 font-normal">{opt.label.split('/')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Question 2: Laundry frequency */}
          <div className="space-y-3">
            <label className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
              <RefreshCw className="h-4 w-4 text-brand-blue" />
              <span>2. Weekly Laundry Load Frequency</span>
            </label>
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-slate-500 font-semibold px-1">
                <span>Light (1-2 Loads)</span>
                <span className="text-brand-blue font-bold">{weeklyLoads} Loads/Week</span>
                <span>Heavy (7+ Loads)</span>
              </div>
              <input
                type="range"
                min="1"
                max="8"
                step="1"
                value={weeklyLoads}
                onChange={(e) => setWeeklyLoads(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-blue"
              />
            </div>
          </div>

          {/* Question 3: Machine / Washing Styles */}
          <div className="space-y-3">
            <label className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
              <Layers className="h-4 w-4 text-brand-blue" />
              <span>3. Machine Type & Settings</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setMachineType('he')}
                className={`rounded-xl p-3 text-left border transition-all ${
                  machineType === 'he'
                    ? 'border-brand-blue bg-brand-blue-light/40 ring-1 ring-brand-blue'
                    : 'border-slate-200 text-slate-600'
                }`}
              >
                <span className="block text-xs font-bold text-slate-900 uppercase tracking-tight">HE High Efficiency</span>
                <span className="block text-[10px] text-slate-500 mt-1">Saves water & cold wash compatibility</span>
              </button>

              <button
                type="button"
                onClick={() => setMachineType('standard')}
                className={`rounded-xl p-3 text-left border transition-all ${
                  machineType === 'standard'
                    ? 'border-brand-blue bg-brand-blue-light/40 ring-1 ring-brand-blue'
                    : 'border-slate-200 text-slate-600'
                }`}
              >
                <span className="block text-xs font-bold text-slate-900 uppercase tracking-tight">Standard Agitator</span>
                <span className="block text-[10px] text-slate-500 mt-1">Requires slightly denser active enzymes</span>
              </button>
            </div>
          </div>

          {/* Sensitivity checkbox */}
          <div className="flex items-center space-x-3 rounded-xl border border-slate-100 bg-slate-50 p-4">
            <button
              type="button"
              onClick={() => setHasSensitivity(!hasSensitivity)}
              className={`flex h-6 w-6 items-center justify-center rounded-md border transition-all ${
                hasSensitivity ? 'bg-brand-blue border-brand-blue text-white' : 'border-slate-300 bg-white text-transparent'
              }`}
            >
              <ShieldCheck className="h-4 w-4" />
            </button>
            <div className="flex-1">
              <span className="block text-xs font-bold text-slate-900 uppercase tracking-tight">Sensitive Skin or Fragrance Allergies?</span>
              <span className="block text-[10px] text-slate-500">We will auto-recommend our baby-safe, dermatologist-tested hypoallergenic liquid.</span>
            </div>
          </div>

        </div>

        {/* Right Output Panel (5 Columns) */}
        <div className="p-6 sm:p-8 lg:col-span-5 bg-slate-50/60 flex flex-col justify-between">
          
          <div className="space-y-6">
            <span className="font-mono text-[9px] uppercase tracking-widest text-slate-400 block border-b border-slate-150 pb-2">
              Your Eco Plan Formula
            </span>

            {/* Product Recommendation Card */}
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-brand-gold h-10 w-10 rounded-bl-xl flex items-center justify-center text-slate-950 text-xs font-bold">
                {result.packageQuantity}x
              </div>

              <div className="flex items-center space-x-3 mb-3">
                <img 
                  src={result.product.image} 
                  alt={result.product.name} 
                  className="h-10 w-10 rounded object-cover border border-slate-100"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="text-xs font-bold text-slate-950 uppercase leading-none">{result.product.name}</h4>
                  <span className="text-[10px] text-brand-blue font-semibold">{result.product.subtitle}</span>
                </div>
              </div>

              {/* Recommended schedule */}
              <div className="flex justify-between items-center bg-brand-blue-light/50 px-3 py-2 rounded-lg text-xs font-semibold text-brand-blue border border-brand-blue-light">
                <span>Delivery Interval:</span>
                <span className="font-bold text-brand-blue-dark">
                  {result.recommendedFrequency === 'monthly' ? 'Every Month' : result.recommendedFrequency === 'bi-monthly' ? 'Every 2 Months' : 'Every 3 Months'}
                </span>
              </div>
            </div>

            {/* Calculations Statistics */}
            <div className="space-y-3 pt-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-500 font-medium">Weekly Loads:</span>
                <strong className="text-slate-900 font-bold">{weeklyLoads}</strong>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-500 font-medium">Estimated Annual Loads:</span>
                <strong className="text-slate-900 font-bold">{result.annualLoads} washes</strong>
              </div>
              <div className="flex justify-between text-xs border-t border-slate-200 pt-2.5">
                <span className="text-slate-900 font-bold">Plan Price per cycle:</span>
                <strong className="text-brand-blue font-extrabold text-sm">
                  ${(result.product.subscribePrice * result.packageQuantity).toFixed(2)}
                </strong>
              </div>
            </div>

            {/* Carbon / Environmental offset stats (Bento style) */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-3 text-center">
                <span className="block font-mono text-[10px] text-emerald-800 uppercase font-bold">Annual Offset</span>
                <span className="block font-display text-lg font-extrabold text-emerald-950 mt-1">-{result.carbonOffsetLbs} lbs CO₂</span>
              </div>
              <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-3 text-center">
                <span className="block font-mono text-[10px] text-emerald-800 uppercase font-bold">Ocean Plastic Saved</span>
                <span className="block font-display text-lg font-extrabold text-emerald-950 mt-1">{result.plasticBottlesSaved} Jugs</span>
              </div>
            </div>
          </div>

          {/* Action button */}
          <div className="mt-8">
            <button
              onClick={handleApplyRecommendation}
              className="group flex w-full h-12 items-center justify-center space-x-2.5 rounded-xl bg-brand-blue text-white shadow-lg text-xs font-bold uppercase tracking-wider transition-all hover:bg-brand-blue-hover hover:scale-[1.01]"
            >
              <ShoppingCart className="h-4 w-4 text-brand-gold" />
              <span>Apply & Subscribe</span>
            </button>
            <span className="block text-[10px] text-slate-400 font-mono text-center mt-2">
              Calculated specifically for GoKlenzic detergent standards.
            </span>
          </div>

        </div>

      </div>

    </div>
  );
}
