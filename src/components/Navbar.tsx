import React from 'react';
import { ShoppingBag, Sparkles, User, HelpCircle, Activity } from 'lucide-react';
import Logo from './Logo';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cartItemCount: number;
  onCartOpen: () => void;
}

export default function Navbar({ activeTab, setActiveTab, cartItemCount, onCartOpen }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-brand-blue/15 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo and Brand */}
        <Logo 
          className="cursor-pointer" 
          onClick={() => setActiveTab('shop')} 
        />

        {/* Central Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <button
            onClick={() => setActiveTab('shop')}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
              activeTab === 'shop' 
                ? 'text-brand-blue bg-brand-blue-light/60 font-semibold' 
                : 'text-slate-600 hover:text-brand-blue hover:bg-slate-50'
            }`}
          >
            Storefront
          </button>
          <button
            onClick={() => setActiveTab('calculator')}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'calculator' 
                ? 'text-brand-blue bg-brand-blue-light/60 font-semibold' 
                : 'text-slate-600 hover:text-brand-blue hover:bg-slate-50'
            }`}
          >
            <Activity className="h-4 w-4 text-brand-gold" />
            Usage Matcher
          </button>
          <button
            onClick={() => setActiveTab('portal')}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'portal' 
                ? 'text-brand-blue bg-brand-blue-light/60 font-semibold' 
                : 'text-slate-600 hover:text-brand-blue hover:bg-slate-50'
            }`}
          >
            <User className="h-4 w-4 text-brand-blue" />
            Subscription Portal
          </button>
        </nav>

        {/* Right Controls */}
        <div className="flex items-center space-x-3">
          {/* Mobile Tab Icons */}
          <div className="flex md:hidden items-center mr-1">
            <button
              onClick={() => setActiveTab('shop')}
              className={`p-2 rounded-lg ${activeTab === 'shop' ? 'text-brand-blue' : 'text-slate-500'}`}
              title="Shop"
            >
              <ShoppingBag className="h-5 w-5" />
            </button>
            <button
              onClick={() => setActiveTab('calculator')}
              className={`p-2 rounded-lg ${activeTab === 'calculator' ? 'text-brand-blue' : 'text-slate-500'}`}
              title="Matcher"
            >
              <Activity className="h-5 w-5" />
            </button>
            <button
              onClick={() => setActiveTab('portal')}
              className={`p-2 rounded-lg ${activeTab === 'portal' ? 'text-brand-blue' : 'text-slate-500'}`}
              title="Portal"
            >
              <User className="h-5 w-5" />
            </button>
          </div>

          {/* Cart Trigger */}
          <button
            id="nav-cart-btn"
            onClick={onCartOpen}
            className="group relative flex h-11 items-center justify-center space-x-2 rounded-xl bg-brand-blue px-4 text-white shadow-md shadow-brand-blue/15 transition-all hover:bg-brand-blue-hover hover:scale-[1.02] active:scale-[0.98]"
          >
            <ShoppingBag className="h-4 w-4 text-brand-gold transition-transform group-hover:rotate-6" />
            <span className="hidden sm:inline text-xs font-semibold uppercase tracking-wider font-display">My Cart</span>
            
            {cartItemCount > 0 ? (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-gold text-[11px] font-bold text-brand-blue-dark ring-2 ring-brand-blue">
                {cartItemCount}
              </span>
            ) : (
              <span className="hidden sm:inline h-2 w-2 rounded-full bg-brand-gold"></span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
