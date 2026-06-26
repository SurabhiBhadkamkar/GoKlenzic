import React, { useState, useEffect } from 'react';
import { ShoppingBag, Star, HelpCircle, Leaf, Sparkles, MessageSquare, Heart, ShieldCheck, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Values from './components/Values';
import ProductCard from './components/ProductCard';
import SubscriptionPortal from './components/SubscriptionPortal';
import Cart from './components/Cart';
import Calculator from './components/Calculator';
import CheckoutModal from './components/CheckoutModal';
import Footer from './components/Footer';

import { PRODUCTS, TESTIMONIALS, FAQS } from './data';
import { CartItem, Subscription, Order } from './types';

export default function App() {
  // Navigation
  const [activeTab, setActiveTab] = useState<string>('shop');

  // Cart & Orders State (Initialized from Local Storage for true client persistence)
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('goklenzic_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [subscriptions, setSubscriptions] = useState<Subscription[]>(() => {
    const saved = localStorage.getItem('goklenzic_subscriptions');
    if (saved) return JSON.parse(saved);

    // Seed one active subscription by default so the portal doesn't look empty and gives a direct interactive start!
    const defaultSub: Subscription = {
      id: 'SUB-SEED-9824683',
      product: PRODUCTS[0], // Pods
      quantity: 1,
      frequency: 'bi-monthly',
      status: 'active',
      nextDeliveryDate: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      }),
      pricePerDelivery: PRODUCTS[0].subscribePrice
    };
    return [defaultSub];
  });

  const [pastOrders, setPastOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('goklenzic_orders');
    return saved ? JSON.parse(saved) : [];
  });

  // UI Control states
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  // Sync state to Local Storage
  useEffect(() => {
    localStorage.setItem('goklenzic_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('goklenzic_subscriptions', JSON.stringify(subscriptions));
  }, [subscriptions]);

  useEffect(() => {
    localStorage.setItem('goklenzic_orders', JSON.stringify(pastOrders));
  }, [pastOrders]);

  // Toast notifications helper
  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // Cart Handlers
  const handleAddToCart = (newItem: Omit<CartItem, 'id'>) => {
    const itemUniqueId = `${newItem.product.id}-${newItem.purchaseType}-${newItem.subscriptionFrequency}`;
    
    setCartItems(prev => {
      const existing = prev.find(item => item.id === itemUniqueId);
      if (existing) {
        showNotification(`Updated quantity of ${newItem.product.name} in basket`);
        return prev.map(item => 
          item.id === itemUniqueId 
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        );
      }
      showNotification(`Added ${newItem.product.name} to your basket`);
      return [...prev, { ...newItem, id: itemUniqueId }];
    });
  };

  const handleAddToCartAndOpen = (newItem: Omit<CartItem, 'id'>) => {
    handleAddToCart(newItem);
    setIsCartOpen(true);
  };

  const handleUpdateCartQuantity = (id: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(id);
      return;
    }
    setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity: newQty } : item));
  };

  const handleRemoveCartItem = (id: string) => {
    const item = cartItems.find(i => i.id === id);
    if (item) {
      showNotification(`Removed ${item.product.name} from basket`);
    }
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  // Subscription Portal Handlers
  const handleUpdateSubscription = (id: string, updates: Partial<Subscription>) => {
    setSubscriptions(prev => prev.map(sub => {
      if (sub.id === id) {
        const nextSub = { ...sub, ...updates };
        if (updates.status === 'paused') {
          showNotification(`Subscription for ${sub.product.name} paused`);
        } else if (updates.status === 'skipped') {
          showNotification(`Skipped next delivery of ${sub.product.name}`);
        } else if (updates.status === 'active') {
          showNotification(`Subscription for ${sub.product.name} resumed`);
        } else if (updates.frequency) {
          showNotification(`Delivery frequency adjusted to ${updates.frequency}`);
        }
        return nextSub;
      }
      return sub;
    }));
  };

  const handleCancelSubscription = (id: string) => {
    const sub = subscriptions.find(s => s.id === id);
    if (sub) {
      showNotification(`Cancelled subscription for ${sub.product.name}`);
    }
    setSubscriptions(prev => prev.filter(sub => sub.id !== id));
  };

  // Checkout Placement Handler
  const handleOrderPlaced = (order: Order) => {
    // Add to past orders
    setPastOrders(prev => [order, ...prev]);

    // Convert subscription cart items to active subscriptions
    const subCartItems = cartItems.filter(item => item.purchaseType === 'subscription');
    
    if (subCartItems.length > 0) {
      const newSubs: Subscription[] = subCartItems.map(item => {
        const frequencyMonths = item.subscriptionFrequency === 'monthly' ? 1 : item.subscriptionFrequency === 'bi-monthly' ? 2 : 3;
        const nextDelivery = new Date();
        nextDelivery.setMonth(nextDelivery.getMonth() + frequencyMonths);

        return {
          id: `SUB-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`,
          product: item.product,
          quantity: item.quantity,
          frequency: item.subscriptionFrequency,
          status: 'active',
          nextDeliveryDate: nextDelivery.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
          }),
          pricePerDelivery: item.product.subscribePrice
        };
      });

      setSubscriptions(prev => [...newSubs, ...prev]);
    }

    // Clear cart and triggers tab view change to Subscription Portal if they have subscriptions
    setCartItems([]);
    if (subCartItems.length > 0) {
      setTimeout(() => {
        setActiveTab('portal');
        showNotification("Checkout successful! Subscriptions activated.");
      }, 500);
    }
  };

  const totalCartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col justify-between antialiased selection:bg-brand-blue/20 selection:text-brand-blue-dark">
      
      {/* Dynamic Toast Notification */}
      {notification && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center space-x-2 rounded-xl bg-slate-900 px-4 py-3 text-xs font-semibold text-white shadow-xl animate-fade-in-up border border-slate-850">
          <CheckCircle2 className="h-4 w-4 text-brand-gold" />
          <span>{notification}</span>
        </div>
      )}

      {/* Sticky Top Header */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        cartItemCount={totalCartItemCount}
        onCartOpen={() => setIsCartOpen(true)}
      />

      {/* Main Screen Router */}
      <main className="flex-1">
        
        {activeTab === 'shop' && (
          <div className="space-y-0">
            {/* Slide 1 Visual - Hero Block */}
            <Hero 
              onExploreClick={() => {
                const element = document.getElementById('eco-catalog');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              onCalculatorClick={() => setActiveTab('calculator')}
            />

            {/* Slide 2 Visual - Brand Values with Golden-Yellow Cards over Pod Image */}
            <Values />

            {/* Storefront Catalog Section */}
            <section id="eco-catalog" className="mx-auto max-w-7xl px-4 py-16 sm:py-24 sm:px-6 lg:px-8">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <span className="font-mono text-xs uppercase tracking-widest text-brand-blue font-bold">Catalog</span>
                <h2 className="font-display text-3xl font-extrabold tracking-tight text-slate-900 mt-1">
                  Biodegradable Cleaners
                </h2>
                <p className="mt-3 text-slate-500 text-xs sm:text-sm">
                  Choose from our plant-based laundry pods, liquid concentrates, and sustainable washing accessories. Select **Subscribe & Save** for 15% ongoing off!
                </p>
              </div>

              {/* Product Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {PRODUCTS.map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            </section>

            {/* Immersive Client Testimonials */}
            <section className="bg-white border-t border-b border-slate-200/60 py-16 sm:py-20 relative">
              <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none"></div>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-2xl mx-auto mb-12">
                  <span className="font-mono text-xs uppercase tracking-widest text-brand-blue font-bold">Community Voice</span>
                  <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 mt-1">
                    Loved by Families & the Planet
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {TESTIMONIALS.map((t, idx) => (
                    <div key={idx} className="rounded-2xl border border-slate-150 p-6 bg-white shadow-sm flex flex-col justify-between">
                      <div>
                        {/* Rating stars */}
                        <div className="flex text-brand-gold space-x-0.5 mb-4">
                          {Array.from({ length: t.rating }).map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-brand-gold" />
                          ))}
                        </div>
                        <blockquote className="text-sm text-slate-600 leading-relaxed italic">
                          "{t.quote}"
                        </blockquote>
                      </div>
                      <div className="flex items-center space-x-3 mt-6 border-t border-slate-100 pt-4">
                        <img 
                          src={t.avatar} 
                          alt={t.name} 
                          className="h-10 w-10 rounded-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <h4 className="text-xs font-bold text-slate-900">{t.name}</h4>
                          <span className="text-[10px] text-slate-400 font-mono">{t.role}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Clean Educational FAQ Section */}
            <section className="mx-auto max-w-4xl px-4 py-16 sm:py-24">
              <div className="text-center mb-12">
                <span className="font-mono text-xs uppercase tracking-widest text-brand-blue font-bold">Help Desk</span>
                <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 mt-1">
                  Frequently Asked Questions
                </h2>
              </div>

              <div className="space-y-4">
                {FAQS.map((faq, idx) => {
                  const isOpen = activeFaq === idx;
                  return (
                    <div 
                      key={idx} 
                      className="rounded-xl border border-slate-200 bg-white overflow-hidden transition-all duration-300"
                    >
                      <button
                        onClick={() => setActiveFaq(isOpen ? null : idx)}
                        className="flex w-full items-center justify-between p-5 text-left font-semibold text-slate-900 hover:bg-slate-50/50"
                      >
                        <span className="text-xs sm:text-sm font-bold font-display">{faq.question}</span>
                        <span className="ml-4 flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-slate-500 font-bold text-xs">
                          {isOpen ? '−' : '+'}
                        </span>
                      </button>
                      
                      {isOpen && (
                        <div className="border-t border-slate-150 bg-slate-50/50 p-5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

          </div>
        )}

        {activeTab === 'calculator' && (
          <div className="mx-auto max-w-4xl px-4 py-10 sm:py-16">
            <Calculator 
              products={PRODUCTS} 
              onAddToCartAndOpen={handleAddToCartAndOpen}
            />
          </div>
        )}

        {activeTab === 'portal' && (
          <div className="mx-auto max-w-4xl px-4 py-10 sm:py-16 space-y-8">
            
            {/* Active Subscription list */}
            <SubscriptionPortal 
              subscriptions={subscriptions}
              onUpdateSubscription={handleUpdateSubscription}
              onCancelSubscription={handleCancelSubscription}
              onExploreClick={() => setActiveTab('shop')}
            />

            {/* Past orders dashboard block */}
            {pastOrders.length > 0 && (
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="font-display text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-brand-blue" />
                  Eco Shipment History
                </h3>
                <div className="space-y-4">
                  {pastOrders.map((order) => (
                    <div key={order.id} className="rounded-xl border border-slate-100 bg-slate-50/60 p-4 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-mono text-xs font-bold text-brand-blue">{order.id}</span>
                          <span className="text-slate-300">•</span>
                          <span className="text-xs text-slate-500">{order.date}</span>
                        </div>
                        <ul className="mt-2 text-xs text-slate-600 font-medium list-disc pl-4 space-y-0.5">
                          {order.items.map((item, i) => (
                            <li key={i}>
                              {item.productName} (x{item.quantity}) - {item.purchaseType === 'subscription' ? 'Subscription Rate' : 'Standard Rate'}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="text-right flex sm:flex-col justify-between items-center sm:items-end border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-200">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-700 font-bold bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-md">
                          Dispensed
                        </span>
                        <span className="font-display text-sm font-bold text-slate-900 mt-1">${order.total.toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

      </main>

      {/* Floating Shopping Cart Drawer */}
      <Cart 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Secure Checkout Flow Modal */}
      <CheckoutModal 
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        onOrderPlaced={handleOrderPlaced}
      />

      {/* Visual Footer */}
      <Footer setActiveTab={setActiveTab} />

    </div>
  );
}
