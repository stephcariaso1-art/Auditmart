import { Injectable, signal, computed } from '@angular/core';
import { CartItem, Product, ProductColor } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  readonly items = signal<CartItem[]>([]);
  readonly promoCode = signal<string>('');
  readonly discountPercent = signal<number>(0);
  readonly toastMessage = signal<string | null>(null);

  constructor() {
    // Initial mock item for instant live showcase matching Figma cart wireframe
    this.items.set([
      {
        product: {
          id: 'jbl-live-660nc',
          brand: 'JBL',
          name: 'JBL Live 660NC',
          subtitle: 'Wireless Noise Cancelling',
          price: 75,
          rating: 4.8,
          reviewsCount: 328,
          description: 'Experience deep bass, clear vocals, and all day comfort.',
          features: ['Adaptive Noise Cancelling', 'Up to 50 Hours Battery Life'],
          colors: [{ name: 'Black', hex: '#1C1C1E', inStock: true }],
          images: ['assets/products/jbl-live-660nc.png', 'assets/products/jbl-cutout.png'],
          category: 'Over-Ear'
        },
        selectedColor: { name: 'Black', hex: '#1C1C1E', inStock: true },
        quantity: 1
      },
      {
        product: {
          id: 'sony-ath-m50x',
          brand: 'Sony',
          name: 'Sony ATH-M50x',
          subtitle: 'Premium Wireless Studio',
          price: 87,
          rating: 4.9,
          reviewsCount: 512,
          description: 'Critically acclaimed sonic performance.',
          features: ['45mm large-aperture drivers'],
          colors: [{ name: 'Matte Black', hex: '#18181A', inStock: true }],
          images: ['assets/products/sony-wh1000xm4.png', 'assets/products/sony-cutout.png'],
          category: 'Studio'
        },
        selectedColor: { name: 'Matte Black', hex: '#18181A', inStock: true },
        quantity: 1
      }
    ]);
  }

  readonly totalCount = computed(() => {
    return this.items().reduce((sum, item) => sum + item.quantity, 0);
  });

  readonly subtotal = computed(() => {
    return this.items().reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  });

  readonly discountAmount = computed(() => {
    return Math.round((this.subtotal() * this.discountPercent()) / 100);
  });

  readonly deliveryFee = computed(() => {
    return this.subtotal() > 150 || this.items().length === 0 ? 0 : 12;
  });

  readonly total = computed(() => {
    return Math.max(0, this.subtotal() - this.discountAmount() + this.deliveryFee());
  });

  addItem(product: Product, color?: ProductColor, quantity: number = 1) {
    const selectedColor = color || product.colors[0];
    const current = [...this.items()];
    const index = current.findIndex(
      item => item.product.id === product.id && item.selectedColor.name === selectedColor.name
    );

    if (index > -1) {
      current[index] = {
        ...current[index],
        quantity: current[index].quantity + quantity
      };
    } else {
      current.push({
        product,
        selectedColor,
        quantity
      });
    }

    this.items.set(current);
    this.showToast(`Added ${product.name} to cart`);
  }

  updateQuantity(productId: string, colorName: string, delta: number) {
    const current = this.items().map(item => {
      if (item.product.id === productId && item.selectedColor.name === colorName) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter((item): item is CartItem => item !== null);

    this.items.set(current);
  }

  removeItem(productId: string, colorName: string) {
    this.items.set(
      this.items().filter(
        item => !(item.product.id === productId && item.selectedColor.name === colorName)
      )
    );
    this.showToast('Item removed from cart');
  }

  applyPromoCode(code: string): boolean {
    const normalized = code.trim().toUpperCase();
    if (normalized === 'VIBRA15' || normalized === 'AUDI15') {
      this.discountPercent.set(15);
      this.promoCode.set(normalized);
      this.showToast('15% discount applied!');
      return true;
    } else if (normalized === 'VIP20') {
      this.discountPercent.set(20);
      this.promoCode.set(normalized);
      this.showToast('20% VIP discount applied!');
      return true;
    } else {
      this.showToast('Invalid promo code');
      return false;
    }
  }

  clearCart() {
    this.items.set([]);
  }

  showToast(message: string) {
    this.toastMessage.set(message);
    setTimeout(() => {
      if (this.toastMessage() === message) {
        this.toastMessage.set(null);
      }
    }, 2800);
  }
}
