import React from 'react';
import { Sparkles, Heart, Shield, HelpCircle, Leaf } from 'lucide-react';
import Logo from './Logo';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export default function Footer({ setActiveTab }: FooterProps) {
  return (
    <footer className="bg-brand-blue text-white overflow-hidden relative">
      {/* Blueprint grid layout background */}
      <div className="absolute inset-0 bg-grid-pattern-white opacity-20"></div>

      {/* Yellow quarter-circle accent on bottom-right (Mirrors presentation slide visuals) */}
      <div className="absolute -bottom-16 -right-16 h-40 w-40 rounded-full bg-brand-gold opacity-90"></div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-white/10 pb-12">
          
          {/* Brand block */}
          <div className="space-y-4 md:col-span-2">
            <Logo 
              light={true} 
              className="cursor-pointer" 
              onClick={() => setActiveTab('shop')} 
            />
            <p className="text-xs text-slate-200 max-w-sm leading-relaxed">
              We engineer advanced bio-enzymatic cleaning formulations that eliminate plastic waste without asking households to compromise on cleaning performance. Inspired by deep ocean preservation.
            </p>
            <div className="flex items-center space-x-2.5 text-[10px] font-mono text-slate-300">
              <Leaf className="h-4 w-4 text-brand-gold" />
              <span>Certified 100% Biodegradable & Plant-Derived</span>
            </div>
          </div>

          {/* Quick links block */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-brand-gold font-mono">Navigation</h4>
            <ul className="space-y-2 text-xs text-slate-200">
              <li>
                <button onClick={() => setActiveTab('shop')} className="hover:text-brand-gold transition-colors">
                  Eco Storefront
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('calculator')} className="hover:text-brand-gold transition-colors">
                  Detergent Matcher
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('portal')} className="hover:text-brand-gold transition-colors">
                  Subscription Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Environmental commitment */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-brand-gold font-mono">Our Pledge</h4>
            <p className="text-xs text-slate-200 leading-relaxed">
              GoKlenzic donates 1% of all revenue to deep sea plastic extraction. Every box shipped actively finances ocean cleanup campaigns across the South Pacific.
            </p>
            <div className="flex items-center space-x-1.5 text-xs text-brand-gold font-semibold">
              <Heart className="h-4.5 w-4.5 fill-brand-gold animate-pulse" />
              <span>Clean Oceans Campaign</span>
            </div>
          </div>

        </div>

        {/* Lower row details */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-mono text-slate-300">
          <span>GoKlenzic Corporation © 2026. All rights reserved.</span>
          <div className="flex space-x-4">
            <span className="hover:text-white cursor-pointer">Privacy Charter</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">Greenhouse Statements</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">Security Certifications</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
