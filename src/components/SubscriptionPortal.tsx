import React, { useState } from 'react';
import { Calendar, SkipForward, Play, Pause, Trash2, Edit2, Check, Star, RefreshCw } from 'lucide-react';
import { Subscription, Product } from '../types';

interface SubscriptionPortalProps {
  subscriptions: Subscription[];
  onUpdateSubscription: (id: string, updates: Partial<Subscription>) => void;
  onCancelSubscription: (id: string) => void;
  onExploreClick: () => void;
}

export default function SubscriptionPortal({
  subscriptions,
  onUpdateSubscription,
  onCancelSubscription,
  onExploreClick
}: SubscriptionPortalProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [tempFrequency, setTempFrequency] = useState<'monthly' | 'bi-monthly' | 'tri-monthly'>('bi-monthly');

  const getFrequencyLabel = (freq: 'monthly' | 'bi-monthly' | 'tri-monthly') => {
    if (freq === 'monthly') return 'Every Month';
    if (freq === 'bi-monthly') return 'Every 2 Months';
    return 'Every 3 Months';
  };

  const startEditing = (sub: Subscription) => {
    setEditingId(sub.id);
    setTempFrequency(sub.frequency);
  };

  const saveFrequency = (id: string) => {
    onUpdateSubscription(id, { frequency: tempFrequency });
    setEditingId(null);
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md bg-grid-pattern">
      <div className="border-b border-slate-100 pb-5 mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-bold text-slate-900 flex items-center gap-2">
            <RefreshCw className="h-5.5 w-5.5 text-brand-blue animate-spin-slow" />
            My GoKlenzic Subscriptions
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Real-time control. Swap items, skip deliveries, pause or cancel any time with zero penalty.
          </p>
        </div>
        <div className="flex items-center space-x-1 bg-brand-gold/15 px-3 py-1.5 rounded-lg border border-brand-gold/20">
          <Star className="h-4 w-4 text-brand-gold fill-brand-gold" />
          <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wider">Subscriber Member</span>
        </div>
      </div>

      {subscriptions.length === 0 ? (
        <div className="text-center py-12 max-w-md mx-auto">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand-blue-light text-brand-blue mb-4">
            <Calendar className="h-8 w-8" />
          </div>
          <h3 className="font-display text-lg font-bold text-slate-800">No Active Subscriptions</h3>
          <p className="text-slate-500 text-xs mt-2 leading-relaxed">
            You haven't subscribed to any sustainable detergents yet. Choose Subscribe & Save 15% on any product page to enable continuous home delivery.
          </p>
          <button
            onClick={onExploreClick}
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-brand-blue px-5 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-md hover:bg-brand-blue-hover transition-all"
          >
            Explore Eco Products
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {subscriptions.map((sub) => {
            const isPaused = sub.status === 'paused';
            const isSkipped = sub.status === 'skipped';

            return (
              <div 
                key={sub.id} 
                className={`relative rounded-xl border p-5 transition-all ${
                  isPaused 
                    ? 'border-slate-200 bg-slate-50/70 opacity-75' 
                    : isSkipped 
                      ? 'border-amber-200 bg-amber-50/20' 
                      : 'border-slate-200 bg-white hover:border-brand-blue/30'
                }`}
              >
                {/* Status Badges */}
                <div className="absolute top-4 right-4 flex space-x-1.5">
                  {isPaused && (
                    <span className="rounded-full bg-slate-200 px-2.5 py-0.5 text-[9px] font-mono uppercase tracking-wider text-slate-600 font-bold">
                      Paused
                    </span>
                  )}
                  {isSkipped && (
                    <span className="rounded-full bg-amber-100 border border-amber-200 px-2.5 py-0.5 text-[9px] font-mono uppercase tracking-wider text-amber-800 font-bold">
                      Skipped Next Delivery
                    </span>
                  )}
                  {!isPaused && !isSkipped && (
                    <span className="rounded-full bg-emerald-100 border border-emerald-200 px-2.5 py-0.5 text-[9px] font-mono uppercase tracking-wider text-emerald-800 font-bold animate-pulse">
                      Active
                    </span>
                  )}
                </div>

                <div className="flex flex-col md:flex-row gap-5 items-start">
                  
                  {/* Product Thumbnail */}
                  <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border border-slate-100">
                    <img 
                      src={sub.product.image} 
                      alt={sub.product.name} 
                      className="h-full w-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Core details */}
                  <div className="flex-1 space-y-1">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-brand-blue font-bold">
                      {sub.product.category} Plan
                    </span>
                    <h4 className="font-display text-base font-bold text-slate-900">
                      {sub.product.name}
                    </h4>
                    
                    {/* Subscription Specs */}
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500 pt-2 font-medium">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3.5 w-3.5 text-brand-blue" />
                        <span>Frequency:</span>
                        {editingId === sub.id ? (
                          <div className="flex items-center space-x-1.5">
                            <select
                              value={tempFrequency}
                              onChange={(e) => setTempFrequency(e.target.value as any)}
                              className="rounded border border-slate-300 text-[11px] px-1.5 py-0.5 bg-white font-sans text-slate-800 focus:outline-none"
                            >
                              <option value="monthly">Every Month</option>
                              <option value="bi-monthly">Every 2 Months</option>
                              <option value="tri-monthly">Every 3 Months</option>
                            </select>
                            <button 
                              onClick={() => saveFrequency(sub.id)}
                              className="p-1 rounded bg-brand-blue text-white hover:bg-brand-blue-hover"
                            >
                              <Check className="h-3 w-3" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-1">
                            <span className="text-slate-900 font-semibold">{getFrequencyLabel(sub.frequency)}</span>
                            <button 
                              onClick={() => startEditing(sub)}
                              className="text-slate-400 hover:text-brand-blue"
                              title="Edit Frequency"
                            >
                              <Edit2 className="h-3 w-3 ml-1" />
                            </button>
                          </div>
                        )}
                      </div>

                      <div>
                        <span>Qty: <strong className="text-slate-950 font-semibold">{sub.quantity}</strong></span>
                      </div>

                      <div>
                        <span>Price Per Delivery: <strong className="text-brand-blue font-bold">${(sub.pricePerDelivery * sub.quantity).toFixed(2)}</strong></span>
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-400 pt-1 font-mono">
                      Next Shipping Date: <span className="text-slate-600 font-medium">{sub.nextDeliveryDate}</span> (Ships free via standard eco-post)
                    </p>
                  </div>

                  {/* Actions Column */}
                  <div className="flex flex-wrap gap-2 w-full md:w-auto md:flex-col justify-end">
                    
                    {/* Skip Action */}
                    {!isPaused && (
                      <button
                        onClick={() => onUpdateSubscription(sub.id, { status: isSkipped ? 'active' : 'skipped' })}
                        className={`flex flex-1 md:flex-none items-center justify-center space-x-1.5 rounded-lg px-3 py-2 text-xs font-bold uppercase tracking-wider transition-all border ${
                          isSkipped 
                            ? 'bg-amber-100 text-amber-800 border-amber-300 hover:bg-amber-200' 
                            : 'bg-white text-slate-700 border-slate-200 hover:border-amber-300 hover:text-amber-700'
                        }`}
                      >
                        <SkipForward className="h-3.5 w-3.5" />
                        <span>{isSkipped ? 'Resume Delivery' : 'Skip Next'}</span>
                      </button>
                    )}

                    {/* Pause/Resume Action */}
                    <button
                      onClick={() => onUpdateSubscription(sub.id, { status: isPaused ? 'active' : 'paused' })}
                      className={`flex flex-1 md:flex-none items-center justify-center space-x-1.5 rounded-lg px-3 py-2 text-xs font-bold uppercase tracking-wider transition-all border ${
                        isPaused 
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100' 
                          : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:text-slate-950'
                      }`}
                    >
                      {isPaused ? (
                        <>
                          <Play className="h-3.5 w-3.5 text-emerald-600 fill-emerald-600" />
                          <span>Resume Plan</span>
                        </>
                      ) : (
                        <>
                          <Pause className="h-3.5 w-3.5 text-slate-500 fill-slate-500" />
                          <span>Pause Plan</span>
                        </>
                      )}
                    </button>

                    {/* Cancel Action */}
                    <button
                      onClick={() => {
                        if (confirm('Are you sure you want to cancel this subscription? You will lose your 15% discount.')) {
                          onCancelSubscription(sub.id);
                        }
                      }}
                      className="flex flex-1 md:flex-none items-center justify-center space-x-1.5 rounded-lg border border-red-200 bg-red-50/50 px-3 py-2 text-xs font-bold uppercase tracking-wider text-red-600 hover:bg-red-50 hover:border-red-300 transition-all"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      <span>Cancel</span>
                    </button>

                  </div>

                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
