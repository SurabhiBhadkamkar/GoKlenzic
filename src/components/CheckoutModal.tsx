import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, CreditCard, Sparkles, Truck, Package } from 'lucide-react';
import { CartItem, Order } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onOrderPlaced: (order: Order) => void;
}

export default function CheckoutModal({ isOpen, onClose, cartItems, onOrderPlaced }: CheckoutModalProps) {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    addressLine1: '',
    city: '',
    zipCode: '',
    cardNumber: '4111 2222 3333 4444',
    cardExpiry: '12/28',
    cardCvv: '123'
  });

  if (!isOpen) return null;

  const total = cartItems.reduce((sum, item) => {
    const price = item.purchaseType === 'subscription' ? item.product.subscribePrice : item.product.price;
    return sum + price * item.quantity;
  }, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create the mock order
    const order: Order = {
      id: `GK-${Math.floor(1000000 + Math.random() * 9000000)}`,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      items: cartItems.map(item => ({
        productName: item.product.name,
        quantity: item.quantity,
        price: item.purchaseType === 'subscription' ? item.product.subscribePrice : item.product.price,
        purchaseType: item.purchaseType
      })),
      total,
      shippingAddress: {
        fullName: formData.fullName || 'Guest Eco-Cleaner',
        addressLine1: formData.addressLine1 || '100 Green Planet Way',
        city: formData.city || 'Eco City',
        zipCode: formData.zipCode || '90210'
      },
      status: 'processing'
    };

    onOrderPlaced(order);
    setStep('success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Main Container */}
      <div className="relative w-full max-w-2xl rounded-2xl bg-white shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 rounded-lg p-2 hover:bg-slate-50 z-20"
        >
          <X className="h-5 w-5" />
        </button>

        {step === 'form' ? (
          <form onSubmit={handleSubmit} className="flex flex-col h-full overflow-hidden">
            {/* Header */}
            <div className="border-b border-slate-100 p-5 sm:p-6 bg-slate-50/70">
              <h3 className="font-display text-lg font-bold text-slate-950 flex items-center gap-2">
                <ShieldCheck className="h-5.5 w-5.5 text-brand-blue" />
                Secure Checkout
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                You are purchasing with verified 256-bit bank level SSL encryption.
              </p>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Left Side: Forms */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">1. Delivery Address</h4>
                  
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@example.com"
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Street Address</label>
                    <input
                      type="text"
                      required
                      value={formData.addressLine1}
                      onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
                      placeholder="123 Eco Way, Apt 4B"
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">City</label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder="Greenwood"
                        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">ZIP Code</label>
                      <input
                        type="text"
                        required
                        value={formData.zipCode}
                        onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                        placeholder="90210"
                        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue"
                      />
                    </div>
                  </div>
                </div>

                {/* Right Side: Payment & Order details */}
                <div className="space-y-5">
                  
                  {/* Payment */}
                  <div className="space-y-4 rounded-xl border border-slate-100 bg-slate-50 p-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono flex items-center gap-1">
                      <CreditCard className="h-4 w-4 text-brand-blue" />
                      2. Payment Method
                    </h4>
                    
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-500 mb-1">Card Number</label>
                      <input
                        type="text"
                        required
                        value={formData.cardNumber}
                        onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                        placeholder="4111 2222 3333 4444"
                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-semibold text-slate-500 mb-1">Expiry</label>
                        <input
                          type="text"
                          required
                          value={formData.cardExpiry}
                          onChange={(e) => setFormData({ ...formData, cardExpiry: e.target.value })}
                          placeholder="MM/YY"
                          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold text-slate-500 mb-1">CVV</label>
                        <input
                          type="password"
                          required
                          maxLength={3}
                          value={formData.cardCvv}
                          onChange={(e) => setFormData({ ...formData, cardCvv: e.target.value })}
                          placeholder="123"
                          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Summary items */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">3. Basket Review</h4>
                    <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
                      {cartItems.map(item => (
                        <div key={item.id} className="flex justify-between text-xs text-slate-600 border-b border-slate-100 pb-1.5">
                          <span className="font-medium line-clamp-1 flex-1">{item.product.name} (x{item.quantity})</span>
                          <span className="font-bold text-slate-900 ml-3">
                            ${((item.purchaseType === 'subscription' ? item.product.subscribePrice : item.product.price) * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between items-center text-sm font-bold text-slate-900 border-t border-slate-150 pt-2.5">
                      <span>Total (Free shipping)</span>
                      <span className="text-brand-blue text-lg">${total.toFixed(2)}</span>
                    </div>
                  </div>

                </div>

              </div>

            </div>

            {/* Footer buttons */}
            <div className="border-t border-slate-100 p-5 sm:p-6 bg-slate-50 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl px-5 h-11 text-xs font-bold uppercase tracking-wider text-slate-500 hover:bg-slate-150 transition-all border border-slate-250"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center space-x-2 rounded-xl bg-brand-blue px-6 h-11 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-brand-blue/15 hover:bg-brand-blue-hover transition-all"
              >
                <Truck className="h-4 w-4 text-brand-gold" />
                <span>Place Secure Order</span>
              </button>
            </div>
          </form>
        ) : (
          /* Order success animation / screen */
          <div className="p-8 sm:p-12 text-center flex flex-col items-center justify-center">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 mb-6 animate-bounce">
              <CheckCircle2 className="h-10 w-10" />
            </div>

            <span className="font-mono text-[9px] uppercase tracking-widest text-emerald-700 font-bold bg-emerald-100 border border-emerald-200 px-3 py-1 rounded-full">
              Simulated Transaction Complete
            </span>

            <h3 className="font-display text-2xl font-bold text-slate-950 mt-4">
              Thank You for Washing Green!
            </h3>
            
            <p className="text-xs text-slate-500 mt-2 max-w-md leading-relaxed">
              We received your order! A recurring subscription plan has been set up on your account. GoKlenzic detergent kits will be packaged in unbleached compostable fibers and sent directly to your home.
            </p>

            {/* Order spec box */}
            <div className="mt-6 w-full max-w-sm rounded-xl border border-slate-150 bg-slate-50 p-4 text-left space-y-2">
              <div className="flex justify-between text-xs font-mono text-slate-400">
                <span>ORDER ID</span>
                <span className="font-bold text-slate-700">GK-SUCCESS-MOCK</span>
              </div>
              <div className="flex justify-between text-xs font-mono text-slate-400">
                <span>ESTIMATED SHIPPING</span>
                <span className="font-bold text-slate-700">Underway (2 days)</span>
              </div>
              <div className="flex justify-between text-xs font-mono text-slate-400 border-t border-slate-200/60 pt-2.5">
                <span className="font-bold text-slate-900">Total Charged</span>
                <span className="font-extrabold text-brand-blue">${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 w-full max-w-sm">
              <button
                onClick={onClose}
                className="flex-1 rounded-xl border border-slate-200 py-3 text-xs font-bold uppercase tracking-wider text-slate-700 hover:bg-slate-50 transition-all text-center"
              >
                Return to Store
              </button>
              <button
                onClick={() => {
                  onClose();
                  // A delay to allow the state to update
                }}
                className="flex-1 flex items-center justify-center space-x-1.5 rounded-xl bg-brand-blue py-3 text-xs font-bold uppercase tracking-wider text-white shadow-md hover:bg-brand-blue-hover transition-all text-center"
              >
                <Package className="h-4 w-4 text-brand-gold" />
                <span>My Dashboard</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
