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
        { name: 'White', hex: '#EBEBEB', inStock: true },
        { name: 'Silver', hex: '#A3A3A8', inStock: true },
        { name: 'Black', hex: '#1C1C1E', inStock: true }
      ],
      images: [
        'assets/products/jbl-live-660nc.png',
        'assets/products/jbl-cutout.png'
      ],
      category: 'Over-Ear',
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
        'assets/products/sony-wh1000xm4.png',
        'assets/products/sony-cutout.png'
      ],
      category: 'Studio',
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
      description: 'Engineered with patented acoustic technology, delivering mind-blowing sensory bass and customizable sound profiles.',
      features: [
        'Adjustable Sensory Bass control slider',
        'Personal Sound with the Bose Companion App',
        'Rapid Charge: 10 mins = 4 hours playback',
        'Built-in Tile finding technology'
      ],
      colors: [
        { name: 'Triple Black', hex: '#111113', inStock: true },
        { name: 'Stone Grey', hex: '#8C8C94', inStock: true },
        { name: 'Pure White', hex: '#F0F0F3', inStock: true }
      ],
      images: [
        'assets/products/bose-crusher.png',
        'assets/products/bose-cutout.png'
      ],
      category: 'Wireless',
      isPopular: true
    },
    {
      id: 'skullcandy-crusher',
      brand: 'Skullcandy',
      name: 'Skullcandy Crusher ANC',
      subtitle: 'Haptic Bass & Active Noise',
      price: 65,
      originalPrice: 85,
      rating: 4.6,
      reviewsCount: 189,
      description: 'Unleash your music with adjustable sensory bass and active noise cancelling that tunes out unwanted distractions.',
      features: [
        'Digital Active Noise Canceling',
        'Adjustable Sensory Bass dial',
        'Built-in Tile finding tech',
        'Ambient Mode monitoring'
      ],
      colors: [
        { name: 'Stealth Black', hex: '#1F1F22', inStock: true },
        { name: 'Deep Red', hex: '#7A1822', inStock: false },
        { name: 'Olive Green', hex: '#3B4D3C', inStock: true }
      ],
      images: [
        'assets/products/skullcandy-evo.png'
      ],
      category: 'Over-Ear'
    },
    {
      id: 'sennheiser-momentum-4',
      brand: 'Sennheiser',
      name: 'Sennheiser Momentum 4',
      subtitle: 'Audiophile Acoustic Signature',
      price: 120,
      originalPrice: 159,
      rating: 4.9,
      reviewsCount: 420,
      description: 'Maximum audio resolution with Sennheiser signature 42mm transducer system and next-generation Adaptive ANC.',
      features: [
        'Incredible 60-hour battery life',
        'Advanced customizable equalizer',
        'Lightweight foldable design',
        'Crystal clear voice calls'
      ],
      colors: [
        { name: 'Graphite', hex: '#26262B', inStock: true },
        { name: 'White & Sand', hex: '#EAE5DB', inStock: true }
      ],
      images: [
        'assets/products/sennheiser-momentum.png'
      ],
      category: 'Audiophile'
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
      description: 'Computational audio combines custom acoustic design with the Apple H1 chip and software for breakthrough listening experiences.',
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
        'assets/products/apple-airpods-max.png'
      ],
      category: 'Wireless'
    }
  ];

  readonly brands = ['All', 'JBL', 'Bose', 'Sony', 'Skullcandy', 'Sennheiser', 'Apple'] as const;

  readonly selectedBrand = signal<string>('All');
  readonly searchQuery = signal<string>('');

  readonly products = computed(() => {
    const brand = this.selectedBrand();
    const query = this.searchQuery().toLowerCase().trim();

    return this.productsData.filter(p => {
      const matchBrand = brand === 'All' || p.brand.toLowerCase() === brand.toLowerCase();
      const matchQuery = !query || 
        p.name.toLowerCase().includes(query) ||
        p.brand.toLowerCase().includes(query) ||
        p.subtitle.toLowerCase().includes(query);
      return matchBrand && matchQuery;
    });
  });

  getProductById(id: string): Product | undefined {
    return this.productsData.find(p => p.id === id);
  }

  setBrand(brand: string) {
    this.selectedBrand.set(brand);
  }

  setSearchQuery(query: string) {
    this.searchQuery.set(query);
  }
}
