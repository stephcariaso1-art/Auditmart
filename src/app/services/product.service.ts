import { Injectable, signal, computed } from '@angular/core';
import { Product } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly productsData: Product[] = [
    {
      id: 'jbl-live-660nc',
      brand: 'JBL',
      name: 'JBL Live 660NC',
      subtitle: 'Wireless Noise Cancelling',
      price: 75,
      originalPrice: 99,
      rating: 4.8,
      reviewsCount: 328,
      description: 'Experience deep bass, clear vocals, and all day comfort with JBL\'s signature sound.',
      features: [
        'Adaptive Noise Cancelling',
        'Up to 50 Hours Battery Life',
        'JBL Signature Pure Bass Sound',
        'Multi-Point Connection & Fast Pair'
      ],
      colors: [
        { name: 'White', hex: '#FFFFFF', inStock: true },
        { name: 'Silver', hex: '#A3A3A8', inStock: true },
        { name: 'Black', hex: '#1C1C1E', inStock: true }
      ],
      images: [
        'assets/products/jbl-live-660nc.jpg',
        'assets/products/sony-wh1000.jpg'
      ],
      category: 'Headphones',
      isPopular: true
    },
    {
      id: 'sony-ath-m50x',
      brand: 'Sony',
      name: 'Sony ATH-M50x',
      subtitle: 'Premium Wireless Studio',
      price: 87,
      originalPrice: 110,
      rating: 4.9,
      reviewsCount: 512,
      description: 'Critically acclaimed sonic performance praised by top audio engineers and pro reviewers worldwide.',
      features: [
        'Proprietary 45 mm large-aperture drivers',
        'Exceptional clarity with deep accurate bass',
        '90° swiveling earcups for easy one-ear monitoring',
        'Professional-grade earpad and headband material'
      ],
      colors: [
        { name: 'Matte Black', hex: '#18181A', inStock: true },
        { name: 'Gunmetal', hex: '#4A4A50', inStock: true },
        { name: 'Midnight Navy', hex: '#1C2538', inStock: true }
      ],
      images: [
        'assets/products/sony-wh1000.jpg',
        'assets/products/bose-crusher.jpg'
      ],
      category: 'Headphones',
      isPopular: true
    },
    {
      id: 'bose-crusher-evo',
      brand: 'Bose',
      name: 'Bose Crusher Evo',
      subtitle: 'Sensory Bass Experience',
      price: 99,
      originalPrice: 130,
      rating: 4.7,
      reviewsCount: 245,
      description: 'Engineered with patented acoustic technology, delivering mind-blowing sensory bass and high-definition studio clarity.',
      features: [
        'Adjustable Sensory Bass control slider',
        'Personal Sound with the Companion App',
        'Rapid Charge: 10 mins = 4 hours playback',
        'Built-in Tile finding technology'
      ],
      colors: [
        { name: 'Triple Black', hex: '#111113', inStock: true },
        { name: 'Stone Grey', hex: '#8C8C94', inStock: true },
        { name: 'Pure White', hex: '#F0F0F3', inStock: true }
      ],
      images: [
        'assets/products/bose-crusher.jpg',
        'assets/products/jbl-live-660nc.jpg'
      ],
      category: 'Headphones',
      isPopular: true
    },
    {
      id: 'apple-airpods-max',
      brand: 'Apple',
      name: 'Apple AirPods Max',
      subtitle: 'Spatial Audio & High-Fidelity',
      price: 199,
      originalPrice: 249,
      rating: 4.9,
      reviewsCount: 880,
      description: 'Computational audio combines custom acoustic design with high fidelity H1 drivers for breakthrough listening experiences.',
      features: [
        'High-fidelity audio with dynamic head tracking',
        'Active Noise Cancellation with Transparency mode',
        'Knit-mesh canopy and memory foam ear cushions',
        'Digital Crown for precise volume and track control'
      ],
      colors: [
        { name: 'Space Gray', hex: '#38383B', inStock: true },
        { name: 'Silver', hex: '#E2E2E6', inStock: true },
        { name: 'Sky Blue', hex: '#7BA4C4', inStock: true }
      ],
      images: [
        'assets/products/airpods-max-black.jpg',
        'assets/products/airpods-max-white.jpg'
      ],
      category: 'Headphones'
    },
    {
      id: 'apple-airpods-pro',
      brand: 'Apple',
      name: 'Apple AirPods Pro 2',
      subtitle: 'Active Noise Cancelling MagSafe',
      price: 119,
      originalPrice: 149,
      rating: 4.8,
      reviewsCount: 420,
      description: 'Next-level Active Noise Cancellation and Adaptive Audio for rich, immersive listening wherever you go.',
      features: [
        'Adaptive Audio & Transparency Mode',
        'Personalized Spatial Audio',
        'MagSafe Case with Precision Finding',
        'Up to 30 Hours Total Listening Time'
      ],
      colors: [
        { name: 'Pure White', hex: '#FFFFFF', inStock: true }
      ],
      images: [
        'assets/products/airpods-pro.jpg',
        'assets/products/airpods-pro-case.jpg'
      ],
      category: 'Earphones',
      isPopular: true
    },
    {
      id: 'sony-wf1000xm5',
      brand: 'Sony',
      name: 'Sony WF-1000XM5',
      subtitle: 'The Best Noise Cancelling Earbuds',
      price: 139,
      originalPrice: 179,
      rating: 4.9,
      reviewsCount: 310,
      description: 'Featuring dual processor technology and dynamic driver X for unparalleled clarity and call quality.',
      features: [
        'Specially designed Dynamic Driver X',
        'Dual proprietary noise cancelling processors',
        'Multipoint connection & Bone conduction sensors',
        'IPX4 water resistant'
      ],
      colors: [
        { name: 'Black', hex: '#1C1C1E', inStock: true },
        { name: 'Silver', hex: '#D1D1D6', inStock: true }
      ],
      images: [
        'assets/products/sony-wf1000xm5.jpg'
      ],
      category: 'Earphones'
    },
    {
      id: 'jbl-flip-6',
      brand: 'JBL',
      name: 'JBL Flip 6 Portable',
      subtitle: '2-Way Speaker System Deep Bass',
      price: 69,
      originalPrice: 89,
      rating: 4.7,
      reviewsCount: 290,
      description: 'Bold JBL Original Pro Sound with exceptional clarity thanks to its 2-way speaker system and dual bass radiators.',
      features: [
        'Louder, more powerful 2-way audio',
        'IP67 waterproof and dustproof',
        '12 hours of playtime on a single charge',
        'PartyBoost multiple speaker pairing'
      ],
      colors: [
        { name: 'Midnight Black', hex: '#1C1C1E', inStock: true },
        { name: 'Squad Blue', hex: '#2A3B5C', inStock: true },
        { name: 'Fiesta Red', hex: '#9C2A2A', inStock: true }
      ],
      images: [
        'assets/products/jbl-flip6.jpg',
        'assets/products/jbl-pulse.jpg'
      ],
      category: 'Speakers',
      isPopular: true
    },
    {
      id: 'bose-soundlink-flex',
      brand: 'Bose',
      name: 'Bose SoundLink Flex',
      subtitle: 'Rugged Waterproof Bluetooth Speaker',
      price: 89,
      originalPrice: 119,
      rating: 4.8,
      reviewsCount: 195,
      description: 'Astonishing sound and deep, waterproof durability with PositionIQ technology that optimizes acoustics anywhere.',
      features: [
        'High-fidelity audio with deep bass',
        'PositionIQ technology automatically adjusts tone',
        'Waterproof and dustproof (IP67) that even floats',
        'Up to 12 hours battery life per charge'
      ],
      colors: [
        { name: 'Black', hex: '#1C1C1E', inStock: true },
        { name: 'Stone Blue', hex: '#4A6B82', inStock: true },
        { name: 'Carmine Red', hex: '#87252B', inStock: true }
      ],
      images: [
        'assets/products/bose-flex.jpg',
        'assets/products/jbl-pulse.jpg'
      ],
      category: 'Speakers'
    },
    {
      id: 'shure-sm7b',
      brand: 'Shure',
      name: 'Shure SM7B',
      subtitle: 'Legendary Vocal Studio Microphone',
      price: 399,
      originalPrice: 449,
      rating: 4.9,
      reviewsCount: 420,
      description: 'The definitive broadcast and vocal recording microphone with flat, wide-range frequency response for exceptionally clean and natural reproduction.',
      features: [
        'Cardioid polar pattern with uniform frequency',
        'Built-in bass rolloff & mid-range emphasis controls',
        'Internal air suspension shock isolation',
        'Effective pop filter to eliminate breath noise'
      ],
      colors: [
        { name: 'Dark Titanium', hex: '#0B0A0A', inStock: true },
        { name: 'Silver Matte', hex: '#C7C7C6', inStock: true }
      ],
      images: [
        'assets/products/shure-sm7b.jpg',
        'assets/products/rode-podmic.jpg'
      ],
      category: 'Microphones',
      isPopular: true
    },
    {
      id: 'rode-podmic',
      brand: 'Røde',
      name: 'Røde PodMic',
      subtitle: 'Broadcast-Grade Dynamic Podcasting Mic',
      price: 99,
      originalPrice: 129,
      rating: 4.8,
      reviewsCount: 310,
      description: 'Optimized for podcasting and live streaming, the PodMic delivers rich, balanced sound with an integrated internal pop filter.',
      features: [
        'Broadcast-quality dynamic capsule',
        'Internal pop shield & swing mount design',
        'Solid all-metal brass construction',
        'Optimized for speech and vocal presence'
      ],
      colors: [
        { name: 'Matte Obsidian', hex: '#070706', inStock: true },
        { name: 'Brushed Chrome', hex: '#C7C7C6', inStock: true }
      ],
      images: [
        'assets/products/rode-podmic.jpg',
        'assets/products/shure-sm7b.jpg'
      ],
      category: 'Microphones',
      isPopular: true
    },
    {
      id: 'blue-yeti-x',
      brand: 'Logitech',
      name: 'Blue Yeti X',
      subtitle: 'Professional Multi-Pattern USB Mic',
      price: 139,
      originalPrice: 169,
      rating: 4.7,
      reviewsCount: 285,
      description: 'Custom four-capsule condenser array for crystal-clear broadcasting, streaming, and podcasting with high-res LED metering.',
      features: [
        'Four-capsule condenser array for 4 pickup patterns',
        'High-resolution multi-function LED metering',
        'Blue VO!CE broadcast vocal effects integration',
        'Zero-latency real-time headphone monitoring'
      ],
      colors: [
        { name: 'Dark Shadow', hex: '#151413', inStock: true },
        { name: 'Titanium Grey', hex: '#7C7B7B', inStock: true }
      ],
      images: [
        'assets/products/blue-yeti.jpg',
        'assets/products/at2020.jpg'
      ],
      category: 'Microphones'
    },
    {
      id: 'audio-technica-at2020',
      brand: 'Audio-Technica',
      name: 'Audio-Technica AT2020',
      subtitle: 'Cardioid Studio Condenser Microphone',
      price: 99,
      originalPrice: 119,
      rating: 4.8,
      reviewsCount: 350,
      description: 'The price/performance standard in side-address studio condenser microphone technology, ideal for home and project studio applications.',
      features: [
        'Custom-engineered low-mass diaphragm',
        'Extended frequency response and superior transient response',
        'High SPL handling and wide dynamic range',
        'Cardioid polar pattern reduces pickup of side sounds'
      ],
      colors: [
        { name: 'Deep Space', hex: '#0B0A0A', inStock: true },
        { name: 'Slate Chrome', hex: '#575655', inStock: true }
      ],
      images: [
        'assets/products/at2020.jpg',
        'assets/products/shure-sm7b.jpg'
      ],
      category: 'Microphones'
    }
  ];

  readonly categories = ['All', 'Headphones', 'Earphones', 'Speakers', 'Microphones'] as const;

  readonly selectedCategory = signal<string>('All');
  readonly searchQuery = signal<string>('');

  readonly products = computed(() => {
    const category = this.selectedCategory();
    const query = this.searchQuery().toLowerCase().trim();

    return this.productsData.filter(p => {
      const matchCategory = category === 'All' || p.category.toLowerCase() === category.toLowerCase();
      const matchQuery = !query ||
        p.name.toLowerCase().includes(query) ||
        p.brand.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.subtitle.toLowerCase().includes(query);
      return matchCategory && matchQuery;
    });
  });

  getProductById(id: string): Product | undefined {
    return this.productsData.find(p => p.id === id);
  }

  setCategory(category: string) {
    this.selectedCategory.set(category);
  }

  setSearchQuery(query: string) {
    this.searchQuery.set(query);
  }
}
