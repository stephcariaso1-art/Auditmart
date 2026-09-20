import { Injectable, signal } from '@angular/core';
import { Order, CartItem } from '../models';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  readonly orders = signal<Order[]>([
    {
      id: 'ord-101',
      orderNumber: 'AM-98421',
      date: 'Sep 18, 2026',
      status: 'Delivered',
      items: [
        {
          product: {
            id: 'bose-crusher-evo',
            brand: 'Bose',
            name: 'Bose Crusher Evo',
            subtitle: 'Sensory Bass Experience',
            price: 99,
            rating: 4.7,
            reviewsCount: 245,
            description: 'Engineered with patented acoustic technology.',
            features: ['Adjustable Sensory Bass'],
            colors: [{ name: 'Triple Black', hex: '#111113', inStock: true }],
            images: ['assets/products/bose-crusher.jpg'],
            category: 'Wireless'
          },
          selectedColor: { name: 'Triple Black', hex: '#111113', inStock: true },
          quantity: 1
        }
      ],
      subtotal: 99,
      discount: 0,
      deliveryFee: 0,
      total: 99,
      shippingAddress: '742 Evergreen Terrace, Springfield, OR',
      paymentMethod: 'Mastercard •••• 4242',
      deliveryEstimate: 'Delivered on Sep 20, 2026'
    },
    {
      id: 'ord-100',
      orderNumber: 'AM-88319',
      date: 'Sep 02, 2026',
      status: 'Delivered',
      items: [
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
            features: ['Adaptive Noise Cancelling'],
            colors: [{ name: 'Black', hex: '#1C1C1E', inStock: true }],
            images: ['assets/products/jbl-live-660nc.jpg'],
            category: 'Over-Ear'
          },
          selectedColor: { name: 'Black', hex: '#1C1C1E', inStock: true },
          quantity: 2
        }
      ],
      subtotal: 150,
      discount: 15,
      deliveryFee: 0,
      total: 135,
      shippingAddress: '742 Evergreen Terrace, Springfield, OR',
      paymentMethod: 'Apple Pay',
      deliveryEstimate: 'Delivered on Sep 05, 2026'
    }
  ]);

  readonly latestOrder = signal<Order | null>(null);

  createOrder(
    items: CartItem[],
    subtotal: number,
    discount: number,
    deliveryFee: number,
    total: number,
    shippingAddress: string,
    paymentMethod: string
  ): Order {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const orderNumber = `AM-${randomNum}`;
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'Processing',
      items: [...items],
      subtotal,
      discount,
      deliveryFee,
      total,
      shippingAddress,
      paymentMethod,
      deliveryEstimate: 'Expected by Friday, Sep 25'
    };

    this.orders.update(prev => [newOrder, ...prev]);
    this.latestOrder.set(newOrder);
    return newOrder;
  }
}
