import React from 'react';
import { X, Trash2, Calendar, ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

export default function Cart({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}: CartProps) {
  if (!isOpen) return null;

  const total = cartItems.reduce((sum, item) => {
    const price = item.purchaseType === 'subscription' ? item.product.subscribePrice : item.product.price;
    return sum + price * item.quantity;
  }, 0);

  const totalOneTimeValue = cartItems.reduce((sum, item) => {
    return sum + item.product.price * item.quantity;
  }, 0);

  const totalSavings = totalOneTimeValue - total;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md transform bg-white shadow-2xl transition-all flex flex-col h-full">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 p-5 bg-slate-50">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="h-5 w-5 text-brand-blue" />
              <h2 className="font-display text-lg font-bold text-slate-900">Your Basket</h2>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Cart Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <div className="h-14 w-14 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center mb-4 text-slate-300">
                  <ShoppingBag className="h-6 w-6" />
                </div>
                <h3 className="font-display text-sm font-bold text-slate-700">Your basket is empty</h3>
                <p className="text-slate-400 text-xs mt-1 max-w-[240px]">
                  Add sustainable detergent items to your basket to begin checkout.
                </p>
                <button
                  onClick={onClose}
                  className="mt-4 rounded-xl bg-brand-blue px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-brand-blue-hover"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cartItems.map((item) => {
                const isSub = item.purchaseType === 'subscription';
                const price = isSub ? item.product.subscribePrice : item.product.price;
                const savings = (item.product.price - item.product.subscribePrice) * item.quantity;

                return (
                  <div 
                    key={item.id} 
                    className="flex space-x-4 rounded-xl border border-slate-150 p-4 bg-white hover:border-slate-300"
                  >
                    {/* Thumbnail */}
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border border-slate-100">
                      <img 
                        src={item.product.image} 
                        alt={item.product.name} 
                        className="h-full w-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Meta */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 leading-tight">
                          {item.product.name}
                        </h4>
                        
                        {/* Option Tag */}
                        <div className="mt-1 flex flex-wrap gap-1">
                          {isSub ? (
                            <>
                              <span className="inline-flex items-center rounded-md bg-brand-gold/15 border border-brand-gold/30 px-1.5 py-0.5 text-[9px] font-mono font-bold uppercase text-brand-gold-dark">
                                Subscription
                              </span>
                              <span className="inline-flex items-center rounded-md bg-slate-100 px-1.5 py-0.5 text-[9px] font-mono text-slate-500">
                                <Calendar className="h-2.5 w-2.5 mr-1 text-brand-blue" />
                                {item.subscriptionFrequency === 'monthly' ? 'Monthly' : item.subscriptionFrequency === 'bi-monthly' ? 'Every 2m' : 'Every 3m'}
                              </span>
                            </>
                          ) : (
                            <span className="inline-flex items-center rounded-md bg-slate-100 px-1.5 py-0.5 text-[9px] font-mono text-slate-500">
                              One-time Purchase
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Quantity Selector & Price */}
                      <div className="flex items-center justify-between mt-3">
                        {/* Selector */}
                        <div className="flex items-center rounded-lg border border-slate-200">
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="px-2 py-1 text-slate-500 hover:text-slate-800 text-xs font-bold"
                          >
                            -
                          </button>
                          <span className="px-2 text-xs font-semibold text-slate-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="px-2 py-1 text-slate-500 hover:text-slate-800 text-xs font-bold"
                          >
                            +
                          </button>
                        </div>

                        {/* Price Display */}
                        <div className="text-right">
                          <span className="block text-xs font-bold text-slate-900">
                            ${(price * item.quantity).toFixed(2)}
                          </span>
                          {isSub && savings > 0 && (
                            <span className="block text-[9px] font-mono text-emerald-600 font-bold">
                              Saved ${(savings).toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Delete */}
                    <div className="flex flex-col items-end justify-between">
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-slate-400 hover:text-red-500 p-1 rounded-lg hover:bg-slate-50"
                        title="Remove"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                  </div>
                );
              })
            )}
          </div>

          {/* Footer Calculations */}
          {cartItems.length > 0 && (
            <div className="border-t border-slate-100 bg-slate-50 p-5 space-y-4">
              <div className="space-y-1.5 text-xs text-slate-600 font-medium">
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-emerald-600 font-semibold uppercase">Free (Eco delivery)</span>
                </div>
                {totalSavings > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span className="flex items-center gap-1">
                      <Sparkles className="h-3 w-3 fill-brand-gold text-brand-gold animate-bounce" />
                      Subscription Discount (15%)
                    </span>
                    <span>-${totalSavings.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between border-t border-slate-200/60 pt-3 text-sm font-bold text-slate-900">
                  <span>Est. Total</span>
                  <span className="text-brand-blue text-base">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Promo Banner */}
              {totalSavings > 0 && (
                <div className="rounded-lg bg-brand-gold/15 border border-brand-gold/20 p-2 text-center text-[10px] text-slate-800 font-medium leading-tight">
                  🎉 Congrats! Your recurring delivery options saved you <strong>${totalSavings.toFixed(2)}</strong> today!
                </div>
              )}

              {/* Checkout Trigger Button */}
              <button
                onClick={onCheckout}
                className="group flex w-full h-12 items-center justify-center space-x-2.5 rounded-xl bg-brand-blue text-white shadow-lg shadow-brand-blue/20 text-xs font-bold uppercase tracking-wider transition-all hover:bg-brand-blue-hover hover:scale-[1.01]"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
