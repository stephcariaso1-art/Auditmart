export interface ProductColor {
  name: string;
  hex: string;
  inStock: boolean;
}

export interface Product {
  id: string;
  brand: string;
  name: string;
  subtitle: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  description: string;
  features: string[];
  colors: ProductColor[];
  images: string[];
  category: string;
  isPopular?: boolean;
}

export interface CartItem {
  product: Product;
  selectedColor: ProductColor;
  quantity: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  items: CartItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  shippingAddress: string;
  paymentMethod: string;
  deliveryEstimate: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  avatar: string;
  memberTier: string;
}
