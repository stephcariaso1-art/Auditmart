import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: 'splash',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then(m => m.HomePage),
  },
  {
    path: 'product/:id',
    loadComponent: () => import('./product-detail/product-detail.page').then(m => m.ProductDetailPage),
  },
  {
    path: 'product/:id/reviews',
    loadComponent: () => import('./product-reviews/product-reviews.page').then(m => m.ProductReviewsPage),
  },
  {
    path: 'cart',

    loadComponent: () => import('./cart/cart.page').then(m => m.CartPage),
  },
  {
    path: 'checkout',
    loadComponent: () => import('./checkout/checkout.page').then(m => m.CheckoutPage),
  },
  {
    path: 'receipt',
    loadComponent: () => import('./receipt/receipt.page').then(m => m.ReceiptPage),
  },
  {
    path: 'orders',
    loadComponent: () => import('./orders/orders.page').then(m => m.OrdersPage),
  },
  {
    path: 'profile',
    loadComponent: () => import('./profile/profile.page').then(m => m.ProfilePage),
  },
  {
    path: 'notifications',
    loadComponent: () => import('./notifications/notifications.page').then(m => m.NotificationsPage),
  },
  {
    path: 'payment-methods',
    loadComponent: () => import('./payment-methods/payment-methods.page').then(m => m.PaymentMethodsPage),
  },
  {
    path: 'shipping-addresses',
    loadComponent: () => import('./shipping-addresses/shipping-addresses.page').then(m => m.ShippingAddressesPage),
  },
  {
    path: 'login',
    loadComponent: () => import('./auth/login/login.page').then(m => m.LoginPage),
  },
  {
    path: 'signup',
    loadComponent: () => import('./auth/signup/signup.page').then(m => m.SignupPage),
  },
  {
    path: 'auth/login',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'auth/signup',
    redirectTo: 'signup',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
