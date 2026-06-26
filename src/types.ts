export interface Product {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  category: 'Pods' | 'Liquid' | 'Accessories';
  price: number;
  subscribePrice: number; // usually 15% cheaper
  rating: number;
  reviewsCount: number;
  image: string;
  features: string[];
  ecoImpact: string;
  specifications: {
    size: string;
    loads: number;
    scent: string;
    packaging: string;
  };
}

export interface CartItem {
  id: string; // Unique cart item ID (combines product ID and purchase config)
  product: Product;
  quantity: number;
  purchaseType: 'one-time' | 'subscription';
  subscriptionFrequency: 'monthly' | 'bi-monthly' | 'tri-monthly';
}

export interface Subscription {
  id: string;
  product: Product;
  quantity: number;
  frequency: 'monthly' | 'bi-monthly' | 'tri-monthly';
  status: 'active' | 'paused' | 'skipped';
  nextDeliveryDate: string;
  pricePerDelivery: number;
}

export interface Order {
  id: string;
  date: string;
  items: {
    productName: string;
    quantity: number;
    price: number;
    purchaseType: 'one-time' | 'subscription';
  }[];
  total: number;
  shippingAddress: {
    fullName: string;
    addressLine1: string;
    city: string;
    zipCode: string;
  };
  status: 'processing' | 'shipped' | 'delivered';
}
