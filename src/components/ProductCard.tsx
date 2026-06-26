import React, { useState } from 'react';
import { Star, Truck, Calendar, Sparkles, CheckCircle2 } from 'lucide-react';
import { Product, CartItem } from '../types';

interface ProductCardProps {
  key?: string;
  product: Product;
  onAddToCart: (item: Omit<CartItem, 'id'>) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [purchaseType, setPurchaseType] = useState<'one-time' | 'subscription'>('subscription');
  const [frequency, setFrequency] = useState<'monthly' | 'bi-monthly' | 'tri-monthly'>('bi-monthly');
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    onAddToCart({
      product,
      quantity: 1,
      purchaseType,
      subscriptionFrequency: frequency
    });
    
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const currentPrice = purchaseType === 'subscription' ? product.subscribePrice : product.price;
  const savings = product.price - product.subscribePrice;

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md transition-all duration-300 hover:shadow-xl hover:border-brand-blue/30">
      
      {/* Product Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        
        {/* Category Tag */}
        <span className="absolute top-3 left-3 rounded-full bg-slate-900/80 px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-white backdrop-blur-xs">
          {product.category}
        </span>

        {/* Subscribe & Save Badge */}
        {purchaseType === 'subscription' && (
          <div className="absolute top-3 right-3 flex items-center space-x-1 rounded-md bg-brand-gold px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-950 shadow-md">
            <Sparkles className="h-3 w-3" />
            <span>Save 15%</span>
          </div>
        )}
      </div>

      {/* Product Information */}
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center justify-between">
          {/* Rating */}
          <div className="flex items-center space-x-1 text-brand-gold">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star 
                key={i} 
                className={`h-3 w-3 ${i < Math.floor(product.rating) ? 'fill-brand-gold' : 'text-slate-200'}`} 
              />
            ))}
            <span className="text-xs font-semibold text-slate-500 ml-1">
              ({product.reviewsCount})
            </span>
          </div>

          <span className="font-mono text-[10px] text-brand-blue font-bold uppercase">
            {product.specifications.size}
          </span>
        </div>

        <h3 className="font-display text-lg font-bold text-slate-900 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-[11px] font-medium text-slate-400 mt-0.5 uppercase tracking-wide">
          {product.subtitle}
        </p>

        <p className="mt-2.5 text-xs leading-relaxed text-slate-600 line-clamp-3 flex-1">
          {product.description}
        </p>

        {/* Purchase Type Toggles */}
        <div className="mt-5 space-y-2">
          {/* Subscribe Options */}
          <button
            onClick={() => setPurchaseType('subscription')}
            className={`flex w-full items-center justify-between rounded-xl border p-3 text-left transition-all ${
              purchaseType === 'subscription'
                ? 'border-brand-blue bg-brand-blue-light/40 ring-1 ring-brand-blue'
                : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                purchaseType === 'subscription' ? 'border-brand-blue text-brand-blue' : 'border-slate-300'
              }`}>
                {purchaseType === 'subscription' && <div className="h-2 w-2 rounded-full bg-brand-blue" />}
              </div>
              <div>
                <span className="block text-xs font-bold text-slate-950 uppercase tracking-tight">Subscribe & Save 15%</span>
                <span className="block text-[10px] text-slate-500">Free delivery + swap anytime</span>
              </div>
            </div>
            <div className="text-right">
              <span className="block text-sm font-bold text-brand-blue">${product.subscribePrice.toFixed(2)}</span>
              <span className="block text-[9px] font-mono text-brand-gold-dark font-semibold">Save ${savings.toFixed(2)}</span>
            </div>
          </button>

          {/* One-time Option */}
          <button
            onClick={() => setPurchaseType('one-time')}
            className={`flex w-full items-center justify-between rounded-xl border p-3 text-left transition-all ${
              purchaseType === 'one-time'
                ? 'border-brand-blue bg-brand-blue-light/40 ring-1 ring-brand-blue'
                : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                purchaseType === 'one-time' ? 'border-brand-blue text-brand-blue' : 'border-slate-300'
              }`}>
                {purchaseType === 'one-time' && <div className="h-2 w-2 rounded-full bg-brand-blue" />}
              </div>
              <div>
                <span className="block text-xs font-bold text-slate-950 uppercase tracking-tight">One-time Purchase</span>
                <span className="block text-[10px] text-slate-500">Standard single box order</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-sm font-bold text-slate-700">${product.price.toFixed(2)}</span>
            </div>
          </button>
        </div>

        {/* Subscription Frequency Picker (only if subscription active) */}
        {purchaseType === 'subscription' && (
          <div className="mt-4 rounded-xl bg-slate-50 p-3 border border-slate-100">
            <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-2">
              Deliver Frequency:
            </span>
            <div className="grid grid-cols-3 gap-1">
              {[
                { value: 'monthly', label: '1 Month' },
                { value: 'bi-monthly', label: '2 Months' },
                { value: 'tri-monthly', label: '3 Months' }
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setFrequency(opt.value as any)}
                  className={`rounded-lg py-1.5 text-[10px] font-semibold transition-all ${
                    frequency === opt.value
                      ? 'bg-brand-blue text-white shadow-sm'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            <div className="mt-2 flex items-center justify-center space-x-1.5 text-[10px] text-slate-500">
              <Calendar className="h-3 w-3 text-brand-blue" />
              <span>Ships around same day each period.</span>
            </div>
          </div>
        )}

        {/* Eco Impact Indicator */}
        <div className="mt-4 rounded-lg bg-emerald-50 px-3 py-2 text-center text-[10.5px] font-medium text-emerald-800 border border-emerald-100/60">
          🌱 {product.ecoImpact}
        </div>

        {/* Add to Cart CTA */}
        <button
          onClick={handleAddToCart}
          className={`mt-4 flex w-full h-11 items-center justify-center space-x-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
            isAdded
              ? 'bg-emerald-600 text-white shadow-lg'
              : 'bg-brand-blue text-white shadow-md shadow-brand-blue/10 hover:bg-brand-blue-hover hover:scale-[1.01]'
          }`}
        >
          {isAdded ? (
            <>
              <CheckCircle2 className="h-4 w-4 animate-bounce" />
              <span>Added to Cart!</span>
            </>
          ) : (
            <>
              <Truck className="h-4 w-4 text-brand-gold" />
              <span>
                {purchaseType === 'subscription' ? 'Subscribe Now' : 'Add to Cart'}
              </span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
