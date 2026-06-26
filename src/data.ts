import { Product } from './types';

// Let's map back to the actual generated image file names returned by the tool
export const PRODUCTS: Product[] = [
  {
    id: 'goklenzic-pods-eco',
    name: 'NaturaWash Eco Capsules',
    subtitle: '100% Biodegradable Laundry Pods',
    description: 'Ultra-concentrated plant-based active ingredients enclosed in a zero-waste, fast-dissolving natural water-soluble membrane. Tough on stains, exceptionally gentle on sensitive skin and our oceans.',
    category: 'Pods',
    price: 24.00,
    subscribePrice: 20.40,
    rating: 4.9,
    reviewsCount: 1420,
    image: '/src/assets/images/laundry_pods_main_1782468360416.jpg',
    features: [
      '100% biodegradable active formula',
      'Naturally derived lavender & eucalyptus scent',
      'Free from artificial optical brighteners & dyes',
      'HE-Compatible for cold or hot wash cycles'
    ],
    ecoImpact: 'Saves 2.4kg of ocean-bound heavy plastic packaging per box',
    specifications: {
      size: '64 Capsules Box',
      loads: 64,
      scent: 'Lavender & Eucalyptus',
      packaging: 'Recycled compostable paperboard'
    }
  },
  {
    id: 'goklenzic-liquid-eco',
    name: 'NaturaLiquid Ultra-Concentrate',
    subtitle: 'Zero-Waste Liquid Detergent Bottle',
    description: 'Our revolutionary bio-enzyme liquid cleaner. Highly concentrated so you only need a small capful. Comes in our signature light-weight recycled cardboard-skin container with natural lining.',
    category: 'Liquid',
    price: 19.00,
    subscribePrice: 16.15,
    rating: 4.8,
    reviewsCount: 890,
    image: '/src/assets/images/laundry_liquid_main_1782468374489.jpg',
    features: [
      'Triple-action bio-enzymatic stain lifters',
      'Sweet and crisp sunny citrus natural extract scent',
      '98% carbon-neutral direct ocean shipping footprint',
      'Hypoallergenic, dermatologist approved for babies'
    ],
    ecoImpact: '70% less weight than traditional laundry detergent jugs',
    specifications: {
      size: '1.2 Liters Bottle',
      loads: 48,
      scent: 'Sunny Citrus Breeze',
      packaging: 'Biodegradable organic cardboard flask'
    }
  },
  {
    id: 'goklenzic-dryer-balls',
    name: 'Wool Dryer Balls & Bamboo Set',
    subtitle: 'Sustainably Harvested Companions',
    description: '100% premium New Zealand wool balls that naturally separate laundry, enhance airflow, and reduce drying time by up to 30%. Paired with a solid natural bamboo laundry organizing scoop.',
    category: 'Accessories',
    price: 15.00,
    subscribePrice: 12.75,
    rating: 4.9,
    reviewsCount: 654,
    image: '/src/assets/images/laundry_accessories_main_1782468387020.jpg',
    features: [
      'Naturally softens fabrics without synthetic chemicals',
      'Reduces electricity bills by shortening drying cycles',
      'Reusable for over 1,000 household loads',
      'Includes premium solid hand-carved bamboo storage cup'
    ],
    ecoImpact: 'Replaces up to 1,200 chemical-laden single-use dryer sheets',
    specifications: {
      size: '6 Premium Balls + Bamboo Scoop',
      loads: 1000,
      scent: 'Fragrance-Free (Natural Wool)',
      packaging: 'Unbleached natural cotton storage bag'
    }
  }
];

export const TESTIMONIALS = [
  {
    name: 'Sarah Mitchell',
    role: 'Parent of Three',
    quote: 'The NaturaWash capsules clean the kids muddy sports clothes perfectly! And knowing there is no heavy plastic bucket going in the trash is the best feeling.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120'
  },
  {
    name: 'David Carter',
    role: 'Sustainable Homeowner',
    quote: 'I love the subscription model. Every 2 months, a slim paper box drops through my mail slot. Extremely convenient, compact, and high quality.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120'
  },
  {
    name: 'Elena Rostova',
    role: 'Dermatologist & Athlete',
    quote: 'Dyes and parabens in standard detergents break out my skin. GoKlenzic is hypoallergenic but still gets sweat and grass stains out completely.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120'
  }
];

export const FAQS = [
  {
    question: 'How does the GoKlenzic Subscription work?',
    answer: 'It is fully customizable and flexible! You select your preferred eco-cleaning products, choose a shipping frequency (every 1, 2, or 3 months), and enjoy a permanent 15% discount on everything. You can modify your products, skip deliveries, change frequency, or cancel at any time instantly from your Subscription Portal.'
  },
  {
    question: 'Is the natural formula as effective as conventional chemical detergents?',
    answer: 'Yes, and often more! We use highly concentrated plant-based enzymes (amylase, protease, and lipase) that specifically target organic stains like oil, grease, soil, and sweat. They clean powerfully even in cold wash cycles (30°C/85°F), helping you save water and energy.'
  },
  {
    question: 'What makes the GoKlenzic pods completely biodegradable?',
    answer: 'The thin film surrounding our pods is made from Polyvinyl Alcohol (PVA). PVA is a water-soluble, food-grade polymer that dissolves completely upon contact with water. When washed away, natural soil microbes and bacteria digest the dissolved polymer into water and carbon dioxide, leaving absolutely no microplastics or toxic residues.'
  },
  {
    question: 'How do I know which subscription frequency is right for me?',
    answer: 'You can use our interactive Detergent Usage Matcher on this page! It calculates your average weekly laundry weight and frequency, and recommends the exact box size and subscription timing to ensure you never run out of clean clothes or build up unnecessary backlog.'
  }
];
